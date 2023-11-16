import { NextResponse, NextRequest, userAgent } from 'next/server';
import {
  ExperienceParams,
  GraphQLPersonalizeServiceConfig,
} from '@sitecore-jss/sitecore-jss/personalize';
//import { debug, NativeDataFetcher } from '@sitecore-jss/sitecore-jss';
import { debug } from '@sitecore-jss/sitecore-jss';
import {GraphQLSCPersonalizeService} from './ScPersonalizeService'
import { MiddlewareBase, MiddlewareBaseConfig } from './middleware';
import { getScPersonalizedRewrite} from '../../lib/personalizationUtils'

export type ScPersonalizeMiddlewareConfig = MiddlewareBaseConfig & {
    edgeConfig: Omit<GraphQLPersonalizeServiceConfig, 'fetch'>;
};

/**
 * Middleware / handler to support Sitecore Personalize
 */
export class ScPersonalizeMiddleware extends MiddlewareBase {
  private _personalizeService: GraphQLSCPersonalizeService;
  
  /**
   * @param {ScPersonalizeMiddlewareConfig} [config] Personalize middleware config
   */
  constructor(protected config: ScPersonalizeMiddlewareConfig) {
    super(config);   
    this._personalizeService = new GraphQLSCPersonalizeService({
        ...config.edgeConfig,
        fetch: fetch        
      });
  }

  

  /**
   * Gets the Next.js middleware handler with error handling
   * @returns middleware handler
   */
  public getHandler(): (req: NextRequest, res?: NextResponse) => Promise<NextResponse> {
    return async (req, res) => {
      try {
        return await this.handler(req, res);
      } catch (error:any) {
        console.log('Personalize middleware failed:');
        console.log(error);
        return res || NextResponse.next();
      }
    };
  }

  protected getExperienceParams(req: NextRequest): ExperienceParams {
    return {
      // It's expected that the header name "referer" is actually a misspelling of the word "referrer"
      // req.referrer is used during fetching to determine the value of the Referer header of the request being made,
      // used as a fallback
      referrer: req.headers.get('referer') || req.referrer,
      utm: {
        campaign: req.nextUrl.searchParams.get('utm_campaign'),
        content: req.nextUrl.searchParams.get('utm_content'),
        medium: req.nextUrl.searchParams.get('utm_medium'),
        source: req.nextUrl.searchParams.get('utm_source'),
      },
    };
  }

  protected excludeRoute(pathname: string): boolean | undefined {
    // ignore files
    return pathname.includes('.') || super.excludeRoute(pathname);
  }

  private handler = async (req: NextRequest, res?: NextResponse): Promise<NextResponse> => {
    const pathname = req.nextUrl.pathname;
    const language = this.getLanguage(req);
    const hostname = this.getHostHeader(req) || this.defaultHostname;
    const queryString = req.nextUrl.search;
    const startTimestamp = Date.now();

    console.log('scPersonalizeHandler', hostname, startTimestamp, queryString)

    // Response will be provided if other middleware is run before us (e.g. redirects)
    let response = res || NextResponse.next();

    if (this.config.disabled && this.config.disabled(req, response)) {
      console.log('skipped (personalize middleware is disabled)');
      return response;
    }

    if (
      response.redirected || // Don't attempt to personalize a redirect
      this.isPreview(req) || // No need to personalize for preview (layout data is already prepared for preview)
      this.excludeRoute(pathname)
    ) {
      console.log(
        'skipped (%s)',
        response.redirected ? 'redirected' : this.isPreview(req) ? 'preview' : 'route excluded'
      );
      return response;
    }

    const site = this.getSite(req, res);

    console.log('getPersonalizeInfo', pathname, language, site.name);

    // Get personalization info from Experience Edge    
    this._personalizeService.setPersonalizeContext({url: req.url, hostname: req.headers.get('hostname')});
    
     const personalizeInfo = await this._personalizeService.getPersonalizeInfo(
        pathname,
        language,
        site.name
      );

    if (!personalizeInfo) {
      // Likely an invalid route / language
      console.log('skipped (personalize info not found)');
      return response;
    }

    // Execute targeted experience in CDP
    const { ua } = userAgent(req);
    const params = this.getExperienceParams(req);

    console.log('params', ua, params)

    const variantId = personalizeInfo.activeVariantid;  

    if (!variantId) {
      debug.personalize('skipped (no variant identified)');
      return response;
    }

    // Path can be rewritten by previously executed middleware
    const basePath = res?.headers.get('x-sc-rewrite') || pathname;

    // Rewrite to persononalized path
    const rewritePath = getScPersonalizedRewrite(basePath, variantId);

    console.log('Rewritten path - ', rewritePath)
    
    // Note an absolute URL is required: https://nextjs.org/docs/messages/middleware-relative-urls
    const rewriteUrl = req.nextUrl.clone();
    rewriteUrl.pathname = rewritePath;
    response = NextResponse.rewrite(rewriteUrl);

    // Disable preflight caching to force revalidation on client-side navigation (personalization may be influenced)
    // See https://github.com/vercel/next.js/issues/32727
    response.headers.set('x-middleware-cache', 'no-cache');
    // Share rewrite path with following executed middlewares
    response.headers.set('x-sc-rewrite', rewritePath);

    // Share site name with the following executed middlewares
    response.cookies.set(this.SITE_SYMBOL, site.name);    

    return response;
  };
}
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import {
  DictionaryPhrases,
  ComponentPropsCollection,
  LayoutServiceData,
  SiteInfo,
  HTMLLink,
} from '@sitecore-jss/sitecore-jss-nextjs';

export type SitecorePageProps = {
  site: SiteInfo;
  locale: string;
  dictionary: DictionaryPhrases;
  componentProps: ComponentPropsCollection;
  notFound: boolean;
  layoutData: LayoutServiceData;
  headLinks: HTMLLink[];
  activeVariantId: string;
};

interface Plugin {
    /**
     * Detect order when the plugin should be called, e.g. 0 - will be called first (can be a plugin which data is required for other plugins)
     */
    order: number;
    /**
     * A function which will be called during page props generation
     */
    exec(
      props: SitecorePageProps,
      context: GetServerSidePropsContext | GetStaticPropsContext
    ): Promise<SitecorePageProps>;
  }

export class ResolvePersonalizationPathPlugin implements Plugin {
  order = 0;

  async exec(props: any, context: GetServerSidePropsContext | GetStaticPropsContext) {
    if (context.preview) return props;

    console.log('ResolvePersonalizationPathPlugin', context?.params?.path);

    if(context?.params?.path)
    {
      let path = context.params.path as string[];
      path?.forEach(pathEl => {
        if(pathEl.indexOf("_scvariant") != -1)
        {
          props.activeVariantId = pathEl.replace("_scvariant", "");
          console.log("Resolved active personalization variant from path - ", props.activeVariantId);
        }
      });      
    }

    return props;
  }
}


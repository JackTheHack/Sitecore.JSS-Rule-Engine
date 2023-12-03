import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { PersonalizationHelper } from '../../lib/index';
import { JssRuleEngine } from 'sitecore-jss-rule-engine'
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


export class RulesSSRPersonalizationPlugin implements Plugin {

  graphQLEndpoint:string;
  sitecoreApiKey:string;
  ruleEngine:JssRuleEngine;

  constructor(endpointUrl:string, sitecoreApiKey: string, ruleEngine:JssRuleEngine)
  {
    this.graphQLEndpoint = endpointUrl;
    this.sitecoreApiKey = sitecoreApiKey;
    this.ruleEngine = ruleEngine;
  }

  order = 3;

  isDisconnectedMode(props:any) {
    const disconnectedMode = props.layoutData.sitecore.context.site?.name === 'JssDisconnectedLayoutService';
    return disconnectedMode;
}

  isPageEditing(props:any) {
      const isEditing = props.layoutData.sitecore.context.pageEditing;
      return isEditing;
  }

  /**
 * Determines whether context is GetServerSidePropsContext (SSR) or GetStaticPropsContext (SSG)
 * @param {GetServerSidePropsContext | GetStaticPropsContext} context
 */
  isServerSidePropsContext(
    context: GetServerSidePropsContext | GetStaticPropsContext
  ): context is GetServerSidePropsContext {
    return (<GetServerSidePropsContext>context).req !== undefined;
  };


  async exec(props: any, context: GetServerSidePropsContext | GetStaticPropsContext) {
    var doRun =
            this.isServerSidePropsContext(context) &&
            !context.preview &&
            !this.isDisconnectedMode(props) &&
            !this.isPageEditing(props);

    if (!doRun) {
      return props;
    }   

    if(props.layoutData.sitecore.route &&
       props.layoutData.sitecore.route.fields)
    {

      var routeFields = props.layoutData.sitecore.route.fields;
      var personalizationRule = routeFields["PersonalizationRules"];
      var personalizeOnEdge = routeFields["PersonalizeOnEdge"];

      var serverSideProps = <GetServerSidePropsContext>context;

      if(personalizationRule && serverSideProps && personalizeOnEdge && personalizeOnEdge.value == "1")
      {

        console.log('Personalizing SSR');

        //check if we are running in SSR mode - then pass the request url
        if(serverSideProps.req?.url)
        {
           this.ruleEngine.setRequestContext({
              url: serverSideProps.req.url
           });
        }    

        var personalizationHelper = new PersonalizationHelper(this.graphQLEndpoint, this.sitecoreApiKey);
        await personalizationHelper.personalize(this.ruleEngine, props, personalizationRule);      
      } 
    }

    return props;
  }
}
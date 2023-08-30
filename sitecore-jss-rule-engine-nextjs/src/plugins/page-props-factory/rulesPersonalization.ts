import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { PersonalizationHelper } from '../../lib/index';
//@ts-ignore
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


export class RulesPersonalizationPlugin implements Plugin {

  graphQLEndpoint:string;
  ruleEngine:JssRuleEngine;

  constructor(endpointUrl:string, ruleEngine:JssRuleEngine)
  {
    this.graphQLEndpoint = endpointUrl;
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

  async exec(props: any, context: GetServerSidePropsContext | GetStaticPropsContext) {
    var doRun =
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

      if(personalizeOnEdge && personalizeOnEdge.value)
      {
        var personalizationHelper = new PersonalizationHelper(this.graphQLEndpoint);
        await personalizationHelper.personalize(this.ruleEngine, props, personalizationRule);      
      }
    }

    return props;
  }
}
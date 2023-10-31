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


export class RulesSSGPersonalizationPlugin implements Plugin {

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

  extractRuleActions(variantId:string)
  {
    console.log('extractRuleActions - ', variantId);
    const values = variantId.replace('_variantId','');
    let result = [];
    for (let i = 0; i < values.length; i++) {
      result.push(values[i]=="1");
    }
    return result;
  }

  isSSG(obj: any) : obj is GetStaticPropsContext
  {
    return obj ? true : false;
  }
  
  async exec(props: any, context: GetServerSidePropsContext | GetStaticPropsContext) {
    var doRun =
            this.isSSG(context) &&
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

      let staticPropsContext = context as GetStaticPropsContext;

      if(staticPropsContext && personalizeOnEdge && personalizeOnEdge.value == "1")
      {

        console.log('### CONTEXT:');
        console.log('Active variant id:', props.activeVariantId);
        console.log('Static props context:', staticPropsContext);      

        let activeVariantId = props.activeVariantId;

        if(activeVariantId)
        {
          console.log('Extracting rule actions')
          var ruleActions = this.extractRuleActions(activeVariantId);
          var personalizationHelper = new PersonalizationHelper(this.graphQLEndpoint, this.sitecoreApiKey);
          console.log("Applying personalization for ", ruleActions);
          await personalizationHelper.runRuleActions(this.ruleEngine, props, personalizationRule, ruleActions);      
          console.log(props);
        }
      } 
    }

    return props;
  }
}
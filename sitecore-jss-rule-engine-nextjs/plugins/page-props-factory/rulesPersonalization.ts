import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { personalizationHelper } from '../../lib/index';

class RulesPersonalizationPlugin {
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
        await personalizationHelper.personalize(props, personalizationRule);      
      }
    }

    return props;
  }
}

export const rulesPersonalizationPlugin = new RulesPersonalizationPlugin();

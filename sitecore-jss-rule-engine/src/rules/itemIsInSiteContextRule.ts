import { RuleData, RuleEngineContext } from "../types/ruleEngine";

export default async function(_rule:RuleData, ruleContext: RuleEngineContext) {
    
    if(!ruleContext?.sitecoreContext?.itemProvider)
    {
        throw new Error("Sitecore context or GraphQL provider is not setup.") 
    }
    
    var currentItemId = ruleContext.sitecoreContext.itemId;
    var currentSiteName = ruleContext.sitecoreContext.site?.name;
    var graphQlProvider = ruleContext.sitecoreContext.itemProvider;

    if(!currentItemId || !currentSiteName)
    {
        throw new Error("Current item is missing");
    }

    var graphQlResponse = await graphQlProvider.getItemAncestorInfoById(currentItemId);

    if(!graphQlResponse){
        throw new Error("GraphQL query failed.");
    }

    var ancestors = graphQlResponse?.data?.item?.ancestors;

    if(ancestors)
    {
        return ancestors.some((i:any) => {
            if(i.name === currentSiteName)
            {
                return true;
            }
            return false;
        });
    }

    return false;
}
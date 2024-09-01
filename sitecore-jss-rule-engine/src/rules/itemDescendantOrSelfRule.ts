import { RuleData, RuleEngineContext } from "../types/ruleEngine";

export default async function(rule:RuleData, ruleContext: RuleEngineContext) {
    let itemId = rule.attributes?.get('itemid');

    if(!itemId){
        throw new Error("itemid attribute is missing.") 
    }

    itemId = itemId.replaceAll('{','').replaceAll('}','').replaceAll('-','').toUpperCase();

    if(!ruleContext?.sitecoreContext?.itemProvider)
    {
        throw new Error("Sitecore context or GraphQL provider is not setup.") 
    }

    
    var currentItemId = ruleContext.sitecoreContext.itemId;
    var graphQlProvider = ruleContext.sitecoreContext.itemProvider;

    if(!currentItemId)
    {
        throw new Error("Current item is missing");
    }

    var graphQlResponse = await graphQlProvider.getItemDescendantsInfoById(currentItemId);

    if(!graphQlResponse){
        throw new Error("GraphQL query failed.");
    }

    
    var items = graphQlResponse?.data?.item?.children?.results;

    if(items)
    {
        return items.some((i:any) => {
            if(i.id === itemId ||
               i.path === itemId
            )
            {
                return true;
            }
            return false;
        });
    }

}
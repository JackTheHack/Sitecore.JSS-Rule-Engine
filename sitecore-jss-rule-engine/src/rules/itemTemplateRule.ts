import { RuleData, RuleEngineContext } from "../types/ruleEngine";

export default async  function(rule:RuleData, ruleContext: RuleEngineContext) {
    let templateid = rule.attributes?.get('templateid');

    if(!templateid){
        throw new Error("value or operatorid attribute is missing.") 
    }    
    
    templateid = templateid.replaceAll('{','').replaceAll('}','').replaceAll('-','').toUpperCase();

    if(!ruleContext?.sitecoreContext?.itemProvider)
    {
        throw new Error("Sitecore context or GraphQL provider is not setup.") 
    }
    
    var currentTemplateId = ruleContext.sitecoreContext.templateId;

    if (!currentTemplateId) {
        throw new Error("Current item is missing");
    }
    
    currentTemplateId = currentTemplateId.replaceAll('{','').replaceAll('}','').replaceAll('-','').toUpperCase();    

    return await currentTemplateId == templateid;  
}
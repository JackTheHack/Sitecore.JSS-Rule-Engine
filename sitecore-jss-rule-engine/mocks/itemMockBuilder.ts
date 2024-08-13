
class SitecoreContextMockBuilder {
    
    instance: any;

    constructor(itemId: string, name: string, language: string = "en-NZ") {
        this.instance = {
            itemId: itemId,
            itemLanguage: language,
            itemVersion: 1,
            route: {
                name: name,
                displayName: name,
                fields: {

                },
            },            
            databaseName: "master",
            pageEditing: false,
            pageState: "normal",
            language: language,            
            variantId: "_default"
        };        
    }

    getInstance(){
        return this.instance;
    }
    
    template(templateName: string, templateId: string){
        this.instance.templateName = templateName;
        this.instance.templateId = templateId;
        return this;
    }

    itemPath(itemPath: string){
        this.instance.itemPath = itemPath;
        return this;        
    }
    
    language(language:string)
    {
        this.instance.language = language;
        this.instance.itemLanguage = language;
        return this;
    }

    fieldValue(fieldName: string, fieldValue: string){
        this.instance.route.fields[fieldName] = { value: fieldValue };
        return this;
    }    
}

export function sitecoreContextMockBuilder(itemId: string, name: string, language: string = "en-NZ"){
    return new SitecoreContextMockBuilder(itemId, name, language);
}
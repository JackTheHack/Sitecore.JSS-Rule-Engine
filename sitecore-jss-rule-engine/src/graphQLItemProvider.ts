export interface IItemProvider
{
  runQuery(query:any) : any;
}

export class GraphQLItemProvider implements IItemProvider
{
    endpointUrl: any;    
    apiKey: any;

    constructor(options:any){
        this.endpointUrl = options.graphEndpoint;
        this.apiKey = options.apiKey;
    }

    async getItemById(itemId:any){
      var query = `{
        item(path: "${itemId}", language: "en") {
            fields(ownFields: true) {
              name
              value
            }
        }
      }`;
      return this.runQuery(query);
    }

    async runQuery(query:any){
        const response = await fetch(
            this.endpointUrl,
            {
              method: 'post',
              body: query,
              headers: {
                'Content-Type': 'application/json',
                'Content-Length': query.length,
                "sc_apikey": this.apiKey,
                'User-Agent': 'Node',
              },
            }
          );
        
          const json = await response.json();
          console.log(json.data);
    }
}

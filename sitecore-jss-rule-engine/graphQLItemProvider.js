class IItemProvider
{
  async runQuery(query) { throw "not implemented."}
}

class GraphQLItemProvider
{    
    constructor(options){
        this.endpointUrl = options.graphEndpoint;
        this.apiKey = options.apiKey;
    }

    async getItemById(itemId){
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

    async runQuery(query){
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

GraphQLItemProvider.prototype = IItemProvider;

module.exports.ItemProvider = GraphQLItemProvider;
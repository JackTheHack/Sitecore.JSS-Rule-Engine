class ItemProvider 
{

    constructor(options){
        this.endpointUrl = options.graphEndpoint;
        this.apiKey = options.apiKey;
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

module.exports.ItemProvider = ItemProvider;
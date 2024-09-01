import ApolloClient from 'apollo-boost'
import { IItemProvider } from './itemProvider';
import { itemAncestorsByIdQuery } from "./queries/itemAncestorsById"
import { itemDescendantsByIdQuery } from "./queries/itemDescendantsById"
import { itemByIdQuery } from "./queries/itemByIdQuery"

export class GraphQLItemProvider implements IItemProvider {
  endpointUrl: any;
  apiKey: any;
  cache: Map<string, any> = new Map<string, any>()

  constructor(options: any) {
    this.endpointUrl = options.graphEndpoint;
    this.apiKey = options.apiKey;
  }

  async getItemAncestorInfoById(itemId: string) {
    let cacheKey = "anc_"+ itemId;

    if(this.cache.has(cacheKey)){
      return this.cache.get(cacheKey);
    }

    let result =  await this.runQuery(itemAncestorsByIdQuery, { id: itemId });
    this.cache.set(cacheKey, result);
    return result;
  }

  async getItemDescendantsInfoById(itemId: string) {

    let cacheKey = "desc_"+ itemId;

    if(this.cache.has(cacheKey)){
      return this.cache.get(cacheKey);
    }

    let result =  this.runQuery(itemDescendantsByIdQuery, { id: itemId });
    this.cache.set(cacheKey, result);
    return result;
  }

  async getItemById(itemId: string) {

    let cacheKey = "item_"+itemId;

    if(this.cache.has(cacheKey)){
      return this.cache.get(cacheKey);
    }

    let result =  await this.runQuery(itemByIdQuery, { id: itemId });
    this.cache.set(cacheKey, result);

    return result;
  }

  async runQuery(query: any, variables: any) {
    
    let client = new ApolloClient({
      uri: this.endpointUrl,
      request: operation => {
        operation.setContext({
          headers: {
            sc_apikey: this.apiKey,
          },
        });
      }
    });

    const response = await client.query({
      query: query,
      variables: variables,
    });

    const json = await response.data;
    console.log(json.data);

    return json;
  }
}

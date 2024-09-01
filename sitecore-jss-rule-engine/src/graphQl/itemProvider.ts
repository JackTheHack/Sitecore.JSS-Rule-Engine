export interface IItemProvider {
    runQuery(query: string, variables: any): Promise<any>;
    getItemById(itemId: string): Promise<any>;
    getItemAncestorInfoById(itemId: string): Promise<any>;
    getItemDescendantsInfoById(itemId: string): Promise<any>;
  }
  
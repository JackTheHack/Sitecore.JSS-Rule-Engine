import { IItemProvider } from './itemProvider';
import { getItemAncestorsByIdMock, getItemByIdMock, getItemDescendantsByIdMock } from '@root/mocks/graphQLMocks';

export class FakeGraphQLItemProvider implements IItemProvider {
  constructor() {
  }

  async getItemAncestorInfoById(_itemId: string) {
    return getItemAncestorsByIdMock;
  }

  async getItemDescendantsInfoById(_itemId: string) {
    return getItemDescendantsByIdMock;
  }

  async getItemById(_itemId: string) {
    return getItemByIdMock;
  }

  async runQuery(_query: any, _variables: any) {
    return getItemByIdMock;
  }
}

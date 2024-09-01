import { gql } from "apollo-boost";

export const itemDescendantsByIdQuery = gql`{

query itemDescendantsById($id: String) {
    item(path: $id, language: "en") {
        id,
        name,
        children {
          total,
          results{
            id,
            name,
            url {hostName, path, siteName, url},
            path,
            template {
              id, 
              name
            }
          }
        }
    }
  }
}`;
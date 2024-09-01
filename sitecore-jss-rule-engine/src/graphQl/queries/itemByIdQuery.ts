import { gql } from "apollo-boost";

export const itemByIdQuery = gql`{
    query itemByIdQuery($id: String) {
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
 }`


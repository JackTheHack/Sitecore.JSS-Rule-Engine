import { gql } from "apollo-boost"

export const itemAncestorsByIdQuery = gql`{
  query itemAncestorsById($id: String) {
    item(path: $id, language: "en") {
        id,
        name,
        ancestors {
          id,
          name,
          url {hostName, path, siteName, url},
          path,
          template {
            id,
            name
          }
        },
    }
  }}`
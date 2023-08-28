"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetItemByIdQuery = void 0;
var GetItemByIdQuery = "query GetItemById($id:String){\n item(language:\"en\", path:$id)\n  {\n    name,\n    fields\n    {\n      name,\n      value\n    }  \n  }\n}";
exports.GetItemByIdQuery = GetItemByIdQuery;

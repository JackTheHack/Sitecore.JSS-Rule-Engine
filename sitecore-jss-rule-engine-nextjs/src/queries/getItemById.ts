var GetItemByIdQuery:string = `query GetItemById($id:String){
 item(language:"en", path:$id)
  {
    name,
    fields
    {
      name,
      value
    }  
  }
}`

export { GetItemByIdQuery }
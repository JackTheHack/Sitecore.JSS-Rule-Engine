# Sitecore.JSS-Rule-Engine
Javascript library to parse Sitecore rules and run them in JS

# Accessing rules from GraphQL

Rule XML could be retrieved through GraphQL query to the item in Sitecore playground:
https://xmcloudcm.localhost/sitecore/api/graph/edge/ide

```
# Write your query or mutation here
{
 item(language:"en", path:"/sitecore/content/Home")
  {
    name,
    field(name:"Rules")
    {
      name,
      value
    }  
	}
}
```

# How to use
test.js contains unit tests (in Ava) with examples of rules being parsed and executed.

# Developer docs
https://github.com/JackTheHack/Sitecore.JSS-Rule-Engine/wiki

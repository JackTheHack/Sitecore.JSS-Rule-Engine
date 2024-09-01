export const getItemByIdMock = {
  "data": {
    "item": {
      "id": "E5F1DA7A8FFD49D5811B8A714D51AFDA",
      "name": "Home",
      "hasChildren": true,
      "languages": [
        {
          "id": "E5F1DA7A8FFD49D5811B8A714D51AFDA",
          "name": "Home"
        }
      ],
      "rendered": {
        "sitecore": {
          "context": {
            "pageEditing": false,
            "site": {
              "name": "sxastarter"
            },
            "pageState": "normal",
            "editMode": "chromes",
            "language": "en",
            "itemPath": "/"
          },
          "route": {
            "name": "Home",
            "displayName": "Home",
            "fields": {
              "Title": {
                "value": "sxastarter"
              },
              "Content": {
                "value": "<p>Test</p>"
              },
              "NavigationClass": null,
              "NavigationFilter": [],
              "NavigationTitle": {
                "value": "sxastarter"
              },
              "SxaTags": [],
              "Page Design": null,
              "PersonalizationRules": {
                "value": "<ruleset>\r\n  <rule uid=\"{22656DAE-3D06-49AB-A047-2FF5B23F76CB}\">\r\n    <conditions>\r\n      <condition id=\"{74759FE2-7D63-4F63-8952-C3F3C73D58F7}\" uid=\"AF8A5FE7962C42F5811B3708FF1F52F9\" ParameterName=\"campaignId\" operatorid=\"{10537C58-1684-4CAB-B4C0-40C10907CE31}\" value=\"specials\" />\r\n    </conditions>\r\n    <actions>\r\n      <action id=\"{225168CE-C093-4F10-96C3-5B1983DF5261}\" uid=\"D3C6C4772D014ADDB195125C51818B68\" renderingName=\"RichText\" placeholderName=\"headless-main\" datasourcePath=\"{E7E90814-DBBE-4DEE-A39D-268F3E331448}\" />\r\n    </actions>\r\n  </rule>\r\n  <rule uid=\"{D205C50C-F41E-40C4-BADF-68C982DD5000}\">\r\n    <conditions>\r\n      <condition id=\"{74759FE2-7D63-4F63-8952-C3F3C73D58F7}\" uid=\"010534F1E6624D80ACBB647EA67FDC1B\" ParameterName=\"campaignId\" operatorid=\"{10537C58-1684-4CAB-B4C0-40C10907CE31}\" value=\"christmas\" />\r\n    </conditions>\r\n    <actions>\r\n      <action id=\"{225168CE-C093-4F10-96C3-5B1983DF5261}\" uid=\"0998112CEE814D1F93856D5FABA26B1F\" renderingName=\"RichText\" placeholderName=\"headless-main\" datasourcePath=\"{BB844F6B-0497-4FD6-A183-CC5C23092BA9}\" />\r\n    </actions>\r\n  </rule>\r\n</ruleset>"
              },
              "PersonalizeOnEdge": {
                "value": true
              },
              "IsStaticRender": {
                "value": false
              }
            },
            "databaseName": "master",
            "deviceId": "fe5d7fdf-89c0-4d99-9aa3-b5fbd009c9f3",
            "itemId": "e5f1da7a-8ffd-49d5-811b-8a714d51afda",
            "itemLanguage": "en",
            "itemVersion": 1,
            "layoutId": "96e5f4ba-a2cf-4a4c-a4e7-64da88226362",
            "templateId": "b7f529e8-4d15-41a4-8d0f-ac987b4aa3e6",
            "templateName": "Page",
            "placeholders": {
              "headless-header": [],
              "headless-main": [
                {
                  "uid": "d46f4c1c-e5fa-4d6e-babe-e24509d1768e",
                  "componentName": "RichText",
                  "dataSource": "/sitecore/content/Headless/sxastarter/Home/Data/Text 1",
                  "params": {
                    "GridParameters": "col-12",
                    "FieldNames": "Default",
                    "CacheClearingBehavior": "Clear on publish",
                    "DynamicPlaceholderId": "2"
                  }
                }
              ],
              "headless-footer": []
            }
          }
        }
      },
      "url": {
        "hostName": "xmcloudcm.localhost",
        "path": "/",
        "siteName": "sxastarter",
        "url": "https://xmcloudcm.localhost/"
      },
      "path": "/sitecore/content/Headless/sxastarter/Home",
      "displayName": "Home",
      "template": {
        "name": "Page",
        "id": "B7F529E84D1541A48D0FAC987B4AA3E6",
        "baseTemplates": [
          {
            "id": "4715171126CA434E8132D3E0B7D26683",
            "name": "Base Page"
          },
          {
            "id": "371D5FBB54984D94AB2BE3B70EEBE78C",
            "name": "_Navigable"
          },
          {
            "id": "4414A1F9826A46478DF4ED6A95E64C43",
            "name": "_Sitemap"
          },
          {
            "id": "F39A594A7BC94DB0BAA188543409C1F9",
            "name": "_Taggable"
          },
          {
            "id": "6650FB347EA14245A9195CC0F002A6D7",
            "name": "_Designable"
          },
          {
            "id": "2BC497219A8444A3BFAD8E9986830301",
            "name": "_PersonalizedPage"
          },
          {
            "id": "3F8A6A5D7B1A45668CD40A50F3030BD8",
            "name": "Page"
          }
        ]
      },
      "parent": {
        "id": "F08DAC27DF854FB0822FB015FF93CC22",
        "name": "sxastarter",
        "template": {
          "id": "B7F529E84D1541A48D0FAC987B4AA3E6",
          "name": "Headless Site"
        }
      },
      "language": {
        "name": "en",
        "nativeName": "English",
        "englishName": "English"
      },
      "fields": [
        {
          "id": "62E0D0E0FE30478782553E3C7BDAD0DF",
          "name": "Title",
          "value": "sxastarter"
        },
        {
          "id": "F45EE0935F0C467589652FBBB20B070A",
          "name": "Content",
          "value": "<p>Test</p>"
        },
        {
          "id": "0D83E59AC3F141BE81B2762D35E0799F",
          "name": "NavigationClass",
          "value": ""
        },
        {
          "id": "1FBC6A49628148EE87E9A3970B145ADB",
          "name": "NavigationFilter",
          "value": ""
        },
        {
          "id": "4E0720E99D504DDC87CFECD65E8E94C8",
          "name": "NavigationTitle",
          "value": "sxastarter"
        },
        {
          "id": "76FB6FFD44874028A1CF705FBE360CBA",
          "name": "Priority",
          "value": "{19F3E919-4991-495F-9207-E1DADFD06F54}"
        },
        {
          "id": "508C54C0CD0242668B68D71F88DE1AA9",
          "name": "ChangeFrequency",
          "value": "{D23B4654-53A5-4589-8B1B-5665A763D144}"
        },
        {
          "id": "97FB669D5B8E48299A2406418C315D73",
          "name": "SxaTags",
          "value": ""
        },
        {
          "id": "24171BF1C0E1480EBE764C0A1876F916",
          "name": "Page Design",
          "value": ""
        },
        {
          "id": "F4092541820640D680859D5651100EA4",
          "name": "PersonalizationRules",
          "value": "<ruleset>\r\n  <rule uid=\"{22656DAE-3D06-49AB-A047-2FF5B23F76CB}\">\r\n    <conditions>\r\n      <condition id=\"{74759FE2-7D63-4F63-8952-C3F3C73D58F7}\" uid=\"AF8A5FE7962C42F5811B3708FF1F52F9\" ParameterName=\"campaignId\" operatorid=\"{10537C58-1684-4CAB-B4C0-40C10907CE31}\" value=\"specials\" />\r\n    </conditions>\r\n    <actions>\r\n      <action id=\"{225168CE-C093-4F10-96C3-5B1983DF5261}\" uid=\"D3C6C4772D014ADDB195125C51818B68\" renderingName=\"RichText\" placeholderName=\"headless-main\" datasourcePath=\"{E7E90814-DBBE-4DEE-A39D-268F3E331448}\" />\r\n    </actions>\r\n  </rule>\r\n  <rule uid=\"{D205C50C-F41E-40C4-BADF-68C982DD5000}\">\r\n    <conditions>\r\n      <condition id=\"{74759FE2-7D63-4F63-8952-C3F3C73D58F7}\" uid=\"010534F1E6624D80ACBB647EA67FDC1B\" ParameterName=\"campaignId\" operatorid=\"{10537C58-1684-4CAB-B4C0-40C10907CE31}\" value=\"christmas\" />\r\n    </conditions>\r\n    <actions>\r\n      <action id=\"{225168CE-C093-4F10-96C3-5B1983DF5261}\" uid=\"0998112CEE814D1F93856D5FABA26B1F\" renderingName=\"RichText\" placeholderName=\"headless-main\" datasourcePath=\"{BB844F6B-0497-4FD6-A183-CC5C23092BA9}\" />\r\n    </actions>\r\n  </rule>\r\n</ruleset>"
        },
        {
          "id": "7DC1F3F2DD864228ACC37EFBF72414A8",
          "name": "PersonalizeOnEdge",
          "value": "1"
        },
        {
          "id": "788071ECAC344BAA8C83171D27912BD0",
          "name": "IsStaticRender",
          "value": "0"
        },
        {
          "id": "BA3F86A24A1C4D78B63D91C2779C1B5E",
          "name": "__Sortorder",
          "value": ""
        },
        {
          "id": "25BED78C49574165998ACA1B52F67497",
          "name": "__Created",
          "value": "20230812T051342Z"
        },
        {
          "id": "D9CF14B1FA164BA69288E8A174D4D522",
          "name": "__Updated",
          "value": "20231101T101411Z"
        },
        {
          "id": "A14F1B0C438449EC879028A440F3670C",
          "name": "__Semantics",
          "value": ""
        }
      ]
    }
  }
}
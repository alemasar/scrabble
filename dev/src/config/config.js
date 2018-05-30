let viewsDir = 'src/tpls/';

export default {
  "template":[
    {
      "id": "buttons",
      "template": viewsDir + "route_home.html",
      "element": ".package_container",
      "onload":"subscriptionsLoaded",
      "name": "buttons",
      "data": {
          "name": [
              "case1"
          ],
          "root": "case1"
      },
      "routeName": "case1"
    },
    {
      "id": "modals",
      "template": viewsDir + "route_home.html",
      "element": ".modals_container",
      "onload": "modalsLoaded",
      "name": "buttons",
      "data": {
          "name": [
              "case1"
          ],
          "root": "case1"
      },
      "routeName": "case1"
    }
  ]
}
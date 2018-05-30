import Twig from 'twig';
import Ajax from './ajax.js';
import OnLoads from './onloads';
import config from '../config/config';

let viewsDir = 'src/tpls/wsbk/';
let jsPath = "./vendor/js/";
let jsFiles = [];
let jsFilesNum = 0;
let properties = ["id","template","data","data_name"];

function loadFile(file) {
    console.log(file)
    var script = document.createElement('script');
    script.onload = function () {
        //do stuff with the script
        let DOMContentLoaded_event = document.createEvent("Event")
        DOMContentLoaded_event.initEvent("DOMContentLoaded", true, true)
        window.document.dispatchEvent(DOMContentLoaded_event)
    };
    script.src = file;

    document.head.appendChild(script);
}

Twig.extend(function (Twig) {
    Twig.exports.extendFunction("t", (source, params) => {
        return source;
    });

    Twig.exports.extendFunction("add_js", (jsFile) => {
        console.log(jsFile);
        if (jsFiles.indexOf(jsFile) === -1) {
            jsFiles.push(jsFile);
            loadFile(jsFile)
        }
    });
})

export default class Page {
    constructor() {
        this.routeData = [];
        const menuDiv = document.getElementById("workspace_container");
        this.shadowRoot = menuDiv.attachShadow({ mode: 'open' }).appendChild(menuDiv.cloneNode(true));

        //let preloadTemplate = this.preloadRoute.bind(this);
        console.log(viewsDir)
        // this.loadTemplate(config[0]);
        this.loadRoutes()
    }
    loadRoutes() {
        Ajax.getUrl("http://localhost:3004/routes", {})
            .subscribe((route) => {
                let routes = []
                console.log(route)
                route.forEach((rs) => {
                    rs.children.forEach((r) => {
                        let obj = {}
                        obj.label = r.label;
                        obj.template = r.path + '/' + r.template;
                        obj.id = r.id;
                        obj.data = r.data;
                        obj.data_name = r.data_name;
                        routes.push(obj);
                        //                        
                    });
                })
                Twig.cache();

                const load = function (template) {
                    console.log(routes)
                    const parsedTemplate = new DOMParser().parseFromString(template.render({ "routes": routes }), "text/html").body.firstChild;
                    const slot = this.shadowRoot.querySelector("#menuSlot");
                    slot.addEventListener('slotchange', e => {
                        const links = Array.from(e.target.querySelectorAll("ul li a"));
                        console.log(links)
                        links.forEach((link) => {
                            const clickRef = function (e) {
                                let tplObj = {}
                                Array.from(e.target.attributes).forEach((attr) => {
                                    if (attr.name.indexOf("data-route") != -1) {
                                        tplObj[attr.name.replace("data-route-", "")] = e.target.getAttribute(attr.name);
                                    }
                                })
                                console.log(tplObj)
                                Ajax.getUrl("http://localhost:3005/" + tplObj.data, {}).subscribe((data) => {
                                    const loadTpl = function (template) {
                                        let objData = {};
                                        const pageSlot = this.shadowRoot.querySelector("#pageSlot");
                                        objData[tplObj.data_name] = data;
                                        console.log(objData);
                                        const childs = Array.from(new DOMParser().parseFromString(template.render(objData), "text/html").body.childNodes);
                                        childs.forEach((child) => {
                                            pageSlot.appendChild(child);
                                        });
                                    }
                                    let template = Twig.twig({
                                        id: tplObj.id,
                                        namespaces: {
                                            'views_dir': './src/tpls'
                                        },
                                        href: tplObj.template,
                                        async: false,
                                        load: loadTpl.bind(this)
                                    });
                                });
                            }
                            link.addEventListener("click", clickRef.bind(this))

                        });
                    });
                    slot.appendChild(parsedTemplate);
                    console.log(route);
                    const links = Array.from(slot.querySelectorAll("ul li a"));
                    console.log(routes)
                    properties.forEach((prop)=>{
                        links.forEach((link, index)=>{
                            link.setAttribute("data-route-"+prop, routes[index][prop]);
                        })
                    })
                }

                let template = Twig.twig({
                    id: 'menu',
                    namespaces: {
                        'views_dir': './dev/src/tpls'
                    },
                    href: './dev/src/tpls/route_menu.html',
                    async: false,
                    load: load.bind(this)
                });
            })
    }

}

const handler = function () {
    window.base_url = './';
    window.lang = 'es';
    new Page();
    document.removeEventListener('DOMContentLoaded', handler);
}

document.addEventListener('DOMContentLoaded', handler);
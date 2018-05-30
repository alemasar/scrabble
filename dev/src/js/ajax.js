import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/fromEvent';

export default class Ajax {
    static getUrl(url, data, xhr) {
        let config = {
            method: 'GET',
            body: data,
            mode: 'cors',
            cache: 'default'
        };


        // headers.set('Content-Type', 'application/json');

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, config);
        /*xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');*/
        xhr.responseType = 'json';
        xhr.withCredentials = true;
        /*        xhr.onload = function() {
                callback(xhr.response);
            };*/

        xhr.onerror = function () {
            console.log("An error has ocurred");
        };

        xhr.send();
        return Observable.create((observer) => {
            xhr.onreadystatechange = function () {
                if (xhr.responseType && xhr.responseType === 'json') {
                    xhr.readyState > 3 && observer.next(xhr.response);
                } else {
                    xhr.readyState > 3 && observer.next(xhr.responseText);
                }

            };
        })
    }
}
export default class Ajax{
    static getUrl(url,callback, data){
        let headers = new Headers();
        headers.set('Content-Type', 'application/json');
        let config = { 
            method: 'GET',
            body: data,
            headers: headers,
            mode: 'cors',
            cache: 'default' 
        };
        
        fetch(url,config)
        .then(function(response) {
            return response.json();
        })
        .then(function (json){
            callback(json);
        });
    }

    static getXHRUrl(url,callback, data, xhr){
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

        xhr.onreadystatechange = function () {
            if (xhr.responseType && xhr.responseType==='json' ){
                xhr.readyState > 3 && callback && callback(xhr.response, xhr);
            }else{
                xhr.readyState > 3 && callback && callback(xhr.responseText, xhr);
            }
			
		};
        
        xhr.onerror = function() {
          console.log("An error has ocurred");
        };
        
        xhr.send();
    }
}
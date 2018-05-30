import ScrabbleImage from './Slider/ScrabbleImage';
import Polyfills from './common/polyfills';
import PreloadImages from './Slider/PreloadImages';

class Scrabble{
	constructor(config){
		this.config = config;

		new Polyfills();

		this.protos = new Map();
		this.protos.set('config', config);
		this.protos.set('scrabble', new ScrabbleImage(config));
		this.protos.set('preload', new PreloadImages(config.images));
	
	
		this.s = new Proxy(this.protos, this.handler());
		document.addEventListener("scrabble-images-loaded", this.s.imagesLoaded);
		this.s.initImages();


	}
	
    getProxyThis () {
        const overrides = {};

        return {
            get: (target, propKey, receiver) => {
                const keys = Array.from(this.protos.keys());
                if (this.protos.has(propKey)) {

                    return new Proxy(this, this.getProxy());
                }


                return false;
            }
        }
    }

	handler () {
        const overrides = {};

        return {
            get: (target, propKey, receiver) => {
                const keys = Array.from(this.protos.keys());
                let searchedProto = {}
                keys.forEach((key) => {
                    const prototype = [overrides].
                        concat(this.protos.get(key)).
                        find((proto) => propKey in proto);

                    if (prototype) {
                        searchedProto = prototype;
                    }
                }, this)

                if (searchedProto) {

					if (propKey==='config'){
						return this[propKey];
					}
					const ref = (params) => {
						console.log(searchedProto[propKey])
                        return searchedProto[propKey].call(this.s, params);
                    }

                    return ref;
                }

                return false;
            }
        }
    }
}


document.addEventListener("DOMContentLoaded", ()=>{
	const config = {
		class: "scrabble-wrap",
		slider:{
			timeline:{
				class: "sequence-images-controls-timeline"
			},
			pointer: {
				class: "sequence-images-controls-slider"
			}
		},
		images:{
			prefix: "jerez_preview",
			extension: "jpg",
			numImages: 43,
			class: "sequence-images-landscape-container",
			wrapper: "sequence-images-landscape-wrap",
			pictureContainer: "sequence-images__scrabble",
			showClass: "sequence-images__picture--hide",
		}
	}
	const s = new Scrabble(config);
})

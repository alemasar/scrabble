import ScrabbleImage from './Slider/ScrabbleImage';
import Slider from './Slider/Slider';
import Polyfills from './common/polyfills';
import PreloadImages from './Slider/PreloadImages';

new Polyfills();
class Scrabble{
	constructor(config){
		this.config = config;

		this.protos = new Map();
		this.protos.set('config', config);
		this.protos.set('scrabble', new ScrabbleImage(config));
		this.protos.set('preload', new PreloadImages(config.images));
		this.protos.set('slider', new Slider(config));
	
	
		this.s = new Proxy(this.protos, this.handler());
		document.addEventListener("scrabble-images-loaded", (e) => {
			this.s.imagesLoaded(e)
			this.s.initSlider()
		});
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
				// console.info("Executing: ",propKey)
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
						console.info("Executing: ",propKey);
						console.info("Executing in : ",searchedProto.constructor.name);
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
		obj: {},
		images: [],
		slider:{
			timeline:{
				class: "sequence-images-controls-timeline"
			},
			pointer: {
				class: "sequence-images-controls-slider"
			}
		},
		clip:{
			container: "sequence-images-landscape-clip",
			previous: "sequence-images-landscape-prev",
			active: "sequence-images-landscape-active",
			next: "sequence-images-landscape-next"
		},
		imageConfig:{
			prefix: "jerez_preview",
			extension: "jpg",
			numImages: 43,
			class: "sequence-images-landscape-container",
			wrapper: "sequence-images-landscape-wrap",
			pictureContainer: "sequence-images__scrabble",
			showClass: "sequence-images__picture--hide",
		}
	}
	const wrappers = Array.from(document.querySelectorAll("."+config.class));
	wrappers.forEach((obj) => {
		config.obj = obj;
		const s = new Scrabble(config);
	})
})

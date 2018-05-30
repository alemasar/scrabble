import ScrabbleImage from './Slider/ScrabbleImage';
import Polyfills from './common/polyfills';
import PreloadImages from './Slider/PreloadImages';

class Scrabble{
	constructor(config){
		this.config = config;
		this.images = [];
		new Polyfills();

		document.addEventListener("scrabble-images-loaded", (e) => {
			console.log("Entro");

			const objs=Array.from(document.querySelectorAll("."+config.class));

			objs.forEach((obj)=> {
				const si = new ScrabbleImage(obj, config);
			});			
		})
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

	const handler = {
		get: function(target, name){
			console.log(target)
			if (name === 'initImage'){

			}
			return Reflect[name]
		}
	};
	const s = new Scrabble(config);
	const p = new Proxy(s, handler);
	const pi = new PreloadImages(config.images, p)
	pi.initImages();	
})

import Utils from '../common/utils';

const images = [];
export default class PreloadImages {
	constructor (config, handler) {
		console.log(config)

	}

	initImages() {
		for (let i = 1;i <= this.config.images.numImages; i++){
			const image = new Image();
			const num = `00${i}`;
			image.src="images/"+this.config.images.prefix+num.slice(-2)+"."+this.config.images.extension;

			image.onload=(e) =>{
				console.log(e.target)
				const img = e.target;
				
//				const contImage = Array.from()
console.log(img)
				this.initImage(img);
			}
		}
	}

	initImage(image){
		console.log(image)
		images.push(image);
		if (images.length === this.config.images.numImages){
			console.log("Totes carregades")
			console.log(images.length)
			Utils.triggerEvent("scrabble-images-loaded", { images })
		}
	}
}
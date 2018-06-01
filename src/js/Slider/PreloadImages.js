import Utils from '../common/utils';

const images = [];
export default class PreloadImages {
	constructor (config, handler) {
		console.log(config)

	}

	initImages() {
		for (let i = 1;i <= this.config.imageConfig.numImages; i++){
			const image = new Image();
			const num = `00${i}`;
			image.src="images/"+this.config.imageConfig.prefix+num.slice(-2)+"."+this.config.imageConfig.extension;
			image.onload=(e) =>{
				const img = e.target;
				this.initImage(img);
				if (i===1){
					console.log("entro")
					this.showImage(0)
				}
			}
		}
	}

	initImage(image){
		this.config.images.push(image);
		if (this.config.images.length === this.config.imageConfig.numImages){
			console.log("Totes carregades")
			Utils.triggerEvent("scrabble-images-loaded", { images })
		}
	}
}
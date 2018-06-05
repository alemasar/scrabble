import Utils from '../common/utils';

const images = [];
export default class PreloadImages {
	constructor (config, handler) {
		console.log(config)

	}

	initImages() {
		const container = this.config.obj.querySelector("."+this.config.clip.container);
		// const previous = container.querySelector("."+this.config.clip.previous);
		const active = container.querySelector("."+this.config.clip.active);
		const img = document.createElement("IMG");
		active.appendChild(img)

		for (let i = 1;i <= this.config.imageConfig.numImages; i++){
			const image = new Image();
			const num = `00${i}`;
			image.src="images/"+this.config.imageConfig.prefix+num.slice(-2)+"."+this.config.imageConfig.extension;
			image.onload=(e) =>{
				const img = e.target;
				this.initImage(img);
				if (i===1){
					console.log("entro")
					this.showImage(1)
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
import Utils from '../common/utils';
export default class PreloadImages {
	constructor (config, handler) {
		console.log(config)
	}

	initImages() {
		for (let i = 1;i <= config.numImages; i++){
			const image = new Image();
			const num = `00${i}`;
			image.src="images/"+config.prefix+num.slice(-2)+"."+config.extension;
			image.onload=(e) =>{
				Utils.addClass(image, "image-ready");
//				const contImage = Array.from()
console.log(handler)
				handler.initImage();
			}
		}
	}
}
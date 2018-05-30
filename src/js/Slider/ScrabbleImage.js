import Slider from './Slider';
import Utils from '../common/utils';

export default class ScrabbleImage{
	constructor (obj, config) {
		this.timelineWidth = 0;
		this.step = 0;
		this.images=[];
		
		let contImage = 0;
		let heightContainer = 0;
	}
	imagesLoaded(e) {
		console.log(e.detail.images);
		const images = e.detail.images;
		const objs=Array.from(document.querySelectorAll("."+this.config.class));

		objs.forEach((obj)=> {
			images.forEach((image) => {
				console.log(image)
				this.addImage({obj, image})
			})
		});
	}
	addImage(obj){
		console.log(obj.image)
		const containerDiv=document.createElement("DIV");
		containerDiv.className = this.config.images.class;
	
		const containerPic = document.createElement("PICTURE");
		containerPic.className = this.config.images.pictureContainer;
		containerDiv.appendChild(containerPic)
	
		containerPic.appendChild(obj.image);
		obj.obj.querySelector("."+this.config.images.wrapper).appendChild(containerDiv);
		
	}

	initSlider (obj, config, step) {

		const p = new Slider({
			wrapper: obj,
			pointer: config.slider.pointer,
			showClass: config.images.showClass,
			timeline: config.slider.timeline,
			handler: this.moveSliderButton,
			step: step,
			images: this.images
		})
	}

	moveSliderButton (e) {
		const pos = e.pageX - parseInt(this.pointer.offsetWidth/2);
		if (pos>0 && (pos+this.pointer.offsetWidth)<this.timelineWidth){
			const which = Math.floor(pos/this.step);
			console.log(which)
			/*if (which !== this.showImage){
				this.showImage(this.images, this.images[which]);
			}*/
			Utils.removeClass(this.images[which], this.config.showClass);
			console.log(this.images[this.showImage])
			Utils.addClass(this.images[this.showImage], this.config.showClass);
			this.showImage = which;
			this.pointer.style.left = pos +"px";
		}

		if (!Utils.hasClass(e.target, 'move')){
			Utils.addClass(e.target, 'move');
			e.target.addEventListener("transitionend", (e)=>{
				Utils.removeClass(this.pointer, 'move');
			})
		} else {
			Utils.removeClass(this.pointer, 'move');
		}
	}

}

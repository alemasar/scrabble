import Utils from '../common/utils';
let pointer;
let step;
let images;
let showImage;
let config;
let timelineWidth;

export default class Slider{
	constructor (config) {
	}

	initSlider(){
		console.log("----------------------------- initSlider --------------------------------------")
		pointer = this.config.obj.querySelector("."+this.config.slider.pointer.class);
		const timeline = this.config.obj.querySelector("."+this.config.slider.timeline.class);
		timelineWidth = timeline.offsetWidth;
		step = 1
		images = this.config.images;
		showImage = 0;

		const ref = (e) => {
			this.moveElement(e)
		}
		console.log(pointer)
		pointer.addEventListener("mousedown", (e)=>{
			e.preventDefault();
			document.addEventListener("mousemove", ref)
		})
		document.addEventListener("mouseup", (e)=>{
			e.preventDefault()
			document.removeEventListener("mousemove", ref, false)
		})
	}
	
	moveElement (e) {

		const pos = e.pageX - parseInt(pointer.offsetWidth/2);
		console.log(pos)
		if (pos>0 && (pos+pointer.offsetWidth)<timelineWidth){
			const which = Math.floor(pos/step);
			this.showImage(which);
			/*if (which !== this.showImage){
				this.showImage(this.images, this.images[which]);
			}*/
			/*Utils.removeClass(this.images[which], this.config.showClass);
			console.log(this.images[showImage])
			Utils.addClass(this.images[showImage], this.config.showClass);*/
			// showImage = which;
			console.log(pointer)
			pointer.style.left = pos +"px";
		}

		if (!Utils.hasClass(pointer, 'move')){
			Utils.addClass(pointer, 'move');
			pointer.addEventListener("transitionend", (e)=>{
				Utils.removeClass(pointer, 'move');
			})
		} else {
			Utils.removeClass(pointer, 'move');
		}
	}

	showImage(which){
		const container = this.config.obj.querySelector("."+this.config.clip.container);
		const previous = container.querySelector("."+this.config.clip.previous);
		const active = container.querySelector("."+this.config.clip.active);
		const next = container.querySelector("."+this.config.clip.next);
console.log(which)
		if (which>0){
			if (previous.firstChild){
				previous.removeChild(previous.firstChild);
			}
			previous.appendChild(this.config.images[which-1]);
		}
		if (which<this.config.images.length-2){
			if (next.firstChild){
				next.removeChild(next.firstChild);
			}
			next.appendChild(this.config.images[which+1]);
		}
		console.log(which)
		if (active.firstChild){
			active.removeChild(active.firstChild);
		}
		active.appendChild(this.config.images[which]);
		/*const showedImages = Array.from(this.config.wrapper.querySelectorAll("."+this.config.showClass));
		showedImages.forEach((img)=>{
			Utils.addClass(img, this.config.showClass);
		});
		Utils.addClass(which, this.config.showClass);*/
	}
}
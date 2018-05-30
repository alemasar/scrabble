import Utils from '../common/utils';

export default class Slider{
	constructor (config) {
		this.config = config;
		this.pointer = config.wrapper.querySelector("."+config.pointer.class);
		const timeline = config.wrapper.querySelector("."+config.timeline.class);
		this.timelineWidth = timeline.offsetWidth;
		this.step = config.step;
		this.images = config.images;
		this.showImage = 0;
		const moveElement = config.handler.bind(this);

		this.pointer.addEventListener("mousedown", (e)=>{
			e.preventDefault();
			document.addEventListener("mousemove", moveElement)
		})
		document.addEventListener("mouseup", (e)=>{
			e.preventDefault()
			document.removeEventListener("mousemove", moveElement, false)
		})

	}
	showImage(images, which){
		const showedImages = Array.from(this.config.wrapper.querySelectorAll("."+this.config.showClass));
		showedImages.forEach((img)=>{
			Utils.addClass(img, this.config.showClass);
		});
		Utils.addClass(which, this.config.showClass);
	}
}
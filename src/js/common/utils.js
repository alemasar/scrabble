export default class Utils{
	static addClass (el, classe) {
		if (el.classList) {
			el.classList.add(classe);
		} else {
			el.className += " " + classe;
		}
	}
	
	static hasClass(el, className) {

		let returnValue = false;
		if (el) {
			if (el.classList) {
				returnValue = el.classList.contains(className);
			} else {
				returnValue = new RegExp("(^| )" + className + "( |$)", "gi").test(el.className);
			}
		}
		return returnValue;
	}

	static removeClass(el, classe) {
		if (el.classList) {
			el.classList.remove(classe);
		}
		else {
			el.className = el.classe.replace(new RegExp("(^|\\b)" + classe.split(" ").join("|") + "(\\b|$)", "gi"), " ");
		}
	}
	
	static triggerEvent(which, detail){
        let event;
        if (document.createEvent) {
            event = document.createEvent('CustomEvent');
            event.initCustomEvent(which, true, true, detail);
        } else {
            event = new CustomEvent(which, { detail: detail });
        }
        document.dispatchEvent(event);
    }
}
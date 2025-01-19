import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class CursorHover extends Component {
	constructor(owner, args) {
		super(owner, args);
		this.imagePath = args.imagePath;
		this.alt = args.alt;
		this.mouseX = window.innerWidth / 4;
		this.mouseY = window.innerHeight / 2;
		this.clientY = this.mouseY;
	}
	@action notifyReady() {
		this.initRender();
	}
	initRender() {
		const elementsWithCursorEffect = document.querySelectorAll('.special-cursor');
		const circleCursor = document.getElementById("circle-hover");
		if (circleCursor) {
			document.addEventListener('mousemove', function (e) {
				if (circleCursor) {
					circleCursor.style.left = `${e.pageX - 35}px`;
					circleCursor.style.top = `${e.pageY - 35}px`;
				}
			});
		}

		if (elementsWithCursorEffect) {
			elementsWithCursorEffect.forEach(function (element) {
				element.addEventListener('mouseenter', function () {
					circleCursor.style.display = 'block';
				});

				element.addEventListener('mouseleave', function () {
					circleCursor.style.display = 'none';
				});
			});
		}
	}
}
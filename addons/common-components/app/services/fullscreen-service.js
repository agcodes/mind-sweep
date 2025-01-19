import Service from '@ember/service';

export default class FullScreenService extends Service {
	fn = null;
	elementID = '';
	document = null;
	isCommonjs = null;
	keyboardAllowed = null;
	isEnabled = false;
	fullScreenRequestHandler = null;
	fullScreenChangehandler = null;
	fullScreenElementId = '';
	intervalId = 0;
	elementHeight = 0;
	fullScreenStarted = false;
	waitChange = false;
	initialize() {
		this.waitChange = false;
		this.document = typeof window === 'object' && typeof window.document === 'object' ? window.document : {};
		this.keyboardAllowed = typeof Element !== 'undefined' && 'ALLOW_KEYBOARD_INPUT' in Element;

		const fnMap = [
			[
				'requestFullscreen',
				'exitFullscreen',
				'fullscreenElement',
				'fullscreenEnabled',
				'fullscreenchange',
				'fullscreenerror'
			],
			// New WebKit
			[
				'webkitRequestFullscreen',
				'webkitExitFullscreen',
				'webkitFullscreenElement',
				'webkitFullscreenEnabled',
				'webkitfullscreenchange',
				'webkitfullscreenerror'
			],
			// Old WebKit (Safari 5.1)
			[
				'webkitRequestFullScreen',
				'webkitCancelFullScreen',
				'webkitCurrentFullScreenElement',
				'webkitCancelFullScreen',
				'webkitfullscreenchange',
				'webkitfullscreenerror'
			],
			[
				'mozRequestFullScreen',
				'mozCancelFullScreen',
				'mozFullScreenElement',
				'mozFullScreenEnabled',
				'mozfullscreenchange',
				'mozfullscreenerror'
			],
			[
				'msRequestFullscreen',
				'msExitFullscreen',
				'msFullscreenElement',
				'msFullscreenEnabled',
				'MSFullscreenChange',
				'MSFullscreenError'
			]
		];

		this.fn = {};

		for (const val of fnMap) {
			if (val && val[1] in document) {
				for (let i = 0; i < val.length; i++) {
					this.fn[fnMap[0][i]] = val[i];
				}
				break;
			}
		}

		this.eventNameMap = {
			change: this.fn.fullscreenchange,
			error: this.fn.fullscreenerror
		};

		return true;
	}
	updateEnabled() {
		this.set('isEnabled', this.isFullscreen());
	}
	trigger() {

	}
	enterFullScreen() {
		const element = (document.getElementById(this.fullScreenElementId));
		if (!this.isFullscreen()) {
			this.fullScreenStarted = false;
			this.waitChange = false;
			this.request(element);
		}
	}
	request(element) {
		if (this.fn) {
			const request = this.fn.requestFullscreen;

			element = element || document.documentElement;
	
			const rect = element.getBoundingClientRect();
			this.elementHeight = rect.height;
			this.fullScreenStarted = false;
			// Work around Safari 5.1 bug: reports support for
			// keyboard in fullscreen even though it doesn't.
			// Browser sniffing, since the alternative with
			// setTimeout is even worse.
			if (/ Version\/5\.1(?:\.\d+)? Safari\//.test(navigator.userAgent)) {
				element[request]();
			} else {
				element[request](this.keyboardAllowed ? Element.ALLOW_KEYBOARD_INPUT : {})
					.then(() => {
						this.waitChange = true;
					})
					.catch(err => {
						this.elementHeight = 0;
						this.waitChange = false;
					});
			}
		}
	}
	getFullScreenChange(newHeight) {
		if (newHeight > 0 && this.elementHeight > 0 && newHeight != this.elementHeight) {
			if (this.elementHeight > 0 && this.waitChange) {
				this.elementHeight = newHeight;
				this.waitChange = false;
				this.fullScreenStarted = true;
				return true;
			}
			if (this.waitChange == false && newHeight > 0 && this.isFullscreen() == false && this.fullScreenStarted) {
				this.fullScreenStarted = false;
				this.elementHeight = 0;
				return true;
			}
		}
		return false;
	}
	exit() {
		if (this.isFullscreen()) {
			this.elementHeight = 0;
			this.waitChange = false;
			this.document[this.fn.exitFullscreen]();
		}
	}
	willDestroy() {
		this.fullScreenStarted = false;
	}
	isFullscreen() {
		if (this.fn === null) {
			return false;
		}
		return this.document[this.fn.fullscreenElement] !== null;
	}
}

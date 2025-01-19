import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Canvas2dService from "../models/canvas2d-service";
import AnimationService from "../services/animation-service";
import ColorsService from "../services/colors-service";

export default class DrawingComponent extends Component {
	@tracked triggerCanvas = false;
	@tracked localModelID = "";
	@service actionsHandler;
	@service navigationService;
	@service router;
	colorsService = null;
	componentID = "componentID-1";
	id = "";
	classNameBindings = ["class"];
	class = "bg-black";
	indice = 0;
	intervalID = 0;
	width = 0;
	height = 0;
	marginAutoComponent = false;
	portraitMode = "window";
	heightResizeMode = "window";
	widthLimitMode = "";
	responsive = true;
	isFullScreen = false;
	fullscreenEnabled = true;
	animationOn = false;
	animationDisabled = false;
	animationAuto = true;
	withAnimation = false;
	disableAnimation = false;
	offScreen = false;
	type = 0;
	data = null;
	fps = 1;
	canvasService = null;
	canvasParams = null;
	params = null;
	newDisplay = "";
	animationService = null;
	componentActionHandler = null;
	applyActionHandler = null;
	clickCount = 0;
	indexImg = 0;
	progress = 0;
	urlCanvas = "";
	rotationY = 0;
	recording = false;
	rendering3d = false;
	initParams = null;
	savedArgs = null;
	@action actionFromCanvas(data) {
		if (data) {
			this.applyAction(data["actionName"], data);
		}
	}
	@action updateTriggerCanvas(newValue) {
		this.triggerCanvas = newValue;
	}
	@action receiveAction(data) {
		if (data) {
			this.applyAction(data["actionName"], data);
		}
	}
	@action notifyReady() {
		if (this.args != null && typeof this.args == "object" && typeof this.args.componentData == "object") {
			this.localModelID = this.args.componentData.id;
			//console.log("notifyReady", "args.modelID", this.args.componentData.id);
		}

		this.initRender();
	}
	get modelID() {
		if (this.args && this.args != null) {
			//console.log("dr component", "model id", this.args.modelID);
			if (this.args.componentData) {
				this.dataSet = this.args.componentData;
				this.localModelID = this.args.modelID;
				this.initRender();
			}
			return this.args.modelID;
		}
		return "";
	}
	get componentData() {
		return this.args.componentData;
	}
	/*
	@action handleChildAction() {
		// Handle the action from the child component
		//console.info('Action received from child component');
	}*/

	constructor(owner, args) {
		//console.log("const dr");
		//console.log(args.componentData);
		//console.log("const dr", "args.modelID", args.modelID);
		super(owner, args);
		this.dataSet = [];
		this.upParams = [];
		this.canvasParams = [];
		this.params = [];
		this.params = [];
		this.temperature = 6;
		this.savedArgs = args;
		this.colorsService = new ColorsService();

		// copy input data
		if (args.componentData) {
			this.dataSet = args.componentData;
		}

		//console.log("dr component", "args.modelID", args.modelID);
		if (args.modelID) {
			//this.modelID = args.modelID;
		}

		if (typeof args.componentID === "string") {
			this.componentID = args.componentID;
		}
		else {
			this.componentID = `componentID-${this.generateUUID()}`;
		}

		this.initParams = [];

		// copy component args
		for (const [key, value] of Object.entries(args)) {
			this.dataSet[key] = value;
			this.params[key] = value;
			this.initParams[key] = value;
		}

		this.initParams.initialized = true;

		this.setImgProperties();

		if (typeof args.portraitMode === "string") {
			this.portraitMode = args.portraitMode;
		}
		if (typeof args.widthLimitMode === "string") {
			this.widthLimitMode = args.widthLimitMode;
		}
		if (typeof args.heightResizeMode === "string") {
			this.heightResizeMode = args.heightResizeMode;
		}
		if (typeof args.marginAutoComponent === "boolean") {
			this.marginAutoComponent = args.marginAutoComponent;
		}
		if (typeof args.width === "number") {
			this.width = args.width;
		}
		if (typeof args.height === "number") {
			this.height = args.height;
		}
		if (typeof args.disableAnimation === "boolean") {
			this.disableAnimation = args.disableAnimation;
		}
		if (typeof args.animationAuto === "boolean") {
			this.animationAuto = args.animationAuto;
		}
		if (typeof args.animationDisabled === "boolean") {
			this.animationDisabled = args.animationDisabled;
		}
		if (typeof args.fullscreenEnabled === "boolean") {
			this.fullscreenEnabled = args.fullscreenEnabled;
		}

		this.canvasService = new Canvas2dService();

		// set id
		this.id = `${this.id}-${this.generateUUID()}`;

		if (this.params.longId) {
			this.uniqueID = this.cleanId(`${this.params.longId}-${new Date().toISOString()}`);
		}
		else {
			this.uniqueID = this.cleanId(new Date().toISOString());
		}

		this.canvasParams = {
			id: this.id,
			checksum: this.id,
			idElementCanvas: `${this.generateUUID()}-${this.id}-${this.uniqueID}`,
			idElementMenu: `${this.generateUUID()}-${this.id}-${this.uniqueID}`,
			idContainerCanvas3D: this.id + this.generateUUID(),
			componentID: this.componentID,
			formId: `${this.componentID}-form-component`,
			idCanvas3D: `${this.id + this.generateUUID()}-${this.uniqueID}`,
			idParent: this.id,
			portraitMode: this.portraitMode,
			widthLimitMode: this.widthLimitMode,
			heightResizeMode: this.heightResizeMode,
			width: this.width,
			height: this.height,
			responsive: this.responsive,
			nodeName: "CANVAS",
			marginAutoComponent: this.marginAutoComponent,
			idElementCanvasOffscreen: `${this.generateUUID()}-${this.id}-offscreen`,
			idElementProcessCanvas: `${this.generateUUID()}-${this.id}-process`,
			enable3D: false,
			menuPosition: [],
			instanceId: this.generateUUID(),
			videoUrl: "toto",
			enableMenu: args.enableMenu !== false,
			styleClassCanvas: `canvas-2d ${typeof args.styleClassCanvas == "undefined" ? "" : args.styleClassCanvas}`,
			styleClassContainer: `canvas-container ${typeof args.styleClassContainer == "undefined" ? "" : args.styleClassContainer}`
		};

		this.componentActionHandler = (event) => {
			this.componentAction(event.detail.actionName, event.detail);
		};

		this.applyActionHandler = (event) => {
			this.applyAction(event.detail.actionName, event.detail);
		};

		this.handleKeys();

		//this.activateRouteChange();
	}
	activateRouteChange() {
		/*this.router.on('routeDidChange', (transition) => {
			if (transition.to.attributes) {
				if (transition.to.attributes.dataSet) {
					this.dataSet = transition.to.attributes.dataSet;
				}
				else if (transition.to.attributes) {
					this.dataSet = transition.to.attributes;
				}
				this.newRender();
			}
		})*/
	}
	newRender() {
		if (this.canvasParams && this.canvasParams.id) {
			//console.debug("new render");
			this.params = this.dataSet;
			this.initRender();
		}
	}
	initRender() {
		//console.debug("render " + this.componentID);
		this.clear();
		if (this.canvasParams && document.getElementById(this.canvasParams.id)) {
			this.newDisplay = "";
			this.indice = 0;

			this.initComponent();

			// init listeners
			this.actionsHandler.eventTarget.addEventListener(
				`componentAction${this.componentID}`,
				this.componentActionHandler
			);

			this.actionsHandler.eventTarget.addEventListener(
				`applyAction${this.id}`,
				this.applyActionHandler
			);

			if (this.componentID !== "") {
				this.actionsHandler.componentData = this.canvasParams;
			}

			if (this.fullscreenEnabled) {
				this.navigationService.initFullScreen(this.canvasParams.idElementCanvas);
			}

			this.setImgProperties();

			if (this.params.longId) {
				this.uniqueID = this.cleanId(`${this.params.longId}-${new Date().toISOString()}`);
			}

			this.handleKeys();

			this.intervalID = 0;
			return true;
		}
		return false;
	}
	setImgProperties() {
		if (!this.params) {
			this.params = [];
		}

		this.params.imgProperties = [];
		/*
		this.params.imgProperties.Software = this.navigationService.config.SITE_TITLE;
		this.params.imgProperties.Make = this.navigationService.config.SITE_TITLE;
		this.params.imgProperties.Artist = this.navigationService.config.SITE_TITLE;
		this.params.imgProperties.ImageDescription = this.navigationService.config.SITE_TITLE;*/
	}
	updateProgressBar(progress) {
		this.navigationService.updateProgressBar(progress);
	}
	saveUrlImg() {
		if (this.canvasService) {
			this.urlCanvas = this.canvasService.getUrlJpeg(1);
			localStorage.setItem("lastUrlCanvas", this.urlCanvas);
			localStorage.setItem("urlSection", this.params.folder);
		}
	}
	displaySavedCanvas() {
		if (this.canvasService) {
			this.canvasService.urlImg = localStorage.getItem("lastUrlCanvas");
			if (this.canvasService.urlImg) {
				return this.canvasService.displaySavedCanvas(true);
			}
		}
		return false;
	}
	cleanId(id) {
		return id.replace(/[^\w-]/g, '').toLowerCase();
	}
	initComponent() {

	}
	addToDocumentTitle(str) {
	}
	willDestroy() {
		super.willDestroy(...arguments);
		this.navigationService.disableFullScreen();
		this.resizeObserver = null;
		if (this.animationService !== null) {
			this.setAnimationEnd();
			this.addMainAnimation(null);
		}

		this.clear();

		this.canvasService = null;
		this.params = null;
		this.canvasParams = null;
		this.animationService = null;
	}
	clear() {
		this.navigationService.updateProgressBar(-1);

		if (this.canvasService) {
			this.canvasService.reset();
		}
		this.actionsHandler.eventTarget.removeEventListener(
			`componentAction${this.componentID}`,
			this.componentActionHandler
		);
		this.actionsHandler.eventTarget.removeEventListener(
			`applyAction${this.id}`,
			this.applyActionHandler
		);
	}
	componentAction(actionName, data) {
		if (data.id) {
			this.upParams[data.id] = data.value;
		}

		if (data && data.parentActionName) {
			return this.applyAction(data.parentActionName, data);
		}
		if (actionName == "toggleAnimation") {
			return this.toggleAnimation();
		}
		if (actionName == "reload") {
			return this.reload();
		}
		if (actionName == "change_toggle-3d") {
			this.rendering3d = (data.value == 1);
		}
		return typeof actionName !== "undefined" && actionName !== null && typeof data == "object" && data != null;
	}
	displayGrid(color) {
		if (this.canvasService.is3DEnabled()) {
			this.canvasService.canvas3d.drawService.drawArrowHelper();
			return this.canvasService.canvas3d.drawService.drawBoxHelper();
		}

		return this.canvasService.displayGrid(color);
	}
	resetCanvas() {
		this.canvasService = new Canvas2dService();
	}
	initCanvas(bStopAnimations, b3D) {
		if (typeof bStopAnimations !== "boolean" || bStopAnimations === true) {
			this.setAnimationEnd();
		}

		this.canvasService.setParams(this.canvasParams);
		this.canvasService.clearCanvas3D();
		this.canvasService.showCanvas();
		this.setInstance();

		if (this.canvasService.initCanvas(this.id, this.canvasParams.idElementCanvas)) {
			this.canvasService.clear();
			this.canvasService.responsive = this.responsive;
			this.canvasService.isFullScreen = this.isFullScreen;
			this.canvasService.portraitMode = this.portraitMode;
			this.canvasService.heightResizeMode = this.heightResizeMode;
			this.canvasService.widthLimitMode = this.widthLimitMode;
			this.canvasService.checksum = this.canvasParams.checksum;
			this.canvasService.idElementCanvasOffscreen = this.canvasParams.idElementCanvasOffscreen;

			this.canvasService.initDimensions(this.width, this.height, [0, 0, 0, 0]);

			this.canvasService.fillCanvasParams(this.canvasParams);

			this.toggleCanvas3D(b3D === true);

			if (this.initCanvas3D()) {
			}

			if (this.fullscreenEnabled === true) {
				this.initFullScreen();
			}
			else {
				this.navigationService.disableFullScreen();
			}
			return true;
		}
		return false;
	}
	setInstance() {
		this.canvasParams.instanceId = this.generateUUID();
		this.actionsHandler.setInstance(this.canvasParams.instanceId);
	}
	toggleCanvas3D(b) {
		this.canvasParams.enable3D = b;
		return b;
	}
	disableCanvas3D() {
		if (this.canvasParams.enable3D) {
			this.canvasService.clearCanvas3D();
			this.canvasParams.enable3D = false;
		}
	}
	initCanvas3D() {
		if (this.canvasParams.enable3D) {
			if (this.canvasService.initCanvas3D(this.canvasParams)) {
				this.navigationService.initFullScreen(this.canvasParams.idParent);
				return true;
			}
			else {
				return false;
			}
		}
		return true;
	}
	handleMouseMove(callback) {
		const canvasElement = document.getElementById(
			this.canvasParams.idElementCanvas
		);
		if (canvasElement) {
			canvasElement.addEventListener("mousemove", (event) => {
				callback(event.offsetX, event.offsetY);
				event.preventDefault();
				return false;
			});
		}
	}
	handleContextMenu(callback) {
		const canvasElement = document.getElementById(this.canvasParams.idElementCanvas);
		if (canvasElement) {
			canvasElement.oncontextmenu = (event) => {
				callback(event.offsetX, event.offsetY);
				event.preventDefault();
				return false;
			};
			return true;
		}
		else {
			//console.log("element not found");
			return false;
		}
	}
	applyAction(actionName, data) {
		switch (actionName) {
			case "toggleAnimation":
				return this.toggleAnimation();
			case "reload":
				return this.reloadToOrign();
			case "downloadJpeg":
				return this.downloadJpeg();
			case "displayGrid":
				return this.displayGrid([255, 255, 255]);
			case "downloadPng":
				return this.downloadPng();
			case "setLargeCanvas":
				this.setLargeCanvas();
				return this.reload();
			case "setLongCanvas":
				this.setLongCanvas();
				return this.reload();
			case "fullScreen":
				this.navigationService.initFullScreen(this.canvasParams.idElementCanvas);
				return this.navigationService.enterFullScreen();
			case "filter":
				return this.applyFilter(data);
			case "rotation-y":
				this.rotationY = parseFloat(data.ry);
				this.canvasService.gridAdapter.rotationY = this.rotationY;
				return this.reload();
			case "displaySavedCanvas":
				return this.canvasService.displaySavedCanvas();
			case "displayFirstSavedCanvas":
				return this.canvasService.displayFirstSavedCanvas();
			case "toggleAutoRotate":
				return this.canvasService.toggleAutoRotate();
			case "toggleZoomIn":
				return this.canvasService.toggleZoomIn();
			case "startRecording":
				return this.toggleRecord();
			case "stopRecording":
				return this.toggleRecord();
			case "change_rotate3dX":
				return this.canvasService.canvas3d.rotateX(parseFloat(data.value));
			case "change_rotate3dY":
				return this.canvasService.canvas3d.rotateY(parseFloat(data.value));
			case "change_rotate3dZ":
				return this.canvasService.canvas3d.rotateZ(parseFloat(data.value));
			case "change_position3dX":
				return this.canvasService.canvas3d.setControlsPositionX(parseFloat(data.value));
			case "change_position3dY":
				return this.canvasService.canvas3d.setControlsPositionY(parseFloat(data.value));
			case "change_position3dZ":
				return this.canvasService.canvas3d.setControlsPositionY(parseFloat(data.value));
		}
		return true;
	}
	handleKeys() {
		onkeyup = (e) => {
			if (e.target.nodeName === "BODY") {
				switch (e.key) {
					case " ":
						// pause
						e.preventDefault();
						return this.toggleAnimation();
					case "f":
						return this.navigationService.enterFullScreen();
					case "ArrowRight":
						// next page
						return this.displayLinkedPage(`${this.componentID}-link-next`);
					case "ArrowLeft":
						// previous page
						return this.displayLinkedPage(`${this.componentID}-link-previous`);
					case "r":
						this.toggleRecord();
						return false;
					default:
						return true;
				}
			}
		};
	}
	displayLinkedPage(link) {
		// emulate click
		const linkElement = document.getElementById(link);
		if (linkElement) {
			linkElement.click();
		}
		return true;
	}
	execDraw() {
		this.initCanvas(true);
		return this.draw();
	}
	reload() {
		this.isFullScreen = this.navigationService.fullscreenService.isFullscreen();
		if (this.animationOn || (this.withAnimation === true && this.disableAnimation === false && this.animationAuto === true)) {
			this.initCanvas(true);
			return this.startComponentAnimation();
		} else {
			return this.execDraw();
		}
	}
	reloadToOrign() {
		this.newDisplay = "";
		this.setOriginCanvasData();
		return this.reload();
	}
	render3D() {
		return this.canvasService.canvas3d.update();
	}
	draw() {
		if (this.disableAnimation === false && this.recording && !this.canvasService.is3DEnabled()) {
			this.addImgForVideo();
		}
		// be redefined by children
		return true;
	}
	startComponentAnimation() {
		return this.startMainAnimation(this.fps);
	}
	startMainAnimation(fps_, bFirstDraw, params) {
		if (typeof fps_ !== "number") {
			fps_ = this.fps;
		}
		if (typeof bFirstDraw !== "boolean") {
			bFirstDraw = true;
		}

		this.setAnimationService();
		this.actionsHandler.toggleAnimationButton(true, this.componentID);
		return this.startAnimation(fps_, "animation", bFirstDraw, params);
	}
	startAnimation(fps_, f, bFirstDraw, params) {
		this.animationOn = true;
		return this.animationService.startAnimation(fps_, f, bFirstDraw, params);
	}
	toggleAnimation() {
		if (this.withAnimation) {
			this.setAnimationService();

			if (this.animationService.getAnimationRunning() === true) {
				// pause
				this.animationOn = false;
				this.animationService.stopAnimationRunning();
				this.actionsHandler.toggleAnimationButton(false, this.componentID);
			} else {
				return this.resumeAnimation();
			}
		}
	}
	resumeAnimation() {
		if (this.animationService != null && this.disableAnimation === false && this.animationService.getAnimationRunning() === false) {
			this.animationOn = true;
			this.actionsHandler.toggleAnimationButton(true, this.componentID);
			if (this.animationService.getAnimationEnd() === true) {
				// init animation
				return this.startComponentAnimation();
			} else {
				// resume animation
				this.canvasService.urlImgDrawComplete = "";
				this.animationService.setAnimationRunning(true);
				return true;
			}
		}
		return false;
	}
	setAnimationService() {
		if (this.animationService === null) {
			this.animationService = new AnimationService();
		}
	}
	setAnimationEnd() {
		if (this.animationService !== null) {
			this.animationService.setAnimationEnd(true);
			this.actionsHandler.toggleAnimationButton(false, this.componentID);
			this.animationOn = false;
		}
	}
	addMainAnimation(f, fps) {
		if (this.params.disableAnimation === true) {
			return false;
		}
		this.withAnimation = true;
		this.setAnimationService();
		this.animationService.functions.animation = f;
		if (typeof fps === "number") {
			this.fps = fps;
		}
		return true;
	}
	startRender3DAnimation() {
		this.setAnimationEnd();
		if (this.canvasService.is3DEnabled()) {
			this.addMainAnimation(() => {
				// function to update 3D
				return this.canvasService.canvas3d.update();
			}, 25);
			return this.startMainAnimation();
		}
		return false;
	}
	update3d() {
		return this.canvasService.canvas3d.update();
	}
	applyFilter(data) {
		this.setAnimationEnd();
		return this.canvasService.applyFilter(data, this.colorsService);
	}
	downloadJpeg() {
		this.canvasService.downloadUrlImgs(this.uniqueID);
		return this.canvasService.download("jpg", `img-${this.uniqueID}`, 1, this.params.imgProperties);
	}
	downloadPng() {
		return this.canvasService.download("png", `img-${this.uniqueID}`, 1, this.params.imgProperties);
	}
	setLargeCanvas() {
		return this.full(1);
	}
	setLongCanvas() {
		return this.displayLongCanvas(2600 / 1080);
	}
	displayLongCanvas(ratio) {
		if (this.isFullScreen) {
			return false;
		}
		this.setOriginCanvasData();
		if (this.newDisplay === "long-canvas") {
			this.newDisplay = "";
		} else {
			this.height = this.canvasService.canvasWidth * ratio;
			this.widthLimitMode = "";
			this.newDisplay = "long-canvas";
			this.portraitMode = "";
		}
		return true;
	}
	full(multiple) {
		if (this.isFullScreen) {
			return false;
		}

		this.setOriginCanvasData();

		if (this.newDisplay === "large-canvas") {
			this.newDisplay = "";
		} else if (this.canvasService.getParentWidth() * 2 > this.canvasService.getWindowWidth()) {
			this.responsive = false;
			this.width = this.canvasService.getWindowWidth() * multiple;
			this.height = this.canvasService.getWindowWidth() * multiple;
			this.widthLimitMode = "";
			this.newDisplay = "large-canvas";
		}

		// hide form
		this.actionsHandler.toggleHTMLElement(
			this.canvasParams.formId,
			this.newDisplay !== ""
		);
		return true;
	}
	getIndexColorPts(pts, method) {
		const ptsToDraw = [];
		this.canvasService.gridAdapter.incrementPtsInArrGrid(pts, 1);
		for (let i = 0, n = pts.length; i < n; i++) {
			const k = this.canvasService.gridAdapter.getValueInGrid(pts[i]);
			if (k > 0) {
				pts[i][3] = this.colorsService.getIndexColorRgb(this.dataSet.drColor, [k], [method]);
				ptsToDraw.push(pts[i]);
			}
		}
		return ptsToDraw;
	}
	drawObjectsWithAnimation(fps, objects, nb, rel) {
		if (objects === null || typeof objects !== "object") {
			return false;
		}
		this.setAnimationService();
		this.animationService.functions.drawObjects = (params) => {
			for (let index = 0; index < params.nb; index++) {
				if (typeof params.objects[params.indice] === "object") {
					this.canvasService.drawService.drawOneObject(
						params.objects[params.indice],
						params.rel
					);
				}
				params.indice += 1;
				if (params.indice > params.objects.length) {
					return false;
				}
			}
		};

		this.startAnimation(fps, "drawObjects", false, {
			indice: 0,
			nb: nb,
			objects: objects,
			rel: rel,
		});
		return true;
	}
	connectPointsWithAnimation(fps, pts, w, color, nb) {
		if (pts === null) {
			return false;
		}

		if (typeof nb !== "number") {
			nb = 1;
		}
		this.setAnimationService();
		this.animationService.functions.connectPoints = (params) => {
			for (let i = params.ind0; i < params.nb + params.ind0; i++) {
				if (
					typeof params.pts[i] === "object" &&
					typeof params.pts[i + 1] === "object"
				) {
					this.canvasService.drawService.drawLine(
						params.pts[i],
						params.pts[i + 1],
						params.pts[i][3],
						w,
						""
					);
				}
			}
			params.ind0 += params.nb;
			if (params.ind0 > params.pts.length) {
				return false;
			}
		};

		this.startAnimation(fps, "connectPoints", true, {
			nb: nb,
			w: w,
			color: color,
			ind0: 0,
			pts: pts,
		});
		return true;
	}
	// full screen
	initFullScreen() {
		this.isFullScreen = false;

		const element = document.getElementById(this.navigationService.getFullScreenElementID());
		if (element) {
			// ResizeObserver
			this.resizeObserver = new ResizeObserver(entries => {
				for (const entry of entries) {
					// track height change
					if (this.navigationService.fullscreenService.getFullScreenChange(entry.contentRect.height)) {
						if (this.navigationService.fullscreenService.fullScreenStarted) {
							this.isFullScreen = true;
							document.getElementById(this.navigationService.getFullScreenElementID()).classList.add('fullscreen');
						}
						else {
							document.getElementById(this.navigationService.getFullScreenElementID()).classList.remove('fullscreen');
						}
						this.reloadToOrign();
					}
				}
			});

			// start observe change on canvas
			this.resizeObserver.observe(element);

			this.navigationService.fullscreenService.initialize();
		}
		else {
			this.navigationService.disableFullScreen();
		}
	}
	setOriginCanvasData() {
		const form = document.getElementById(this.canvasParams.formId);
		if (form !== null) {
			form.style = "";
		}
		this.width = this.canvasParams.width;
		this.height = this.canvasParams.height;
		this.portraitMode = this.canvasParams.portraitMode;
		this.widthLimitMode = this.canvasParams.widthLimitMode;
		this.responsive = this.canvasParams.responsive;
		this.heightResizeMode = this.canvasParams.heightResizeMode;
		this.marginBottom = this.canvasParams.marginBottom;
		this.marginLeft = this.canvasParams.marginLeft;
		this.marginTop = this.canvasParams.marginTop;
		this.marginRight = this.canvasParams.marginRight;
	}
	setInputNumber(key, value, d) {
		this.actionsHandler.setInput(key, Math.floor(value * Math.pow(10, d)) / Math.pow(10, d), this.componentID);
	}
	setInput(key, value) {
		this.actionsHandler.setInput(key, value, this.componentID);
	}
	setInputs(data) {
		this.actionsHandler.setInputs(data, this.componentID);
	}
	displayLabel(name, value) {
		this.actionsHandler.displayLabel(name, value, this.componentID);
	}
	displayInputValue(name, value) {
		this.actionsHandler.displayInputValue(name, value, this.componentID);
	}
	generateUUID() {
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
			/[xy]/g,
			function (c) {
				const d = new Date().getTime(); //Timestamp
				const r = (d + Math.random() * 16) % 16 | 0;
				return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
			}
		).substring(0, 8);
	}
	debug() {
		const elemRect = document
			.getElementById("div-main-nav-bar")
			.getBoundingClientRect();

		const d = document;
		const g = d.getElementsByTagName("body")[0];
		const windowWidth = window.innerWidth || g.clientWidth;
		const windowHeight = window.innerHeight || g.clientHeight;

		const screenWidth = window.screen.width;
		const screenHeight = window.screen.height;

		const bodyRect = d.body.getBoundingClientRect();

		this.actionsHandler.displayLabel("windowWidth", windowWidth);
		this.actionsHandler.displayLabel("windowHeight", windowHeight);
		this.actionsHandler.displayLabel("screenWidth", screenWidth);
		this.actionsHandler.displayLabel("screenHeight", `${screenHeight} / ${document.documentElement.clientHeight} / ${g.clientHeight}`);
		this.actionsHandler.displayLabel("bodyRecttop", bodyRect.top);
		this.actionsHandler.displayLabel(
			"navbar",
			Math.round(elemRect.bottom)
		);
		if (this.canvasService) {
			const canvasRect =
				this.canvasService.canvasElement.getBoundingClientRect();
			this.actionsHandler.displayLabel(
				"canvasWidth",
				this.canvasService.canvasWidth
			);
			this.actionsHandler.displayLabel(
				"canvasHeight",
				this.canvasService.canvasHeight
			);
			this.actionsHandler.displayLabel("canvasTop", canvasRect.top);
		}
	}
	getElementMenuId(id) {
		return `${this.canvasParams.idElementMenu}-${id}`;
	}
	/*VIDEO*/
	startRecord() {
		this.recording = !this.recording;
		this.canvasParams.action = "init_record";
		this.updateTriggerCanvas(true);
		return true;
	}
	toggleRecord() {
		if (this.withAnimation === true || this.canvasService.is3DEnabled()) {
			if (this.canvasService.is3DEnabled() == false && this.recording) {
				this.setAnimationEnd();
				this.canvasService.clear();
			}
			else {
				this.resumeAnimation();
			}
			this.toggleVideo();
		}
	}
	toggleVideo() {
		this.recording = !this.recording;
		this.canvasParams.action = "start_video";
		this.updateTriggerCanvas(true);
		return true;
	}
	addImgForVideo() {
		this.canvasParams.action = "add_img";
		this.updateTriggerCanvas(true);
	}
}

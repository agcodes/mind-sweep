import Component from '@glimmer/component';
import { inject as service } from "@ember/service";
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Canvas2dService from '../models/canvas2d-service';

export default class CanvasC extends Component {
	clickCount = 0;
	canvasParams = null;
	canvasService = null;
	videoReadyHandler = null;
	@tracked videoUrl;
	@tracked videoDownloadUrl;
	@tracked recordingInfo;
	@service actionsHandler;
	@tracked showMenu = false;
	constructor(owner, args) {
		super(owner, args);
		this.videoUrl = "";
		this.recordingInfo = "";
		this.canvasParams = args.canvasParams;
		this.videoReadyHandler = (event) => {
			this.handleVideoReady(event);
		};
		this.canvasService = new Canvas2dService();
	}
	willDestroy() {
		super.willDestroy(...arguments);
		if (this.canvasService) {
			this.canvasService.clearRecorder();
			this.canvasService = null;
		}
	}
	get triggerCanvas() {
		// update from parent
		if (this.canvasService.canvasElement == null) {
			this.initCanvas();
		}
		if (this.canvasParams.action == "init_record") {
			this.canvasService.initRecord(this.videoReadyHandler, this.canvasParams.id);
			this.startVideo();
		}
		else if (this.canvasParams.action == "start_video") {
			this.startVideo();
		}
		else if (this.canvasParams.action == "add_img" && !this.canvasParams.enable3D) {
			this.addImgForVideo();
		}
		return this.args.triggerCanvas;
	}
	@action actionFromMenu(data) {
		if (data) {
			if (data.actionName == "hideMenu") {
				this.hideMenu();
			}
			else {
				this.args.actionToComponent(data);
			}
		}
	}
	@action changeCanvasData(data) {
		this.canvasParams = data;
	}
	@action handleClick(event) {
		if (event.target !== null && event.target.nodeName === this.canvasParams.nodeName && !this.isFullScreen && this.canvasParams.enableMenu) {
			// click on canvas
			this.clickCount++;
			if (this.clickCount === 1) {
				this.updateShowMenu(false);
			}
			else if (this.clickCount === 2) {
				this.clickCount = 0;
				const x = event.offsetX;
				const y = event.offsetY;

				this.canvasParams.newData = true;
				this.canvasParams.openMenu = true;
				this.canvasParams.menuPosition = [(x - 20), (y - 50)];

				this.changeCanvasData(this.canvasParams);
				this.updateShowMenu(true);

				event.preventDefault();
				return false;
			}
		}
	}
	@action updateShowMenu(newValue) {
		// update for child component (canvas-menu)
		this.showMenu = newValue;
	}
	hideMenu() {
		this.clickCount = 0;
		this.updateShowMenu(false);
	}
	openMenu() {
		this.updateShowMenu(true);
	}
	initCanvas() {
		this.canvasService.setParams(this.canvasParams);
		this.canvasService.idElementCanvas = this.canvasParams.idElementCanvas;
		this.canvasService.drawingWidth = this.canvasParams.drawingWidth;
		this.canvasService.drawingHeight = this.canvasParams.drawingHeight;
		this.canvasService.setCanvasElement(this.canvasParams.idElementCanvas);
		this.canvasService.setContext();
	}
	startVideo() {
		if (this.canvasService.isRecorderActive()) {
			this.updateRecordingInfo("[...]");
		}
		else {
			this.updateRecordingInfo("[REC]");
			if (this.canvasParams.enable3D) {
				this.canvasService.setCanvas3D(this.canvasParams);
			}
		}
		this.canvasService.toggleVideo(this.videoReadyHandler, this.canvasParams.id);
	}
	@action updateVideoUrl(value) {
		this.videoUrl = value;
	}
	@action updateRecordingInfo(value) {
		this.recordingInfo = value;
	}
	@action updateVideoDownloadUrl(value) {
		this.videoUrl = value;
	}
	setVideoListener() {
		return this.canvasService.setVideoListener(this.videoReadyHandler, this.canvasParams.id);
	}
	handleVideoReady(event) {
		if (event.detail.videoUrl !== "") {
			this.updateVideoUrl(event.detail.videoUrl);
			this.updateRecordingInfo("Ready");
		}
	}
	addImgForVideo() {
		// save img
		this.canvasService.addUrlImg();
	}
}

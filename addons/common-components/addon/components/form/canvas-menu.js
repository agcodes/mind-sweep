import { action } from '@ember/object';
import FormComponent from './form-component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from "@ember/service";

export default class CanvasMenu extends FormComponent {
	itemID = "";
	itemData = null;
	actionOk = false;
	idInstance = "";
	canvasParams = {};
	@service actionsHandler;
	@tracked menuFor3D = false;
	@tracked menuFor2D = true;
	@tracked showCancel = false;
	@tracked showCancel2 = false;
	menuElement = null;
	constructor(owner, args) {
		super(owner, args);
		this.canvasParams = args.canvasParams;
		if (this.canvasParams) {
			// set id
			this.id = this.canvasParams.idElementMenu;

			this.componentActionHandler = (event) => {
				this.componentAction(event.detail.actionName, event.detail);
			};

			this.actionsHandler.eventTarget.addEventListener(
				`componentAction${this.id}`,
				this.componentActionHandler
			);
		}
	}
	get showMenu() {
		// update from parent
		if (this.canvasParams) {
			this.menuElement = document.getElementById(this.args.canvasParams.idElementMenu);
			if (this.args.showMenu === true) {
				// show menu
				this.menuFor3D = this.canvasParams.enable3D;
				this.menuFor2D = this.menuFor3D === false;
				if (this.menuElement != null) {
					if (this.actionsHandler.idInstance !== this.canvasParams.instanceId) {
						this.hideCancelButtons();
					}
					this.menuElement.style.top = `${this.args.canvasParams.menuPosition[1]}px`;
					this.menuElement.style.left = `${this.args.canvasParams.menuPosition[0]}px`;
				}
			}
			return this.args.showMenu;
		}
		return false;
	}
	get newData() {
		return this.args.newData;
	}
	componentAction(actionName, data) {
		this.actionsHandler.displayLabel(data.id, data.value, this.id);
		this.args.actionToCanvas(data);
	}
	@action handleAction() {
		// Invoke the callback function to send the action to the parent component
		this.args.onAction();
	}
	@action hideMenuAction() {
		this.hideMenu();
	}
	@action menuToComponentAction(value, e) {
		if (this.itemData !== null) {
			// hide input
			this.actionsHandler.toggleHTMLElement(this.getElementId(this.itemData.optionElementId), true);
			this.itemData = null;
		}

		this.itemID = "";

		const itemData = this.actionsHandler.handleDataSet(e.target.dataset);
		if (itemData.hideCancelButtons === "1") {
			this.hideCancelButtons();
		} else {
			this.displayCancelButtons();
		}

		if (itemData.closeMenu === "1") {
			this.hideMenu();
		}
		if (this.args.actionToCanvas(itemData) === false) {
			this.hideMenu();
		}
	}
	@action selectAction(value, e) {
		if (this.itemData) {
			this.actionsHandler.toggleHTMLElement(this.getElementId(this.itemData.optionElementId), true);
		}

		this.itemData = this.actionsHandler.handleDataSet(e.target.dataset);

		if (this.itemData.id === this.itemID) {
			this.actionsHandler.toggleHTMLElement(this.getElementId(this.itemData.optionElementId), true);
			this.itemID = "";
			this.itemData = null;
			return false;
		}

		if (typeof this.itemData.optionElementId === "string") {
			// show input
			this.actionsHandler.toggleHTMLElement(this.getElementId(this.itemData.optionElementId));
			if (typeof this.itemData.inputId === "string") {
				this.actionsHandler.displayLabel(this.getElementId(this.itemData.inputId), this.itemData.label)
				this.actionsHandler.displayInputValue(this.getElementId(this.itemData.inputId), this.itemData[this.itemData.inputName]);
			}

		}
		this.itemID = this.itemData.id;
		return true;
	}
	@action applySelectedAction() {
		if (this.itemData) {
			if (typeof this.itemData.inputId === "string" && typeof this.itemData.inputName === "string") {
				const inputElement = document.getElementById(this.getElementId(this.itemData.inputId));
				if (inputElement !== null && inputElement.value !== "") {
					// set input value
					this.itemData[this.itemData.inputName] = inputElement.value;
				}
			}
			this.displayCancelButtons();

			if (this.args.actionToCanvas(this.itemData) === false) {
				this.hideMenu();
			}
		}
	}
	@action changeValue(value, e) {
		const itemData = this.actionsHandler.handleDataSet(e.target.dataset);

		const inputId = itemData.inputId;
		const inputName = itemData.inputName;

		if (typeof inputId === "string" && typeof inputName === "string") {
			const inputElement = document.getElementById(inputId);
			if (inputElement !== null && inputElement.value !== "") {
				// set input value
				itemData[inputName] = (inputElement.value);
			}
		}
		this.args.actionToCanvas(itemData);
	}
	displayCancelButtons() {
		// show
		this.showCancel = true;
		if (this.actionOk) {
			this.showCancel2 = true;
		}
		this.actionOk = true;
	}
	hideCancelButtons() {
		// hide
		this.showCancel = false;
		this.showCancel2 = false;
		this.actionOk = false;
	}
	getElementId(id) {
		return `${this.canvasParams.idElementMenu}-${id}`;
	}
	hideMenu() {
		this.args.actionToCanvas({
			actionName: "hideMenu"
		});
	}
	hideAllMenus() {
		const elements = document.getElementsByClassName("canvas-menu");
		if (elements !== null) {
			for (let j = 0; j < elements.length; j++) {
				this.actionsHandler.setHtmlElementVisibility(elements[j].id, false);
			}
		}
	}
}

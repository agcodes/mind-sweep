import FormComponent from './form-component';
import {action} from '@ember/object';
import {tracked} from '@glimmer/tracking';

export default class TabbedForm extends FormComponent {
	@tracked openMenuA = true;
	@tracked openMenuB = false;
	@tracked openMenuC = false;
	@tracked openMenuD = false;
	constructor(owner, args) {
		super(owner, args);
		this.openMenuA = true;
	}
	@action tabbedAction(eValue, e) {
		const data = this.actionsHandler.handleDataSet(e.target.dataset);
		if (typeof data.actionName === "string") {
			switch (data.actionName) {
				case "menuA":
					this.menuA();
					break;
				case "menuB":
					this.menuB();
					break;
				case "menuC":
					this.menuC();
					break;
				case "menuD":
					this.menuD();
					break;
			}
		}
	}
	menuA() {
		this.openMenuA = (this.openMenuA) ? false : true;
		this.openMenuB = false;
		this.openMenuC = false; 
		this.openMenuD = false;
	}
	menuB() {
		this.openMenuB = (this.openMenuB) ? false : true;
		this.openMenuA = false;
		this.openMenuC = false;
		this.openMenuD = false;
	}
	menuC() {
		this.openMenuC = (this.openMenuC) ? false : true;
		this.openMenuB = false;
		if (this.openMenuA) {
			this.openMenuA = false;
		} else if (this.openMenuD) {
			this.openMenuD = false;
		}
	}
	menuD() {
		this.openMenuD = (this.openMenuD) ? false : true;
		this.openMenuA = false;
		this.openMenuB = false;
		this.openMenuC = false;
	}
}
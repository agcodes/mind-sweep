import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FormComponent extends Component {
	@service actionsHandler;
	@service router;
	class = "";
	id = "";
	componentLabelID = "";
	@tracked componentData = null;
	constructor(owner, args) {
		super(owner, args);
		this.componentData = [];
		if (args.componentData) {
			this.componentData = args.componentData;
		}
		this.actionsHandler.activeForm = true;
		this.componentID = args.componentID;
		if (typeof this.componentID !== "string") {
			this.componentID = "componentID-1";
		}
		this.id = `${this.componentID}-form-component`;
		this.componentLabelID = `${this.componentID}-span-label-`;
		this.activateRouteChange();
	}
	activateRouteChange() {
		this.router.on('routeDidChange', (transition) => {
			if (transition.to.attributes) {
				this.componentData = transition.to.attributes;
			}
		});
	}
	@action componentChangeInputValue(eValue, e) {
		if (e.target && e.type && e.target.id) {
			const data = this.actionsHandler.handleDataSet(e.target.dataset);
			const id = data['id'];
			this.actionsHandler.displayLabel(id, parseFloat(e.target.value), this.componentID);
			this.actionsHandler.componentEventAction(e, e.target.value, this.componentID);
		}
	}
	@action restartAnimation() {
		this.actionsHandler.componentDataAction({
			"parentActionName": "reload"
		}, this.componentID);
	}
	@action startAnimation() {
		this.actionsHandler.componentDataAction({
			"parentActionName": "toggleAnimation"
		}, this.componentID);
	}
	@action componentExecAction(eValue, e) {
		this.actionsHandler.componentEventAction(e, "", this.componentID);
	}
	@action formAction(eValue, e) {
		const data = this.actionsHandler.handleDataSet(e.target.dataset);
		if (typeof data.actionName === "string") {
			switch (data.actionName) {
				case "menuA":
					break;
			}
		}
	}
}

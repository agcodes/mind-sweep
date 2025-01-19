import Component from '@glimmer/component';
import { inject as service } from "@ember/service";
import { tracked } from '@glimmer/tracking';

export default class ViewComponent extends Component {
	@service modelNotifierService;
	@service router;
	@tracked title = "";
	constructor(owner, args) {
		super(owner, args);
		this.model = args.model;
		if (this.model && this.model.title) {
			this.title = this.model.title;
		}
	}
	get currentModelID() {
		//console.log("model id", this.modelNotifierService.modelID);
		return this.modelNotifierService.modelID;
	}
	get componentData() {
		//console.log("dataSet", this.modelNotifierService.dataSet);
		return this.modelNotifierService.dataSet;
	}
}
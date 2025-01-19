import Route from '@ember/routing/route';
import DataService from 'univers-app-components/services/data-service';
import { inject as service } from "@ember/service";

export default class ViewRoute extends Route {
	@service modelNotifierService;
	async getModel(folder, params, route, isIndex, listRoute) {
		const result = await new DataService().getModel(folder, params, route, isIndex, listRoute);
		this.modelNotifierService.modelID = typeof result.dataSet.id !== "undefined" ? result.dataSet.id : result.id;
		this.modelNotifierService.dataSet = typeof result.dataSet.id !== "undefined" ? result.dataSet : result;
		return result;
	}
	isDef(dataSet) {
		return typeof dataSet !== "undefined" && dataSet !== null;
	}
	cleanModel() { }
	setModel() { }
};

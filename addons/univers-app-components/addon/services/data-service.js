//import ColorsService from "addon-canvas/services/colors-service";

export default class DataService {
	getPromiseModel(folder, params, route, isIndex = false, listRoute = null) {
		return new Promise((resolve, reject) => {
			try {
				this.getModel(folder, params, route, isIndex, listRoute)
					.then(model => {
						if (model && model.ok) {
							resolve(model);
						} else {
							reject(new Error("Failed to retrieve a valid model"));
						}
					})
					.catch(error => {
						reject(error);
					});
			} catch (error) {
				reject(error);
			}
		});
	}
	getModel(folder, params, route, isIndex, listRoute) {
		let id = '0';
		let p = "1";
		let num = 0;

		if (isIndex !== true && typeof params === 'object' && typeof params.id === 'string') {
			id = params.id;
			num = id;
			//console.log("data service", "id", id);
			if (id !== "index") {
				// p-id
				let n = id.indexOf("-");
				if (n > 0) {
					p = id.substring(0, n);
					num = id.substring(n + 1);
					//console.log("data service", "p", p, "num", num);
					if (typeof p !== "string" || p === "") {
						p = "1";
					}
				}
			}

		} else if (typeof params === 'object' && typeof params.level1 === 'string' && typeof params.level2 === 'string') {
			// level1/level2/level3
			if (params.level2 === "") {
				return null;
			}
			if (typeof params.level3 !== 'string' || params.level3 === "") {
				params.level3 = "index";
			}

			p = `${params.level1}-${params.level2}`;
			num = `${params.level1}-${params.level2}-${params.level3}`;
			id = num;
		} else if (typeof params === 'object' && params.p && isIndex === true) {
			// p
			p = params.p;
			num = params.p;
		} else if (isIndex === false) {
			return null;
		}

		const props = [];

		if (folder == "") {
			return null;
		}

		try {
			const modelUrl = `/api/${folder}/data-${p}.json `;
			return fetch(modelUrl)
				.then(response => {
					if (!response.ok) {
						console.error("Network response was not ok");
						throw new Error('Network response was not ok');
					}
					return response.json();
				})
				.then(model => {
					this.cleanModel(model, props);
					if (model) {
						model.modelUrl = modelUrl;
						model.id = num;
						model.p = p;
						model.folder = folder;
						model.route = route;
						model.listRoute = listRoute;
						model.params = params;
						model.routeParams = params;
						model.date = new Date().toISOString();
						model.dataSet = this.consumeModel(model, params, id);
						model.dataSet.folder = folder;
						model.dataSet.route = route;
						model.dataSet.route = route;
						model.dataSet.routeParams = params;
						model.dataSet.longId = `${folder.toLowerCase()}-${id.toLowerCase()}`;
						model.ok = model.dataSet && model.dataSet.ok === true;
						this.setModel(model);

						//this.colorsService = new ColorsService();

						/*
						for (let index = 0; index < model.dataSets.length; index++) {
							if (model.dataSets[index].drColor) {
								//model.dataSets[index].drColor = this.colorsService.rgbToHsl(model.dataSets[index].drColor);
							}
							if (model.dataSets[index].bgColor) {
								//model.dataSets[index].bgColor = this.colorsService.rgbToHsl(model.dataSets[index].bgColor);
							}
							if (model.dataSets[index].innerColor) {
								//model.dataSets[index].innerColor = this.colorsService.rgbToHsl(model.dataSets[index].innerColor);
							}
							if (model.dataSets[index].colors) {
								for (let j = 0; j < model.dataSets[index].colors.length; j++) {
									//model.dataSets[index].colors[j] = this.colorsService.rgbToHsl(model.dataSets[index].colors[j]);
								}
							}
						}

						console.info(JSON.stringify(model));*/
					}
					else {
						console.error("model not defined");
					}
					return model;
				})
				.catch(error => {
					console.error(error);
					const model = [];
					model.id = num;
					model.p = p;
					model.folder = folder;
					model.route = route;
					model.params = params;
					model.routeParams = params;
					model.ok = false;
					return model;
				});
		}
		catch (error) {
			console.error(error);
			const model = [];
			model.id = num;
			model.p = p;
			model.folder = folder;
			model.route = route;
			model.params = params;
			model.ok = false;
			model.routeParams = params;
			return model;
		}
	}
	consumeModel(model, params, id) {
		let newModel = [];

		if (typeof params === 'object' && typeof params.level1 === 'string') {
			for (let i = 0; i < model.dataSets.length; i++) {
				if (model.dataSets[i].id) {
					const idPage = model.dataSets[i].id.replace(`${params.level1}-${params.level2}-`, "");

					model.dataSets[i].routeParams = {
						"level1": params.level1,
						"level2": params.level2,
						"level3": idPage
					};
				}
			}
		}

		for (let i = 0; i < model.dataSets.length; i++) {
			model.dataSets[i].route = model.route;

			if ((typeof params.level1 === 'string' && (params.level3 === "00" || params.level3 === "index")) ||
				(model.dataSets[i].id === id) ||
				id === "index") {
				newModel = model.dataSets[i];
				newModel.routeParams = params;
				newModel.ok = true;
				if ((model.dataSets.length - 1) > i) {
					model.nextPage = [];
					model.nextPage.routeParams = model.dataSets[i + 1].routeParams;
				}

				if (i > 0 && model.dataSets.length > 1) {
					model.previousPage = [];
					model.previousPage.routeParams = model.dataSets[i - 1].routeParams;
				}
				break;
			}
		}
		return newModel;
	}
	cleanModel() { }
	setModel() { }
}
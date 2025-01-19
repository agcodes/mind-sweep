import Component from '@glimmer/component';
import {
	inject as service
} from '@ember/service';
import {
	action
} from '@ember/object';
import {
	tracked
} from '@glimmer/tracking';

export default class extends Component {
	@service navigationService;
	@service router;
	fps = 0;
	id = "";
	value = "";
	@tracked routeEnabled1;
	@tracked routeEnabled2;
	@tracked pageTitleEnabled;
	@tracked routeClass1;
	constructor(owner, args) {
		super(owner, args);
		this.getRoutes();
		this.navigationService.idElementProgress = 'nav-progress-bar';
	}
	getRoutes() {
		this.navigationService.fetchData()
			.then(() => {
				this.observeCurrentURL();
			});
	}
	//@action unregister() {
	//this.updateNavigation();
	//}
	@action initRender() {
		//this.observeCurrentURL();
	}
	@action observeCurrentURL() {
		this.navigationService.setNavigationRoutes(this.router.currentRouteName, this.router.currentRouteName);
		this.updateNavigation();
	}
	updateNavigation() {
		this.routeEnabled1 = this.navigationService.routeEnabled1;
		this.routeEnabled2 = this.navigationService.routeEnabled2;
		this.pageTitleEnabled = this.navigationService.pageTitleEnabled;
		this.routeClass1 = this.navigationService.routeClass1;
	}
	@action fullScreen() {
		this.navigationService.enterFullScreen();
		return false;
	}
	@action pauseAnimation() {
		this.navigationService.startAnimation();
	}
}

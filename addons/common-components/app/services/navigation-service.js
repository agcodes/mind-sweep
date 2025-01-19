import Service from '@ember/service';
import {
	inject as service
} from '@ember/service';

export default class NavigationService extends Service {
	@service fullscreenService;
	@service intl;
	arrayRoutes = null;
	routeName1 = '';
	routeTitle1 = '';
	routeEnabled1 = false;
	pageTitleEnabled = false;
	routeName2 = '';
	routeTitle2 = '';
	routeEnabled2 = false;
	fullScreenEnabled = false;
	nav_id = 0;
	fps = 0;
	config = null;
	idElementProgress = 'nav-progress-bar';
	routeClass1 = '';
	constructor(owner, args) {
		super(owner, args);
		this.routeName1 = '';
		this.routeTitle1 = '';
		this.routeClass1 = '';
		this.routeName2 = '';
		this.routeTitle2 = '';
		this.pageTitleEnabled = false;
		this.routeEnabled1 = false;
		this.routeEnabled2 = false;
		this.arrayRoutes = [];
	}
	fetchData() {
		return new Promise((resolve) => {
			fetch('/api/index.json')
				.then((response) => response.json())
				.then((data) => {
					this.setApplicationRoutes(data);
					// Handle the parsed data here
					resolve(data);
				});
		});
	}
	setDocumentTitle(title) {
		document.title = title;
	}
	updateProgressBar(percent) {
		if (this.idElementProgress) {
			const progressBar = document.getElementById(this.idElementProgress);
			if (progressBar) {
				if (percent >= 0 && percent < 100) {
					progressBar.style.width = `${Math.round(percent * 100) / 100}%`;
					progressBar.style.height = '6px';
					progressBar.style.display = 'block';
				}
				else {
					progressBar.style.display = 'none';
					progressBar.style.width = '0';
					progressBar.style.height = '0';
				}
			}
		}
	}
	setApplicationRoutes(model) {
		this.arrayRoutes = [];
		for (let index = 0; index < model.dataSets.length; index++) {
			this.arrayRoutes[model.dataSets[index].id] = model.dataSets[index];
		}
	}
	setNavigationRoutes(name, route) {
		if (name !== null) {
			if (name.indexOf(".index") > 0) {
				this.set('routeClass1', 'd-block');
				this.disableFullScreen();
			}
			else {
				this.set('routeClass1', 'd-none');
			}
			if (this.arrayRoutes[name] && typeof this.arrayRoutes[name] === 'object') {
				if (typeof this.arrayRoutes[name].indexTitle === 'string' && this.arrayRoutes[name].indexTitle !== '') {
					this.setRoute1(this.intl.t(this.arrayRoutes[name].indexTitle), this.arrayRoutes[name].indexRoute);
				}
				if (typeof this.arrayRoutes[name].pageRoute === 'string' && this.arrayRoutes[name].pageRoute !== '') {
					this.setRoute2(this.intl.t(this.arrayRoutes[name].title), this.arrayRoutes[name].pageRoute);
				} else if (typeof this.arrayRoutes[name].title === 'string' && this.arrayRoutes[name].title !== '') {
					this.setRoute2(this.intl.t(this.arrayRoutes[name].title), route);
				}
				return true;
			}
		}

		this.disableRoute1();
		this.disableRoute2();
		this.disableFullScreen();
		return false;
	}
	disableRoute1() {
		this.set('routeEnabled1', false);
	}
	disableRoute2() {
		this.set('pageTitleEnabled', false);
		this.set('routeEnabled2', false);
	}
	setRoute1(rootTitle, rootName) {
		if (rootName !== '') {
			this.set('routeName1', String(rootName));
			this.set('routeTitle1', rootTitle);
			this.set('routeEnabled1', true);
		} else {
			this.set('routeEnabled1', false);
			this.set('routeName1', "index");
			this.set('routeTitle1', "");
		}
	}
	setRoute2(rootTitle, rootName) {
		if (rootName === '0') {
			this.set('routeEnabled2', false);
			this.set('routeName2', "index");
			this.set('routeTitle2', rootTitle);
			this.set('pageTitleEnabled', true);
		} else if (rootName !== '') {
			this.set('routeName2', String(rootName));
			this.set('routeTitle2', rootTitle);
			this.set('pageTitleEnabled', false);
			this.set('routeEnabled2', true);
		} else {
			this.set('routeEnabled2', false);
			this.set('routeName2', "index");
			this.set('routeTitle2', "");
			this.set('pageTitleEnabled', false);
		}
	}
	enterFullScreen() {
		this.fullscreenService.enterFullScreen();
	}
	initFullScreen(idElement) {
		this.fullscreenService.fullScreenElementId = idElement;
		this.set('fullScreenEnabled', true);
	}
	getFullScreenElementID(){
		return this.fullscreenService.fullScreenElementId;
	}	
	disableFullScreen() {
		this.set('fullScreenEnabled', false);
	}
}
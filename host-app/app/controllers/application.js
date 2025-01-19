import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class Application extends Controller {
	@service intl;
	@service navigationService;
	init() {
		super.init(...arguments);
		this.arrayRoutes = [];

		let browserLang = (navigator.language || navigator.userLanguage).toLowerCase();
		if (browserLang === 'fr') {
			browserLang = "fr-fr";
		}

		let locale = browserLang === "fr-fr" ? "fr-fr" : "en-us";

		const localeLang = localStorage.getItem("user_lang");
		if (localeLang && localeLang != "") {
			locale = localeLang;
		}

		this.intl.setLocale([locale]);
		this.targetChanged();
		this.addObserver('target.currentURL', this, 'targetChanged');
	}
	targetChanged() {
		this.navigationService.config = this.target.namespace.VARS;
		return this.navigationService.setNavigationRoutes(this.target.currentRouteName, this.target.currentRouteName);
	}
}
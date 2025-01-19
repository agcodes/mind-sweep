// app/helpers/translate.js
import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default class TranslateHelperBase extends Helper {
  @service intl;

  constructor() {
    super(...arguments);

    // Initialize the locale when the helper is created
    this.initializeLocale();
  }
  initializeLocale() {
    let browserLang = (navigator.language || navigator.userLanguage).toLowerCase();
    if (browserLang === 'fr') {
      browserLang = "fr-fr";
    }

    let locale = browserLang === "fr-fr" ? "fr-fr" : "en-us";

    let localeLang = localStorage.getItem("user_lang");
    if (localeLang && localeLang != "") {
      locale = localeLang;
    }
    this.currentInt = this.intl.getIntl(locale);
  }
  compute([key, ...params]) {
    if (this.currentInt.messages[key]) {
      return this.currentInt.messages[key];
    }
    return key;
  }
}
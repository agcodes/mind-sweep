import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class SwitchLang extends Component {
	@service intl;
	constructor(owner, args) {
		super(owner, args);
	}
	@action switch(lang) {
		this.intl.setLocale([lang]);
		localStorage.setItem("user_lang", lang);
	}
}
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class Gallery extends Component {
	@service deviantArtService;
	@service navigationService;
	@tracked items = [];
	constructor(owner, args) {
		super(owner, args);
		this.getItems();
	}
	getItems() {
		if (this.navigationService.config && this.navigationService.config.DEVIANT_ART_URL) {
			this.deviantArtService.fetchData(this.navigationService.config.DEVIANT_ART_URL, "all", 40)
				.then((data) => {
					if (data) {
						this.items = data;
					}
				});
		}
	}
}

import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class GalleryThumbnails extends Component {
	model = null;
	@service deviantArtService;
	@service navigationService;
	@tracked items = [];
	constructor(owner, args) {
		super(owner, args);
		this.model = args.model;
		this.getItems();
	}
	getItems() {
		if (this.navigationService.config && this.navigationService.config.DEVIANT_ART_URL) {
			this.deviantArtService.fetchData(this.navigationService.config.DEVIANT_ART_URL, "35", 35)
				.then((data) => {
					if (data) {
						// Shuffle the items randomly
						const sortedItems = data.sort(() => Math.random() - 0.5).slice(0, 4);
						this.items = sortedItems;
					}
				});
		}
	}
}
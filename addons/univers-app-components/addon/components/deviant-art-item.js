import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class DeviantArtItem extends Component {
	@service deviantArtService;
	@service navigationService;
	@tracked item = [];
	@tracked loading = true;
	constructor(owner, args) {
		super(owner, args);
		this.getItems();
	}
	getItems() {
		if (this.navigationService.config.DEVIANT_ART_URL) {
			this.deviantArtService.fetchData(this.navigationService.config.DEVIANT_ART_URL, "1", 1)
				.then((data) => {
					if (data && data.length > 0) {
						// get first
						this.item = data[0];
						this.loading = false;
					}
				});
		}
	}

	@action
	imageLoadedHandler(event) {
		// Une fois que l'image est chargée
		const imageWrapper = event.target.closest('.image-container-fluid');
		setTimeout(() => {
			if (imageWrapper) {
				imageWrapper.classList.add('expand');  // Déclenche l'expansion de l'image
			}
		}, 100);

		this.imageLoaded = true;
	}
}

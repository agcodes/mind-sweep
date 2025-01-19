import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class PostHomeItem extends Component {
	@service apiPostsService;
	@service navigationService;
	@service deviantArtService;

	@tracked item = [];
	@tracked loading = true;
	@tracked imageLoaded = false;

	constructor(owner, args) {
		super(owner, args);
		this.source = args.source;
		if (this.source == "1") {
			setInterval(() => {
				this.loading = true;
				this.getItems();
			}, 8000);
		}
		this.getItems();
	}

	getItems() {
		if (this.source == "1") {
			if (this.navigationService.config.DEVIANT_ART_URL) {
				this.deviantArtService.fetchData(this.navigationService.config.DEVIANT_ART_URL, "1", 3)
					.then((data) => {
						if (data && data.length > 0) {
							data = data.filter(item => item.width < 1000);
							// get first
							const randomIndex = Math.floor(Math.random() * data.length);
							this.item = data[randomIndex];
							this.loading = false;
						}
					});
			}
		}
		else {
			if (this.navigationService.config.API_POSTS_URL) {
				this.apiPostsService.fetchData(this.navigationService.config.API_POSTS_URL)
					.then((data) => {
						if (data && data.results.posts.length > 0) {
							this.item = data.results.posts[0];
							this.loading = false;
						}
					});
			}
		}
	}

	@action
	imageLoadedHandler(event) {
		/*// Une fois que l'image est chargée
		const imageWrapper = event.target.closest('.image-container-fluid');
		setTimeout(() => {
			if (imageWrapper) {
				imageWrapper.classList.add('expand');
			}
		}, 100);*/

		this.imageLoaded = true;
	}
}

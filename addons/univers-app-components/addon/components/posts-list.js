import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class PostsList extends Component {
	@service apiPostsService;
	@service navigationService;
	@tracked items = [];
	constructor(owner, args) {
		super(owner, args);
		this.getItems();
	}
	getItems() {
		if (this.navigationService.config.API_POSTS_URL) {
			this.apiPostsService.fetchData(this.navigationService.config.API_POSTS_URL)
				.then((data) => {
					if (data && data.results.posts.length > 0) {
						this.items = data.results.posts;
					}
				});
		}
	}
}
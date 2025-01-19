import Service from '@ember/service';

export default class ApiPostsService extends Service {
	// Create a cache object
	cache = {};

	fetchData(url) {
		return new Promise((resolve) => {
			// Check if data is already in the cache and not older than 1 hour
			if (this.cache[url] && this.isDataFresh(this.cache[url])) {
				resolve(this.cache[url].dataPosts);
			} else {
				fetch(url)
					.then((response) => response.json())
					.then((data) => {
						const dataPosts = this.handleResponse(data);
						// Store data and timestamp in the cache
						this.cache[url] = {
							dataPosts,
							timestamp: Date.now(),
						};
						resolve(dataPosts);
					});
			}
		});
	}
	handleResponse(response) {
		return response;
	}
	isDataFresh(cacheEntry) {
		// Check if the data is not older than 600 seconds (600 seconds * 1000 milliseconds)
		return Date.now() - cacheEntry.timestamp < 600000;
	}
	getItems() {
		const items = [];
		return items;
	}
	getItem() {
		return null;
	}
}
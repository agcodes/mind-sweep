import Service from '@ember/service';
import CImg from 'addon-canvas/models/CImg';

export default class DeviantArtService extends Service {
	// Create a cache object
	cache = {};
	limit = 40;
	secretKey = "cache";
	fetchData(url, id, limit) {
		this.limit = limit;
		return new Promise((resolve) => {
			if (this.cache[url + id] && this.isDataFresh(this.cache[url + id])) {
				resolve(this.handleResponse(this.cache[url + id].data, url + id));
			} else {
				fetch(url)
					.then((response) => response.text())
					.then(data => {
						const parser = new DOMParser();
						const xmlDoc = parser.parseFromString(data, 'application/xml');
						// Handle XML data
						resolve(this.handleResponse(xmlDoc, url + id));
					}).catch(error => {
						console.error(error);
						// Handle error
						resolve(null);
					});
			}
		});
	}
	isDataFresh(cacheEntry) {
		// Check if the data is not older than 600 seconds (600 seconds * 1000 milliseconds)
		return Date.now() - cacheEntry.timestamp < 600000;
	}
	handleResponse(xmlDocument, url) {
		// Store data and timestamp in the cache
		this.cache[url] = {
			data: xmlDocument,
			timestamp: Date.now(),
		};

		for (let i = 0; i < xmlDocument.childNodes.length; i++) {
			const node = xmlDocument.childNodes[i];
			if (node.localName === "rss") {
				for (let j = 0; j < node.childNodes.length; j++) {
					if (node.childNodes[j].localName === "channel") {
						return this.getItems(node.childNodes[j]);
					}
				}
			}
		}
		return null;
	}
	getItems(channel) {
		let nb = 0;
		const items = [];
		for (let i = 0; i < channel.childNodes.length; i++) {
			if (channel.childNodes[i].localName === "item") {
				if (nb >= this.limit) {
					break;
				}
				const item = this.getItem(channel.childNodes[i], nb);
				if (item !== null) {
					items.push(item);
				}
				nb++;
			}
		}
		return items;
	}
	getItem(item, nb) {
		let description = "";
		let title = "";
		let thumbnailUrl = "";
		let thumbnail = null;
		let pubDate = "";
		let link = "";
		let thumbnail1 = null;
		let img = {};
		const thumbnails = [];
		for (let i = 0; i < item.childNodes.length; i++) {
			switch (item.childNodes[i].nodeName) {
				case "media:content":
					img = this.getImg(item.childNodes[i]);
					break;
				case "media:description":
					description = item.childNodes[i].innerHTML;
					break;
				case "media:title":
					title = item.childNodes[i].innerHTML;
					break;
				case "media:thumbnail":
					thumbnail1 = this.getImg(item.childNodes[i]);
					thumbnails.push({
						"url": thumbnail1.url,
						"width": thumbnail1.width,
						"height": thumbnail1.height
					});
					break;
				case "pubDate":
					pubDate = item.childNodes[i].innerHTML;
					break;
				case "link":
					link = item.childNodes[i].innerHTML;
					break;
				default:
					break;
			}
		}

		for (let i = 0; i < thumbnails.length; i++) {
			if (thumbnails[i].url.indexOf("w_300") > 0) {
				thumbnailUrl = thumbnails[i].url;
				thumbnail = thumbnails[i];
			}
		}

		if (thumbnail) {
			const parsedDate = new Date(pubDate);
			const formattedDate = `${parsedDate.getFullYear()}-${(parsedDate.getMonth() + 1).toString().padStart(2, '0')}-${parsedDate.getDate().toString().padStart(2, '0')}`;
			return {
				"image": {
					"src": img.url,
					"description": this.stripTags(description),
					"width": img.width,
					"height": img.height
				},
				"url": img.url,
				"width": img.width,
				"height": img.height,
				"title": this.stripTags(title),
				"description": this.stripTags(description),
				"link": link,
				"publicID": nb,
				"pubDate": pubDate,
				"thumbnails": thumbnails,
				"thumbnailUrl": thumbnailUrl,
				"thumbnail": thumbnail,
				"urlEncode": this.encryptUrl(img.url, "mySecretKey"),
				"loading": nb > 10 ? "lazy" : "eager",
				"date_y_m_d": formattedDate,
				"id": nb
			};
		}

		return null;
	}
	encryptUrl(url) {
		let encrypted = '';
		let keyIndex = 0;

		// Chiffrer chaque caractère de l'URL en fonction du secretKey
		for (let i = 0; i < url.length; i++) {
			// Décaler le code ASCII du caractère en fonction de la clé
			const charCode = url.charCodeAt(i) + this.secretKey.charCodeAt(keyIndex % this.secretKey.length);
			encrypted += String.fromCharCode(charCode);

			// Passer à la lettre suivante de la clé
			keyIndex++;
		}

		// Convertir en base64 pour rendre l'URL plus sûre pour le transport
		return btoa(encrypted);
	}
	decryptUrl(encryptedUrl) {
		const decoded = atob(encryptedUrl); // Décoder la base64
		let decrypted = '';
		let keyIndex = 0;

		// Déchiffrer chaque caractère de l'URL
		for (let i = 0; i < decoded.length; i++) {
			// Revenir au code ASCII original en soustrayant le décalage
			const charCode = decoded.charCodeAt(i) - this.secretKey.charCodeAt(keyIndex % this.secretKey.length);
			decrypted += String.fromCharCode(charCode);

			// Passer à la lettre suivante de la clé
			keyIndex++;
		}

		return decrypted;
	}
	getImg(item) {
		const img = new CImg(0, 0, 0, 0, null, "");
		for (let j = 0; j < item.attributes.length; j++) {
			if (item.attributes[j].nodeName === "url") {
				img.url = item.attributes[j].value;
			} else if (item.attributes[j].nodeName === "height") {
				img.height = parseInt(item.attributes[j].value);
			} else if (item.attributes[j].nodeName === "width") {
				img.width = parseInt(item.attributes[j].value);
			}
		}
		return img;
	}
	stripTags(text) {
		if (text) {
			let ele = document.createElement("div");
			ele.innerHTML = text;
			return ele.textContent.replace(/(<([^>]+)>)/gi, "");
		}
		return "";
	}
}
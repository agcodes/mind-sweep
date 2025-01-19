import ViewRoute from 'univers-app-components/routes/view-route';
import { inject as service } from '@ember/service';

export default class ImageViewRoute extends ViewRoute {
  @service deviantArtService;
  async model(params) {
    const url = decodeURIComponent(params.id);
    const decryptedUrl = this.deviantArtService.decryptUrl(url);
    return {
      ok: true,
      params,
      url: decryptedUrl
    };
  }
}

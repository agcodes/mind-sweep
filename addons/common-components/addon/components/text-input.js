import Component from '@ember/component';
import layout from '../templates/components/text-input';
import { guidFor } from '@ember/models/internals';

export default Component.extend({
  layout,
  tagName: '',

  init(...args) {
    this._super(...args);
    this.set('uniqueId', guidFor(this));
  }
});

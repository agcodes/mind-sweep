import FormComponent from 'common-components/components/form/form-component';
import {
  action
} from '@ember/object';

export default class ImageColorF extends FormComponent {
  @action upload(eValue, event) {
    const reader = new FileReader();
    const file = event.target.files[0];
    // Note: reading file is async
    reader.onload = () => {
      this.actionsHandler.componentValueAction("loadImg", reader.result, this.componentID);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }
}

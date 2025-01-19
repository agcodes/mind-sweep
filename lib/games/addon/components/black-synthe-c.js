import DrawingComponent from 'addon-canvas/components/drawing-component';

export default class BlackSyntheC extends DrawingComponent {
  initRender() {
		if (super.initRender() === false) {
			return false
		}
  }
}

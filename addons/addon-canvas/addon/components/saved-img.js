
import DrawingComponent from './drawing-component';
import { tracked } from '@glimmer/tracking';

export default class SavedImg extends DrawingComponent {
    @tracked init = false;
    initRender() {
        if (super.initRender() === false) {
            return false
        }
        this.draw();
    }
    draw() {
        const urlSection = localStorage.getItem("urlSection");

        if (urlSection && urlSection == this.params["urlSection"]) {
            if (this.initCanvas()) {
                this.init = this.displaySavedCanvas();
            }
        }
    }
}
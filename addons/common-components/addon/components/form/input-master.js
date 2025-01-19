import FormComponent from './form-component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class InputMaster extends FormComponent {
  value = 0;
  min = 0;
  max = 0;
  field = "";
  step = 0;
  title = "";
  componentID = "";
  hasInitialValue = false;
  headerInfo = "";
  @tracked typeRange = false;
  hasHeader = false;
  plusMinusButtons = false;
  constructor(owner, args) {
    super(owner, args);
    this.value = args.value;
    this.hasInitialValue = typeof args.value !== "undefined";
    this.min = parseFloat(args.min);
    this.max = parseFloat(args.max);
    this.componentID = args.componentID;
    this.field = args.field;
    this.step = parseFloat(args.step);
    if (typeof this.step === "undefined") {
      this.step = 1;
    }
    if (typeof this.min === "undefined") {
      this.min = 0;
    }
    this.title = args.title;
    this.typeRange = args.typeRange;
    this.plusMinusButtons = args.plusMinusButtons;
    this.oklabel = args.oklabel;
    this.headerInfo = args.headerInfo;
    this.hasHeader = args.hasHeader;
    this.inputId = `${this.componentID}-${this.field}`;
    this.parentID = this.getParentID();
  }
  @action notifyReady() {
  }
  getParentID() {
    return this.componentID;
  }
  changeValue() {
    const currentValue = this.actionsHandler.getInputValue(this.inputId);
    if (currentValue != null && currentValue != "") {
      const value = parseFloat(currentValue);
      if (value <= this.max) {
        this.actionsHandler.componentValueAction(`change_${this.field}`, value, this.parentID, this.field);
      }
    }
  }
  @action changeNumFunction() {
    this.changeValue();
  }
  @action changeRangeValue() {
    this.changeValue();
  }
  @action changeCheckValue() {
    const inputElement = document.getElementById(this.inputId);
    if (inputElement) {
      this.actionsHandler.componentValueAction(`change_${this.field}`, inputElement.checked ? 1 : 0, this.parentID, this.field);
    }
  }
  @action plusFunction() {
    const currentValue = this.actionsHandler.getInputValue(this.inputId);
    if (currentValue != null && currentValue != "") {
      let value = Math.round(parseFloat(currentValue) * 1000000) / 1000000;
      if (value + this.step <= this.max) {
        value = value + this.step;
        value = Math.round(value * 100000) / 100000;
        this.actionsHandler.displayInputValue(this.inputId, value);
        this.actionsHandler.displayLabel(this.field, value, this.componentID);
        this.actionsHandler.componentValueAction(`change_${this.field}`, value, this.parentID, this.field);
      }
    }
  }
  @action minusFunction() {
    const currentValue = this.actionsHandler.getInputValue(this.inputId);
    if (currentValue != null && currentValue != "") {
      let value = Math.round(parseFloat(currentValue) * 100000) / 100000;
      if (value - this.step >= this.min) {
        value = value - this.step;
        value = Math.round(value * 100000) / 100000;
        this.actionsHandler.displayInputValue(this.inputId, value);
        this.actionsHandler.displayLabel(this.field, value, this.componentID);
        this.actionsHandler.componentValueAction(`change_${this.field}`, value, this.parentID, this.field);
      }
    }
  }
  @action submitInputText() {
    const currentValue = this.actionsHandler.getInputValue(this.inputId);
    if (currentValue != null) {
      const value = currentValue;
      this.actionsHandler.componentValueAction(`change_${this.field}`, value, this.parentID, this.field);
    }
  }
  @action contextMenuPlusFunction(eValue, event) {
    const contextMenu = document.getElementById(`${this.inputId}-context-menu`);
    contextMenu.style.top = `${event.offsetX}px`;
    contextMenu.style.left = `${event.offsetY}px`;
    contextMenu.classList.remove('hidden');

    event.preventDefault();
  }
  @action optionSelected(option) {
    if (option == "switch-number") {
      const inputElement = document.getElementById(this.inputId);
      if (inputElement) {
        const value = Math.round(parseFloat(inputElement.value) * 100000) / 100000;
        this.typeRange = !this.typeRange;
        setTimeout(() => {
          this.actionsHandler.displayInputValue(this.inputId, value);
          this.actionsHandler.displayLabel(this.field, value, this.componentID);
        }, 300);
      }
    }

    // Hide the context menu after selection
    const contextMenu = document.getElementById(`${this.inputId}-context-menu`);
    contextMenu.classList.add('hidden');
  }
}
import Service from '@ember/service';

export default class ActionsHandler extends Service {
  activeForm = false;
  components = null;
  idPreviousInstance = "";
  idInstance = "";
  data = {};
  componentData = {};
  componentsData = {};
  constructor(owner, args) {
    super(owner, args);
    this.components = [];
    this.eventTarget = new EventTarget();
  }
  triggerEvent(name, data) {
    this.eventTarget.dispatchEvent(new CustomEvent(name, {
      detail: data
    }));
    return true;
  }
  addComponent(id) {
    this.components.push(id);
  }
  componentValueAction(actionName, value, componentID, id) {
    return this.componentDataAction({
      "value": value,
      "actionName": actionName,
      'componentID': componentID,
      "id": id
    }, componentID);
  }
  componentEventAction(e, value, componentID) {
    const data = [];
    data["value"] = value;
    if (e.target) {
      for (let key in e.target.dataset) {
        data[key] = e.target.dataset[key];
      }
    }
    return this.componentDataAction(data, componentID);
  }
  componentDataAction(data, componentID) {
    if (typeof componentID === "string" && componentID !== "") {
      return this.triggerEvent(`componentAction${componentID}`, data);
    } else {
      return false;
    }
  }
  applyAction(id, data) {
    return this.triggerEvent(`applyAction${id}`, data);
  }
  handleDataSet(dataset) {
    const data = [];
    if (dataset) {
      for (let key in dataset) {
        data[key] = dataset[key];
      }
    }
    return data;
  }
  setInstance(id) {
    this.idInstance = id;
  }
  toggleAnimationButton(animationRunning, componentID) {
    if (animationRunning === true) {
      this.displayInputValue(this.getElementId(componentID, "start-animation"), "Stop");
    } else {
      this.displayInputValue(this.getElementId(componentID, "start-animation"), "Animation");
    }
  }
  toggleHTMLElement(id, hide, show) {
    if (typeof id === "string" && id !== "") {
      const htmlElement = document.getElementById(id);
      if (htmlElement) {
        if (hide === true) {
          htmlElement.style.display = "none";
        } else if (htmlElement.style.display === '' || htmlElement.style.display === 'none' || show === true) {
          htmlElement.classList.remove("d-none");
          htmlElement.style.display = "block";
        } else {
          htmlElement.style.display = "none";
        }
      }
    }
  }
  setHtmlElementVisibility(id, show) {
    if (typeof id === "string" && id !== "") {
      const htmlElement = document.getElementById(id);
      if (htmlElement) {
        if (show) {
          htmlElement.classList.remove("d-none");
        } else {
          htmlElement.classList.add("d-none");
        }
      }
    }
  }
  getElementId(componentID, id) {
    return `${componentID}-${id}`;
  }
  getData() {
    return this.data;
  }
  setInput(key, value, componentID) {
    this.data[key] = value;
    this.displayLabel(key, value, componentID);
    this.displayInputValue(key, value, componentID);
  }
  setInputs(data, componentID) {
    for (let key in data) {
      this.setInput(key, data[key], componentID);
    }
  }
  saveInputValue(inputId, value) {
    this.componentsData[inputId] = value;
  }
  /*getInputValue(inputId){
    if (this.componentsData[inputId]){
      return this.componentsData[inputId];
    }
    return null;
  }*/
  getInputValue(inputId) {
    const inputElement = document.getElementById(inputId);
    if (inputElement) {
      let currentValue = inputElement.value;
      if (currentValue == null || currentValue == "") {
        currentValue = inputElement.getAttribute('data-current-value');
        if (currentValue == null || currentValue == "") {
          return this.componentsData[inputId];
        }
        return currentValue;
      }
      return currentValue;
    }
  }
  displayInputValue(id, value, componentID) {
    if (typeof componentID === "string" && componentID !== "") {
      const formElement = document.getElementById(componentID);
      if (formElement) {
        const inputElement = formElement.querySelector(`input[name="${id}"]`);
        if (inputElement) {
          this.saveInputValue(`${componentID}-${id}`, value);
          if (inputElement.type === "checkbox") {
            inputElement.checked = (value === 1 || value === true);
          }
          else {
            inputElement.setAttribute('current-value', value);
            inputElement.value = value;
          }
        }
      }
    } else {
      const inputElement = document.getElementById(id);
      if (inputElement) {
        this.saveInputValue(id, value);
        inputElement.setAttribute('data-current-value', value);
        inputElement.value = value;
      }
    }
  }
  displayLabel(name, value, componentID) {
    if (typeof componentID === "string") {
      if (componentID !== "") {
        const labelElement = document.getElementById(this.getElementId(componentID, `span-label-${name}`));
        if (labelElement) {
          labelElement.innerHTML = value;
        }
      }
    } else {
      const labelElement = document.getElementById(`span-label-${name}`);
      if (labelElement) {
        labelElement.innerHTML = value;
      }
    }
  }
}

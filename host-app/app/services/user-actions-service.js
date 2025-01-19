export default class UserActionsService {
  constructor() {
    this.eventTarget = new EventTarget();
  }
  // Méthode pour déclencher l'événement
  triggerEvent(name, data) {
    const event = new CustomEvent(name, {
      detail: data
    });
    this.eventTarget.dispatchEvent(event);
  }
}

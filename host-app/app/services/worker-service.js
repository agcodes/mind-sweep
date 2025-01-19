import fetch from 'fetch';
import WorkerContainer from './worker-container';

export default class WorkerService {
  workerJs = '';
  workerNb = 0;
  async loadJs() {
    const response = await fetch('/worker/worker.js');
    this.workerJs = await response.text();
  }
  createWorkerContainer() {
    this.workerNb++;
    const workerContainer = new WorkerContainer();
    if (workerContainer.initWorker(this.workerJs)) {
      workerContainer.id = this.workerNb;
      return workerContainer;
    }
  }
}

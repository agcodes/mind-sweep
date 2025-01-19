export default class WorkerContainer {
  JSONfn = '';
  worker = null;
  canvasService = null;
  component = null;
  id = 0;
  callback = null;
  workerUrl = '';
  initWorker(workerJs) {
    if (workerJs === "") {
      return false;
    }
    
    const workerBlob = new Blob([workerJs], {
      type: 'application/javascript'
    });

    this.workerUrl = window.URL.createObjectURL(workerBlob);

    console.info(this.workerUrl);

    this.worker = new Worker(this.workerUrl);
    
    this.JSONfn = {
      stringify: function(obj) {
        return JSON.stringify(obj, function(key, value) {
          if (value instanceof Function || typeof value === 'function') {
						const fnBody = value.toString();

            if (fnBody.length < 8 || fnBody.substring(0, 8) !== 'function') { //this is ES6 Arrow Function
              return `_NuFrRa_${fnBody}`;
            }
            return fnBody;
          }

          if (value instanceof RegExp) {
            return `_PxEgEr_${value}`;
          }
          return value;
        });
      }
    };
    return true;
  }
  execAll(args) {
    const promises = [];

    for (let ix = 0; ix < args.length; ix++) {
      promises.push(this.exec(args[ix]));
    }

    return Promise.all(promises).then(
      function(values) {
        return values;
      }
    );
  }
  exec(param) {
      this.worker.onmessage = (oEvent) => {
				console.info("receive message");
				console.info(oEvent);
				//param.callback(oEvent.data);
        this.worker.terminate();
				// free
				URL.revokeObjectURL(this.workerUrl);
      };

      this.worker.onerror = (error) => {
				//console.error(error);
				//param.callback(null, error.message);
        this.worker.terminate();
      };
      console.info("post message");
      this.worker.postMessage(this.JSONfn.stringify(param));
  }
}

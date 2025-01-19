//import Complex from "./fractals-lib/addon/models/Complex.js";
import NewtonFractal from "./fractals-lib/addon/models/newton-fractal";
import NewtonFractalParameters from "./fractals-lib/addon/models/newton-fractal-parameters";

// Processing on message event
self.addEventListener('message', function (e) {

    self.postMessage = self.webkitPostMessage || self.postMessage;

    const JSONfn = {
        stringify: function (obj) {
            return JSON.stringify(obj, function (key, value) {
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

    const results = [];
    if (e.data.pts) {
        const fractal = new NewtonFractal();
        const fractalParams = new NewtonFractalParameters();

        fractalParams.setData(e.data.data);
        fractal.setParameters(fractalParams);
        
        for (let i = 0; i < e.data.pts.length; i++) {
            const newtonPt = fractal.getPt(e.data.pts[i][0], e.data.pts[i][1]);
            if (newtonPt != null) {
                results.push([
                    e.data.ptsCanvas[i][0], // x
                    e.data.ptsCanvas[i][1], // z
                    newtonPt[2],            // z
                    newtonPt[3],            // color
                    newtonPt[4],
                    newtonPt[5]             // v
                ]);
            }
        }
    }

    self.postMessage(JSONfn.stringify(results));

}, false);

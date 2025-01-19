import Palette from "./palette";
import Canvas2DDrawer from "./canvas2DDrawer";
import Complex from "./complex";
import Color from "./color";

export default class JuliaWrkDrawer {

    constructor(id) {
        this.id = id;
        if (!id) {
            throw "L'Id d'une zone de dessin est obligatoire pour creer une instance de cet objet.";
        }
        this._me = this;
        this._recalc = true;
        this._drawer = new Canvas2DDrawer(id);
        this._buffer = this._drawer.getBackBuffer();
        this._width = this._drawer.getWidth();
        this._height = this._drawer.getHeight();
        this._maxIter = 200;
        this._minIter = 50;
        this._iteration = this._maxIter;
        this._palette = new Palette();
        this._nbWorkers = 4;
        this._jobs = [];
        this._jobsInProgress = 0;
        this._c = new Complex(-0.85, 0.2);


        //////////////////////////////////////////////////////////////////
        // Slowly change constant number of the Julia fractal set
        this._degA = 0,
            this._degB = 0,
            this._animateFlag = false;

        //////////////////////////////////////////////////////////////////
        // Subscribe to be called when constant value change
        this._subscriberList = [];
    }


    getConstant() {
        return this._c;
    };

    setConstant(a, b) {
        this._c.a = a;
        this._c.b = b;
        this._recalc = true;
        this.process();
    };


    // Set palette colours
    createPalette(size, c1, c2, c3) {
        var i = 1,
            colours = [],
            len = arguments.length;
        for (; i < len; ++i) {
            colours.push(arguments[i]);
        }
        this._palette.create(size, colours);
    }

    animate() {
        if (this._animateFlag) {
            this._degA += 1 / 100;
            this._degB += 1 / 1000;
            this.setConstant(Math.cos(this._degA), Math.sin(this._degB));
        } else {
            setTimeout(function () { this.animate(); }, 100);
        }
    }

    setAnimate(flag) {
        this._degA = Math.acos(this._c.a);
        this._degB = Math.asin(this._c.b);
        this._animateFlag = flag;
        this._iteration = (this._animateFlag) ? this._minIter : this._maxIter;
    }

    // Init and launch first rendering
    start() {
        var i = 0,
            c0 = new Color(0, 0, 0, 255, 0),
            c1 = new Color(0, 0, 255, 255, 20),
            c2 = new Color(0, 255, 255, 255, 40),
            c3 = new Color(255, 255, 0, 255, 60),
            c4 = new Color(255, 0, 0, 255, 80),
            c5 = new Color(0, 0, 0, 255, 100);
        this.createPalette(256, c0, c1, c2, c3, c4, c5);

        const that = this;
        // Prepare workers
        for (i = 0; i < this._nbWorkers; i++) {
            this._jobs[i] = { 'worker': new Worker('assets/js/juliaWrk.js'), 'status': 0, 'params': null };
            this._jobs[i].worker.addEventListener('message', function (e) {
                that.jobHandler(e);
            }, false);
        }

        // Launch workers processing
        this.process();
    };

    // Rendering fractal
    draw() {
        if (this._buffer != null) {
            // send pixel buffer to screen
            this._drawer.setBackBuffer(this._buffer);
            this.animate();
        }
    };

    invalidate() {
        this.process();
        const that = this;
        requestAnimationFrame(function () { that.draw(); });
    }

    // Workers Queue Manager
    process(a, b) {

        if (this._jobsInProgress < 1) {
            this._buffer = this._drawer.getBackBuffer();
            if (a != undefined && b != undefined) {
                this._c = new Complex(a, b);
            }

            // Redraw only if constant changed
            if (this._recalc && this._jobsInProgress < 1) {
                this._recalc = false;
                var x1, y1, x2, y2,
                    zoneWidth = this._width / this._nbWorkers * 2,
                    zoneHeight = this._height / 2,
                    wid = 0;

                x1 = 0;
                y1 = 0;
                x2 = 0;
                y2 = zoneHeight;
                // give a job for each workers
                for (wid = 0; wid < this._nbWorkers; wid++) {
                    this._jobs[wid].worker.status = 0;

                    // Horizontal step
                    if (x2 < this._width) {
                        x1 = x2;
                        x2 += zoneWidth;
                    } else {
                        x1 = 0;
                        x2 = zoneWidth;

                        // Vertical step
                        if (y2 < this._height) {
                            y1 = y2;
                            y2 += zoneHeight;
                        } else {
                            y1 = 0;
                            y2 = zoneHeight;
                        }
                    }

                    this._jobs[wid].params = {
                        'wid': wid,
                        'x1': x1,
                        'y1': y1,
                        'x2': x2,
                        'y2': y2,
                        'c': { 'a': this._c.a, 'b': this._c.b },
                        'iter': this._iteration,
                        'width': this._width,
                        'height': this._height
                    };

                    this._jobs[wid].worker.postMessage(this._jobs[wid].params);
                    this._jobsInProgress++;
                }
            }
        }
    }

    // Callback launched on workers messages
    jobHandler(e) {

        var data = new Uint8ClampedArray(e.data);
        if (data != undefined) {
            var wid = data[0],
                params = this._jobs[wid].params,
                x,
                y,
                w = params.x2 - params.x1,
                h = params.y2 - params.y1,
                color;

            this._jobs[wid].worker.status = 1;
            this._jobsInProgress--;

            // Loop for each pixel
            for (y = 0; y < h; y++) {
                for (x = 0; x < w; x++) {
                    // get rgba color from palette
                    color = this._palette.getColor(data[1 + y * w + x]);
                    // set pixel in backbuffer
                    this._buffer[(params.y1 + y) * params.width + (params.x1 + x)] = this._drawer.pixel(color.r, color.g, color.b, color.a);
                }
            }

            if (this._jobsInProgress < 1) {
                // Draw new buffer content
                this.invalidate();

                // Call user functions
                this.notify(this._c);
            }
        }
    }

    subscribe(callback) {
        this._subscriberList.push(callback);
    }

    // Call subscriber when constant value change
    notify(c) {
        var id = this._subscriberList.length;
        while (id) {
            id -= 1;
            this._subscriberList[id](c.a, c.b);
        }
    }
}
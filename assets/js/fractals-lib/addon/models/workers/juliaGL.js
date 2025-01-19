////////////////////////////////////////////////////////////////////////////////
// =============================================================================
////////////////////////////////////////////////////////////////////////////////
import Canvas3DDrawer from "./canvas3DDrawer"
import Palette from "./palette"
import Color from "./color";
import Complex from "./complex";
////////////////////////////////////////////////////////////////////////////////
// =============================================================================
////////////////////////////////////////////////////////////////////////////////
// 
// Calc and draw Julia Fractal
//
export default class JuliaGLDrawer {
    constructor(id) {
        this._me = this;
        this._drawer = new Canvas3DDrawer(id);
        this._width = this._drawer.getWidth();
        this._height = this._drawer.getHeight();
        this._iteration = 200;
        this._palette = new Palette();
        this._c = new Complex(-0.85, 0.2);
        this._previousConstant = new Complex(1, 1);
        //////////////////////////////////////////////////////////////////
        // Slowly change constant number of the Julia fractal set
        this._degA = 0;
        this._degB = 0;
        this._animateFlag = false;
        this._subscriberList = [];
    }

    getConstant() {
        return this._c;
    }

    setConstant(a, b) {
        this._c.a = a;
        this._c.b = b;
    }

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

    // SetGL Parameters
    initGL() {
        var vs = "assets/shaders/vs/basic.essl",
            fs = "assets/shaders/fs/julia.essl";
        this._drawer.loadShaders([vs, fs]);
        this._drawer.setShaderProgram(0, 1);
        this._drawer.addMesh(this._drawer.getQuad());
        this._drawer.setPalette(this._palette.toUint8Array());
    }

    animate() {
        this._degA += 1 / 100;
        this._degB += 1 / 1000;
        this.setConstant(Math.cos(this._degA), Math.sin(this._degB));
    }

    setAnimate = function (flag) {
        this._degA = Math.acos(this._c.a);
        this._degB = Math.asin(this._c.b);
        this._animateFlag = flag;
    }

    // Init and launch first rendering
    start() {

        console.log("start");
        var c0 = new Color(0, 0, 0, 255, 0),
            c1 = new Color(0, 0, 255, 255, 20),
            c2 = new Color(0, 255, 255, 255, 40),
            c3 = new Color(255, 255, 0, 255, 60),
            c4 = new Color(255, 0, 0, 255, 80),
            c5 = new Color(0, 0, 0, 255, 100);
        this.createPalette(1024, c0, c1, c2, c3, c4, c5);
        this.initGL();
        this.draw();
    };

    // Rendering fractal
    draw(a, b) {
        console.log("draw");
        if (_animateFlag) {
            this.animate();
        }

        if (a != undefined && b != undefined) {
            this._c = new Complex(a, b);
        }

        // Redraw only if constant changed
        if (!this._previousConstant.isEquals(this._c)) {
            this._previousConstant.copy(this._c);

            this._drawer.setUniformFloat('uConst', this._c.a, this._c.b);
            this._drawer.setUniformInteger('uMaxIter', this._iteration);
            this._drawer.draw();

            // Call user functions
            this.notify(this._c);
        }

        requestAnimFrame(function () { this.draw(); });
    };

    // Call subscriber when constant value change
    notify(c) {
        var id = this._subscriberList.length;
        while (id) {
            id -= 1;
            this._subscriberList[id](c.a, c.b);
        }
    }
    //////////////////////////////////////////////////////////////////
    // Subscribe to be called when constant value change

    subscribe(callback) {
        this._subscriberList.push(callback);
    }
}


import Canvas2DDrawer from "./canvas2DDrawer"
////////////////////////////////////////////////////////////////////////////////
// =============================================================================
////////////////////////////////////////////////////////////////////////////////
// 
// Calc and draw Julia Fractal
//
export default class ColorDrawer {
    constructor(id) {
        this._drawer = (id) ? new Canvas2DDrawer(id) : null;
        this._buffer = this._drawer.getBackBuffer();
        this._width = this._drawer.getWidth();
        this._height = this._drawer.getHeight();

        this.start = function () {

            var x, y;
            var r, g, b, a;
            r = 255;
            g = 255;
            b = 255;
            a = 255;
            for (y = 0; y < _height; y++) {
                for (x = 0; x < _width; x++) {
                    _buffer[y * _width + x] = this._drawer.pixel(r * (y / _height), g * (x / _width), b, a);
                    (r << 24) |
                        (g << 16) |
                        (b << 8) |
                        a;
                }
            }

            draw();
        };
    }


    draw() {
        if (_buffer != null) {
            this._drawer.setBackBuffer(_buffer);
        }
    }
}
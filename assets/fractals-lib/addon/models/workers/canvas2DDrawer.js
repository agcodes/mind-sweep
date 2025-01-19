
export default class Canvas2DDrawer {
    constructor(id){
        this._canvas = (id) ? document.getElementById(id) : null,
        this._ctx    = this._canvas.getContext("2d");
        // expose context 
        this.context = this._ctx;

        this._width     = this.getWidth(),
        this._height    = this.getHeight(),
        this._imageData = this._ctx.getImageData(0, 0, this._width, this._height),
        this._buf       = new ArrayBuffer(this._imageData.data.length),
        this._buf32     = new Uint32Array(this._buf),
        this._buf8      = new Uint8ClampedArray(this._buf),
        this._bufIndex  = 0;
        this.isLittleEndian = this.isLittleEndian_();
    }
   


    // width : the number of physical device pixels per row
    getWidth(){
        return this._ctx.canvas.width;
    };

    // height : the number row
    getHeight(){
        return this._ctx.canvas.height;
    };

    

    // Determine whether Uint32 is little- or big-endian.
    isLittleEndian_(){
        var data = new Uint32Array(this._buf);
        data[0] = 0x08040201;
        return (this._buf[3] === 0x01) ? false : true;
    };

    // get an Uint32Array representing pixel in rgba way
    getBackBuffer(){ 
        return this._buf32;
    };

    // draw an ArrayBuffer
    setBackBuffer = function(buffer){
        this._buf = buffer;
        //_bufIndex = (_bufIndex > 0) ? 0 : 1;
        if(Uint8ClampedArray != undefined && this._imageData.data instanceof Uint8ClampedArray)
        {
            //console.log("setting internal Uint8ClampedArray");
            this._imageData.data.set(this._buf8);

        }else
        {
            //console.log("setting internal CanvasPixelArray");
            var x, y, c, i = 0;
            for(y = 0; y < this._height; y++)
            {
                for(x = 0; x < this._width; x++)
                {
                    for(c = 0; c < 4; c++, i++)
                    {
                        //i = (x + y * _width) * 4 + c;
                        this._imageData.data[i] = this._buf8[i];
                    }
                }
            }
        }
        //_bufIndex = (_bufIndex > 0) ? 0 : 1;
        this._ctx.putImageData(this._imageData, 0, 0);
    };

    // get a pixel color compatible with the device
    pixel(r, g, b, a){

        var c1,c2,c3,c4;
        if(this.isLittleEndian){
            c1 = a;
            c2 = b;
            c3 = g;
            c4 = r;
        }else{
            c1 = r;
            c2 = g;
            c3 = b;
            c4 = a;
        }
        return  (c1 << 24) |
                (c2 << 16) |
                (c3 << 8)  |
                c4;
    }

    // set a pixel color at position x, y
    setPixel(x, y, r, g, b, a){
        var x, y;
        return this._buf32[y * this._width + x] = this.pixel(r, g, b, a);
    }

    setStroke(colour, width){
        this._ctx.strokeStyle = colour;
        this._ctx.lineWidth = (width != undefined) ? width : 1;
    };

    drawLine(x1, y1, x2, y2){
        this._ctx.moveTo(x1, y1);
        this._ctx.lineTo(x2, y2);
        this._ctx.stroke();
    };

    drawCircle(x, y, radius){
        this._ctx.beginPath();
        this._ctx.arc(x, y, radius, 0, (Math.PI / 180) * 360, false);
        this._ctx.stroke();
        this._ctx.closePath();
    };

    drawBezierCurv(x1, y1, x2, y2, ctrlX1, ctrlY1, ctrlX2, ctrlY2){
        this._ctx.moveTo(x1, y1);
        this._ctx.bezierCurveTo(ctrlX1, ctrlY1, ctrlX2, ctrlY2, x2, y2);
        this._ctx.stroke();

        // indicator
        var pc = this._ctx.strokeStyle;
        var pw = this._ctx.lineWidth;
        this.setStroke("blue", 1);
        this.drawCircle(x1, y1, 3);
        this.drawCircle(x2, y2, 3);
        this.drawCircle(ctrlX1, ctrlY1, 3);
        this.drawCircle(ctrlX2, ctrlY2, 3);
        this.setStroke(pc, pw);
    };
}
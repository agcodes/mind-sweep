//////////////////////////////////////////////////////////////////
// Color Helper Object
export default class Color {
    constructor(r, g, b, a, p) {

        if (r instanceof Color) {   // recopie
            this.r = r.r;
            this.g = r.g;
            this.b = r.b;
            this.a = r.a;
            this.p = r.p;
        } else {   // set composante
            this.r = (r == undefined || r > 255) ? 255 : r;
            this.g = (g == undefined || g > 255) ? 255 : g;
            this.b = (b == undefined || b > 255) ? 255 : b;
            this.a = (a == undefined || a > 255) ? 255 : a;
            this.p = (p == undefined || p > 100) ? 100 : p;
        }
    }

    add(c) {
        // Add
        this.r += c.r;
        this.g += c.g;
        this.b += c.b;
        this.a += c.a;
        this.p += c.p;
        // Clamp
        if (this.r < 0) this.r = 0; else if (this.r > 255) this.r = 255;
        if (this.g < 0) this.g = 0; else if (this.g > 255) this.g = 255;
        if (this.b < 0) this.b = 0; else if (this.b > 255) this.b = 255;
        if (this.a < 0) this.a = 0; else if (this.a > 255) this.a = 255;
        if (this.p < 0) this.p = 0; else if (this.p > 100) this.p = 100;

        //console.log("color : " + this.r + ", " + this.g + ", "  + this.b + ", " + this.p);
    }

    copy(c) {
        this.r = c.r;
        this.g = c.g;
        this.b = c.b;
        this.a = c.a;
        this.p = c.p;
    }
}
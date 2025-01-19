export default class Complex {
    constructor(a, b) {
        this.a = (a != undefined) ? a : 0;
        this.b = (b != undefined) ? b : 0;
    }
    isEquals(c) {
        return (c.a == this.a && c.b == this.b);
    };

    copy(c) {
        this.a = c.a;
        this.b = c.b;
    };
}
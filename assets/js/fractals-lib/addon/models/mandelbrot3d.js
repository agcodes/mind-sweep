import Mandelbrot from './mandelbrot';
import CComplex from './CComplex';

class Mandelbrot3d extends Mandelbrot {
  getRandom3DPoints(nb, z) {
    for (let index = 0; index < nb; index++) {
      this.setRandomPoint();
      this.z0 = z;
      let pt = this.get3DPt(this.x0, this.y0, this.z0);

      if (pt) {
        this.ptsTmp.push(pt);
      }
    }
    return this.ptsTmp;
  }
  get3DPt(x, y, z) {
    let i = this.get3Di(x, y, z);

    //let v = i;
    /*
        if (this.params.out) {
          if (i < this.params.maxIterations && i >= this.params.minIterations) {
            return [x, y, z, this.colorsService.hslToRgb([
              this.params.drColor[0] + i * this.params.drColor[4],
              this.params.drColor[1] + i * this.params.drColor[5],
              this.params.drColor[2] + i * this.params.drColor[6]
              //,
              //this.params.innerColor[3]
            ])];
          }
        }
        if (i === this.params.maxIterations) {
          return [x, y, z, this.colorsService.hslToRgb([
            this.params.innerColor[0] + z * this.params.innerColor[4],
            this.params.innerColor[1] + z * this.params.innerColor[5],
            this.params.innerColor[2] + z * this.params.innerColor[6]
            //,
            //this.params.innerColor[3]
          ])];
        }
        return null;
    */
    return this.getMandelbrotPt(x, y, z, i);
  }
  /*
  getAbsPt(pt) {
    return [Math.abs(pt[0]), Math.abs(pt[1]), Math.abs(pt[2])];
  }*/
  get3Di(x0, y0, z0) {
    if (this.params.a === null) {
      // classic mandelbrot : set j
      //this.c = new CComplex(x0, y0, z0);
    } else {
      this.c = new CComplex(this.params.a, this.params.b, this.params.c);
    }

    // new z
    let z = new CComplex(x0, y0, z0);
    let i = 0;

    // classic mandelbrot iteration sequence
    do {
			z = this.fZ(z);
      if (z === null) {
        break;
      }
      if (this.params.noise) {
        // add noise
        z = z.add(new CComplex(this.params.noise[0] * i, this.params.noise[1] * i, this.params.noise[2] * i))
      }
      i++;
    }
    while (z.squaresSum() < this.params.target && i < this.params.maxIterations);

		this.saveZ();

    this.it++;
    return i;
  }
}

export default Mandelbrot3d;

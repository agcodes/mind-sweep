import CComplex from './CComplex';
import MersenneTwister from 'calc-utils/models/MersenneTwister';
import JuliaStarParameters from './julia-star-parameters';
import Fractal from './fractal';

class JuliaStar extends Fractal {
  constructor() {
    super();
    this.x = 0;
    this.y = 0;
    this.indice = 0;
    this.mersenneTwister = new MersenneTwister();
    this.params = new JuliaStarParameters();
  }
  reset() {
    this.x = 0;
    this.y = 0;
    this.params.setComplexes();
  }
  initialize() {
    this.reset();
  }
  getPoints(nb) {
    return Array.from({ length: nb }, () => {
      const pt = this.getPoint(this.x, this.y);
      // memorize new poition
      this.x = pt[0];
      this.y = pt[1];
      this.indice++;
      return [pt[0], pt[1], 0, pt[3]];
    });
  }
  setParameters(params) {
    this.params = params;
  }
  getPoint(x, y) {
    // multiple
    const a = this.params.a;

    let z = new CComplex(x, y);

    if (this.params.altC2_3_4 == true) {
      const rand = this.mersenneTwister.rand();
      if (rand < 1 / 3) {
        z = z.add(this.params.c2);
      }
      else if (rand < 2 / 3) {
        z = z.add(this.params.c3);
      }
      else {
        z = z.add(this.params.c4);
      }
    }
    else if (this.params.altC2_3 == true) {
      z = z.add((this.mersenneTwister.rand() > 0.5) ? this.params.c2 : this.params.c3);
    }

    if (a !== 0) {
      // a * z
      z = z.mulReal(a);
    }

    // +c1
    z = z.add(this.params.c1);

    // atan2(ya,xa);
    const arg = (z.getArgument());

    z = this.params.currentFunction(z, this.params);

    let x1 = 0;
    let y1 = 0;

    if (this.params.altC) {
      if (this.mersenneTwister.rand() > 0.5) {
        x1 = z.r;
        y1 = z.i;
      } else {
        x1 = z.r * -1;
        y1 = z.i * -1;
      }
    } else {
      const valCos = Math.cos(this.params.base * arg);
      const valSin = Math.sin(this.params.base * arg);

      if (this.params.randomS) {
        // 2 * (rand() % 2) - 1;
        const s = 2 * ((Math.floor(this.mersenneTwister.rand() * (10000 - 1)) + 1) % 2) - 1;
        if (this.mersenneTwister.rand() < 0.5) {
          x1 = -s * valCos - z.r;
          y1 = s * valSin - z.i;
        } else {
          x1 = -s * valCos + z.r;
          y1 = s * valSin + z.i;
        }
      } else {
        if (this.mersenneTwister.rand() < 0.5) {
          x1 = -valCos - z.r;
          y1 = -valSin + z.i;
        } else {
          x1 = -valCos + z.r;
          y1 = -valSin - z.i;
        }
      }
    }

    // return point
    return [x1, y1, 0, null];
  }
}

export default JuliaStar;

import FractalParameters from './fractal-parameters';
import MandelbrotFunctions from './mandelbrot-functions';

export default class MandelbrotParameters extends FractalParameters {
	setFunctions() {
		const mandelbrotFunctions = new MandelbrotFunctions();
		this.currentFunction = mandelbrotFunctions.getFunction(this.type);
		if (this.f === '') {
			this.derivativeFunction = mandelbrotFunctions.getDerivativeFunction(this.type);
		}

		this.functionDefinition = mandelbrotFunctions.getFunctionDefinition(this.type, this.f, this.base, this.args, this.c0);
		return typeof this.currentFunction === "function";
	}
	getNew() {
		return new MandelbrotParameters();
	}
}
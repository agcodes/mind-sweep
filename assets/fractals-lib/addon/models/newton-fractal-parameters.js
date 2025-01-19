import FractalParameters from './fractal-parameters';
import NewtonFractalFunctions from './newton-fractal-functions';

export default class NewtonFractalParameters extends FractalParameters {
	setFunctions() {
		const newtonFractalFunctions = new NewtonFractalFunctions();
		this.currentFunction = newtonFractalFunctions.getFunction(this.type);

		if (this.derivativeParams){
			this.derivativeFunction = newtonFractalFunctions.getFunction(this.derivativeParams.type);
		}
		else if (this.f === '') {
			this.derivativeFunction = newtonFractalFunctions.getDerivativeFunction(this.type);
		}
		
		this.functionDefinition = `f(z) = ${newtonFractalFunctions.getFunctionDefinition(this.type, this.f, this.base, this.args, this.c0)}`;
		
		if (this.multiple != null) {
			this.functionDefinition += `, a = (${this.multiple.r},${this.multiple.i})`;
		}

		if (!this.relativeC2){
			if (this.c2) {
				this.functionDefinition += `, c2 = (${this.c2.r},${this.c2.i})`;
			}
			else {
				this.functionDefinition += ", c2 = (0, 0)";
			}
		}
		return typeof this.currentFunction == "function";
	}
	getNew() {
		return new NewtonFractalParameters();
	}
}
import Complex from './Complex';

export default class NewtonFractalFunctions {
	getFunction(name) {
		const functions = {
			"multiple": (z, n, f, c, c2, args) => z.mul(new Complex(args[0], args[1])).getC(f),
			// f(z^n)-c
			'f1': (z, n, f, c) => z.getC(f).pow(n).subIn(c),
			'f1_rot': (z, n, f, c, c2, args) => z.getC(f).pow(n).rot(args.rot).subIn(c),
			// z+f(z^n)+c
			'f2': (z, n, f, c) => z.add(z.getC(f).pow(n)).addIn(c),
			// z^(n-2)+f(z)^n+c
			'f3': (z, n, f, c) => z.pow(n - 2).add(z.getC(f).pow(n)).addIn(c),
			// f(z)^n+c
			'f4': (z, n, f, c) => z.getC(f).pow(n).addIn(c),
			// f(z)^n.c+z
			'f5': (z, n, f, c) => z.getC(f).pow(n).mul(c).addIn(z),
			// f(z)^n+c.z
			'f6': (z, n, f, c) => z.getC(f).mul(z.pow(n).addIn(c)),
			// f(z^n+c)
			'f7': (z, n, f, c) => z.pow(n).addIn(c).getC(f),
			// f(z^n)-c^n
			'f8': (z, n, f, c) => z.pow(n).getC(f).sub(c.pow(n)),
			// f(z^n+(c+z^n-1))
			'f9': (z, n, f, c) => z.pow(n).add(c.add(z.pow(n - 1)).getC(f)),
			// f(z)^n-z+c
			'f10': (z, n, f, c) => z.getC(f).pow(n).sub(z).addIn(c),// f(z)^n-z+c
			'f10_rot': (z, n, f, c, c2, args) => z.getC(f).pow(n).rot(args.rot).sub(z).addIn(c),
			// f(z.(c+z^n+z)+c2-z)
			'f11': (z, n, f, c, c2) => z.mul(c.add(z.pow(n)).add(z)).addIn(c2).subIn(z).getC(f),
			// f(z^n)+c/z
			'f12': (z, n, f, c) => z.pow(n).getC(f).add(c.div(z)),
			// f(z^n)+z^n-1+z-c
			'f13': (z, n, f, c) => z.pow(n).getC(f).add(z.pow(n - 1)).addIn(z).sub(c),
			// f(z^n)+c2.z^n-1+z+c
			'f14': (z, n, f, c, c2) => z.pow(n).getC(f).add(c2.mul(z.pow(n - 1))).addIn(z).addIn(c),
			// f(z^n)+c+c2
			'f15': (z, n, f, c, c2) => z.pow(n).getC(f).addIn(c).addIn(c2),
			// (f(z^n)+c).z
			'f16': (z, n, f, c) => z.pow(n).getC(f).add(c).mul(z),
			// f(z^(n-3))+(z^n/(z+c2))+c
			'f17': (z, n, f, c, c2) => z.pow(n - 3).getC(f).add(z.pow(n).div(z.add(c2))).addIn(c),
			'f18': (z, n, f, c) => z.pow(n).getC(f).add(z.add(c).div(z.add(new Complex(1, 0)))),
			// (f(z^n)+c)/z
			'f19': (z, n, f, c) => z.pow(n).getC(f).add(c).div(z),
			// (f(z^n)-c).c2
			'f20': (z, n, f, c, c2) => z.pow(n).getC(f).sub(c),
			'f21': (z, n, f, c) => z.pow(n).getC(f).div(z.add(c).pow(n - 1)).add(c),
			'f22': (z, n, f, c) => z.pow(n).getC(f).mul(z.pow(n - 1).add(c)).div(z.pow(n - 2).add(c)).addIn(c),
			// f(z^(n-3))+z^n+c
			'f23': (z, n, f, c) => z.pow(n - 3).getC(f).add(z.pow(n)).addIn(c),
			// f(z^n)+z^(n-1)+2.c
			'f24': (z, n, f, c) => z.pow(n).getC(f).add(z.pow(n - 1)).add(c.mulReal(2)),
			'f25': (z, n, f, c) => z.pow(n).getC(f).add(c.add(z.pow(n - 1))).add(c.add(z.pow(n - 1))),
			'f26': (z, n, f, c) => z.pow(n).add(c).mul((z.add(c).squareAtan())).getC(f),
			// f(z^(n*2)+c-z^n)
			'f27': (z, n, f, c) => z.pow(n * 2).add(c).sub(z.pow(n)).getC(f),
			// f(z^(-n)+c-z^2)
			'f28': (z, n, f, c) => z.pow(n).add(c).sub(z.pow(2)).getC(f),
			// f(|c+(z^n)|)
			'f29': (z, n, f, c) => c.add(z.pow(n)).abs().getC(f),
			// |f(z^n)|/z-c
			'f30': (z, n, f, c) => z.pow(n).getC(f).abs().div(z).sub(c),
			// f(z)-z^n-c
			'f31': (z, n, f, c) => z.getC(f).sub(z.pow(n)).sub(c),
			// z-(z^n)-|c|
			'f32': (z, n, f, c) => z.getC(f).sub(z.pow(n)).sub(c.abs()),
			// f(z-((z.c)^n)-c)
			'f33': (z, n, f, c) => z.sub(z.mul(c).pow(n)).sub(c).getC(f),
			// z-(z^n+|c|)
			'f34': (z, n, f, c) => z.getC(f).sub(z.pow(n / 2).addIn(c)),
			'f35': (z, n, f, c, c2, args) => z.sub(z.mul(new Complex(args[0], args[1]))),
			// f(z^n)+z^n-1+z-c
			'f36': (z, n, f, c) => z.pow(n).getC(f).add(z.pow(n - 1)).add(z).sub(c).sub(c),
			'f37': (z, n, f, c) => z.abs().getC(f).pow(n).addIn(c),
			'f38': (z, n, f, c) => z.getC(f).abs().pow(n).sub(z).addIn(c),
			'f39': (z, n, f, c) => z.abs().pow(n).addIn(c).getC(f),
			'f40': (z, n, f, c) => new Complex(n, 0).mul(z.pow(n - 1)),
			'f41': (z, n, f, c, c2) => z.pow(n).mulValues(n, 0),
		};
		return functions[name];
	}
	//return z.pow(3).add(z.pow(3)).add(c).div(z.pow(2).mulReal(3).add(c).addReal(-1));
	getFunctionDefinition(name, f, n, args, c) {
		const functions = {
			"f1": () => 'f(z)^n-c',
			'f2': (n) => 'z+(f(z)^n)+c',
			'f3': (n) => `z^${n - 2}+f(z)^n+c`,
			'f4': (n) => "f(z)^n+c",
			'f5': (n) => "f(z)^n.c+z",
			'f6': (n) => "f(z)^n+c.z",
			'f7': (n) => "f(z^n+c)",
			'f8': (n) => `f(z^n+(c+z^${n - 1}))`,
			'f9': (n) => "f(z^n)-c^n",
			'f10': (n) => "f(z)^n-z+c",
			'f11': (n) => "f(z.(c+z^n+z)+c2-z)",
			'f12': (n) => "f(z^n)+c/z",
			'f13': (n) => `f(z^n)+z^${n - 1}+z-c`,
			'f14': (n) => "",
			'f15': (n) => "f(z^n)+c+(2,0)",
			'f16': (n) => "(f(z^n)+c).z",
			'f17': (n) => "",
			'f18': (n) => "",
			'f19': (n) => "(f(z^n)+c)/z",
			'f20': (n) => "f(z^n)-c",
			'f21': (n) => "",
			'f22': (n) => "",
			'f23': (n) => `f(z^${n - 3})+z^n+c`,
			'f24': (n) => `f(z^n)+z^${n - 1}+2.c`,
			'f25': (n) => "",
			'f26': (n) => "",
			'f27': (n) => `f(z^${n * 2}+c-z^n)`,
			'f28': (n) => "f(z^n+c-z^2)",
			'f29': (n) => "f(|c+(z^n)|)",
			'f30': (n) => "|f(z^n)|/z-c",
			'f31': (n) => "f(z)-z^n-c",
			'f32': (n) => "z-z^n-|c|",
			'f33': (n) => "f(z-((z.c)^n)-c)",
			'f36': (n) => "f(z^n)+z^n-1+z-c",
			"multiple": (n, args) => `(${args[0]}+${args[1]}i).z`
		};

		if (functions[name]) {
			const cValue = (c !== null) ? ` with c = (${c.r},${c.i})` : "";
			const definition = (functions[name](n, args, c));
			if (typeof definition == 'string') {
				let returnValue = "";
				if (f === "") {
					returnValue = this.replaceAllOccurrences(definition.replace(/f\((.*?)\)/g, "$1"), "^n", `^${n}`);
				}
				else {
					returnValue = this.replaceAllOccurrences(
						this.replaceAllOccurrences(definition,
							"f(", `${f}(`).trim(),
						"^n", `^${n}`);
				}

				if (returnValue.substring(0, 1) == "(" && returnValue.substring(returnValue.length - 1) == ")") {
					return this.removeParentheses(returnValue.substring(1).substring(0, returnValue.length - 2));
				}
				return this.removeParentheses(returnValue + cValue);
			}
		}
		return "";
	}
	getDerivativeFunction(type) {
		const functions = {
			// z^n-c => n.z^(n-1) 
			// z^2-c => 2z
			// z^3-c => 3z^2
			'f1': (z, n) => (n == 2) ? z.mul(new Complex(n, 0)) : z.pow(n - 1).mulValues(n, 0),
			// z+z^n+c => 1 + n.z^n-1
			'f2': (z, n) => (new Complex(n, 0).mul(z.pow(n - 1))).addValues(1, 0, 0),
			// z^n+c => n.z^n-1
			// z^2+c => 2.z
			'f4': (z, n) => z.pow(n - 1).mulValues(n, 0),
			// f(z^n)-c^n => 2.z
			'f7': (z, n) => z.pow(n - 1).mulValues(n, 0),
			'f8': (z, n) => new Complex(n, 0).mul(z.pow(n - 1)),
			// z^n-z+c => n*z^(n-1)-1 
			'f10': (z, n) => new Complex(n, 0).mul(z.pow(n - 1)).addValues(-1, 0, 0),
			'f31': (z, n) => new Complex(1, 0).sub(z.pow(n - 1).mulValues(n, 0))
		};

		if (typeof functions[type] === "undefined") {
			return null;
		}
		return functions[type];
	}
	removeParentheses(str) {
		if (str.startsWith('(') && str.endsWith(')')) {
			return str.slice(1, -1);
		}
		return str;
	}
	replaceAllOccurrences(originalString, stringToReplace, newString) {
		const escapedStringToReplace = stringToReplace.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
		const regex = new RegExp(escapedStringToReplace, 'g');
		return originalString.replace(regex, newString);
	}
}
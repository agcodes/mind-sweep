/* eslint-disable no-unused-vars */
import CComplex from './CComplex';

export default class MandelbrotFunctions {
	getDerivativeFunction(type) {
		const functions = {
			// z^n+c => n.z^n+1
			'f1': (z, n) => new CComplex(n, 0).mul(z.pow(n - 1))
		};
		if (typeof functions[type] === "undefined") {
			return null;
		}
		return functions[type];
	}
	getFunction(name) {
		const functions = {
			// f(z^n+c)
			"multiple": (z, n, c, f, args) => z.mul(new CComplex(args[0], args[1])).getC(f),
			"bedouin": (z, n, c, f, args) => {
				// t = 0 => classic mandelbrot
				return new CComplex(
					// r2 – i2 - t2
					z.r * z.r - z.i * z.i - z.t * z.t,
					// 
					2 * z.r * z.i,
					2 * z.r * z.t).addIn(c)
			},
			"bedouin_2": (z, n, c, f, args) => {
				// f(z^n+c)
				const r1 = z.r * z.r - z.i * z.i - z.t * z.t;
				const i1 = 2 * z.r * z.t;
				const t1 = 2 * z.r * z.i;

				return new CComplex(
					r1 + Math.sin(c.r),
					i1 + Math.sin(c.i),
					t1 + Math.sin(c.t))
			},
			"minkowski": (z, n, c, f, args) => {
				return new CComplex(
					2 * z.r - z.r * z.r * z.r - 2 * z.i * z.i + c.r,
					2 * z.i - 3 * z.i * z.r * z.r + c.i,
					0
				).getC(f);
			},
			"herman": (z, n, c, f) => {
				const zm = new CComplex(1, 0);
				return (c.mul(z.pow(n).addReal(4)).div(zm.sub(z.mulReal(4)))).getC(f);
			},
			"barnsley-tree": (z, n, c, f) => {
				return c.mul(z.sub(new CComplex(z.signR(), 0)).pow(n)).getC(f);
			},
			// classic mandelbrot : z^n+c
			"j_o": (z, n, c) => z.pow(n).addIn(c),
			"f1_rot": (z, n, c, f, args, i) => {
				if (i % 2 != 0) {
					if (typeof args.rot == "undefined") {
						return null;
					}
					else {
						return z.pow(n).rot(args.rot).addIn(c).getC(f);
					}
				}
				return z.pow(n).addIn(c).getC(f);
			},
			"f1_alt": (z, n, c, f, args, i) => (i % 2 != 0) ? null : z.pow(n).addIn(c).getC(f),
			// f(z^n+c)
			"f1": (z, n, c, f, args) => z.pow(n).addIn(c).getC(f),
			// f(z^n-c)
			"f2": (z, n, c, f, args) => z.pow(n).subIn(c).getC(f),
			"f3": (z, n, c, f, args) => {
				// burning ship
				if (args !== null) {
					return z.abs().pow(n).addIn(c).getC(f).transform(args);
				}
				// f(|z|^n+c)
				return z.abs().pow(n).addIn(c).getC(f);
			},
			// f(|z|^n+c)
			"f3_rot": (z, n, c, f, args) => z.abs().pow(n).rot(args.rot).addIn(c).getC(f),
			// f(|z^n|+c)
			"f3-2": (z, n, c, f, args) => z.pow(n).abs().addIn(c).getC(f),
			// -0.1
			// f(|z|^n+c+c_args)
			"f3-3": (z, n, c, f, args) => z.abs().pow(n).add(c).add(new CComplex(args[0], args[1])).getC(f),
			// f(c.z^n)
			"f4": (z, n, c, f, args) => c.mul(z.pow(n).getC(f)),
			"f5": (z, n, c, f, args) => z.pow(n).abs().div(c.abs()).addIn(c).getC(f),
			"f6": (z, n, c, f, args) => z.abs().pow(n).div(c).addIn(c).getC(f),
			"f7": (z, n, c, f, args) => z.pow(n).mul(c).abs().addIn(c).getC(f),
			"f8": (z, n, c, f, args) => z.abs().pow(n).addIn(c).conjugate().getC(f),
			// f(|z|n)+c
			"f9": (z, n, c, f, args) => z.abs().pow(n).getC(f).addIn(c),
			// f(z^n)+c
			"f14": (z, n, c, f, args) => z.pow(n).getC(f).add(c),
			// |z|n-c
			"f10": (z, n, c, f, args) => z.abs().pow(n).sub(c).getC(f),
			// f(z^n)-c^n
			"f35": (z, n, c, f, args) => z.pow(n).getC(f).sub(c.pow(n)),
			// f(z^n/c)
			"f36": (z, n, c, f, args) => z.pow(n).div(c).getC(f),
			"f41": (z, n, c, f, args) => z.pow(n).conjugate().add(c).getC(f),
			// f(z^n+z)
			"f43": (z, n, c, f, args) => z.pow(n).add(z).add(c).getC(f),
			// double
			// f(c^n-z^n)
			"f44": (z, n, c, f, args) => c.pow(n).sub(z.pow(n)).getC(f),
			"f48": (z, n, c, f, args) => z.pow(n).add(z.conjugate()).conjugate().add(c).getC(f),
			"f49": (z, n, c, f, args) => z.pow(n).conjugate().add(c).sub(z).getC(f),
			"f51": (z, n, c, f, args) => {
				const zm = z.pow(n);
				return zm.add(zm).add(c).getC(f);
			},
			"f52": (z, n, c, f, args) => c.add(z.pow(n).conjugate()).sub(z).getC(f),
			// zn-z+c
			"f55": (z, n, c, f, args) => z.pow(n).sub(z).add(c).getC(f),
			"f56": (z, n, c, f, args) => z.pow(n).add(c).pow(n).add(c.pow(n).add(z)).getC(f),
			"f65": (z, n, c, f, args) => z.pow(n).add(c.pow(n - (args[0] ? args[0] : 1)).abs().add(c)).getC(f),
			"f11": (z, n, c, f, args) => z.pow(n).div(c).getC(f).addIn(c),
			"f23": (z, n, c, f, args) => z.abs().pow(n).getC(f).div(c),
			// f(|z|^n)/c
			"f12-10": (z, n, c, f, args) => z.abs().pow(n).getC(f).div(c),
			"f12": (z, n, c, f, args) => z.abs().pow(n).getC(f).div(c.abs()).addIn(c),
			"f12-2": (z, n, c, f, args) => z.abs().pow(n).div(c.abs()).getC(f).addIn(c),
			"f12-3": (z, n, c, f, args) => z.abs().pow(n).getC(f).div(c.abs()).addIn(c).getC(f),
			"f12-4": (z, n, c, f, args) => z.abs().pow(n).getC(f).div(c.abs()).abs().addIn(c),
			"f12-5": (z, n, c, f, args) => z.abs().pow(n).getC(f).iAbs().div(c.abs()).addIn(c),
			"f12-6": (z, n, c, f, args) => z.abs().pow(n).getC(f).div(c.pow(n).abs()).addIn(c),
			"f12-7": (z, n, c, f, args) => z.abs().getC(f).pow(n).div(c.abs()).addIn(c).getC(f),
			"f12-8": (z, n, c, f, args) => z.pow(n).abs().div(c.pow(n)).addIn(c).getC(f),
			//z = abs(z) / abs(c) + c
			"f12-9": (z, n, c, f, args) => z.abs().pow(n).div(c.abs()).addIn(c).getC(f),
			"f12-11": (z, n, c, f, args) => z.abs().pow(n).getC(f).div(c).getC(f),
			"f12-12": (z, n, c, f, args) => z.abs().pow(n).getC(f).div(c).add(c),
			"f13": (z, n, c, f, args) => z.div(c).getC(f).pow(n),
			"f15": (z, n, c, f, args) => z.pow(n).mul(c).sin().abs().addIn(c).getC(f),
			"f16": (z, n, c, f, args) => z.pow(n).mul(c).csc().abs().addIn(c).getC(f),
			//z=abs(z/c)+c
			"f17": (z, n, c, f, args) => z.pow(n).div(c).abs().addIn(c).getC(f),
			"f18": (z, n, c, f, args) => z.abs().pow(n).cosCoshSinSinh().addIn(c).getC(f),
			"f19": (z, n, c, f, args) => z.div(c).pow(n).abs().addIn(c).getC(f),
			"f20": (z, n, c, f, args) => z.mul(c).pow(n).abs().addIn(c).getC(f),
			"f21": (z, n, c, f, args) => z.abs().pow(n).div(c).abs().addIn(c).getC(f),
			"f22": (z, n, c, f, args) => (z.abs().pow(n)).cosCoshSinSinh2().addIn(c).getC(f),
			// carré
			"f24": (z, n, c, f, args) => c.mul(z.pow(n + 1).add(z.pow(2)).div(z.pow(n - 1)).getC(f)),
			// butterfly
			"f25": (z, n, c, f, args) => c.mul(z.add(z.sin()).div(z.pow(n)).getC(f)),
			// médaille
			"f26": (z, n, c, f, args) => c.conjugate().mul(z.pow(n - 1).div(z.pow(n + 1)).conjugate().getC(f)).mul(c),
			// oiseau
			"f27": (z, n, c, f, args) => c.mul(c.pow(n + 1).add(z.pow(2)).div(z.pow(n - 1)).getC(f)),
			"f28": (z, n, c, f, args) => c.mul(z.add(z.pow(n)).div(z.pow(n + 1)).getC(f)),
			// carré
			// m 2
			"f29": (z, n, c, f, args) => c.mul(z.pow(n).getC(f)),
			// météorite
			// m = 4
			"f30": (z, n, c, f, args) => c.mul(z.pow(n).add(z.pow(2)).div(z.pow(n - 1)).getC(f)),
			"f31": (z, n, c, f, args) => c.mul((z.pow(n + 1).add(z.pow(2))).div(z.pow(n - 1)).getC(f)),
			"f32": (z, n, c, f, args) => c.conjugate().mul(z.pow(-n).div(z.pow(n)).getC(f)).mul(c),
			// carré
			"f33": (z, n, c, f, args) => c.mul(z.pow(n + 1).div(z.pow(n - 1)).getC(f)),
			"f34": (z, n, c, f, args) => {
				const zm = z.pow(n);
				return c.mul((zm.add(z.pow(2)).div(zm)).getC(f));
			},
			"f38": (z, n, c, f, args) => c.mul(z.pow(n).getC(f).addReal(args[0] ? args[0] : 1 / 8)),
			"f40": (z, n, c, f, args) => c.pow(-n).mul(z.pow(n + 1).add(z.pow(2)).div(z.pow(n - 1)).getC(f)),
			"f45": (z, n, c, f, args) => z.pow(n).add(c.div(z)).getC(f),
			"f46": (z, n, c, f, args) => z.pow(n).add(c).div(z).getC(f),
			"f47": (z, n, c, f, args) => z.pow(n).add(c).mul(z).getC(f),
			"f53": (z, n, c, f, args) => z.pow(n).add(c).mul(z).sub(z).getC(f),
			// smog
			"f54": (z, n, c, f, args) => c.add(z.pow(n).conjugate()).add(c).getC(f),
			"f57": (z, n, c, f, args) => {
				if (z.signR() !== 0) {
					z = c.mul(z.pow(n - 1).div(z.pow(n + 1)).conjugate().getC(f)).mul(z);
					return c.mul(z.mul(z));
				}
				return null;
			},
			"f58": (z, n, c, f, args) => {
				// http://paulbourke.net/fractals/z4gasket/
				const zm = z.pow(n);
				const z2 = z.pow(n - 2);
				return zm.add(z2).add(c).div(zm.sub(z2).add(c)).addReal(-2, 0).getC(f);
			},
			"f59": (z, n, c, f, args) => {
				const zm = z.pow(n);
				// zn+1 = z0 zn2 (zn2 + 1) / (zn2 - 1)2
				const z2 = zm.sub(c);
				return zm.mul(zm.add(c).div(z2.pow(2))).getC(f);
			},
			"f60": (z, n, c, f, args) => c.div(z.pow(n + 1).add(z.pow(2)).div(z.pow(n - 1)).getC(f)),
			// gruyère
			"f61": (z, n, c, f, args) => c.pow(-n).mul(z.pow(n - 1).add(z.pow(2)).div(z.pow(n + 1))).getC(f),
			"f62": (z, n, c, f, args) => c.pow(-n).mul(z.pow(n + 1).add(z.pow(-2))).getC(f),
			"f63": (z, n, c, f, args) => c.add(z.pow(n).mul(z.pow(-1))).getC(f),
			"f64": (z, n, c, f, args) => z.pow(n).add(c.div(z.pow(-n).conjugate())).getC(f),
			"f66": (z, n, c, f, args) => z.pow(n).add((c.pow(-n).abs().add(c))).getC(f),
			"f67": (z, n, c, f, args) => z.pow(n).add((z.abs().add(c)).div(z.abs().addValues(1, 0, 0))).getC(f),
			"f68": (z, n, c, f, args) => c.mul(z.div(z.pow(n)).add(z).mul(c)).getC(f),
			"f96": (z, n, c, f, args) => z.abs().pow(n).div(z.abs().add(c).getC(f)),
			"f69-1": (z, n, c, f, args) => {
				const zm = z.pow(n);
				// zn+1 = z0 zn2 (zn2 + 1) / (zn2 - 1)2
				return zm.add(c).div(zm.sub(c)).getC(f);
			},
			"f69-2": (z, n, c, f, args) => {
				const zm = z.pow(n);
				// zn+1 = z0 zn2 (zn2 + 1) / (zn2 - 1)2
				return zm.add(c)
					.div(zm.addReal(args[0])).getC(f);
			},
			"f69-3": (z, n, c, f, args) => {
				const zm = z.pow(n);
				// zn+1 = z0 zn2 (zn2 + 1) / (zn2 - 1)2
				const z2 = (zm.addReal(-(n - 1)));
				return zm.addReal(n + args[0]).div(z2).sub(c).getC(f);
			},
			// z^2+z^5/(2 + 4z)+c
			"f70": (z, n, c, f, args) => z.pow(n - 3).add((z.pow(n)).div(z.addReal(2))).add(c).getC(f),
			// c.((z^n+z^-n)/z^n-1)
			"f71": (z, n, c, f, args) => c.mul(z.pow(n).add(z.pow(-n)).div(z.pow(n - 1))).getC(f),
			"f72": (z, n, c, f, args) => z.pow(n).add(c).div(z).getC(f),
			"f73": (z, n, c, f, args) => c.add(z.pow(n).getC(f).add(c.pow(n))),
			"f74": (z, n, c, f, args) => {
				// zn+1 = z0 zn2 (zn2 + 1) / (zn2 - 1)2
				const z2 = z.pow(n).addReal(-n + 1).getC(f);
				return z.pow(n).add(c).div(z2.pow(2));
			},
			"f75": (z, n, c, f, args) => z.mul(z.pow(n).add(c).getC(f).conjugate().squareDiv()),
			"f76": (z, n, c, f, args) => {
				const zm = z.pow(n).getC(f);
				const z2 = z.pow(-n - 2);
				return zm.add(z2).add(c).div(zm.sub(z2).add(c));
			},
			"f77": (z, n, c, f, args) => {
				if (z.signR() !== 0) {
					z = c.mul(z.pow(n - 1).div(z.pow(n + 1)).conjugate().getC(f)).mul(z);
					return c.add(c.mul(z.mul(z)));
				}
				return null;
			},
			"f78": (z, n, c, f, args) => c.mul(z.pow(n).squareDiv().addReal(1 / 32)).getC(f),
			"f79": (z, n, c, f, args) => {
				z = c.pow(n).mul(z.pow(n - 1).conjugate()).mul(z).getC(f);
				return c.add(c.mul(z.pow(2)));
			},
			// x
			"f80": (z, n, c) => c.mul(z.pow(n).add(z.pow(2)).squareDiv()),
			"f81": (z, n, c, f, args) => c.pow(n).mul(z.pow(n - 1).add(z.pow(2)).div(z.pow(n + 1)).getC(f)),
			"f82": (z, n, c, f, args) => (z.signR() !== 0) ? c.mul(z.pow(n - 1).div(z.pow(n + 1)).conjugate().getC(f)).mul(z) : null,
			// zn+cn
			"f83": (z, n, c, f, args) => z.pow(n).add(c.pow(n)).getC(f),
			// (zn+c)n
			"f84": (z, n, c, f, args) => z.pow(n).add(c).pow(n).getC(f),
			// zn+c+c
			"f85": (z, n, c, f, args) => z.pow(n).add(c).add(c).getC(f),
			// |c+zn|
			"f86": (z, n, c, f, args) => c.add(z.pow(n)).abs().getC(f),
			"f87": (z, n, c, f, args) => z.abs().add(c).pow(n).sub(c).getC(f),
			"f88": (z, n, c, f, args) => z.abs().add(c).pow(n).add(c).getC(f),
			"f89": (z, n, c, f, args) => z.abs().pow(n).abs().add(c).getC(f),
			"f90": (z, n, c, f, args) => z.pow(n).add(c.abs()).getC(f),
			"f91": (z, n, c, f, args) => z.rAbs().pow(n).add(c).getC(f),
			"f93": (z, n, c, f, args) => c.add(z.pow(n).sub(z.pow(n - 1))).getC(f),
			"f94": (z, n, c, f, args) => c.add(z.pow(n).sub(z.mulReal(-1).pow(n + args[0]))).getC(f),
			"f95": (z, n, c, f, args) => z.pow(n).sub(z.mulReal((typeof args[0] !== "undefined" ? args[0] : -1)).pow(n + (typeof args[1] !== "undefined" ? args[1] : -1.0001))).add(c).getC(f),
			//  "c.(cosh((z+f(z))/z^n))";
			"f101": (z, n, c, f, args) => c.mul(z.add(z.getC(f)).div(z.pow(n)).cosh()),
			"f102": (z, n, c, f, args) => z.abs().pow(n).cosh().add(c).conjugate().getC(f),
			"f103": (z, n, c, f, args) => c.mul(z.div(z.pow(n)).cosh().getC(f).conjugate()),
			"f104": (z, n, c, f, args) => z.sin().abs().pow(n).cosh().add(c).conjugate().getC(f),
			"f105": (z, n, c, f, args) => c.mul(z.pow(n).tan().getC(f)),
			"f106": (z, n, c, f, args) => c.mul((z.pow(n)).cosh().sin().conjugate().getC(f)),
			"f107": (z, n, c, f, args) => c.mul(z.cosCoshSinSinh2()).pow(n).getC(f),
			// x
			"f108": (z, n, c, f, args) => c.mul(z.pow(n).add(z.pow(2)).squareTan()).getC(f),
			"f109": (z, n, c, f, args) => c.mul(z.pow(n).add(z.pow(2)).expDivSinh()).getC(f),
			"f110": (z, n, c, f, args) => z.pow(n).mul(c.mul(z).expDiv()).conjugate().getC(f),
			"f111": (z, n, c, f, args) => z.conjugate().cosCoshSinSinh2().mul(z.pow(n)).add(c).getC(f),
			// c.pow(-m).mul(z.pow(n + 1).add(z.pow(2)).div(z.pow(n - 1)).cot())
			"f112": (z, n, c, f, args) => c.mul(z.pow(n).expDiv()).getC(f),
			"f113": (z, n, c, f, args) => c.conjugate().mul(z.pow(n - 1).div(z.pow(n + 1)).cos()).mul(c).squareTan().conjugate().getC(f),
			"f114": (z, n, c, f, args) => c.add(z.pow(n).mul(z.pow(-1))).squareTan().getC(f),
			"f115": (z, n, c, f, args) => c.mul(z.pow(n).squareTan()).getC(f),
			"f116": (z, n, c, f, args) => {
				const zm = z.pow(n);
				return c.add(zm.add(zm).squareAtan()).getC(f);
			},
			"f117": (z, n, c, f, args) => c.mul(z.pow(n).add(z.pow(2)).squareAtan()).getC(f),
			"f118": (z, n, c, f, args) => z.pow(n).add(c).add(new CComplex(args[0] ? args[0] : 0, args[1] ? args[1] : 0)).getC(f),
			"f119": (z, n, c, f, args) => z.pow(n).add(c).mul(new CComplex(args[0] ? args[0] : 0, args[1] ? args[1] : 0)).getC(f),
			"f120": (z, n, c, f, args) => c.pow(n).add(z).getC(f),
			"f121": (z, n, c, f, args) => c.mul(z.pow(n).mul(new CComplex(args[0] ? args[0] : 0, args[1] ? args[1] : 0)).getC(f)),
			"f122": (z, n, c, f, args) => z.getC(f).pow(n).add(c).mul(c),
			"f123": (z, n, c, f, args) => c.powComplex(c).add(z.getC(f).pow(n).add(c)),
			"f124": (z, n, c, f, args) => (z.abs().getC(f).pow(n).add(c)).add(c.powComplex(c)),
			"f125": (z, n, c, f, args) => (z.getC(f).pow(n).abs().add(c)).sub(c.powComplex(c)),
			"f126": (z, n, c, f, args) => z.abs().pow(n).div(c).abs().add(c.powComplex(c)).getC(f),
			"0": (z, n, c, f, args) => z,
			//return c.powComplex(z).add(z.pow(n).add(c)).add(c)
		};
		return functions[name];
	}
	getZnDef(n) {
		if (n == 1) {
			return "z";
		}
		return "z^" + n;
	}
	getFunctionDefinition(name, f, n, args, c) {
		const functions = {
			"multiple": (n, args) => "(" + args[0] + "+" + args[1] + "i).z",
			"herman": () => "f(c.(z^n+4)/(1-4.z))",
			"barnsley-tree": () => "c.(sign(z)^m)",
			// classic mandelbrot : z^n+c
			"j_o": () => 'z^n+c',
			"f1": () => 'f(z^n+c)',
			"f1_rot": () => 'f(z^n+c) || f(rot(z^n)+c)',
			"f2": () => 'f(z^n-c)',
			// like burning ship
			"f3": () => 'f(|z|^n+c)',
			// like burning ship
			"f3-2": () => 'f(|z^n|+c)',
			// like burning ship (useful ?)
			"f3-3": () => 'f(|z|^n+c+c)',
			"f4": () => 'f(c.z^n)',
			"f5": () => "f(|z^n|/|c|+c)",
			"f6": () => "f(|z|^n/c+c)",
			"f7": () => "f(|z^n.c|+c)",
			"f8": () => "f(conj(|z|^n+c))",
			"f9": () => 'f(|z|n)+c',
			"f10": () => 'f(|z|n-c)',
			"f14": () => 'f(z^n)+c',
			"f35": () => 'f(z^n)-c^n',
			"f36": () => 'f(z^n/c)',
			"f41": () => 'f(conj(z^n)+c)',
			"f43": () => 'f(z^n+z+c)',
			"f44": () => 'f(c^n-z^n)',
			"f48": () => 'f(conj(z^n+conj(z))+c)',
			"f49": () => 'f(conj(z^n)+c-z)',
			"f51": () => 'f(z^n+z^n+c)',
			"f52": () => 'f(c+conj(z^n)-z)',
			// zn-z+c
			"f55": () => 'f(z^n-z+c)',
			"f56": () => 'f((z^n+c)^n+(c^n+z))',
			"f65": () => "f(|z^n+c^(m-a)|+c)",
			"f11": () => "f(z^n/c)+c",
			"f23": () => "f(|z|^n)/c",
			"f12-10": () => 'f(|z|^n)/c',
			"f12": () => "f(|z|^n)/|c|+c",
			"f12-2": () => "f(|z|^n/|c|)+c",
			"f12-3": () => 'f(f(|z|^n)/|c|+c)',
			"f12-4": () => "|f(|z|^n)/|c||+c",
			"f12-5": () => "iabs(f(|z|^n))/|c|+c",
			"f12-6": () => "f(|z|^n)/(|c^n|)+c",
			"f12-7": () => "f(f(|z|)^n/|c|+c)",
			"f12-8": () => "f(|z^n|/c^n+c)",
			//z = abs(z) / abs(c) + c
			"f12-9": () => "f(|z|^n/|c|+c)",
			"f12-11": () => "f(f(|z|^n)/c)",
			"f12-12": () => "f(|z|^n)/c+c",
			"f13": () => "f(z/c)^n",
			"f15": () => "f(|sin(z^n.c)|+c)",
			"f16": () => "f(|csc(z^n.c)|+c)",
			"f17": () => "f(|z/c|+c)",
			//z.abs().pow(n).cosCoshSinSinh().add(c).getC(f);
			"f18": () => "",
			"f19": () => "f(|(z/c)^n|+c)",
			"f20": () => "f(|(z.c)^n|+c)",
			"f21": () => "f(|z|^n/c|+c)",
			"f22": () => "",
			// carré
			"f24": (n) => "f((c.z^" + (n + 1) + "+z^2)/(z^" + (n - 1) + "))",
			// butterfly
			"f25": () => "f(c.(z+sin(z))/z^n)",
			// médaille
			"f26": (n) => "f(conj(conj(c).z^" + (n - 1) + "/z^" + (n + 1) + "))",
			// oiseau
			"f27": (n) => "f(c.(c^" + (n + 1) + "+z^2)/z^" + (n - 1) + ")",
			"f28": (n) => "f(c.(z+z^n)/z^" + (n + 1) + ")",
			// carré
			"f29": (n) => "f(c.z^n)",
			// météorite
			// m = 4
			"f30": (n) => "f(c.(z^n+z^2)/z^" + (n - 1) + "))",
			"f31": (n) => "f(c.((z^" + (n + 1) + "+z^2)/z^" + (n - 1) + "))",
			"f32": () => "",
			// carré
			"f33": () => "f(c.(z^" + (n + 1) + "/z^" + (n - 1) + "))",
			"f34": () => "f(c.(z^n+z^2)/z^n)",
			"f38": () => "",
			"f40": () => "",
			"f45": () => "f(z^n+c/z)",
			"f46": () => "f((z^n+c)/z)",
			"f47": () => "f((z^n+c).z)",
			"f53": () => "f((z^n+c).z-z)",
			// smog
			"f54": () => "f(c+conj(z^n)+c)",
			"f57": () => "",
			"f58": () => "",
			"f59": () => "f(z^n.((z^n+c)/(z-c)^2))",
			"f60": (n) => "f((c/(z^" + (n + 1) + "+z^n)/z^" + (n - 1) + ")",
			"f61": () => "",
			"f62": () => "",
			"f63": () => "f(c+(z^n.z^-1))",
			"f64": (n) => "f(z^n+(c/conj(z^" + -n + "))",
			"f66": () => "",
			"f67": () => "",
			"f68": () => "f(c.((z/z^n+z).c))",
			"f69-1": () => "f((z^n+c)/(z^n-c))",
			"f96": () => "(|z|^n+c)/f(|z|)",
			"f69-2": () => "",
			"f69-3": () => "",
			"f70": () => "",
			"f71": () =>
				"f(c.(z^n+z^" + -n + ")/z^" + (n - 1) + ")",
			"f72": () =>
				"f((z^n+c)/z)",
			"f73": () =>
				"c+f(z^n)+c^n",
			"f74": (n) =>
				//const z2 = z.pow(n).addReal(-m + 1).getC(f);
				//z.pow(n).add(c).div(z2.pow(2));
				"(z^n+c)/f(z^n+(1-n,0))^2",
			"f75": () =>
				//z.mul(z.pow(n).getC(f).conjugate().squareDiv());
				"",
			"f76": () =>
				//const zm = z.pow(n).getC(f);
				//const z2 = z.pow(-m - 2);
				//zm.add(z2).add(c).div(zm.sub(z2).add(c));
				"",
			"f77": () =>
				//if (z.signR() !== 0) {
				//	z = c.mul(z.pow(n - 1).div(z.pow(n + 1)).conjugate().getC(f)).mul(z);
				//	c.add(c.mul(z.mul(z)));
				//}
				//null;
				"",
			"f78": () =>
				//c.mul(z.pow(n).squareDiv().addReal(1 / 32)).getC(f);
				"",
			"f79": () =>
				//z = c.pow(n).mul(z.pow(n - 1).conjugate()).mul(z).getC(f);
				//c.add(c.mul(z.mul(z)));
				"",
			"f80": () =>
				// x
				//c.mul(z.pow(n).add(z.pow(2)).squareDiv());
				"",
			"f81": () =>
				//c.pow(n).mul(z.pow(n - 1).add(z.pow(2)).div(z.pow(n + 1)).getC(f));
				"",
			"f82": () =>
				//if (z.signR() !== 0) {
				//	c.mul(z.pow(n - 1).div(z.pow(n + 1)).conjugate().getC(f)).mul(z);
				//}
				//null;
				"",
			"f83": () =>
				"f(z^n+c^n)",
			"f84": () =>
				"f((z^n+c)^n)",
			"f85": () =>
				"f((z^n+c+c))",
			"f86": () =>
				// like burning ship
				"f(|c+zn|)",
			"f87": () =>
				"f((|z|+c)^n-c)",
			"f88": () =>
				"f((|z|+c)^n+c)",
			"f89": () =>
				"f(||z|^n|+c)",
			"f90": () =>
				"f(z^n+|c|)",
			"f91": () =>
				//z.rAbs().pow(n).add(c).getC(f);
				"",
			"f93": () =>
				"f(c+z^n-z^" + (n - 1) + ")",
			"f94": (n, args) =>
				"",
			"f95": (n, args) => (args[0] === 1) ? "f(z^n-(z^" + (n + (typeof args[1] !== "undefined" ? args[1] : -1.0001)) + ")+c)" : "f(z^n-((" + (typeof args[0] !== "undefined" ? args[0] : -1) + ",0).z^" + (n + (typeof args[1] !== "undefined" ? args[1] : -1.0001)) + ")+c)",
			"f101": () => "c.cosh((z+f(z))/z^n)",
			"f102": () =>
				"f(conj(cosh(|z|^n)+c))",
			"f103": () =>
				//c.mul(z.div(z.pow(n)).cosh().getC(f).conjugate());
				"",
			"f104": () => "f(conj(cosh(|sin(z)|^n)+c))",
			"f105": () => "f(tan(c.z^n))",
			"f106": () => "f(c.conj((sin(cosh(z^n))))",
			"f107": () =>
				//c.mul(z.cosCoshSinSinh2()).pow(n).getC(f);
				"",
			"f108": () =>
				// x
				//c.mul(z.pow(n).add(z.pow(2)).squareTan()).getC(f);
				"",
			"f109": () =>
				//c.mul(z.pow(n).add(z.pow(2)).expDivSinh()).getC(f);
				"",
			"f110": () =>
				//z.mul(c.mul(z).expDiv()).conjugate().getC(f);
				"",
			"f111": () =>
				//z.conjugate().cosCoshSinSinh2().mul(z.pow(n)).add(c).getC(f);
				"",
			"f112": () =>
				//c.mul(z.pow(n).expDiv()).getC(f);
				//c.pow(-m).mul(z.pow(n + 1).add(z.pow(2)).div(z.pow(n - 1)).cot());
				"",
			"f113": () =>
				//c.conjugate().mul(z.pow(n - 1).div(z.pow(n + 1)).cos()).mul(c).squareTan().conjugate().getC(f);
				"",
			"f114": () =>
				//c.add(z.pow(n).mul(z.pow(-1))).squareTan().getC(f);
				"",
			"f115": () =>
				//c.mul(z.pow(n).squareTan()).getC(f);
				"",
			"f116": () =>
				//const zm = z.pow(n);
				//c.add(zm.add(zm).squareAtan()).getC(f);
				"",
			"f117": () =>
				//c.mul(z.pow(n).add(z.pow(2)).squareAtan()).getC(f);
				"",
			"f118": () =>
				"f(z^n+c+" + args[0] + ")",
			"f119": (n, args, c) => "(" + args[0] + "," + args[1] + ").z^n+c",
			"f120": () =>
				"c^n+z",
			"f121": () =>
				"",
			"f122": () =>
				"f(z).pow(n).mul(c)",
			"f123": () =>
				"c^c+f(z)^n+c"
		};
		if (functions[name]) {
			const cValue = (c !== null) ? " with c = (" + c.r + "," + c.i + ")" : "";

			const definition = (functions[name](n, args, c));
			if (typeof definition == 'string') {
				const returnValue =
					this.replaceAllOccurrences(
						this.replaceAllOccurrences(definition,
							"f(", f + "(").trim(),
						"^n", '^' + n + "");
				return this.removeParentheses(returnValue + cValue);
			}
		}
		return "";
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
	//z = (z^3)/(1 + z x z) + c 
}

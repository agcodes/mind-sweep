export default class ColorsService {
	addColors(colors) {
		const color = [0, 0, 0];
		for (let j = 0; j < color.length; j++) {
			for (let index = 0; index < colors.length; index++) {
				color[j] += (colors[index][j]);
			}
		}
		for (let j = 0; j < color.length; j++) {
			if (color[j] > 255) {
				color[j] = 0;
			}
		}
		return color;
	}
	degree_2_radian(deg) {
		return deg * (Math.PI / 180);
	}

	// luminosity - chroma - hue
	lchToRgb(lch) {
		const [L, C, H] = lch;

		const a = Math.cos(this.degree_2_radian(H)) * C;
		const b = Math.sin(this.degree_2_radian(H)) * C;

		let var_Y = (L + 16) / 116;
		let var_X = a / 500 + var_Y;
		let var_Z = var_Y - b / 200;

		const labToXyz = (v) => (v > 0.008856) ? Math.pow(v, 3) : (v - 16 / 116) / 7.787;

		var_Y = labToXyz(var_Y);
		var_X = labToXyz(var_X);
		var_Z = labToXyz(var_Z);

		const ref_X = 95.047, ref_Y = 100.000, ref_Z = 108.883;

		const X = ref_X * var_X;
		const Y = ref_Y * var_Y;
		const Z = ref_Z * var_Z;

		const xyzToRgb = (X, Y, Z) => {
			const R = X * 3.2406 + Y * -1.5372 + Z * -0.4986;
			const G = X * -0.9689 + Y * 1.8758 + Z * 0.0415;
			const B = X * 0.0557 + Y * -0.2040 + Z * 1.0570;

			const gammaCorrect = (v) => v > 0.0031308 ? 1.055 * Math.pow(v, 1 / 2.4) - 0.055 : 12.92 * v;

			return [gammaCorrect(R), gammaCorrect(G), gammaCorrect(B)];
		};

		const [var_R, var_G, var_B] = xyzToRgb(X / 100, Y / 100, Z / 100);

		return [
			Math.round(Math.min(Math.max(var_R * 255, 0), 255)),
			Math.round(Math.min(Math.max(var_G * 255, 0), 255)),
			Math.round(Math.min(Math.max(var_B * 255, 0), 255))
		];
	}

	lchToHsl(lch) {
		return this.rgbToHsla(this.lchToRgb(lch));
	}
	hslToRgbText(hsl) {
		return this.rgbText(this.hslToRgb(hsl));
	}
	relativeRgb(rgb) {
		return [Math.round(rgb[0]) / 255, Math.round(rgb[1]) / 255, Math.round(rgb[2]) / 255];
	}
	rgbText(rgb) {
		if (rgb.length === 4) {
			return `rgba(${Math.round(rgb[0])},${Math.round(rgb[1])},${Math.round(rgb[2])},${Math.round(rgb[3])})`;
		}
		return `rgb(${Math.round(rgb[0])},${Math.round(rgb[1])},${Math.round(rgb[2])})`;
	}
	rgbToIntColor(rgb) {
		// Convert each RGB component to hexadecimal
		const hexR = rgb[0] << 16;
		const hexG = rgb[1] << 8;
		const hexB = rgb[2];

		// Combine the hexadecimal values into a single integer
		return hexR | hexG | hexB;
	}
	rgbToHex(rgb) {
		const componentToHex = function (c) {
			const hex = c.toString(16);
			return hex.length === 1 ? `0${hex}` : hex;
		};
		return `#${componentToHex(rgb[0])}${componentToHex(rgb[1])}${componentToHex(rgb[2])}`;
	}
	rgbToHsl(rgb) {
		if (rgb === null) {
			return null;
		}

		const r = rgb[0] / 255;
		const g = rgb[1] / 255;
		const b = rgb[2] / 255;

		const max = Math.max(r, g, b),
			min = Math.min(r, g, b);
		let h = (max + min) / 2;
		let s = 0;
		const l = (max + min) / 2;

		if (max === min) {
			h = 0;
		} else {
			const d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			switch (max) {
				case r:
					h = (g - b) / d + (g < b ? 6 : 0);
					break;
				case g:
					h = (b - r) / d + 2;
					break;
				case b:
					h = (r - g) / d + 4;
					break;
			}
			h = h * 60;
		}
		return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
	}
	hslToHex(hsl) {
		return this.rgbToHex(this.hslToRgb(hsl));
	}
	getRandomHueColor(s, l) {
		return this.hslToRgb([Math.floor(Math.random() * 360), s, l]);
	}
	hslToRgba(hsla) {
		const a = (typeof hsla[3] == "undefined") ? 100 : hsla[3];
		const color = this.hslToRgb(hsla);
		color[3] = a;
		return color;
	}
	rgbToHsla(rgb) {
		const a = (typeof rgb[3] == "undefined") ? 100 : rgb[3];
		const color = this.rgbToHsl(rgb);
		color[3] = a;
		return color;
	}
	hslToRgb(hsl) {
		if (hsl === null) {
			return null;
		}

		let r, g, b, m, c, x;
		let h = parseInt(hsl[0], 10);
		if (h < 0) {
			h = h * -1;
		}

		if (h > 360) {
			h = Math.floor(h % 360) + 1;
		}

		let s = parseInt(hsl[1], 10);
		let l = parseInt(hsl[2], 10);

		if (!isFinite(h)) h = 0;
		if (!isFinite(s)) s = 0;
		if (!isFinite(l)) l = 0;

		h /= 60;
		if (h < 0) {
			h = 6 - (-h % 6);
		}

		h %= 6;

		s = Math.max(0, Math.min(1, s / 100));
		l = Math.max(0, Math.min(1, l / 100));

		c = (1 - Math.abs((2 * l) - 1)) * s;
		x = c * (1 - Math.abs((h % 2) - 1));

		if (h < 1) {
			r = c;
			g = x;
			b = 0;
		} else if (h < 2) {
			r = x;
			g = c;
			b = 0;
		} else if (h < 3) {
			r = 0;
			g = c;
			b = x;
		} else if (h < 4) {
			r = 0;
			g = x;
			b = c;
		} else if (h < 5) {
			r = x;
			g = 0;
			b = c;
		} else {
			r = c;
			g = 0;
			b = x;
		}

		m = l - c / 2;
		r = Math.round((r + m) * 255);
		g = Math.round((g + m) * 255);
		b = Math.round((b + m) * 255);

		if (hsl.length >= 4 && typeof hsl[3] === "number" && hsl[3] !== Infinity) {
			if (hsl[3] > 100) {
				hsl[3] = 100;
			}
			if (hsl[3] < 0) {
				hsl[3] = 0;
			}
			return [r, g, b, hsl[3] * 255 / 100];
		}

		return [r, g, b];
	}
	hexToRgb(hex) {
		if (hex === null || typeof hex === "undefined") {
			return null;
		}
		if (hex.length > 7) {
			hex = hex.substring(0, 6);
		}
		for (let index = 0; index < 6; index++) {
			if (hex.length < 6) {
				hex = `0${hex}`;
			} else {
				break;
			}
		}

		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
	}
	numberToRgb(number) {
		return this.hexToRgb(this.decimalToHexString(number));
	}
	decimalToHexString(number) {
		if (number < 0) {
			number = 0xFFFFFFFF + number + 1;
		}
		return `#${number.toString(16).toUpperCase()}`;
	}
	setPointsPerlinNoiseColor(pts, h, s, l, dh, ds, dl) {
		for (let index = 0; index < pts.length; index++) {
			pts[index][3] = this.getPerlinNoiseColor(pts[index], h, s, l, dh, ds, dl);
		}
		return pts;
	}
	getPerlinNoiseColor(pt, h, s, l, dh, ds, dl) {
		if (pt !== null) {
			return this.hslToRgb([
				h + dh * this.noise2d(pt[0], pt[1]),
				s + ds * this.noise2d(pt[0], pt[1]),
				l + dl * this.noise2d(pt[0], pt[1])
			])
		}
		return [0, 0, 0];
	}
	noise2d(x, y) {
		return this.smoothNoise(this.smoothNoise(x) * 850000 + y);
	}
	linearInterpolate(a, b, t) {
		return (1. - t) * a + t * b;
	}
	smoothNoise(x) {
		//Bruit du point précédent
		//Bruit du point suivant
		//Interpolation :
		return this.linearInterpolate(this.randNoise(x), this.randNoise(x + 1), 0);
	}
	//Fournit une valeur aléatoire entre -1 et 1
	randNoise(t) {
		//t = (t << 13) ^ t;
		return (1.0 - (((t * (t * t * 15731 + 889221) + 1376312589)) & 0x7fffffff) / 1073741824.0 + 1.) / 2;
	}
	lerpForPoint(x, y, t) {
		const pi = Math.PI;
		return this.lerp((Math.cos(t * 2 * pi) + 1) / 2, x * Math.sin(t * 2 * pi), y) * -1;
	}
	lerp(v0, v1, amt, maxMove = 0, minDiff = 0.0001) {
		let diff = v1 - v0;
		if (maxMove > 0) {
			diff = Math.min(diff, maxMove);
			diff = Math.max(diff, -maxMove);
		}
		if (Math.abs(diff) < minDiff) {
			return v1;
		}
		return v0 + diff * amt;
	}
	isWhite(rgb) {
		return rgb[0] == 255 && rgb[1] == 255 && rgb[1] == 255;
	}
	getIndexColorRgb(color, k, rules) {

		if (typeof rules == "undefined") {
			rules = ["i", "i", "i", "i"];
		}
		else if (rules.length == 1) {
			rules = [rules[0], rules[0], rules[0], rules[0]];
		}

		if (k.length == 1) {
			k = [k[0], k[0], k[0], k[0]];
		}

		const hsla = [color[0], color[1], color[2], color[3]];
		for (let j = 0; j < 4; j++) {
			if (typeof color[j + 4] != "undefined" && color[j + 4] != 0) {
				if (rules[j] == "abslog") {
					hsla[j] += Math.abs(Math.log(k[j])) * color[j + 4];
				}
				else if (rules[j] == "log") {
					hsla[j] += Math.log(k[j]) * color[j + 4];
				}
				else {
					hsla[j] += k[j] * color[j + 4];
				}
			}

			if (j > 0 && hsla[j] > 100) {
				hsla[j] = 100;
			}
		}
		return this.hslToRgb(hsla);
	}
}

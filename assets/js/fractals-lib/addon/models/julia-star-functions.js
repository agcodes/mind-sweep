export default class JuliaStarFunctions {
    getFunction(name) {
        const functions = {
            // d.z+cP
            "1": (z, params) => z.mulReal(params.d).add(params.cP).getC(params.f),
            "2": (z, params) => z.pow(params.n).addReal(params.b).mul(params.cP).add(z).getC(params.f),
            "3": (z, params) => z.pow(params.n).add(params.cP).getC(params.f),
            "4": (z, params) => z.mulReal(params.d).addReal(params.b).add(params.c1).getC(params.f),
            "5": (z, params) => z.pow(params.n).getC(params.f).addReal(params.b).mulReal(params.d),
            // d.z^n
            "6": (z, params) => z.pow(params.n).mulReal(params.d).getC(params.f),
            "7": (z, params) => z.addReal(params.b).pow(params.n).add(params.c1).getC(params.f),
            "8": (z, params) => z.pow(params.n).add(params.c1.add(z.pow(params.n / 2))).sub(params.c1).getC(params.f),
            "9": (z, params) => z.pow(params.n).addReal(params.b).getC(params.f),
            "10": (z, params) => z.addReal(params.b).pow(params.n).addReal(-params.b).getC(params.f),
            "11": (z, params) => z.mulReal(params.b).pow(params.n).addReal(params.b).getC(params.f),
            "12": (z, params) => z.mulReal(params.d).pow(params.n).getC(params.f).addReal(params.b),
            "13": (z, params) => (z.pow(params.n).add(params.c1)).mul(z).getC(params.f),
            "14": (z, params) => z.pow(params.n).pow(params.n + 1).add(params.c1).getC(params.f),
            "15": (z, params) => z.pow(params.n).pow(params.n + 1).mulReal(params.d).getC(params.f),
            "16": (z, params) => z.pow(params.n).sub(z).add(params.c1).getC(params.f),
            "17": (z, params) => z.pow(params.n).add(z).getC(params.f),
            "20": (z, params) => z.pow(params.n).addReal(params.b).getC(params.f).abs(),
            "21": (z, params) => z.getC(params.f).pow(params.n).add(params.c1),
            "22": (z, params) => z.pow(params.n).addReal(params.b).sin().getC(params.f),
            "23": (z, params) => (z.pow(params.n).conjugate()).addReal(params.b).getC(params.f),
            // z^2.c1+b
            "24": (z, params) => z.pow(params.n).mul(params.c1).addReal(params.b).getC(params.f),
            "25": (z, params) => z.pow(params.n).addReal(params.b).add(params.c1).getC(params.f),
            "26": (z, params) => z.getC(params.f).pow(params.n).addReal(params.b),
            "27": (z, params) => z.pow(params.n).getC(params.f).sub(params.c1.pow(params.n)),
            "28": (z, params) => z.sin().getC(params.f).pow(params.n).addReal(params.b),
            "29": (z, params) => z.pow(params.n).addReal(params.b).add(params.c1).cos().getC(params.f),
            "30": (z, params) => z.pow(params.n).addReal(params.b).add(params.c1).getC(params.f),
            "31": (z, params) => z.pow(params.n).addReal(params.b).add(params.c1).getC(params.f).mulReal(params.d),
            "32": (z, params) => z.pow(params.n).addReal(params.b).getC(params.f).mulReal(params.d).sin().add(params.c1),
            "33": (z, params) => z.sin().pow(params.n).addReal(params.b).getC(params.f).mulReal(params.d),
            "34": (z, params) => z.sin().pow(params.n).addReal(params.b).div(params.cP).mulReal(params.d).getC(params.f),
            "35": (z, params) => z.sin().pow(params.n).addReal(params.b).sin().div(params.cP).mulReal(params.d),
            "36": (z, params) => z.sin().pow(params.n).addReal(params.b).sin().div(params.cP).mulReal(params.d).conjugate(),
            "37": (z, params) => z.sin().pow(params.n).addReal(params.b).div(params.cP).mulReal(params.d).conjugate().cos(),
            "38": (z, params) => z.cot().pow(params.n).addReal(params.b).mulReal(params.d).csc(),
            "39": (z, params) => z.sin().tan().pow(params.n).addReal(params.b),
            "40": (z, params) => z.cos().tan().pow(params.n).addReal(params.b).getC(params.f),
            "41": (z, params) => z.abs().pow(params.n).addReal(params.b).getC(params.f),
            "42": (z, params) => z.abs().pow(params.n).getC(params.f).div(params.cP.abs()).add(params.c1),
            "43": (z, params) => (z.abs().getC(params.f).pow(params.n).add(params.c1)).add(params.c1.powComplex(params.c1)),
            "44": (z, params) => (z.pow(params.n).mulReal(params.d).expComplex())
        }
        return functions[name];
    }
}
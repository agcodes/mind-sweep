import Color from "./color";

export default class Palette {

    constructor() {
        this._palette = [];
    }


    // Set palette colours
    create(size, colours) {
        if (colours.length < 2) {
            throw "Merci d'indiquer au moins deux couleurs pour construire une palette.";
        }

        var ip = 0,
            ic = 0,
            offsetColor = 0,
            nbColor = size,
            cStep = new Color(),
            cCurrent = new Color(),
            cPrevious = new Color(),
            nbColorKey = colours.length;

        for (; ic < nbColorKey; ic++) {
            cCurrent = colours[ic];

            if (!(cCurrent instanceof Color)) {
                throw "La liste de couleurs doit comporter uniquement des instance de la classe Color.";
            }

            if (ic < 1) {
                cPrevious.copy(cCurrent);
                continue; // Skip the first loop
            }

            // Step between each color value
            nbColor = offsetColor; // Recycle nbColor var temporarly
            offsetColor = parseInt(size / 100 * cCurrent.p);
            nbColor = offsetColor - nbColor; // set number of step
            cStep = new Color((cCurrent.r - cPrevious.r) / nbColor, (cCurrent.g - cPrevious.g) / nbColor, (cCurrent.b - cPrevious.b) / nbColor, (cCurrent.a - cPrevious.a) / nbColor);

            // Add new interpolated color
            for (; ip < offsetColor; ip++) {
                cPrevious.add(cStep);
                this._palette.push(new Color(cPrevious));
            }

            cPrevious.copy(cCurrent);
        }
    }

    getColor(index) {
        if (index >= this._palette.length) {
            index = this._palette.length - 1;
        } else if (index < 0) {
            index = 0;
        }

        return this._palette[index];
    }

    toUint8Array() {
        var nbColor = this._palette.length,
            i = 0,
            color = null,
            offset = 0,
            buffer = new ArrayBuffer(nbColor * 4),
            buf8 = new Uint8Array(buffer);

        for (; i < nbColor; i++) {
            color = this._palette[i];
            buf8[offset++] = color.r;
            buf8[offset++] = color.g;
            buf8[offset++] = color.b;
            buf8[offset++] = color.a;
        }

        return buf8;
    }
}
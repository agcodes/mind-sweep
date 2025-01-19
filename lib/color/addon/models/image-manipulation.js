export default class ImageManipulation {
  constructor() {
    this.indiceColor = 1;
    this.dir = 1;
  }
  changeLuminosity(data) {
    this.indiceColor += this.dir;
    if (this.indiceColor > 255) {
      this.dir = -1;
    }
    if (this.indiceColor < 1) {
      this.dir = 1;
    }
    /* const color = []; */

    //const color = [Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255), 255];
    for (let i = 0; i < data.length; i += 4) {
      if (data[i] !== 0) {
        if (i % 2 === 0) {
          const data0 = data[i];
          const data1 = data[i + 1];
          const data2 = data[i + 2];
          if (data[i] > 0) {
            data[i] = data0 + this.dir; // RED

          }
          if (data[i + 1] > 0) {
            data[i + 1] = data1 + this.dir; // GREEN
          }

          if (data[i + 2] > 0) {
            data[i + 2] = data2 + this.dir;
          }

          data[i + 3] = 255;
        }
      }
    }

    return data;
  }
  changeColor(data, colorsService) {
    this.indiceColor += this.dir;
    if (this.indiceColor > 55) {
      this.dir = -1;
    }
    if (this.indiceColor < -55) {
      this.dir = 10;
    }

    for (let i = 0; i < data.length; i += 4) {
      if (data[i] !== 0) {
        const rgb = [data[i], data[i + 1], data[i + 2]];
        const hsl = colorsService.rgbToHsl(rgb);
        hsl[0] = hsl[0] + this.dir;

        const rgb2 = colorsService.hslToRgb(hsl);
        data[i] = rgb2[0]; // RED
        data[i + 1] = rgb2[1]; // GREEN
        data[i + 2] = rgb2[2]; // BLUE
        //data[i + 3] = 255;
      }
    }
    return data;
  }
  changeColor3(data) {
    this.indiceColor += this.dir;
    if (this.indiceColor > 55) {
      this.dir = -2;
    }
    if (this.indiceColor < -55) {
      this.dir = 2;
    }
    //let r = Math.floor(Math.random() * 3);
    for (let i = 0; i < data.length; i += 4) {
      if (data[i] !== 0) {
        data[i + 1] = data[i + 2] + this.dir; // GREEN
        data[i + 2] = data[i + 1] + this.dir; // BLUE
      }
    }
    return data;
  }
  changeRgb(data, rgb) {
    for (let i = 0; i < data.length; i += 4) {
      if (data[i] !== 0) {
        if (i % 2 === 0) {
          data[i] = (rgb[0] !== null) ? rgb[0] : data[i]; // RED
          data[i + 1] = (rgb[1] !== null) ? rgb[1] : data[i + 1]; // GREEN
          data[i + 2] = (rgb[2] !== null) ? rgb[2] : data[i + 2]; // BLUE
          data[i + 3] = (rgb[3] !== null) ? rgb[3] : 255;
        }
      }
    }
    return data;
  }
  changeColor2(data) {
    this.indiceColor += this.dir;
    if (this.indiceColor > 55) {
      this.dir = -4;
    }
    if (this.indiceColor < -55) {
      this.dir = 4;
    }
    for (let i = 0; i < data.length; i += 4) {
      if (data[i] !== 0) {
        if (i % 2 === 0) {
          data[i + 1] = data[i + 1] + this.dir; // GREEN
          data[i + 2] = data[i + 2] + this.dir; // BLUE
          data[i + 3] = 255;
        }
      }
    }
    return data;
  }
}

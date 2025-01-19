import {
    LineBasicMaterial,
    ArrowHelper,
    AmbientLight,
    PointLight,
    Vector2,
    Vector3,
    AxesHelper,
    ColorManagement,
    DirectionalLight,
    DoubleSide,
    PointsMaterial,
    BufferGeometry,
    Float32BufferAttribute,
    Points,
    Mesh,
    MeshBasicMaterial,
    MeshPhongMaterial,
    LineSegments,
    BoxGeometry,
    SphereGeometry,
    BoxHelper,
    Line,
    SRGBColorSpace,
    CatmullRomCurve3,
    Shape,
    ExtrudeGeometry,
    MeshLambertMaterial,
    FlatShading,
    VertexColors,
    MOUSE
} from 'three';

import ParametricGeometry from './ParametricGeometry';

export default class Draw3dService {
    scene = null;
    pX = 10;
    convertZ = true;
    limitWidth = 0;
    limitHeight = 0;
    setLimits(w, h) {
        this.limitWidth = w;
        this.limitHeight = h;
    }
    addObject(obj) {
        if (this.scene && this.scene.isScene) {
            this.scene.add(obj);
            return true;
        }
        return false;
    }
    drawSphere(color, size) {
        const obj = this.getSphere(color, size);
        return this.addObject(obj);
    }

    getSphere(color, size) {
        // obj.castShadow = true;
        return new Mesh(
            new SphereGeometry(size, 10, 32),
            new MeshPhongMaterial({
                color: color,
                transparent: false,
                opacity: 1,
                castShadow: true,
            }),
        );
    }
    addDirectionalLight(color, intensity) {
        const light = new DirectionalLight(color, intensity);
        light.position.set(0, 1, 0).normalize();
        return this.addObject(light);
    }
    addAmbientLight(color, intensity) {
        // "white"
        return this.addObject(new AmbientLight(color, intensity));
    }
    drawLine(pts, color, convert) {
        if (convert === true) {
            pts = this.convertPoints(pts, this.limitWidth, this.limitHeight, false);
        }
        const vectors = [];

        for (let i = 0; i < pts.length; i++) {
            vectors.push(new Vector3(pts[i][0], pts[i][1], pts[i][2]));
        }

        return this.addObject(
            new Line(
                new BufferGeometry().setFromPoints(vectors),
                new LineBasicMaterial({
                    color: color,
                    // 'side: DoubleSide' means the line will be visible from both sides.
                    side: DoubleSide,
                    // 'opacity: 1' sets the opacity of the line to 100%.
                    opacity: 1,
                    // enables fog in the scene for the line.
                    fog: true,
                }),
            ),
        );
    }
    drawPoints(pts, color, size, convert, inverseY, multiColor, opacity) {
        if (convert === true) {
            pts = this.convertPoints(
                pts,
                this.limitWidth,
                this.limitHeight,
                inverseY,
            );
        }

        const vertices = pts
            .map((pt) => {
                if (pt[2] === null) {
                    pt[2] = 0;
                }
                return pt.slice(0, 3);
            })
            .flat();

        const geometry = new BufferGeometry();
        geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
        if (multiColor) {
            const colorsArray = pts.map((pt) => pt[3]).flat();
            if (colorsArray.length == pts.length * 3) {
                geometry.setAttribute(
                    'color',
                    new Float32BufferAttribute(colorsArray, 3),
                );
                this.addObject(
                    new Points(
                        geometry,
                        new PointsMaterial({
                            vertexColors: true,
                            size: size,
                            fog: false,
                            transparent: false
                        }),
                    ),
                );
            }
        } else if (color && typeof opacity !== 'undefined') {
            this.addObject(
                new Points(
                    geometry,
                    new PointsMaterial({
                        color: color,
                        size: size,
                        transparent: true,
                        opacity: opacity,
                    }),
                ),
            );
        } else if (color) {
            this.addObject(
                new Points(
                    geometry,
                    new PointsMaterial({
                        color: color,
                        size: size,
                    }),
                ),
            );
        }
        geometry.dispose();
        return true;
    }
    drawPoint(pt, color, size) {
        const bufferGeometry = new BufferGeometry();
        bufferGeometry.setAttribute(
            'position',
            new Float32BufferAttribute([pt[0], pt[1], pt[2]], 3),
        );

        return this.addObject(
            new Points(
                bufferGeometry,
                new PointsMaterial({
                    color: color,
                    size: size,
                }),
            ),
        );
    }
    drawCubes(pts, color) {
        const geometry = new BoxGeometry(0.04, 0.04);
        const material = new MeshPhongMaterial({
            color: color,
            transparent: false,
            opacity: 1,
            castShadow: true,
        });

        for (let i = 0; i < pts.length; i++) {
            const cube = new Mesh(geometry, material);
            cube.position.set(pts[i][0], pts[i][1], pts[i][2]);
            this.addObject(cube);
        }
        return true;
    }
    drawBoxHelper() {
        const sphere = new SphereGeometry();
        const object = new Mesh(sphere, new MeshBasicMaterial(0xff0000));
        const box = new BoxHelper(object, 0xffff00);
        return this.addObject(box);
    }
    drawArrowHelper() {
        const dir = new Vector3(1, 2, 0);

        //normalize the direction vector (convert to vector of length 1)
        dir.normalize();

        const origin = new Vector3(0, 0, 0);
        const length = 1;
        // yellow
        const hex = 0xffff00;

        const arrowHelper = new ArrowHelper(dir, origin, length, hex);
        return this.addObject(arrowHelper);
    }
    drawAxesHelper() {
        const axesHelper = new AxesHelper(5);
        return this.addObject(axesHelper);
    }
    drawMultiColorsPath(pts, convert) {
        if (convert === true) {
            pts = this.convertPoints(pts, this.limitWidth, this.limitHeight, false);
        }

        const vectors = pts.map(
            (point) => new Vector3(point[0], point[1], point[2]),
        );

        const numSegments = vectors.length; // Augmentez ce nombre si nécessaire
        const geometry = new BufferGeometry().setFromPoints(vectors, numSegments);

        // Create an array to store the color for each vertex of the line
        const colors = pts.map((point) => point[3]);
        const colorsArray = colors.flat();

        // Set colors attribute to the geometry
        geometry.setAttribute('color', new Float32BufferAttribute(colorsArray, 3));

        // Create LineSegments with LineBasicMaterial for a continuous line

        return this.addObject(
            new LineSegments(
                geometry,
                new LineBasicMaterial({
                    vertexColors: true,
                    opacity: 1,
                    fog: true,
                }),
            ),
        );
    }
    convertPoints(pts, w, h, inverseY) {
        return pts.map((point) => this.convertPoint(point, w, h, inverseY, 1000));
    }
    convertPoint(pt, w, h, inverseY, d) {
        const p = this.pX * 1.2;
        pt[0] = Math.round(((pt[0] / w) * p * 2 - p) * d) / d;
        pt[1] = Math.round(((pt[1] / h) * p * 2 - p) * d) / d;

        if (this.convertZ === true && pt[2]) {
            pt[2] = Math.round(((pt[2] / h) * p * 2 - p) * d) / d;
        }

        if (inverseY === true) {
            pt[1] = pt[1] * -1;
        }
        return pt;
    }
    addParametricSurface(f, slices, stacks, color) {
        // Create surface mesh
        return this.addObject(
            new Mesh(
                new ParametricGeometry(f, slices, stacks),
                new MeshPhongMaterial({ color: color, wireframe: true }),
            ),
        );
    }
    setGammaColor() {
        // ???
        this.renderer.gammaFactor = 2.2;
        ColorManagement.enabled = true;
        this.renderer.outputColorSpace = SRGBColorSpace;
        const light = new PointLight(0xffffff, 1); // lumière blanche avec une intensité de 1
        this.addObject(light);
    }
    drawCatmullRomCurve(pts, color, convert) {
        if (convert === true) {
            pts = this.convertPoints(pts, this.limitWidth, this.limitHeight, false);
        }
        const vectors = [];

        if (pts.length==0){
            return true;
        }
        for (let i = 0; i < pts.length; i++) {
            if (pts[i][0]
                && pts[i][0]
                && pts[i][1]
                && pts[i][2]
                && pts[i][0] != Infinity
                && pts[i][1] != Infinity
                && pts[i][2] != Infinity
                && pts[i][0] != -Infinity
                && pts[i][1] != -Infinity
                && pts[i][2] != -Infinity
                && !isNaN(pts[i][0])
                && !isNaN(pts[i][1])
                && !isNaN(pts[i][2])) {
                vectors.push(new Vector3(pts[i][0], pts[i][1], pts[i][2]));
            }
        }

        const spline = new CatmullRomCurve3(vectors);
        spline.type = 'catmullrom';
        spline.tension = 0.5;

        const extrudeSettings = {
            steps: Math.floor(vectors.length/2),
            bevelEnabled: false,
            extrudePath: spline
        };

        const shaped = [];
        const width = 0.03;

        shaped.push(new Vector2(0, 0));
        shaped.push(new Vector2(width, 0));
        shaped.push(new Vector2(width, width));
        shaped.push(new Vector2(0, width));

        const shape = new Shape(shaped);
        const geometry = new ExtrudeGeometry(shape, extrudeSettings);
        const material = new MeshBasicMaterial({
            color: color
        });

        /*const material = new MeshLambertMaterial({
            color: 0xff0000,
            flatShading: true,
            vertexColors: false
        });*/
        const mesh = new Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = false;
        this.addObject(mesh);
        return true;
    }
    drawCatmullRomCurve_(points, convert) {
        const scale = 1;
        const vectors = [];
        if (convert === true) {
            points = this.convertPoints(points, this.limitWidth, this.limitHeight, false);
        }
        for (let i = 0; i < points.length; i++) {
            if (points[i][0] && points[i][1]) {
                // add new vector to the geometry
                vectors.push(new Vector3(points[i][0] * scale, points[i][1] * scale, points[i][2] * scale));
            }
        }
    }
}
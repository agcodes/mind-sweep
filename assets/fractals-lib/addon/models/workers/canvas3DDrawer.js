
////////////////////////////////////////////////////////////////////////////////
// =============================================================================
////////////////////////////////////////////////////////////////////////////////
/*
 *    Classe de dessin dans un context WebGL
 *    Need : gl-matrix-min.js
 *
 */
export default class Canvas3DDrawer {

    constructor(id, undefined) {
        // Internal list type with last function to Array object

        // -----------------------------------------------------
        // Internal List 
        this._me = this;
        this._pool = {
            'shaders': [],
            'vbo': [],
            'ibo': [],
            'cbo': [],
            'normals': [],
            'uv': [],
            'light': [],
            'textures': [],
            lastOf: function (a) {
                return (a instanceof Array) ? a[a.length - 1] : null;
            }
        };

        this._width;
        this._height;
        this._time = 0;
        this._deltatime = 0;

        // Create context
        this._canvas = (id) ? document.getElementById(id) : null,
        this._gl = null;

        this._gl = this._canvas.getContext("webgl") || this._canvas.getContext("experimental-webgl");

        // Init matrix
        this._gl.matrix = {
            projection: mat4.create(),
            view: mat4.create()
        };

        // -----------------------------------------------------
        // expose context 
        this.context = this._gl;


        ////////////////////////////////////////////////////////////////////
        // Structure Helper
        this.vec2 = { 'x': 0, 'y': 0 };


        // keep current size
        this._width = this.getWidth();
        this._height = this.getHeight();


        // -----------------------------------------------------
        // Init viewport to match canvas size
        this._gl.viewport(0, 0, this._width, this._height);
        this._gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);

        this.timeTicks = function () {
            if (this._time) {
                this._deltatime = new Date().getTime() - this._time;
            }
            this._time = new Date().getTime();
        }


        // -----------------------------------------------------
        // Draw method!
        this._frame = 0;
    }

    // -----------------------------------------------------
    // width : the number of physical device pixels per row
    getWidth = function () {
        return this._canvas.width;
    }

    // height : the number row
    getHeight = function () {
        return this._canvas.height;
    }

    // -----------------------------------------------------
    // Shaders Loader
    loadShaders(shaders, callback) {
        const that = this;
        // Derived from ANDREA GIAMMARCHI function
        // (C) WebReflection - Mit Style License
        // greetings to ANDREA GIAMMARCHI ;)
        function onreadystatechange() {
            var xhr = this,
                i = xhr.i;
            if (xhr.readyState == 4) {
                var shaderType = shaders[i].slice(8, 10), // TODO get type without using shader name
                    shaderId = that.addShader(xhr.responseText, shaderType);
                !--length && typeof callback == "function" && callback({ 'id': shaderId, 'type': shaderType, 'name': shaders[i] });
            }
        }

        for (var shaders = [].concat(shaders),
            asynchronous = !!callback,
            i = shaders.length,
            length = i,
            xhr;
            i--;
        ) {
            (xhr = new XMLHttpRequest).i = i;
            xhr.open("get", shaders[i], asynchronous);
            if (asynchronous) {
                xhr.onreadystatechange = onreadystatechange;
            }
            xhr.send(null);
            onreadystatechange.call(xhr);
        }
        return shaders;
    }

    // set a new Shader
    // @param source a Shader source
    // @param type 'vs' for Vertex Shader and 'fs' for Fragment Shader
    // Return id of the shader
    addShader(source, type) {
        // Compil
        var id = 0,
            shaderType = (type == "fs") ? this._gl.FRAGMENT_SHADER : this._gl.VERTEX_SHADER,
            shader = this._gl.createShader(shaderType);

        this._gl.shaderSource(shader, source);
        this._gl.compileShader(shader);

        if (!this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS))
            throw this._gl.getShaderInfoLog(shader);
        // Store
        this._pool.shaders.push(shader);
        return this._pool.shaders.length - 1;
    }

    // set a new Vertex Shader
    // @param source a Shader source
    // Return id of the shader
    addVShader(source) {
        return this.addShader(shader, 'vs');
    }

    // set a new Fragment Shader
    // @param source a Shader source
    // Return id of the shader
    addFShader(source) {
        return this.addShader(shader, 'fs');
    }

    // get a registred Shader
    // Return a compiled shader
    getShader(id) {
        return (id > -1 && id < this._pool.shaders.length) ? this._pool.shaders[id] : null;
    }

    // link and activate a shader program
    setShaderProgram(vsid, fsid) {
        var vs = this.getShader(vsid),
            fs = this.getShader(fsid);

        this._gl.shader = {
            program: this._gl.createProgram(),
            uniforms: {},
            attribs: {}
        };

        this._gl.attachShader(this._gl.shader.program, vs);
        this._gl.attachShader(this._gl.shader.program, fs);

        // Link shader program
        this._gl.linkProgram(this._gl.shader.program);

        if (!this._gl.getProgramParameter(this._gl.shader.program, this._gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        // Activate program
        this._gl.useProgram(_gl.shader.program);

        // Bind common parameters
        this.bindUniformParameter('uTime');
        this.bindUniformParameter('uMouse');
        this.bindUniformParameter('uResolution');
        this.bindUniformParameter('uBackbuffer');
        this.bindUniformParameter('uSurfaceSize');

        // Enable Attribute
        this.bindAttribParameter('aVertexPosition', 0);
        this._gl.enableVertexAttribArray(this._gl.shader.attribs['aVertexPosition']);
    }

    // Bind uniform shader variable
    bindUniformParameter(label) {
        if (this._gl.shader.uniforms === undefined) {
            this._gl.shader.uniforms = {};
        }
        if (this._gl.shader.uniforms[label] === undefined) {
            this._gl.shader.uniforms[label] = this._gl.getUniformLocation(this._gl.shader.program, label);
        }
    }

    // Bind attribute shader variable
    bindAttribParameter(label, index) {
        if (this._gl.shader.attribs === undefined) {
            this._gl.shader.attribs = {};
        }
        if (this._gl.shader.attribs[label] === undefined) {
            this._gl.bindAttribLocation(this._gl.shader.program, index, label);
            this._gl.shader.attribs[label] = this._gl.getAttribLocation(_gl.shader.program, label);
        }
    }

    // Set an uniform integer parameter binded into shader
    setUniformInteger(name, v1, v2, v3, v4) {
        if (this._gl.shader.uniforms[name] === undefined) {
            this.bindUniformParameter(name);
        }
        if (v4 !== undefined) {
            this._gl.uniform4i(this._gl.shader.uniforms[name], v1, v2, v3, v4);
        } else if (v3 !== undefined) {
            this._gl.uniform3i(this._gl.shader.uniforms[name], v1, v2, v3);
        } else if (v2 !== undefined) {
            this._gl.uniform2i(this._gl.shader.uniforms[name], v1, v2);
        } else if (v1 !== undefined) {
            this._gl.uniform1i(this._gl.shader.uniforms[name], v1);
        }
    }

    // Set an uniform float parameter binded into shader
    setUniformFloat(name, v1, v2, v3, v4) {
        if (this._gl.shader.uniforms[name] === undefined) {
            this.bindUniformParameter(name);
        }
        if (v4 !== undefined) {
            this._gl.uniform4f(this._gl.shader.uniforms[name], v1, v2, v3, v4);
        } else if (v3 !== undefined) {
            this._gl.uniform3f(this._gl.shader.uniforms[name], v1, v2, v3);
        } else if (v2 !== undefined) {
            this._gl.uniform2f(this._gl.shader.uniforms[name], v1, v2);
        } else if (v1 !== undefined) {
            this._gl.uniform1f(this._gl.shader.uniforms[name], v1);
        }
    }

    // Set an uniform float matrix binded into shader
    setUniformMatrix(name, transpose, matrix) {
        if (this._gl.shader.uniforms[name] === undefined) {
            this.bindUniformParameter(name);
        }
        if (matrix.length == 16) {
            this._gl.uniformMatrix4fv(this._gl.shader.uniforms[name], transpose, matrix);
        } else if (matrix.length == 9) {
            this._gl.uniformMatrix3fv(this._gl.shader.uniforms[name], transpose, matrix);
        } else if (matrix.length == 4) {
            this._gl.uniformMatrix2fv(this._gl.shader.uniforms[name], transpose, matrix);
        }
    }

    // -----------------------------------------------------
    // set a colours palette
    // use a 1D texture
    // @param palette The colours palette to push into the shaders
    setPalette(palette) {
        this._gl.palette = this._gl.createTexture();
        this._gl.bindTexture(this._gl.TEXTURE_2D, this._gl.palette);
        this._gl.shader.program.paletteSamplerUniform = this._gl.getUniformLocation(this._gl.shader.program, "uPaletteSampler");
        this._gl.texImage2D(this._gl.TEXTURE_2D, 0, _gl.RGBA, palette.length / 4, 1, 0, this._gl.RGBA, this._gl.UNSIGNED_BYTE, palette);
        this._gl.texParameteri(this._gl.TEXTURE_2D, _gl.TEXTURE_MAG_FILTER, this._gl.NEAREST);
        this._gl.texParameteri(this._gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, this._gl.NEAREST);
        this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_S, this._gl.CLAMP_TO_EDGE);
        this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_T, this._gl.CLAMP_TO_EDGE);
        this._gl.generateMipmap(this._gl.TEXTURE_2D);

        this._gl.bindTexture(this._gl.TEXTURE_2D, null);
    }

    // -----------------------------------------------------
    // set a new Light
    // @param position Vector with x, y, z position coordinate of the light 
    // @param intensity Float value of intensity of the light [0 to 1.0] 
    // @param color The color of the light in RGB
    // Return id of the light
    addLight(position, intensity, color) {
        var id = 0;
        // TODO ...

        return id;
    }

    // -----------------------------------------------------
    // set a new Normal list
    // @param normals The list of Normals vector 
    // Return id of the normals list
    addNormal(normals) {
        this._pool.normals.push(this._gl.createBuffer());
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._pool.lastOf(this._pool.normals));
        this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(normals), this._gl.STATIC_DRAW);
        return this._pool.normals.length - 1;
    }

    // set a new UV Coordinate list
    // @param uv The list of uv textures coordinate 
    // Return id of the uv list
    addUV(uv) {
        _pool.uv.push(this._gl.createBuffer());
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._pool.lastOf(this._pool.uv));
        this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(uv), this._gl.STATIC_DRAW);
        return this._pool.uv.length - 1;
    }

    // -----------------------------------------------------
    // set a new Mesh
    // @param vertices The list of Vertex coordinate (Float32Array)
    // @param indexes (optional) The list of Indexes (Float32Array)
    // Return id of the mesh
    addMesh(vertices, indexes) {
        this._pool.vbo.push(this._gl.createBuffer());
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._pool.lastOf(_pool.vbo));
        this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(vertices), this._gl.STATIC_DRAW);

        if (indexes instanceof Array) {
            this._pool.ibo.push(this._gl.createBuffer());
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._pool.lastOf(_pool.ibo));
            this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(indexes), this._gl.STATIC_DRAW);
        }

        return this._pool.vbo.length - 1;
    }

    // -----------------------------------------------------
    // set the projection matrix 
    setProjectionMatrix(matrix) {
        this._gl.matrix.projection = matrix;
    }

    // set the view matrix 
    setViewMatrix(matrix) {
        this._gl.matrix.view = matrix;
    }

    // reset matrix view
    loadIdentity() {
        this.setViewMatrix(mat4.identity());
    }

    // push projection and view matrix to the graphic card
    setMatrixUniforms() {

        var normalMatrix = mat3.create();
        this.bindUniformParameter('uMatrixProjection');
        this.bindUniformParameter('uMatrixView');
        this.bindUniformParameter('uMatrixNormal');

        mat4.toInverseMat3(this._gl.matrix.view, normalMatrix);
        mat3.transpose(normalMatrix);

        this._gl.uniformMatrix4fv(this._gl.shader.uniforms['uMatrixProjection'], false, this._gl.matrix.projection);
        this._gl.uniformMatrix4fv(this._gl.shader.uniforms['uMatrixView'], false, this._gl.matrix.view);
        this._gl.uniformMatrix3fv(this._gl.shader.uniforms['uMatrixNormal'], false, normalMatrix);
    }

    translateView(vec3) {
        mat4.translate(this._gl.matrix.view, vec3);
    }

    draw() {
        this._frame++;
        this.timeTicks();
        //this._gl.clearColor(0.0, 0.0, 0.0, 1.0);
        //this._gl.clear( this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT );

        // Camera
        var w = 1,
            h = 1,
            nbMesh = this._pool.vbo.length,
            nbPoints = 0;
        this.setProjectionMatrix(mat4.ortho(-w, w, -h, h, 0.1, 100.0));
        //this.setProjectionMatrix(mat4.perspective (45, (_width * 1.)/_height, 0.1, 100.0));

        this.loadIdentity();
        this.translateView([-0.0, 0.0, -6.0]);

        // Global parameters
        this._gl.uniform1f(this._gl.shader.uniforms['uTime'], this._frame / 10.);
        //this._gl.uniform2f( this._gl.shader.uniforms['uMouse'], parameters.mouseX, parameters.mouseY );
        this._gl.uniform2f(this._gl.shader.uniforms['uResolution'], this._width, this._height);
        //this._gl.uniform1i( this._gl.shader.uniforms['uBackbuffer'], 0 );
        //this._gl.uniform2f( this._gl.shader.uniforms['uSurfaceSize'], surface.width, surface.height );

        // Binding
        if (this._gl.palette !== undefined) {
            this._gl.bindTexture(this._gl.TEXTURE_2D, this._gl.palette);
        }
        for (var i = 0; i < nbMesh; i++) {
            // Set Vertex buffer to render
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, _pool.vbo[i]);
            this._gl.vertexAttribPointer(this._gl.shader.attribs['aVertexPosition'],
                3,
                this._gl.FLOAT,
                false,
                0,
                0);

            // Push Vertex Index buffer
            if (_pool.ibo[i] != undefined) {
                this._gl.bufferData(this._gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(_pool.ibo[i]), this._gl.STATIC_DRAW);
            }

            // Push Vertex Color Buffer
            if (_pool.cbo[i] != undefined) {
                this._gl.bufferData(this._gl.ELEMENT_ARRAY_BUFFER, new Float32Array(_pool.cbo[i]), this._gl.STATIC_DRAW);
            }

            this.setMatrixUniforms();
            nbPoints = this._gl.getBufferParameter(this._gl.ARRAY_BUFFER, this._gl.BUFFER_SIZE) / (12); // dimensions * sizeof(float) => 3 * 4 = 12
            this._gl.drawArrays(this._gl.TRIANGLE_STRIP, 0, nbPoints);
        }
    }

    ////////////////////////////////////////////////////////////////////
    // Basic Mesh and Volume
    // -----------------------------------------------------
    // return a simple flat quad mesh
    getQuad() {
        return new Float32Array([1., 1., 0.,        // 2------1
            -1., 1., 0.,        // |      |
            1., -1., 0.,        // |      |
            -1., -1., 0.]);     // 4------3
    }

}
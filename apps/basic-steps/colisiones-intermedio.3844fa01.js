// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/colisiones-intermedio.js":[function(require,module,exports) {
var canvas, ctx;
var mouse = {
  x: 0,
  y: 0
};
var particles = [];
window.addEventListener('load', function () {
  canvas = document.querySelector('#myCanvas');
  ctx = canvas.getContext('2d');
  init();
  animate();
});
var colors = ['red', 'blue', 'orange', 'green'];

function init() {
  for (var i = 0; i < 30; i++) {
    var x = numberBetween(radius, canvas.width - radius);
    var y = numberBetween(radius, canvas.height - radius);
    var radius = 10;
    var color = getRandomColor();
    console.log(color);

    if (i > 0) {
      for (var j = 0; j < particles.length; j++) {
        var x2 = particles[j].x;
        var y2 = particles[j].y; // - El radio*2 representa la suma de los radios de las
        // dos partículas, y es lo que separa los centros de las partículas
        // (multiplicamos por dos, porque todas las partículas tienen igual radio)
        // - Si la distancia entre los centros de ambas partículas
        // es menor al radio*2 es porque colisionaron

        if (getDistanceBetween(x, y, x2, y2) < radius * 2) {
          x = numberBetween(radius, canvas.width - radius);
          y = numberBetween(radius, canvas.height - radius); // x = Math.random() * canvas.width;
          // y = Math.random() * canvas.height;
          // - al cambiar j=-1, reinicia el loop
          // - verifica si las nuevas coordenadas (x,y) no solapean
          // con las de otras partículas

          j = -1;
        }
      }
    }

    particles.push(new Particle(x, y, radius, color));
  }
} // Alternativa #1: Crear una clase, su constructor y definir los métodos
// Alternativa #2: Hacer un prototipo por cada función de "Circle"


function Particle(x, y, radius, color, opacity) {
  var _this = this;

  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.velocity = {
    x: numberBetween(1, 3),
    y: numberBetween(1, 3)
  };
  this.opacity = 0; // <---

  this.update = function (particles) {
    this.draw(); // validamos colisiones

    for (var i = 0; i < particles.length; i++) {
      // si es la misma partícula, saltamos a la siguiente iteración
      if (this === particles[i]) continue;
      var x2 = particles[i].x;
      var y2 = particles[i].y;

      if (getDistanceBetween(x, y, x2, y2) < this.radius * 2 && this.opacity < 0.6) {
        // this.color = 'black';
        this.opacity += 0.2;
        console.log('BOOOM.! Colisión');
      } else if (this.opacity >= 0.6) {
        this.opacity -= 0.2; // evitamos que supere 0.6 de opacidad

        this.opacity = Math.max(0, this.opacity);
      }
    } // - Si la partícula se quiere desplazar fuera del eje X del canvas,
    // entonces invertimos el sentido de dirección de la partícula
    // - Si su posición en X menos el radio es negativo,
    // entonces quiere desplazarse fuera del canvas a izquierda
    // - Si su posición en X más el radio es mayor al ancho del Canvas,
    // entonces se quiere desplazar fura del canvas a derecha


    if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
      // al multiplicar por (-1) invertimos el sentido de dirección
      this.velocity.x = -1 * this.velocity.x;
    } // Mismo concepto que con el eje-X pero con el eje-Y


    if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
      // al multiplicar por (-1) invertimos el sentido de dirección
      this.velocity.y = -1 * this.velocity.y;
    } // por cada segundo que pasa se actualiza, y se vuelve a dibujar
    // entonces hacemos que se desplaze en el canvas, cambiando sus coordenadas (x,y)


    this.x += this.velocity.x;
    this.y += this.velocity.y;
  };

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(_this.x, _this.y, _this.radius, 0, 2 * Math.PI); // (posX, posY, radio, anguloInicial, anguloFinal)

    ctx.save(); // <--

    ctx.globalAlpha = _this.opacity;
    ctx.fillStyle = _this.color;
    ctx.fill();
    ctx.restore(); // <---

    ctx.strokeStyle = _this.color;
    ctx.stroke(); // dibuja el borde

    ctx.closePath();
  };
} // animation loop, recursive function
// Alternativa? Usar setInterval (aunque... para animaciones se
// sugiere requestAnimationFrame)


function animate() {
  // limpia las frames anteriores
  ctx.clearRect(0, 0, canvas.width, canvas.height); // let distance = getDistanceBetween(circle_1.x, circle_1.y,
  //                                   circle_2.x, circle_2.y);
  // - Si la distancia entre los centros de las circuferencias
  // es menor al radio de ambas
  // - Se compara con la suma de los radios, porque son la
  // longitud de los radios lo que separa los centros de ambas circunferencias
  // if(distance < circle_1.radius + circle_2.radius){
  // - le pasamos las particulas para comparar si colisionan

  particles.forEach(function (particle) {
    particle.update(particles);
  }); // esto produce la recursividad

  requestAnimationFrame(animate);
}

function getDistanceBetween(x1, y1, x2, y2) {
  // - teorema de pitágoras
  // - obtiene la distancia entre el centro de ambas circunferencias
  // - resultado de la raíz cuadrada de sumatoria de los cuadrados
  // de las coordenadas x,y de ambas circunferencias
  // Ej. distancia = raizCuadrada( (x1,y1)^² + (x2,y2)^² )
  var xDistance = x2 - x1;
  var yDistance = y2 - y1;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function numberBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomColor() {
  var index = Math.floor(numberBetween(0, colors.length));
  return colors[index];
}

addEventListener('mousemove', function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "41719" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/colisiones-intermedio.js"], null)
//# sourceMappingURL=/colisiones-intermedio.3844fa01.js.map
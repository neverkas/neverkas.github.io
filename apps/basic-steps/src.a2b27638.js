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
})({"src/index.js":[function(require,module,exports) {
window.onload = function () {
  var canvas = document.querySelector('#myCanvas');
  var context = canvas.getContext('2d'); //------------------------------------------------------------------------------\\
  // CUADRADO con fondo
  // - con fondo color rojo
  // - width=25px, height=25px
  // - posX = 10, posY = 0

  context.fillStyle = 'red';
  context.fillRect(10, 0, 25, 25); //------------------------------------------------------------------------------\\
  // CUADRADO con borde
  // - sin fondo
  // - width=50px, height=50px
  // - posX = 10, posY = 50
  // - borde azul de grosor 5px

  context.strokeStyle = 'blue';
  context.strokeRect(10, 100, 50, 50); // (posX, posY, width, height)

  context.lineWidth = 5; //------------------------------------------------------------------------------\\
  // TRIANGULO
  // - Partimos de (x=50, y=10) y haremos dos trazos en diagonal
  // bajando unos 60px en ambos lados, y nos desplazamos 40px hacia los costados
  // Empezamos el trazo

  context.beginPath(); // empieza con la punta superior del triángulo (posX=50, posY=10)

  context.moveTo(50, 10); // hace un trazo 40px hacia la izq, y 60px hacia abajo
  // partiendo de la posición (x=50,y=10)

  context.lineTo(10, 70); // hace un trazo 40px hacia la der.y 60px hacia abajo
  // partiendo de la posición (x=50,y=10)

  context.lineTo(90, 70); // rellena la figura

  context.fill(); //------------------------------------------------------------------------------\\
  // RECTAS HORIZONTALES
  // comenzamos el trazo

  context.beginPath(); // - hará trazos con 10 px de grosor (por incrementar y += 10 en cada iteración)

  for (var y = 10; y < 100; y += 10) {
    // - cada iteración hará un trazo desde posX=100 hasta posX=200 (recta horizontal)
    // - y aumentará 10 en el posY
    context.moveTo(100, y);
    context.lineTo(200, y);
  }

  context.stroke(); // finaliza el dibujo
  //------------------------------------------------------------------------------\\
  // CIRCUNFERENCIAS

  context.beginPath(); // - posX=150, posY=150
  // - radio = 50px <- 100px de diámetro
  // - ángulo 0 a 2PI (360º la vuelta entera)

  context.arc(150, 150, 50, 0, 2 * Math.PI); //context.fillStyle = 'green'; <-- NO FUNCIONA (???)

  context.stroke();
  context.beginPath(); // - posX=150, posY=150
  // - radio = 50px <- 100px de diámetro
  // - ángulo 0 a 1/2*PI (45º un cuarto de circunferencia)

  context.arc(150, 150, 50, 0, 0.5 * Math.PI); // (posX, posY, radio, anguloInicla, anguloFinal)
  // - le damos color al borde

  context.strokeStyle = 'red';
  context.stroke(); //------------------------------------------------------------------------------\\
  // TRANSFORMATION
  // - redimensiona todos los elementos del CANVAS
  // que estén debajo de esta sentencia
  // - redimensiona el tamaño, quedando 80% de tamaño original de ancho y de alto

  context.scale(0.8, 0.8); // dibujamos una linea vertical

  context.fillRect(380, 0, 1, canvas.height); // (posX, posY, lineWidth, lineHeight)
  //context.save();
  // - trasladamos todos los elementos a la posición (posX=10, posY=5)
  // - mueve todo 10px hacia la derecha, y 5px hacia abajo

  context.translate(10, 5); // (posX, posY)
  //context.restore();
  //context.rotate(Math.PI*2);
  //------------------------------------------------------------------------------\\
  // TEXTO

  context.font = '45px Arial';
  context.fillStyle = 'blue';
  context.fillText('Hi..!', 210, 50); // (texto, posX, posY)
  //------------------------------------------------------------------------------\\
  // IMAGEN con new Image()
  // 1. Creamos la instancia de la clase Image (crea un object de tipo imagen)
  // (como si  usaramos la etiqueta <img> de html)

  var kitten = new Image(100, 100);
  kitten.src = '/assets/sprites/kitten.png'; // 2. Cuando se cargó el recurso => se dibuja en el canvas

  kitten.addEventListener('load', function () {
    // 3. la agregamos al DOM
    context.drawImage(kitten, 10, 180); // (imagen, posX, posY, width, height)
  }); //------------------------------------------------------------------------------\\
  // IMAGEN con createElement()
  // Similar al anterior pero creamos un elemento en el DOM (una etiqueta)
  // - La w3c recomienda esta manera

  var kitten2 = document.createElement('img');
  kitten2.src = '/assets/sprites/kitten.png'; // 2. Cuando se cargó el recurso => se dibuja en el canvas

  kitten2.addEventListener('load', function (e) {
    // 3. Dibujamos la imagen dentro del canvas
    context.drawImage(kitten2, 150, 180, 100, 100); // (imagen, posX, posY, width, height)
    // - si NO le pasamos el width/height => dibujará el tamaño original de la imagen
    //context.drawImage(kitten, 10, 180); // (imagen, posX, posY, width, height)
  }); //------------------------------------------------------------------------------\\
  // ANIMACIONES con setInterval()

  var playerSprite = new Image(48, 32); // width=24px, height=32px

  playerSprite.src = '/assets/sprites/player.png';
  var spriteWidth = 48,
      spriteHeight = 90;
  playerSprite.addEventListener('load', updatePlayer);

  function updatePlayer() {
    var frame = 0;
    setInterval(function () {
      // clearRect, borrará el frame anterior
      context.clearRect(400, 50, spriteWidth, spriteHeight); // dibujamos el sprite en cada iteración

      context.drawImage(playerSprite, // recortamos un rectángulo del spriteSheet
      // - comienza en (x=48, y=0)
      // - por cada iteración hace x=48, 48*2, 48*3, 48*4,...
      // - nos desplazamos 48px hacia la derecha
      frame * spriteWidth, 0, spriteWidth, spriteHeight, // destino del rectángulo dentro del canvas
      // - estará en (x=400, y=50)
      400, 50, spriteWidth, spriteHeight); // - Sumamos 1 para avanzar la posición del frame
      // - Hacemos módulo 8, porque queremos que los números estén entre 0 y 7
      //
      // Ej. 0%8=0, 1%8=1, .., 6%8=6, 7%8=7, 8%8%=0, 9%8=1, 10%8=2, ..
      // cuando supera el valor 7 vuelve al 0, y asi...

      frame = (frame + 1) % 8;
    }, 90); // 120ms (milisegundos)
  } //------------------------------------------------------------------------------\\
  // ANIMACIONES con requestAnimationFrame()


  var gatito = new Image(100, 100); // let angulo = Math.PI / 2;

  gatito.src = '/assets/sprites/kitten.png';
  gatito.addEventListener('load', function () {
    context.drawImage(gatito, 500, 50, 100, 100); //updateGatito();
  });
  var angulo = 5;
  var rad = Math.PI * 180;

  function updateGatito() {
    angulo += 1; // context.strokeRect(500,200,150,150);
    // context.rotate(rad*angulo);
    // context.fillRect(500,200, 100, 100);
    // gatito.style.top = (Math.sin(angulo)*20) + 'px';
    // gatito.style.left = (Math.sin(angulo)*200) + 'px';

    requestAnimationFrame(updateGatito);
  }

  requestAnimationFrame(updateGatito);
};
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "41395" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map
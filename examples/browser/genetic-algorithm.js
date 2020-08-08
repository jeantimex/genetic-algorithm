(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["genetic"] = factory();
	else
		root["genetic"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: GeneticAlgorithm, OptimizeStrategy, SelectionStrategy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GeneticAlgorithm\", function() { return GeneticAlgorithm; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"OptimizeStrategy\", function() { return OptimizeStrategy; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SelectionStrategy\", function() { return SelectionStrategy; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\nvar SelectionStrategy = {\n  Tournament: 'Tournament',\n  Random: 'Random',\n  Rank: 'Rank'\n};\nvar OptimizeStrategy = {\n  Maximize: 'Maximize',\n  Minimize: 'Minimize'\n};\n/**\n * Genetic Algorithm\n */\n\nvar GeneticAlgorithm = /*#__PURE__*/function () {\n  function GeneticAlgorithm() {\n    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n\n    _classCallCheck(this, GeneticAlgorithm);\n\n    var optimizeStrategy = options.optimizeStrategy,\n        selectionStrategy = options.selectionStrategy;\n    this.optimizeStrategy = optimizeStrategy || OptimizeStrategy.Maximize;\n    this.selectionStrategy = selectionStrategy || SelectionStrategy.Tournament;\n    this.fitness = null;\n    this.seed = null;\n    this.mutate = null;\n    this.crossover = null;\n    this.generation = null;\n    this.notification = null;\n    this.populationSize = 250;\n    this.crossoverRate = 0.3;\n    this.mutationRate = 0.3;\n    this.iterations = 4000;\n    this.skip = 20;\n    this.maxResults = 100;\n    this.fittestAlwaysSurvives = true;\n    this.userData = {};\n    this.internalGenState = {};\n    this.entities = [];\n  }\n\n  _createClass(GeneticAlgorithm, [{\n    key: \"evolve\",\n    value: function evolve(i) {\n      var _this = this;\n\n      var mutateOrNot = function mutateOrNot(entity) {\n        // applies mutation based on mutation probability\n        return Math.random() <= _this.mutationRate && _this.mutate ? _this.mutate(Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"clone\"])(entity)) : entity;\n      }; // reset for each generation\n\n\n      this.internalGenState = {}; // score and sort\n\n      var pop = this.entities.map(function (entity) {\n        return {\n          fitness: _this.fitness(entity),\n          entity: entity\n        };\n      }).sort(function (a, b) {\n        return _this.optimize(a.fitness, b.fitness) ? -1 : 1;\n      }); // generation notification\n\n      var mean = pop.reduce(function (a, b) {\n        return a + b.fitness;\n      }, 0) / pop.length;\n      var stdev = Math.sqrt(pop.map(function (a) {\n        return (a.fitness - mean) * (a.fitness - mean);\n      }).reduce(function (a, b) {\n        return a + b;\n      }, 0) / pop.length);\n      var stats = {\n        maximum: pop[0].fitness,\n        minimum: pop[pop.length - 1].fitness,\n        mean: mean,\n        stdev: stdev\n      };\n      var r = this.generation ? this.generation(pop.slice(0, this.maxResults), i, stats) : true;\n      var isFinished = typeof r != 'undefined' && !r || i == this.iterations - 1;\n\n      if (this.notification && (isFinished || this.skip == 0 || i % this.skip == 0)) {\n        this.sendNotification(pop.slice(0, this.maxResults), i, stats, isFinished);\n      }\n\n      if (isFinished) return true; // crossover and mutate\n\n      var newPop = [];\n      if (this.fittestAlwaysSurvives) // lets the best solution fall through\n        newPop.push(pop[0].entity);\n\n      while (newPop.length < this.populationSize) {\n        if (this.crossoverRate && // if there is a crossover function\n        Math.random() <= this.crossoverRate && // base crossover on specified probability\n        newPop.length + 1 < this.populationSize // keeps us from going 1 over the max population size\n        ) {\n            var parents = this.selectParents(pop);\n            var children = this.crossover(Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"clone\"])(parents[0]), Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"clone\"])(parents[1])).map(mutateOrNot);\n            newPop.push(children[0], children[1]);\n          } else {\n          newPop.push(mutateOrNot(this.selectSingle(pop)));\n        }\n      }\n\n      this.entities = newPop;\n    }\n  }, {\n    key: \"start\",\n    value: function start() {\n      var i; // seed the population\n\n      for (i = 0; i < this.populationSize; ++i) {\n        this.entities.push(Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"clone\"])(this.seed()));\n      }\n\n      for (i = 0; i < this.iterations; ++i) {\n        if (this.evolve(i)) {\n          break;\n        }\n      }\n    }\n  }, {\n    key: \"sendNotification\",\n    value: function sendNotification(pop, generation, stats, isFinished) {\n      var response = {\n        pop: pop.map(_utils__WEBPACK_IMPORTED_MODULE_0__[\"encode\"]),\n        generation: generation,\n        stats: stats,\n        isFinished: isFinished\n      };\n      this.notification(response.pop.map(_utils__WEBPACK_IMPORTED_MODULE_0__[\"decode\"]), response.generation, response.stats, response.isFinished);\n    }\n  }, {\n    key: \"optimize\",\n    get: function get() {\n      if (this.optimizeStrategy === OptimizeStrategy.Maximize) {\n        return _utils__WEBPACK_IMPORTED_MODULE_0__[\"maximize\"];\n      }\n\n      if (this.optimizeStrategy === OptimizeStrategy.Minimize) {\n        return _utils__WEBPACK_IMPORTED_MODULE_0__[\"minimize\"];\n      }\n    }\n  }, {\n    key: \"selectSingle\",\n    get: function get() {\n      if (this.selectionStrategy === SelectionStrategy.Tournament) {\n        return Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"tournamentSelection\"])(this.optimize);\n      }\n    }\n  }, {\n    key: \"selectParents\",\n    get: function get() {\n      var _this2 = this;\n\n      if (this.selectionStrategy === SelectionStrategy.Tournament) {\n        return function (pop) {\n          return [_this2.selectSingle(pop), _this2.selectSingle(pop)];\n        };\n      }\n    }\n  }]);\n\n  return GeneticAlgorithm;\n}();\n\n\n\n//# sourceURL=webpack://genetic/./src/index.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: clone, encode, decode, maximize, minimize, tournamentSelection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"clone\", function() { return clone; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"encode\", function() { return encode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"decode\", function() { return decode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"maximize\", function() { return maximize; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"minimize\", function() { return minimize; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tournamentSelection\", function() { return tournamentSelection; });\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nvar maximize = function maximize(a, b) {\n  return a >= b;\n};\n\nvar minimize = function minimize(a, b) {\n  return a < b;\n};\n/**\n * Make a deep copy of an object\n *\n * @param {Object} obj\n * @returns {Object}\n */\n\n\nvar clone = function clone(obj) {\n  if (obj == null || _typeof(obj) !== 'object') {\n    return obj;\n  }\n\n  return JSON.parse(JSON.stringify(obj));\n};\n\nvar encode = function encode(obj) {\n  return JSON.stringify(obj, function (key, value) {\n    if (value instanceof Function || typeof value == 'function') {\n      return '__func__:' + value.toString();\n    }\n\n    if (value instanceof RegExp) {\n      return '__regex__:' + value;\n    }\n\n    return value;\n  });\n};\n\nvar decode = function decode(str) {\n  return JSON.parse(str, function (key, value) {\n    if (typeof value != 'string') {\n      return value;\n    }\n\n    if (value.lastIndexOf('__func__:', 0) === 0) {\n      return eval('(' + value.slice(9) + ')');\n    }\n\n    if (value.lastIndexOf('__regex__:', 0) === 0) {\n      return eval('(' + value.slice(10) + ')');\n    }\n\n    return value;\n  });\n};\n\nvar tournamentSelection = function tournamentSelection(optimize) {\n  return function (pop) {\n    var n = pop.length;\n    var a = pop[Math.floor(Math.random() * n)];\n    var b = pop[Math.floor(Math.random() * n)];\n    return optimize(a.fitness, b.fitness) ? a.entity : b.entity;\n  };\n};\n\n\n\n//# sourceURL=webpack://genetic/./src/utils.js?");

/***/ })

/******/ });
});
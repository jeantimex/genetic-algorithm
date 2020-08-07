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
/*! exports provided: GeneticAlgorithm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GeneticAlgorithm\", function() { return GeneticAlgorithm; });\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n/**\n * Genetic Algorithm\n */\nvar GeneticAlgorithm = /*#__PURE__*/function () {\n  function GeneticAlgorithm() {\n    var _this = this;\n\n    _classCallCheck(this, GeneticAlgorithm);\n\n    this.optimize = null;\n\n    this.select1 = function (pop) {\n      var n = pop.length;\n      var a = pop[Math.floor(Math.random() * n)];\n      var b = pop[Math.floor(Math.random() * n)];\n      return _this.optimize(a.fitness, b.fitness) ? a.entity : b.entity;\n    };\n\n    this.select2 = function (pop) {\n      return [_this.select1(pop), _this.select1(pop)];\n    }, this.fitness = null;\n    this.seed = null;\n    this.mutate = null;\n    this.crossover = null;\n    this.generation = null;\n    this.notification = null;\n    this.configuration = {\n      size: 250,\n      crossover: 0.9,\n      mutation: 0.2,\n      iterations: 100,\n      fittestAlwaysSurvives: true,\n      maxResults: 100,\n      skip: 0\n    };\n    this.userData = {};\n    this.internalGenState = {};\n    this.entities = [];\n  }\n\n  _createClass(GeneticAlgorithm, [{\n    key: \"evolve\",\n    value: function evolve(config, userData) {\n      var k;\n\n      for (k in config) {\n        this.configuration[k] = config[k];\n      }\n\n      for (k in userData) {\n        this.userData[k] = userData[k];\n      }\n\n      this.start();\n    }\n  }, {\n    key: \"start\",\n    value: function start() {\n      var i;\n      var self = this;\n\n      function mutateOrNot(entity) {\n        // applies mutation based on mutation probability\n        return Math.random() <= self.configuration.mutation && self.mutate ? self.mutate(GeneticAlgorithm.Clone(entity)) : entity;\n      } // seed the population\n\n\n      for (i = 0; i < this.configuration.size; ++i) {\n        this.entities.push(GeneticAlgorithm.Clone(this.seed()));\n      }\n\n      for (i = 0; i < this.configuration.iterations; ++i) {\n        // reset for each generation\n        this.internalGenState = {}; // score and sort\n\n        var pop = this.entities.map(function (entity) {\n          return {\n            fitness: self.fitness(entity),\n            entity: entity\n          };\n        }).sort(function (a, b) {\n          return self.optimize(a.fitness, b.fitness) ? -1 : 1;\n        }); // generation notification\n\n        var mean = pop.reduce(function (a, b) {\n          return a + b.fitness;\n        }, 0) / pop.length;\n        var stdev = Math.sqrt(pop.map(function (a) {\n          return (a.fitness - mean) * (a.fitness - mean);\n        }).reduce(function (a, b) {\n          return a + b;\n        }, 0) / pop.length);\n        var stats = {\n          maximum: pop[0].fitness,\n          minimum: pop[pop.length - 1].fitness,\n          mean: mean,\n          stdev: stdev\n        };\n        var r = this.generation ? this.generation(pop.slice(0, this.configuration['maxResults']), i, stats) : true;\n        var isFinished = typeof r != 'undefined' && !r || i == this.configuration.iterations - 1;\n\n        if (this.notification && (isFinished || this.configuration['skip'] == 0 || i % this.configuration['skip'] == 0)) {\n          this.sendNotification(pop.slice(0, this.configuration['maxResults']), i, stats, isFinished);\n        }\n\n        if (isFinished) break; // crossover and mutate\n\n        var newPop = [];\n        if (this.configuration.fittestAlwaysSurvives) // lets the best solution fall through\n          newPop.push(pop[0].entity);\n\n        while (newPop.length < self.configuration.size) {\n          if (this.crossover && // if there is a crossover function\n          Math.random() <= this.configuration.crossover && // base crossover on specified probability\n          newPop.length + 1 < self.configuration.size // keeps us from going 1 over the max population size\n          ) {\n              var parents = this.select2(pop);\n              var children = this.crossover(GeneticAlgorithm.Clone(parents[0]), GeneticAlgorithm.Clone(parents[1])).map(mutateOrNot);\n              newPop.push(children[0], children[1]);\n            } else {\n            newPop.push(mutateOrNot(self.select1(pop)));\n          }\n        }\n\n        this.entities = newPop;\n      }\n    }\n  }, {\n    key: \"sendNotification\",\n    value: function sendNotification(pop, generation, stats, isFinished) {\n      var response = {\n        pop: pop.map(GeneticAlgorithm.Serialization.stringify),\n        generation: generation,\n        stats: stats,\n        isFinished: isFinished\n      };\n      this.notification(response.pop.map(GeneticAlgorithm.Serialization.parse), response.generation, response.stats, response.isFinished);\n    }\n  }]);\n\n  return GeneticAlgorithm;\n}();\n\n_defineProperty(GeneticAlgorithm, \"Optimize\", {\n  Maximize: function Maximize(a, b) {\n    return a >= b;\n  },\n  Minimize: function Minimize(a, b) {\n    return a < b;\n  }\n});\n\n_defineProperty(GeneticAlgorithm, \"Serialization\", {\n  stringify: function stringify(obj) {\n    return JSON.stringify(obj, function (key, value) {\n      if (value instanceof Function || typeof value == 'function') {\n        return '__func__:' + value.toString();\n      }\n\n      if (value instanceof RegExp) {\n        return '__regex__:' + value;\n      }\n\n      return value;\n    });\n  },\n  parse: function parse(str) {\n    return JSON.parse(str, function (key, value) {\n      if (typeof value != 'string') {\n        return value;\n      }\n\n      if (value.lastIndexOf('__func__:', 0) === 0) {\n        return eval('(' + value.slice(9) + ')');\n      }\n\n      if (value.lastIndexOf('__regex__:', 0) === 0) {\n        return eval('(' + value.slice(10) + ')');\n      }\n\n      return value;\n    });\n  }\n});\n\n_defineProperty(GeneticAlgorithm, \"Clone\", function (obj) {\n  if (obj == null || _typeof(obj) != 'object') {\n    return obj;\n  }\n\n  return JSON.parse(JSON.stringify(obj));\n});\n\n\n\n//# sourceURL=webpack://genetic/./src/index.js?");

/***/ })

/******/ });
});
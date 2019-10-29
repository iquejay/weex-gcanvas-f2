// { "framework": "Vue"} 

/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 53);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview Utility for F2
 * @author dxq613 @gmail.com
 * @author sima.zhang1990@gmail.com
 */
var DomUtil = __webpack_require__(65);

var Util = {
  upperFirst: __webpack_require__(66),
  lowerFirst: __webpack_require__(67),
  isString: __webpack_require__(68),
  isNumber: __webpack_require__(69),
  isBoolean: __webpack_require__(70),
  isFunction: __webpack_require__(71),
  isDate: __webpack_require__(72),
  isArray: __webpack_require__(16),
  isNil: __webpack_require__(30),
  isObject: __webpack_require__(31),
  isPlainObject: __webpack_require__(32),
  deepMix: __webpack_require__(74),
  mix: __webpack_require__(75),
  each: __webpack_require__(33),
  uniq: __webpack_require__(76),
  isObjectValueEqual: function isObjectValueEqual(a, b) {
    // for vue.js
    a = Object.assign({}, a);
    b = Object.assign({}, b);
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    if (aProps.length !== bProps.length) {
      return false;
    }

    for (var i = 0, len = aProps.length; i < len; i++) {
      var propName = aProps[i];

      if (a[propName] !== b[propName]) {
        return false;
      }
    }

    return true;
  },
  wrapBehavior: function wrapBehavior(obj, action) {
    if (obj['_wrap_' + action]) {
      return obj['_wrap_' + action];
    }

    var method = function method(e) {
      obj[action](e);
    };

    obj['_wrap_' + action] = method;
    return method;
  },
  getWrapBehavior: function getWrapBehavior(obj, action) {
    return obj['_wrap_' + action];
  },
  parsePadding: function parsePadding(padding) {
    var top;
    var right;
    var bottom;
    var left;

    if (Util.isNumber(padding) || Util.isString(padding)) {
      top = bottom = left = right = padding;
    } else if (Util.isArray(padding)) {
      top = padding[0];
      right = !Util.isNil(padding[1]) ? padding[1] : padding[0];
      bottom = !Util.isNil(padding[2]) ? padding[2] : padding[0];
      left = !Util.isNil(padding[3]) ? padding[3] : right;
    }

    return [top, right, bottom, left];
  },
  directionEnabled: function directionEnabled(mode, dir) {
    if (mode === undefined) {
      return true;
    } else if (typeof mode === 'string') {
      return mode.indexOf(dir) !== -1;
    }

    return false;
  }
};
Util.Array = {
  merge: function merge(dataArray) {
    var rst = [];

    for (var i = 0, len = dataArray.length; i < len; i++) {
      rst = rst.concat(dataArray[i]);
    }

    return rst;
  },
  values: function values(data, name) {
    var rst = [];
    var tmpMap = {};

    for (var i = 0, len = data.length; i < len; i++) {
      var obj = data[i];
      var value = obj[name];

      if (!Util.isNil(value)) {
        if (!Util.isArray(value)) {
          if (!tmpMap[value]) {
            rst.push(value);
            tmpMap[value] = true;
          }
        } else {
          Util.each(value, function (val) {
            if (!tmpMap[val]) {
              rst.push(val);
              tmpMap[val] = true;
            }
          });
        }
      }
    }

    return rst;
  },
  firstValue: function firstValue(data, name) {
    var rst = null;

    for (var i = 0, len = data.length; i < len; i++) {
      var obj = data[i];
      var value = obj[name];

      if (!Util.isNil(value)) {
        if (Util.isArray(value)) {
          rst = value[0];
        } else {
          rst = value;
        }

        break;
      }
    }

    return rst;
  },
  group: function group(data, fields, appendConditions) {
    if (appendConditions === void 0) {
      appendConditions = {};
    }

    if (!fields) {
      return [data];
    }

    var groups = Util.Array.groupToMap(data, fields);
    var array = [];

    if (fields.length === 1 && appendConditions[fields[0]]) {
      var values = appendConditions[fields[0]];
      Util.each(values, function (value) {
        value = '_' + value;
        array.push(groups[value]);
      });
    } else {
      for (var i in groups) {
        array.push(groups[i]);
      }
    }

    return array;
  },
  groupToMap: function groupToMap(data, fields) {
    if (!fields) {
      return {
        0: data
      };
    }

    var callback = function callback(row) {
      var unique = '_';

      for (var i = 0, l = fields.length; i < l; i++) {
        unique += row[fields[i]] && row[fields[i]].toString();
      }

      return unique;
    };

    var groups = {};

    for (var i = 0, len = data.length; i < len; i++) {
      var row = data[i];
      var key = callback(row);

      if (groups[key]) {
        groups[key].push(row);
      } else {
        groups[key] = [row];
      }
    }

    return groups;
  },
  remove: function remove(arr, obj) {
    if (!arr) {
      return;
    }

    var index = arr.indexOf(obj);

    if (index !== -1) {
      arr.splice(index, 1);
    }
  },
  getRange: function getRange(values) {
    if (!values.length) {
      return {
        min: 0,
        max: 0
      };
    }

    var max = Math.max.apply(null, values);
    var min = Math.min.apply(null, values);
    return {
      min: min,
      max: max
    };
  }
};
Util.mix(Util, DomUtil);
module.exports = Util;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Theme = __webpack_require__(64);

var Util = __webpack_require__(0);

var Global = {
  version: '3.4.2',
  scales: {},
  widthRatio: {
    column: 1 / 2,
    rose: 0.999999,
    multiplePie: 3 / 4
  },
  lineDash: [4, 4]
};

Global.setTheme = function (theme) {
  Util.deepMix(this, theme);
};

Global.setTheme(Theme);
module.exports = Global;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Util = __webpack_require__(0);

var Element = __webpack_require__(24);

var Shape =
/*#__PURE__*/
function (_Element) {
  _inheritsLoose(Shape, _Element);

  function Shape() {
    return _Element.apply(this, arguments) || this;
  }

  var _proto = Shape.prototype;

  _proto._initProperties = function _initProperties() {
    this._attrs = {
      zIndex: 0,
      visible: true,
      destroyed: false,
      isShape: true,
      attrs: {}
    };
  };

  _proto.getType = function getType() {
    return this._attrs.type;
  };

  _proto.drawInner = function drawInner(context) {
    var self = this;
    var attrs = self.get('attrs');
    self.createPath(context);
    var originOpacity = context.globalAlpha;

    if (self.hasFill()) {
      var fillOpacity = attrs.fillOpacity;

      if (!Util.isNil(fillOpacity) && fillOpacity !== 1) {
        context.globalAlpha = fillOpacity;
        context.fill();
        context.globalAlpha = originOpacity;
      } else {
        context.fill();
      }
    }

    if (self.hasStroke()) {
      var lineWidth = attrs.lineWidth;

      if (lineWidth > 0) {
        var strokeOpacity = attrs.strokeOpacity;

        if (!Util.isNil(strokeOpacity) && strokeOpacity !== 1) {
          context.globalAlpha = strokeOpacity;
        }

        context.stroke();
      }
    }
  };

  _proto.getBBox = function getBBox() {
    var bbox = this._attrs.bbox;

    if (!bbox) {
      bbox = this.calculateBox();

      if (bbox) {
        bbox.x = bbox.minX;
        bbox.y = bbox.minY;
        bbox.width = bbox.maxX - bbox.minX;
        bbox.height = bbox.maxY - bbox.minY;
      }

      this._attrs.bbox = bbox;
    }

    return bbox;
  };

  _proto.calculateBox = function calculateBox() {
    return null;
  };

  _proto.createPath = function createPath() {};

  return Shape;
}(Element);

module.exports = Shape;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Util = __webpack_require__(0);

var Base = __webpack_require__(35);

var GROUP_ATTRS = ['color', 'size', 'shape'];
var FIELD_ORIGIN = '_origin';
var FIELD_ORIGIN_Y = '_originY';

var Global = __webpack_require__(1);

var Attr = __webpack_require__(82);

var GeometryShape = __webpack_require__(5);

var Adjust = __webpack_require__(19);

function parseFields(field) {
  if (Util.isArray(field)) {
    return field;
  }

  if (Util.isString(field)) {
    return field.split('*');
  }

  return [field];
}
/**
 * The parent class for Geometry
 * @class Geom
 */


var Geom =
/*#__PURE__*/
function (_Base) {
  _inheritsLoose(Geom, _Base);

  function Geom() {
    return _Base.apply(this, arguments) || this;
  }

  var _proto = Geom.prototype;

  _proto.getDefaultCfg = function getDefaultCfg() {
    return {
      /**
       * geometry type
       * @type {String}
       */
      type: null,

      /**
       * the data of geometry
       * @type {Array}
       */
      data: null,

      /**
       * the attrs of geo,etry
       * @type {Object}
       */
      attrs: {},
      scales: {},

      /**
       * group for storing the shapes
       * @type {Canvas}
       */
      container: null,

      /**
       * style options
       * @type {Object}
       */
      styleOptions: null,
      chart: null,
      shapeType: '',

      /**
       * wether to generate key points for each shape
       * @protected
       * @type {Boolean}
       */
      generatePoints: false,
      attrOptions: {},
      sortable: false,
      startOnZero: true,
      visible: true,
      connectNulls: false
    };
  };

  _proto.init = function init() {
    var self = this;

    self._initAttrs();

    var dataArray = self._processData();

    if (self.get('adjust')) {
      self._adjustData(dataArray);
    }

    self.set('dataArray', dataArray);
  };

  _proto._getGroupScales = function _getGroupScales() {
    var self = this;
    var scales = [];
    Util.each(GROUP_ATTRS, function (attrName) {
      var attr = self.getAttr(attrName);

      if (attr) {
        var attrScales = attr.scales;
        Util.each(attrScales, function (scale) {
          if (scale && scale.isCategory && scales.indexOf(scale) === -1) {
            scales.push(scale);
          }
        });
      }
    });
    return scales;
  };

  _proto._groupData = function _groupData(data) {
    var self = this;
    var colDefs = self.get('colDefs');

    var groupScales = self._getGroupScales();

    if (groupScales.length) {
      var appendConditions = {};
      var names = [];
      Util.each(groupScales, function (scale) {
        var field = scale.field;
        names.push(field);

        if (colDefs && colDefs[field] && colDefs[field].values) {
          // users have defined
          appendConditions[scale.field] = colDefs[field].values;
        }
      });
      return Util.Array.group(data, names, appendConditions);
    }

    return [data];
  };

  _proto._setAttrOptions = function _setAttrOptions(attrName, attrCfg) {
    var options = this.get('attrOptions');
    options[attrName] = attrCfg;
  };

  _proto._createAttrOption = function _createAttrOption(attrName, field, cfg, defaultValues) {
    var attrCfg = {};
    attrCfg.field = field;

    if (cfg) {
      if (Util.isFunction(cfg)) {
        attrCfg.callback = cfg;
      } else {
        attrCfg.values = cfg;
      }
    } else {
      attrCfg.values = defaultValues;
    }

    this._setAttrOptions(attrName, attrCfg);
  };

  _proto._initAttrs = function _initAttrs() {
    var self = this;
    var attrs = self.get('attrs');
    var attrOptions = self.get('attrOptions');
    var coord = self.get('coord');

    for (var type in attrOptions) {
      if (attrOptions.hasOwnProperty(type)) {
        var option = attrOptions[type];
        var className = Util.upperFirst(type);
        var fields = parseFields(option.field);

        if (type === 'position') {
          option.coord = coord;
        }

        var scales = [];

        for (var i = 0, len = fields.length; i < len; i++) {
          var field = fields[i];

          var scale = self._createScale(field);

          scales.push(scale);
        }

        if (type === 'position') {
          var yScale = scales[1];

          if (coord.type === 'polar' && coord.transposed && self.hasAdjust('stack')) {
            if (yScale.values.length) {
              yScale.change({
                nice: false,
                min: 0,
                max: Math.max.apply(null, yScale.values)
              });
            }
          }
        }

        option.scales = scales;
        var attr = new Attr[className](option);
        attrs[type] = attr;
      }
    }
  };

  _proto._createScale = function _createScale(field) {
    var scales = this.get('scales');
    var scale = scales[field];

    if (!scale) {
      scale = this.get('chart').createScale(field);
      scales[field] = scale;
    }

    return scale;
  };

  _proto._processData = function _processData() {
    var self = this;
    var data = this.get('data');
    var dataArray = [];

    var groupedArray = this._groupData(data);

    for (var i = 0, len = groupedArray.length; i < len; i++) {
      var subData = groupedArray[i];

      var tempData = self._saveOrigin(subData);

      if (this.hasAdjust('dodge')) {
        self._numberic(tempData);
      }

      dataArray.push(tempData);
    }

    return dataArray;
  };

  _proto._saveOrigin = function _saveOrigin(data) {
    var rst = [];

    for (var i = 0, len = data.length; i < len; i++) {
      var origin = data[i];
      var obj = {};

      for (var k in origin) {
        obj[k] = origin[k];
      }

      obj[FIELD_ORIGIN] = origin;
      rst.push(obj);
    }

    return rst;
  };

  _proto._numberic = function _numberic(data) {
    var positionAttr = this.getAttr('position');
    var scales = positionAttr.scales;

    for (var j = 0, len = data.length; j < len; j++) {
      var obj = data[j];
      var count = Math.min(2, scales.length);

      for (var i = 0; i < count; i++) {
        var scale = scales[i];

        if (scale.isCategory) {
          var field = scale.field;
          obj[field] = scale.translate(obj[field]);
        }
      }
    }
  };

  _proto._adjustData = function _adjustData(dataArray) {
    var self = this;
    var adjust = self.get('adjust');

    if (adjust) {
      var adjustType = Util.upperFirst(adjust.type);

      if (!Adjust[adjustType]) {
        throw new Error('not support such adjust : ' + adjust);
      }

      var xScale = self.getXScale();
      var yScale = self.getYScale();
      var cfg = Util.mix({
        xField: xScale.field,
        yField: yScale.field
      }, adjust);
      var adjustObject = new Adjust[adjustType](cfg);
      adjustObject.processAdjust(dataArray);

      if (adjustType === 'Stack') {
        self._updateStackRange(yScale.field, yScale, dataArray);
      }
    }
  };

  _proto._updateStackRange = function _updateStackRange(field, scale, dataArray) {
    var mergeArray = Util.Array.merge(dataArray);
    var min = scale.min;
    var max = scale.max;

    for (var i = 0, len = mergeArray.length; i < len; i++) {
      var obj = mergeArray[i];
      var tmpMin = Math.min.apply(null, obj[field]);
      var tmpMax = Math.max.apply(null, obj[field]);

      if (tmpMin < min) {
        min = tmpMin;
      }

      if (tmpMax > max) {
        max = tmpMax;
      }
    }

    if (min < scale.min || max > scale.max) {
      scale.change({
        min: min,
        max: max
      });
    }
  };

  _proto._sort = function _sort(mappedArray) {
    var self = this;
    var xScale = self.getXScale();
    var field = xScale.field,
        type = xScale.type;

    if (type !== 'identity' && xScale.values.length > 1) {
      Util.each(mappedArray, function (itemArr) {
        itemArr.sort(function (obj1, obj2) {
          if (type === 'timeCat') {
            return xScale._toTimeStamp(obj1[FIELD_ORIGIN][field]) - xScale._toTimeStamp(obj2[FIELD_ORIGIN][field]);
          }

          return xScale.translate(obj1[FIELD_ORIGIN][field]) - xScale.translate(obj2[FIELD_ORIGIN][field]);
        });
      });
    }

    self.set('hasSorted', true);
    self.set('dataArray', mappedArray);
  };

  _proto.paint = function paint() {
    var self = this;
    var dataArray = self.get('dataArray');
    var mappedArray = [];
    var shapeFactory = self.getShapeFactory();
    shapeFactory.setCoord(self.get('coord'));

    self._beforeMapping(dataArray);

    for (var i = 0, len = dataArray.length; i < len; i++) {
      var data = dataArray[i];

      if (data.length) {
        data = self._mapping(data);
        mappedArray.push(data);
        self.draw(data, shapeFactory);
      }
    }

    self.set('dataArray', mappedArray);
  };

  _proto.getShapeFactory = function getShapeFactory() {
    var shapeFactory = this.get('shapeFactory');

    if (!shapeFactory) {
      var shapeType = this.get('shapeType');
      shapeFactory = GeometryShape.getShapeFactory(shapeType);
      this.set('shapeFactory', shapeFactory);
    }

    return shapeFactory;
  };

  _proto._mapping = function _mapping(data) {
    var self = this;
    var attrs = self.get('attrs');
    var yField = self.getYScale().field;
    var mappedData = [];

    for (var i = 0, len = data.length; i < len; i++) {
      var record = data[i];
      var newRecord = {};
      newRecord[FIELD_ORIGIN] = record[FIELD_ORIGIN];
      newRecord.points = record.points; // 避免

      newRecord[FIELD_ORIGIN_Y] = record[yField];

      for (var k in attrs) {
        if (attrs.hasOwnProperty(k)) {
          var attr = attrs[k];
          var names = attr.names;

          var values = self._getAttrValues(attr, record);

          if (names.length > 1) {
            for (var j = 0, _len = values.length; j < _len; j++) {
              var val = values[j];
              var name = names[j];
              newRecord[name] = Util.isArray(val) && val.length === 1 ? val[0] : val;
            }
          } else {
            newRecord[names[0]] = values.length === 1 ? values[0] : values;
          }
        }
      }

      mappedData.push(newRecord);
    }

    return mappedData;
  };

  _proto._getAttrValues = function _getAttrValues(attr, record) {
    var scales = attr.scales;
    var params = [];

    for (var i = 0, len = scales.length; i < len; i++) {
      var scale = scales[i];
      var field = scale.field;

      if (scale.type === 'identity') {
        params.push(scale.value);
      } else {
        params.push(record[field]);
      }
    }

    var values = attr.mapping.apply(attr, params);
    return values;
  };

  _proto.getAttrValue = function getAttrValue(attrName, record) {
    var attr = this.getAttr(attrName);
    var rst = null;

    if (attr) {
      var values = this._getAttrValues(attr, record);

      rst = values[0];
    }

    return rst;
  };

  _proto._beforeMapping = function _beforeMapping(dataArray) {
    var self = this;

    if (self.get('sortable')) {
      self._sort(dataArray);
    }

    if (self.get('generatePoints')) {
      Util.each(dataArray, function (data) {
        self._generatePoints(data);
      });
    }
  };

  _proto.isInCircle = function isInCircle() {
    var coord = this.get('coord');
    return coord && coord.isPolar;
  };

  _proto.getCallbackCfg = function getCallbackCfg(fields, cfg, origin) {
    if (!fields) {
      return cfg;
    }

    var tmpCfg = {};
    var params = fields.map(function (field) {
      return origin[field];
    });
    Util.each(cfg, function (v, k) {
      if (Util.isFunction(v)) {
        tmpCfg[k] = v.apply(null, params);
      } else {
        tmpCfg[k] = v;
      }
    });
    return tmpCfg;
  };

  _proto.getDrawCfg = function getDrawCfg(obj) {
    var self = this;
    var isInCircle = self.isInCircle();
    var cfg = {
      origin: obj,
      x: obj.x,
      y: obj.y,
      color: obj.color,
      size: obj.size,
      shape: obj.shape,
      isInCircle: isInCircle,
      opacity: obj.opacity
    };
    var styleOptions = self.get('styleOptions');

    if (styleOptions && styleOptions.style) {
      cfg.style = self.getCallbackCfg(styleOptions.fields, styleOptions.style, obj[FIELD_ORIGIN]);
    }

    if (self.get('generatePoints')) {
      cfg.points = obj.points;
    }

    if (isInCircle) {
      cfg.center = self.get('coord').center;
    }

    return cfg;
  };

  _proto.draw = function draw(data, shapeFactory) {
    var self = this;
    var container = self.get('container');
    var yScale = self.getYScale();
    Util.each(data, function (obj, index) {
      if (yScale && Util.isNil(obj._origin[yScale.field])) {
        return;
      }

      obj.index = index;
      var cfg = self.getDrawCfg(obj);
      var shape = obj.shape;
      self.drawShape(shape, obj, cfg, container, shapeFactory);
    });
  };

  _proto.drawShape = function drawShape(shape, shapeData, cfg, container, shapeFactory) {
    var gShape = shapeFactory.drawShape(shape, cfg, container);

    if (gShape) {
      Util.each([].concat(gShape), function (s) {
        s.set('origin', shapeData);
      });
    }
  };

  _proto._generatePoints = function _generatePoints(data) {
    var self = this;
    var shapeFactory = self.getShapeFactory();
    var shapeAttr = self.getAttr('shape');

    for (var i = 0, len = data.length; i < len; i++) {
      var obj = data[i];
      var cfg = self.createShapePointsCfg(obj);
      var shape = shapeAttr ? self._getAttrValues(shapeAttr, obj) : null;
      var points = shapeFactory.getShapePoints(shape, cfg);
      obj.points = points;
    }
  }
  /**
   * get the info of each shape
   * @protected
   * @param  {Object} obj the data item
   * @return {Object} cfg return the result
   */
  ;

  _proto.createShapePointsCfg = function createShapePointsCfg(obj) {
    var xScale = this.getXScale();
    var yScale = this.getYScale();

    var x = this._normalizeValues(obj[xScale.field], xScale);

    var y;

    if (yScale) {
      y = this._normalizeValues(obj[yScale.field], yScale);
    } else {
      y = obj.y ? obj.y : 0.1;
    }

    return {
      x: x,
      y: y,
      y0: yScale ? yScale.scale(this.getYMinValue()) : undefined
    };
  };

  _proto.getYMinValue = function getYMinValue() {
    var yScale = this.getYScale();
    var min = yScale.min,
        max = yScale.max;
    var value;

    if (this.get('startOnZero')) {
      if (max <= 0 && min <= 0) {
        value = max;
      } else {
        value = min >= 0 ? min : 0;
      }
    } else {
      value = min;
    }

    return value;
  };

  _proto._normalizeValues = function _normalizeValues(values, scale) {
    var rst = [];

    if (Util.isArray(values)) {
      for (var i = 0, len = values.length; i < len; i++) {
        var v = values[i];
        rst.push(scale.scale(v));
      }
    } else {
      rst = scale.scale(values);
    }

    return rst;
  };

  _proto.getAttr = function getAttr(name) {
    return this.get('attrs')[name];
  };

  _proto.getXScale = function getXScale() {
    return this.getAttr('position').scales[0];
  };

  _proto.getYScale = function getYScale() {
    return this.getAttr('position').scales[1];
  };

  _proto.hasAdjust = function hasAdjust(adjust) {
    return this.get('adjust') && this.get('adjust').type === adjust;
  };

  _proto._getSnap = function _getSnap(scale, item, arr) {
    var i = 0;
    var values;
    var yField = this.getYScale().field; // 叠加的维度

    if (this.hasAdjust('stack') && scale.field === yField) {
      values = [];
      arr.forEach(function (obj) {
        values.push(obj[FIELD_ORIGIN_Y]);
      });

      for (var len = values.length; i < len; i++) {
        if (values[0][0] > item) {
          break;
        }

        if (values[values.length - 1][1] <= item) {
          i = values.length - 1;
          break;
        }

        if (values[i][0] <= item && values[i][1] > item) {
          break;
        }
      }
    } else {
      values = scale.values;
      values.sort(function (a, b) {
        return a - b;
      });

      for (var _len2 = values.length; i < _len2; i++) {
        if ((values[0] + values[1]) / 2 > item) {
          break;
        }

        if ((values[i - 1] + values[i]) / 2 <= item && (values[i + 1] + values[i]) / 2 > item) {
          break;
        }

        if ((values[values.length - 2] + values[values.length - 1]) / 2 <= item) {
          i = values.length - 1;
          break;
        }
      }
    }

    var result = values[i];
    return result;
  };

  _proto.getSnapRecords = function getSnapRecords(point) {
    var self = this;
    var coord = self.get('coord');
    var xScale = self.getXScale();
    var yScale = self.getYScale();
    var xfield = xScale.field;
    var dataArray = self.get('dataArray');

    if (!this.get('hasSorted')) {
      this._sort(dataArray);
    }

    var rst = [];
    var invertPoint = coord.invertPoint(point);
    var invertPointX = invertPoint.x;

    if (self.isInCircle() && !coord.transposed && invertPointX > (1 + xScale.rangeMax()) / 2) {
      invertPointX = xScale.rangeMin();
    }

    var xValue = xScale.invert(invertPointX);

    if (!xScale.isCategory) {
      xValue = self._getSnap(xScale, xValue);
    }

    var tmp = [];
    dataArray.forEach(function (data) {
      data.forEach(function (obj) {
        var originValue = Util.isNil(obj[FIELD_ORIGIN]) ? obj[xfield] : obj[FIELD_ORIGIN][xfield];

        if (self._isEqual(originValue, xValue, xScale)) {
          tmp.push(obj);
        }
      });
    }); // special for pie chart

    if (this.hasAdjust('stack') && coord.isPolar && coord.transposed && xScale.values.length === 1) {
      if (invertPointX >= 0 && invertPointX <= 1) {
        var yValue = yScale.invert(invertPoint.y);
        yValue = self._getSnap(yScale, yValue, tmp);
        tmp.forEach(function (obj) {
          if (Util.isArray(yValue) ? obj[FIELD_ORIGIN_Y].toString() === yValue.toString() : obj[FIELD_ORIGIN_Y] === yValue) {
            rst.push(obj);
          }
        });
      }
    } else {
      rst = tmp;
    }

    return rst;
  };

  _proto._isEqual = function _isEqual(originValue, value, scale) {
    if (scale.type === 'timeCat') {
      return scale._toTimeStamp(originValue) === value;
    }

    return value === originValue;
  };

  _proto.position = function position(field) {
    this._setAttrOptions('position', {
      field: field
    });

    return this;
  };

  _proto.color = function color(field, values) {
    this._createAttrOption('color', field, values, Global.colors);

    return this;
  };

  _proto.size = function size(field, values) {
    this._createAttrOption('size', field, values, Global.sizes);

    return this;
  };

  _proto.shape = function shape(field, values) {
    var type = this.get('type');
    var shapes = Global.shapes[type] || [];

    this._createAttrOption('shape', field, values, shapes);

    return this;
  };

  _proto.style = function style(field, cfg) {
    var styleOptions = this.get('styleOptions');

    if (!styleOptions) {
      styleOptions = {};
      this.set('styleOptions', styleOptions);
    }

    if (Util.isObject(field)) {
      cfg = field;
      field = null;
    }

    var fields;

    if (field) {
      fields = parseFields(field);
    }

    styleOptions.fields = fields;
    styleOptions.style = cfg;
    return this;
  };

  _proto.adjust = function adjust(type) {
    if (Util.isString(type)) {
      type = {
        type: type
      };
    }

    this.set('adjust', type);
    return this;
  };

  _proto.animate = function animate(cfg) {
    this.set('animateCfg', cfg);
    return this;
  };

  _proto.reset = function reset() {
    this.set('attrOptions', {});
    this.set('adjust', null);
    this.clearInner();
  };

  _proto.clearInner = function clearInner() {
    var container = this.get('container');

    if (container) {
      container.clear();
      container.setMatrix([1, 0, 0, 1, 0, 0]);
    }

    container && container.clear();
    this.set('attrs', {});
    this.set('groupScales', null);
    this.set('xDistance', null);
    this.set('_width', null);
  };

  _proto.clear = function clear() {
    this.clearInner();
    this.set('scales', {});
  };

  _proto.destroy = function destroy() {
    this.clear();

    _Base.prototype.destroy.call(this);
  };

  _proto._display = function _display(visible) {
    this.set('visible', visible);
    var container = this.get('container');
    var canvas = container.get('canvas');
    container.set('visible', visible);
    canvas.draw();
  };

  _proto.show = function show() {
    this._display(true);
  };

  _proto.hide = function hide() {
    this._display(false);
  };

  return Geom;
}(Base);

module.exports = Geom;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var G = {
  Canvas: __webpack_require__(103),
  Group: __webpack_require__(42),
  Shape: __webpack_require__(2),
  Matrix: __webpack_require__(25),
  Vector2: __webpack_require__(6)
};

__webpack_require__(105);

__webpack_require__(106);

__webpack_require__(107);

__webpack_require__(108);

__webpack_require__(109);

__webpack_require__(110);

__webpack_require__(111);

__webpack_require__(112);

__webpack_require__(113);

module.exports = G;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(0);

var Global = __webpack_require__(1);

var Shape = {};
var ShapeBase = {
  _coord: null,

  /**
   * draw the shape
   * @param {Object} cfg options
   * @param {Object} container container to store the shapes
   */
  draw: function draw(cfg, container) {
    if (this.drawShape) {
      this.drawShape(cfg, container);
    }
  },

  /**
   * set the coordinate instance
   * @param {Coord} coord coordinate instance
   */
  setCoord: function setCoord(coord) {
    this._coord = coord;
  },

  /**
   * convert the normalized value to the canvas position
   * @param  {point} point the point to convert
   * @return {point} point return the result
   */
  parsePoint: function parsePoint(point) {
    var coord = this._coord;

    if (coord.isPolar) {
      if (point.x === 1) point.x = 0.9999999;
      if (point.y === 1) point.y = 0.9999999;
    }

    return coord.convertPoint(point);
  },

  /**
   * convert the normalized value to the canvas position
   * @param  {points} points the array that store the points
   * @return {points} points return the result
   */
  parsePoints: function parsePoints(points) {
    if (!points) return false;
    var self = this;
    var rst = [];
    points.forEach(function (point) {
      rst.push(self.parsePoint(point));
    });
    return rst;
  }
};
var ShapeFactoryBase = {
  defaultShapeType: null,
  setCoord: function setCoord(coord) {
    this._coord = coord;
  },
  getShape: function getShape(type) {
    var self = this;

    if (Util.isArray(type)) {
      type = type[0];
    }

    var shape = self[type] || self[self.defaultShapeType];
    shape._coord = self._coord;
    return shape;
  },
  getShapePoints: function getShapePoints(type, cfg) {
    var shape = this.getShape(type);
    var fn = shape.getPoints || shape.getShapePoints || this.getDefaultPoints;
    var points = fn(cfg);
    return points;
  },
  getDefaultPoints: function getDefaultPoints()
  /* cfg */
  {
    return [];
  },
  drawShape: function drawShape(type, cfg, container) {
    var shape = this.getShape(type);

    if (!cfg.color) {
      cfg.color = Global.colors[0];
    }

    return shape.draw(cfg, container);
  }
};

Shape.registerFactory = function (factoryName, cfg) {
  var className = Util.upperFirst(factoryName);
  var geomObj = Util.mix({}, ShapeFactoryBase, cfg);
  Shape[className] = geomObj;
  geomObj.name = factoryName;
  return geomObj;
};

Shape.registerShape = function (factoryName, shapeType, cfg) {
  var className = Util.upperFirst(factoryName);
  var factory = Shape[className];
  var shapeObj = Util.mix({}, ShapeBase, cfg);
  factory[shapeType] = shapeObj;
  return shapeObj;
};

Shape.registShape = Shape.registerShape;

Shape.getShapeFactory = function (factoryName) {
  var self = this;
  factoryName = factoryName || 'point';
  var className = Util.upperFirst(factoryName);
  return self[className];
};

module.exports = Shape;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

/**
 * 2 Dimensional Vector
 * @module vector2
 */
module.exports = {
  /**
   * Creates a new, empty vector2
   *
   * @return {vector2} a new 2D vector
   */
  create: function create() {
    return [0, 0];
  },

  /**
   * Calculates the length of a vector2
   *
   * @param {vector2} v vector to calculate length of
   * @return {Number} length of v
   */
  length: function length(v) {
    var x = v[0];
    var y = v[1];
    return Math.sqrt(x * x + y * y);
  },

  /**
   * Normalize a vector2
   *
   * @param {vector2} out the receiving vector
   * @param {vector2} v vector to normalize
   * @return {vector2} out
   */
  normalize: function normalize(out, v) {
    var len = this.length(v);

    if (len === 0) {
      out[0] = 0;
      out[1] = 0;
    } else {
      out[0] = v[0] / len;
      out[1] = v[1] / len;
    }

    return out;
  },

  /**
   * Adds two vector2's
   *
   * @param {vector2} out the receiving vector
   * @param {vector2} v1 the first operand
   * @param {vector2} v2 the second operand
   * @return {vector2} out
   */
  add: function add(out, v1, v2) {
    out[0] = v1[0] + v2[0];
    out[1] = v1[1] + v2[1];
    return out;
  },

  /**
   * Subtracts vector v2 from vector v1
   *
   * @param {vector2} out the receiving vector
   * @param {vector2} v1 the first operand
   * @param {vector2} v2 the second operand
   * @return {vector2} out
   */
  sub: function sub(out, v1, v2) {
    out[0] = v1[0] - v2[0];
    out[1] = v1[1] - v2[1];
    return out;
  },

  /**
   * Scales a vector2 by a scalar number
   *
   * @param {vector2} out the receiving vector
   * @param {vector2} v the vector to scale
   * @param {Number} s amount to scale the vector by
   * @return {vector2} out
   */
  scale: function scale(out, v, s) {
    out[0] = v[0] * s;
    out[1] = v[1] * s;
    return out;
  },

  /**
   * Calculates the dot product of two vector2's
   *
   * @param {vector2} v1 the first operand
   * @param {vector2} v2 the second operand
   * @return {Number} dot product of v1 and v2
   */
  dot: function dot(v1, v2) {
    return v1[0] * v2[0] + v1[1] * v2[1];
  },

  /**
   * Calculates the direction of two vector2's
   *
   * @param {vector2} v1 the first operand
   * @param {vector2} v2 the second operand
   * @return {Boolean} the direction of v1 and v2
   */
  direction: function direction(v1, v2) {
    return v1[0] * v2[1] - v2[0] * v1[1];
  },

  /**
   * Calculates the angle of two vector2's
   *
   * @param {vector2} v1 the first operand
   * @param {vector2} v2 the second operand
   * @return {Number} angle of v1 and v2
   */
  angle: function angle(v1, v2) {
    var theta = this.dot(v1, v2) / (this.length(v1) * this.length(v2));
    return Math.acos(theta);
  },

  /**
   * Calculates the angle of two vector2's with direction
   *
   * @param {vector2} v1 the first operand
   * @param {vector2} v2 the second operand
   * @param {Boolean} direction the direction of two vector2's
   * @return {Number} angle of v1 and v2
   */
  angleTo: function angleTo(v1, v2, direction) {
    var angle = this.angle(v1, v2);
    var angleLargeThanPI = this.direction(v1, v2) >= 0;

    if (direction) {
      if (angleLargeThanPI) {
        return Math.PI * 2 - angle;
      }

      return angle;
    }

    if (angleLargeThanPI) {
      return angle;
    }

    return Math.PI * 2 - angle;
  },

  /**
   * whether a vector2 is zero vector
   *
   * @param  {vector2} v vector to calculate
   * @return {Boolean}   is or not a zero vector
   */
  zero: function zero(v) {
    return v[0] === 0 && v[1] === 0;
  },

  /**
   * Calculates the euclidian distance between two vector2's
   *
   * @param {vector2} v1 the first operand
   * @param {vector2} v2 the second operand
   * @return {Number} distance between a and b
   */
  distance: function distance(v1, v2) {
    var x = v2[0] - v1[0];
    var y = v2[1] - v1[1];
    return Math.sqrt(x * x + y * y);
  },

  /**
   * Creates a new vector2 initialized with values from an existing vector
   *
   * @param {vector2} v vector to clone
   * @return {Array} a new 2D vector
   */
  clone: function clone(v) {
    return [v[0], v[1]];
  },

  /**
   * Return the minimum of two vector2's
   *
   * @param {vector2} out the receiving vector
   * @param {vector2} v1 the first operand
   * @param {vector2} v2 the second operand
   * @return {vector2} out
   */
  min: function min(out, v1, v2) {
    out[0] = Math.min(v1[0], v2[0]);
    out[1] = Math.min(v1[1], v2[1]);
    return out;
  },

  /**
   * Return the maximum of two vector2's
   *
   * @param {vector2} out the receiving vector
   * @param {vector2} v1 the first operand
   * @param {vector2} v2 the second operand
   * @return {vector2} out
   */
  max: function max(out, v1, v2) {
    out[0] = Math.max(v1[0], v2[0]);
    out[1] = Math.max(v1[1], v2[1]);
    return out;
  },

  /**
   * Transforms the vector2 with a mat2d
   *
   * @param {vector2} out the receiving vector
   * @param {vector2} v the vector to transform
   * @param {mat2d} m matrix to transform with
   * @return {vector2} out
   */
  transformMat2d: function transformMat2d(out, v, m) {
    var x = v[0];
    var y = v[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
  }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(0);

var KEYWORDS_PERCENT = {
  min: 0,
  median: 0.5,
  max: 1
};

var GuideBase =
/*#__PURE__*/
function () {
  var _proto = GuideBase.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {};

  function GuideBase(cfg) {
    this._initDefaultCfg();

    Util.deepMix(this, cfg);
  }

  _proto._getNormalizedValue = function _getNormalizedValue(val, scale) {
    var rst;

    if (Util.isNil(KEYWORDS_PERCENT[val])) {
      rst = scale.scale(val);
    } else {
      rst = KEYWORDS_PERCENT[val];
    }

    return rst;
  };

  _proto.parsePercentPoint = function parsePercentPoint(coord, position) {
    var xPercent = parseFloat(position[0]) / 100;
    var yPercent = parseFloat(position[1]) / 100;
    var start = coord.start;
    var end = coord.end;
    var width = Math.abs(start.x - end.x);
    var height = Math.abs(start.y - end.y);
    var x = width * xPercent + Math.min(start.x, end.x);
    var y = height * yPercent + Math.min(start.y, end.y);
    return {
      x: x,
      y: y
    };
  };

  _proto.parsePoint = function parsePoint(coord, position) {
    var self = this;
    var xScale = self.xScale;
    var yScales = self.yScales;

    if (Util.isFunction(position)) {
      position = position(xScale, yScales); // position 必须是对象
    } // 如果数据格式是 ['50%', '50%'] 的格式
    // fix: 原始数据中可能会包含 'xxx5%xxx' 这样的数据，需要判断下 https://github.com/antvis/f2/issues/590


    if (Util.isString(position[0]) && position[0].indexOf('%') !== -1 && !isNaN(position[0].slice(0, -1))) {
      return this.parsePercentPoint(coord, position);
    }

    var x = self._getNormalizedValue(position[0], xScale);

    var y = self._getNormalizedValue(position[1], yScales[0]);

    var point = coord.convertPoint({
      x: x,
      y: y
    });

    if (self.limitInPlot) {
      // limit in chart plotRange
      if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
        return point;
      }

      return null;
    }

    return point;
  }
  /**
   * render the guide component
   * @param  {Coord} coord  coordinate instance
   * @param  {Canvas.Group} group the container
   */
  ;

  _proto.render = function render()
  /* coord,group */
  {};

  _proto.repaint = function repaint() {
    this.remove();
    var coord = this.coord,
        container = this.container,
        canvas = this.canvas;

    if (container && !container.isDestroyed()) {
      this.render(coord, container);
      canvas.draw();
    }
  };

  _proto.remove = function remove() {
    var element = this.element;
    element && element.remove(true);
  };

  _proto.changeVisible = function changeVisible(visible) {
    var self = this;
    self.visible = visible;
    var element = self.element;
    if (!element) return;

    if (element.set) {
      element.set('visible', visible);
    } else {
      element.style.display = visible ? '' : 'none';
    }
  };

  return GuideBase;
}();

module.exports = GuideBase;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

var toString = {}.toString;
var isType = function isType(value, type) {
  return toString.call(value) === '[object ' + type + ']';
};

module.exports = isType;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var Vector2 = __webpack_require__(6);

var start = Vector2.create();
var end = Vector2.create();
var extremity = Vector2.create();

function getCubicBezierXYatT(startPt, controlPt1, controlPt2, endPt, T) {
  var x = CubicN(T, startPt.x, controlPt1.x, controlPt2.x, endPt.x);
  var y = CubicN(T, startPt.y, controlPt1.y, controlPt2.y, endPt.y);
  return {
    x: x,
    y: y
  };
} // cubic helper formula at T distance


function CubicN(T, a, b, c, d) {
  var t2 = T * T;
  var t3 = t2 * T;
  return a + (-a * 3 + T * (3 * a - a * T)) * T + (3 * b + T * (-6 * b + b * 3 * T)) * T + (c * 3 - c * 3 * T) * t2 + d * t3;
}

function cubicBezierBounds(c) {
  var minX = Infinity;
  var maxX = -Infinity;
  var minY = Infinity;
  var maxY = -Infinity;
  var s = {
    x: c[0],
    y: c[1]
  };
  var c1 = {
    x: c[2],
    y: c[3]
  };
  var c2 = {
    x: c[4],
    y: c[5]
  };
  var e = {
    x: c[6],
    y: c[7]
  };

  for (var t = 0; t < 100; t++) {
    var pt = getCubicBezierXYatT(s, c1, c2, e, t / 100);

    if (pt.x < minX) {
      minX = pt.x;
    }

    if (pt.x > maxX) {
      maxX = pt.x;
    }

    if (pt.y < minY) {
      minY = pt.y;
    }

    if (pt.y > maxY) {
      maxY = pt.y;
    }
  }

  return {
    minX: minX,
    minY: minY,
    maxX: maxX,
    maxY: maxY
  };
}

module.exports = {
  getBBoxFromPoints: function getBBoxFromPoints(points, lineWidth) {
    if (points.length === 0) {
      return;
    }

    var p = points[0];
    var left = p.x;
    var right = p.x;
    var top = p.y;
    var bottom = p.y;
    var len = points.length;

    for (var i = 1; i < len; i++) {
      p = points[i];
      left = Math.min(left, p.x);
      right = Math.max(right, p.x);
      top = Math.min(top, p.y);
      bottom = Math.max(bottom, p.y);
    }

    lineWidth = lineWidth / 2 || 0;
    return {
      minX: left - lineWidth,
      minY: top - lineWidth,
      maxX: right + lineWidth,
      maxY: bottom + lineWidth
    };
  },
  getBBoxFromLine: function getBBoxFromLine(x0, y0, x1, y1, lineWidth) {
    lineWidth = lineWidth / 2 || 0;
    return {
      minX: Math.min(x0, x1) - lineWidth,
      minY: Math.min(y0, y1) - lineWidth,
      maxX: Math.max(x0, x1) + lineWidth,
      maxY: Math.max(y0, y1) + lineWidth
    };
  },
  getBBoxFromArc: function getBBoxFromArc(x, y, r, startAngle, endAngle, anticlockwise) {
    var diff = Math.abs(startAngle - endAngle);

    if (diff % (Math.PI * 2) < 1e-4 && diff > 1e-4) {
      // Is a circle
      return {
        minX: x - r,
        minY: y - r,
        maxX: x + r,
        maxY: y + r
      };
    }

    start[0] = Math.cos(startAngle) * r + x;
    start[1] = Math.sin(startAngle) * r + y;
    end[0] = Math.cos(endAngle) * r + x;
    end[1] = Math.sin(endAngle) * r + y;
    var min = [0, 0];
    var max = [0, 0];
    Vector2.min(min, start, end);
    Vector2.max(max, start, end); // Thresh to [0, Math.PI * 2]

    startAngle = startAngle % (Math.PI * 2);

    if (startAngle < 0) {
      startAngle = startAngle + Math.PI * 2;
    }

    endAngle = endAngle % (Math.PI * 2);

    if (endAngle < 0) {
      endAngle = endAngle + Math.PI * 2;
    }

    if (startAngle > endAngle && !anticlockwise) {
      endAngle += Math.PI * 2;
    } else if (startAngle < endAngle && anticlockwise) {
      startAngle += Math.PI * 2;
    }

    if (anticlockwise) {
      var tmp = endAngle;
      endAngle = startAngle;
      startAngle = tmp;
    }

    for (var angle = 0; angle < endAngle; angle += Math.PI / 2) {
      if (angle > startAngle) {
        extremity[0] = Math.cos(angle) * r + x;
        extremity[1] = Math.sin(angle) * r + y;
        Vector2.min(min, extremity, min);
        Vector2.max(max, extremity, max);
      }
    }

    return {
      minX: min[0],
      minY: min[1],
      maxX: max[0],
      maxY: max[1]
    };
  },
  getBBoxFromBezierGroup: function getBBoxFromBezierGroup(points, lineWidth) {
    var minX = Infinity;
    var maxX = -Infinity;
    var minY = Infinity;
    var maxY = -Infinity;

    for (var i = 0, len = points.length; i < len; i++) {
      var bbox = cubicBezierBounds(points[i]);

      if (bbox.minX < minX) {
        minX = bbox.minX;
      }

      if (bbox.maxX > maxX) {
        maxX = bbox.maxX;
      }

      if (bbox.minY < minY) {
        minY = bbox.minY;
      }

      if (bbox.maxY > maxY) {
        maxY = bbox.maxY;
      }
    }

    lineWidth = lineWidth / 2 || 0;
    return {
      minX: minX - lineWidth,
      minY: minY - lineWidth,
      maxX: maxX + lineWidth,
      maxY: maxY + lineWidth
    };
  }
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var mix = __webpack_require__(94);

var each = __webpack_require__(11);

var isObject = __webpack_require__(20);

var isNil = __webpack_require__(21);

var Scale =
/*#__PURE__*/
function () {
  var _proto = Scale.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {
    this.type = 'base';
    /**
     * 格式化函数,输出文本或者tick时的格式化函数
     * @type {Function}
     */

    this.formatter = null;
    /**
     * 输出的值域
     * @type {Array}
     */

    this.range = [0, 1];
    /**
     * 度量的标记
     * @type {Array}
     */

    this.ticks = null;
    /**
     * 参与度量计算的值，可选项
     * @type {Array}
     */

    this.values = [];
  };

  function Scale(cfg) {
    this._initDefaultCfg();

    mix(this, cfg);
    this.init();
  }
  /**
   * 度量初始化
   * @protected
   */


  _proto.init = function init() {}
  /**
   * 获取该度量的ticks,返回的是多个对象，
   *   - text: tick 的文本
   *   - value: 对应的度量转换后的值
   * <code>
   *   [
   *     {text: 0,value:0}
   *     {text: 1,value:0.2}
   *     {text: 2,value:0.4}
   *     {text: 3,value:0.6}
   *     {text: 4,value:0.8}
   *     {text: 5,value:1}
   *   ]
   * </code>
   * @param {Number} count 输出tick的个数的近似值，默认是 10
   * @return {Array} 返回 ticks 数组
   */
  ;

  _proto.getTicks = function getTicks() {
    var self = this;
    var ticks = self.ticks;
    var rst = [];
    each(ticks, function (tick) {
      var obj;

      if (isObject(tick)) {
        obj = tick;
      } else {
        obj = {
          text: self.getText(tick),
          tickValue: tick,
          value: self.scale(tick)
        };
      }

      rst.push(obj);
    });
    return rst;
  }
  /**
   * 获取格式化后的文本
   * @param  {*} value 输入的数据
   * @param  {*} key 字段的 key
   * @return {String} 格式化的文本
   */
  ;

  _proto.getText = function getText(value, key) {
    var formatter = this.formatter;
    value = formatter ? formatter(value, key) : value;

    if (isNil(value) || !value.toString) {
      value = '';
    }

    return value.toString();
  }
  /**
   * 输出的值域最小值
   * @protected
   * @return {Number} 返回最小的值
   */
  ;

  _proto.rangeMin = function rangeMin() {
    return this.range[0];
  }
  /**
   * 输出的值域最大值
   * @protected
   * @return {Number} 返回最大的值
   */
  ;

  _proto.rangeMax = function rangeMax() {
    var range = this.range;
    return range[range.length - 1];
  }
  /**
   * 度量转换后的结果，翻转回输入域
   * @param  {Number} value 需要翻转的数值
   * @return {*} 度量的输入值
   */
  ;

  _proto.invert = function invert(value) {
    return value;
  }
  /**
   * 将传入的值从非数值转换成数值格式，如分类字符串、时间字符串等
   * @param  {*} value 传入的值
   * @return {Number} 转换的值
   */
  ;

  _proto.translate = function translate(value) {
    return value;
  }
  /**
   * 进行度量转换
   * @param  {*} value 输入值
   * @return {Number} 输出值，在设定的输出值域之间，默认[0,1]
   */
  ;

  _proto.scale = function scale(value) {
    return value;
  }
  /**
   * 克隆一个新的scale,拥有跟当前scale相同的输入域、输出域等
   * @return {Scale} 克隆的度量
   */
  ;

  _proto.clone = function clone() {
    var self = this;
    var constr = self.constructor;
    var cfg = {};
    each(self, function (v, k) {
      cfg[k] = self[k];
    });
    return new constr(cfg);
  }
  /**
   * 更改度量的属性信息
   * @param  {Object} info 属性信息
   * @chainable
   * @return {Scale} 返回自身的引用
   */
  ;

  _proto.change = function change(info) {
    this.ticks = null;
    mix(this, info);
    this.init();
    return this;
  };

  return Scale;
}();

module.exports = Scale;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(20);
var isArray = __webpack_require__(95);

var each = function each(elements, func) {
  if (!elements) {
    return;
  }
  var rst = void 0;
  if (isArray(elements)) {
    for (var i = 0, len = elements.length; i < len; i++) {
      rst = func(elements[i], i);
      if (rst === false) {
        break;
      }
    }
  } else if (isObject(elements)) {
    for (var k in elements) {
      if (elements.hasOwnProperty(k)) {
        rst = func(elements[k], k);
        if (rst === false) {
          break;
        }
      }
    }
  }
};

module.exports = each;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview the Attribute base class
 */
var isString = __webpack_require__(85);

var isArray = __webpack_require__(18);

var isNil = __webpack_require__(36);

var mix = __webpack_require__(86);

var each = __webpack_require__(38);

function toScaleString(scale, value) {
  if (isString(value)) {
    return value;
  }

  return scale.invert(scale.scale(value));
}
/**
 * 所有视觉通道属性的基类
 * @class Attr
 */


var AttributeBase =
/*#__PURE__*/
function () {
  function AttributeBase(cfg) {
    var _this = this;

    /**
     * 属性的类型
     * @type {String}
     */
    this.type = 'base';
    /**
     * 属性的名称
     * @type {String}
     */

    this.name = null;
    /**
     * 回调函数
     * @type {Function}
     */

    this.method = null;
    /**
     * 备选的值数组
     * @type {Array}
     */

    this.values = [];
    /**
     * 属性内部的度量
     * @type {Array}
     */

    this.scales = [];
    /**
     * 是否通过线性取值, 如果未指定，则根据数值的类型判定
     * @type {Boolean}
     */

    this.linear = null;
    /**
     * 当用户设置的 callback 返回 null 时, 应该返回默认 callback 中的值
     */

    var mixedCallback = null;
    var defaultCallback = this.callback;

    if (cfg.callback) {
      var userCallback = cfg.callback;

      mixedCallback = function mixedCallback() {
        for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
          params[_key] = arguments[_key];
        }

        var ret = userCallback.apply(void 0, params);

        if (isNil(ret)) {
          ret = defaultCallback.apply(_this, params);
        }

        return ret;
      };
    }

    mix(this, cfg);

    if (mixedCallback) {
      mix(this, {
        callback: mixedCallback
      });
    }
  } // 获取属性值，将值映射到视觉通道


  var _proto = AttributeBase.prototype;

  _proto._getAttrValue = function _getAttrValue(scale, value) {
    var values = this.values;

    if (scale.isCategory && !this.linear) {
      var index = scale.translate(value);
      return values[index % values.length];
    }

    var percent = scale.scale(value);
    return this.getLinearValue(percent);
  };
  /**
   * 如果进行线性映射，返回对应的映射值
   * @protected
   * @param  {Number} percent 百分比
   * @return {*}  颜色值、形状、大小等
   */


  _proto.getLinearValue = function getLinearValue(percent) {
    var values = this.values;
    var steps = values.length - 1;
    var step = Math.floor(steps * percent);
    var leftPercent = steps * percent - step;
    var start = values[step];
    var end = step === steps ? start : values[step + 1];
    var rstValue = start + (end - start) * leftPercent;
    return rstValue;
  };
  /**
   * 默认的回调函数
   * @param {*} value 回调函数的值
   * @type {Function}
   * @return {Array} 返回映射后的值
   */


  _proto.callback = function callback(value) {
    var self = this;
    var scale = self.scales[0];
    var rstValue = null;

    if (scale.type === 'identity') {
      rstValue = scale.value;
    } else {
      rstValue = self._getAttrValue(scale, value);
    }

    return rstValue;
  };
  /**
   * 根据度量获取属性名
   * @return {Array} dims of this Attribute
   */


  _proto.getNames = function getNames() {
    var scales = this.scales;
    var names = this.names;
    var length = Math.min(scales.length, names.length);
    var rst = [];

    for (var i = 0; i < length; i++) {
      rst.push(names[i]);
    }

    return rst;
  };
  /**
   * 根据度量获取维度名
   * @return {Array} dims of this Attribute
   */


  _proto.getFields = function getFields() {
    var scales = this.scales;
    var rst = [];
    each(scales, function (scale) {
      rst.push(scale.field);
    });
    return rst;
  };
  /**
   * 根据名称获取度量
   * @param  {String} name the name of scale
   * @return {Scale} scale
   */


  _proto.getScale = function getScale(name) {
    var scales = this.scales;
    var names = this.names;
    var index = names.indexOf(name);
    return scales[index];
  };
  /**
   * 映射数据
   * @param {*} param1...paramn 多个数值
   * @return {Array} 映射的值组成的数组
   */


  _proto.mapping = function mapping() {
    var scales = this.scales;
    var callback = this.callback;

    for (var _len2 = arguments.length, params = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      params[_key2] = arguments[_key2];
    }

    var values = params;

    if (callback) {
      for (var i = 0, len = params.length; i < len; i++) {
        params[i] = this._toOriginParam(params[i], scales[i]);
      }

      values = callback.apply(this, params);
    }

    values = [].concat(values);
    return values;
  }; // 原始的参数


  _proto._toOriginParam = function _toOriginParam(param, scale) {
    var rst = param;

    if (!scale.isLinear) {
      if (isArray(param)) {
        rst = [];

        for (var i = 0, len = param.length; i < len; i++) {
          rst.push(toScaleString(scale, param[i]));
        }
      } else {
        rst = toScaleString(scale, param);
      }
    }

    return rst;
  };

  return AttributeBase;
}();

module.exports = AttributeBase;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

var toString = {}.toString;
var isType = function isType(value, type) {
  return toString.call(value) === '[object ' + type + ']';
};

module.exports = isType;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * 判断是否数字
 * @return {Boolean} 是否数字
 */
var isType = __webpack_require__(13);

var isNumber = function isNumber(value) {
  return isType(value, 'Number');
};
module.exports = isNumber;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview shape util
 * @author dxq613@gmail.com
 */
var Util = __webpack_require__(0);

var ShapeUtil = {
  splitPoints: function splitPoints(obj) {
    var points = [];
    var x = obj.x;
    var y = obj.y;
    y = Util.isArray(y) ? y : [y];
    y.forEach(function (yItem, index) {
      var point = {
        x: Util.isArray(x) ? x[index] : x,
        y: yItem
      };
      points.push(point);
    });
    return points;
  },
  splitArray: function splitArray(data, yField, connectNulls) {
    if (!data.length) return [];
    var arr = [];
    var tmp = [];
    var yValue;
    Util.each(data, function (obj) {
      yValue = obj._origin ? obj._origin[yField] : obj[yField];

      if (connectNulls) {
        if (!Util.isNil(yValue)) {
          tmp.push(obj);
        }
      } else {
        if (Util.isArray(yValue) && Util.isNil(yValue[0]) || Util.isNil(yValue)) {
          if (tmp.length) {
            arr.push(tmp);
            tmp = [];
          }
        } else {
          tmp.push(obj);
        }
      }
    });

    if (tmp.length) {
      arr.push(tmp);
    }

    return arr;
  }
};
module.exports = ShapeUtil;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var isType = __webpack_require__(8);

var isArray = Array.isArray ? Array.isArray : function (value) {
  return isType(value, 'Array');
};

module.exports = isArray;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(0);

var Base =
/*#__PURE__*/
function () {
  var _proto = Base.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {};

  function Base(cfg) {
    this._initDefaultCfg();

    Util.mix(this, cfg);
    var start;
    var end;

    if (this.plot) {
      start = this.plot.bl;
      end = this.plot.tr;
      this.start = start;
      this.end = end;
    } else {
      start = this.start;
      end = this.end;
    }

    this.init(start, end);
  }

  _proto.init = function init() {};

  _proto.convertPoint = function convertPoint(point) {
    return point;
  };

  _proto.invertPoint = function invertPoint(point) {
    return point;
  };

  _proto.reset = function reset(plot) {
    this.plot = plot;
    var bl = plot.bl,
        tr = plot.tr;
    this.start = bl;
    this.end = tr;
    this.init(bl, tr);
  };

  return Base;
}();

module.exports = Base;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var isType = __webpack_require__(37);

var isArray = Array.isArray ? Array.isArray : function (value) {
  return isType(value, 'Array');
};

module.exports = isArray;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var mix = __webpack_require__(91);

var Adjust =
/*#__PURE__*/
function () {
  var _proto = Adjust.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {
    this.adjustNames = ['x', 'y']; // 调整的维度，默认,x,y都做调整
  };

  function Adjust(cfg) {
    this._initDefaultCfg();

    mix(this, cfg);
  }
  /**
   * @override
   */


  _proto.processAdjust = function processAdjust()
  /* dataArray */
  {};

  return Adjust;
}();

module.exports = Adjust;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isObject = function isObject(value) {
  /**
   * isObject({}) => true
   * isObject([1, 2, 3]) => true
   * isObject(Function) => true
   * isObject(null) => false
   */
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return value !== null && type === 'object' || type === 'function';
};

module.exports = isObject;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

// isFinite,
var isNil = function isNil(value) {
  /**
   * isNil(null) => true
   * isNil() => true
   */
  return value === null || value === undefined;
};

module.exports = isNil;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var isType = __webpack_require__(13);

var isString = function isString(str) {
  return isType(str, 'String');
};

module.exports = isString;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(0);

var Global = __webpack_require__(1);

var Vector2 = __webpack_require__(6);

var Abastract =
/*#__PURE__*/
function () {
  var _proto = Abastract.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {
    /**
     * ticks
     * @type {Array}
     */
    this.ticks = [];
    /**
     * the configuration for tickLine
     * @type {Object}
     */

    this.tickLine = {};
    /**
     * the direction of ticks, 1 means clockwise
     * @type {Number}
     */

    this.offsetFactor = 1;
    /**
     * the top container
     * @type {container}
     */

    this.frontContainer = null;
    /**
     * the back container
     * @type {[type]}
     */

    this.backContainer = null;
    /**
     * points for draw grid line
     * @type {Array}
     */

    this.gridPoints = [];
  };

  function Abastract(cfg) {
    this._initDefaultCfg();

    Util.mix(this, cfg);
    this.draw();
  }

  _proto.draw = function draw() {
    var line = this.line,
        tickLine = this.tickLine,
        label = this.label,
        grid = this.grid;
    grid && this.drawGrid(grid); // draw the grid lines

    tickLine && this.drawTicks(tickLine); // draw the tickLine

    line && this.drawLine(line); // draw axis line

    label && this.drawLabels(); // draw ticks
  };

  _proto.drawTicks = function drawTicks(tickCfg) {
    var self = this;
    var ticks = self.ticks;
    var length = tickCfg.length;
    var container = self.getContainer(tickCfg.top);
    Util.each(ticks, function (tick) {
      var start = self.getOffsetPoint(tick.value);
      var end = self.getSidePoint(start, length);
      var shape = container.addShape('line', {
        className: 'axis-tick',
        attrs: Util.mix({
          x1: start.x,
          y1: start.y,
          x2: end.x,
          y2: end.y
        }, tickCfg)
      });
      shape._id = self._id + '-ticks';
    });
  };

  _proto.drawLabels = function drawLabels() {
    var self = this;
    var labelOffset = self.labelOffset;
    var labels = self.labels;
    Util.each(labels, function (labelShape) {
      var container = self.getContainer(labelShape.get('top'));
      var start = self.getOffsetPoint(labelShape.get('value'));

      var _self$getSidePoint = self.getSidePoint(start, labelOffset),
          x = _self$getSidePoint.x,
          y = _self$getSidePoint.y;

      labelShape.attr(Util.mix({
        x: x,
        y: y
      }, self.getTextAlignInfo(start, labelOffset), labelShape.get('textStyle')));
      labelShape._id = self._id + '-' + labelShape.attr('text');
      container.add(labelShape);
    });
  };

  _proto.drawLine = function drawLine() {};

  _proto.drawGrid = function drawGrid(grid) {
    var self = this;
    var gridPoints = self.gridPoints,
        ticks = self.ticks;
    var gridCfg = grid;
    var count = gridPoints.length;
    Util.each(gridPoints, function (subPoints, index) {
      if (Util.isFunction(grid)) {
        var tick = ticks[index] || {};
        var executedGrid = grid(tick.text, index, count);
        gridCfg = executedGrid ? Util.mix({}, Global._defaultAxis.grid, executedGrid) : null;
      }

      if (gridCfg) {
        var type = gridCfg.type; // has two types: 'line' and 'arc'

        var points = subPoints.points;
        var container = self.getContainer(gridCfg.top);
        var shape;

        if (type === 'arc') {
          var center = self.center,
              startAngle = self.startAngle,
              endAngle = self.endAngle;
          var radius = Vector2.length([points[0].x - center.x, points[0].y - center.y]);
          shape = container.addShape('Arc', {
            className: 'axis-grid',
            attrs: Util.mix({
              x: center.x,
              y: center.y,
              startAngle: startAngle,
              endAngle: endAngle,
              r: radius
            }, gridCfg)
          });
        } else {
          shape = container.addShape('Polyline', {
            className: 'axis-grid',
            attrs: Util.mix({
              points: points
            }, gridCfg)
          });
        }

        shape._id = subPoints._id;
      }
    });
  };

  _proto.getOffsetPoint = function getOffsetPoint() {};

  _proto.getAxisVector = function getAxisVector() {};

  _proto.getOffsetVector = function getOffsetVector(point, offset) {
    var self = this;
    var axisVector = self.getAxisVector(point);
    var normal = Vector2.normalize([], axisVector);
    var factor = self.offsetFactor;
    var verticalVector = [normal[1] * -1 * factor, normal[0] * factor];
    return Vector2.scale([], verticalVector, offset);
  };

  _proto.getSidePoint = function getSidePoint(point, offset) {
    var self = this;
    var offsetVector = self.getOffsetVector(point, offset);
    return {
      x: point.x + offsetVector[0],
      y: point.y + offsetVector[1]
    };
  };

  _proto.getTextAlignInfo = function getTextAlignInfo(point, offset) {
    var self = this;
    var offsetVector = self.getOffsetVector(point, offset);
    var align;
    var baseLine;

    if (offsetVector[0] > 0) {
      align = 'left';
    } else if (offsetVector[0] < 0) {
      align = 'right';
    } else {
      align = 'center';
    }

    if (offsetVector[1] > 0) {
      baseLine = 'top';
    } else if (offsetVector[1] < 0) {
      baseLine = 'bottom';
    } else {
      baseLine = 'middle';
    }

    return {
      textAlign: align,
      textBaseline: baseLine
    };
  };

  _proto.getContainer = function getContainer(isTop) {
    var frontContainer = this.frontContainer,
        backContainer = this.backContainer;
    return isTop ? frontContainer : backContainer;
  };

  return Abastract;
}();

module.exports = Abastract;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(0);

var MatrixUtil = __webpack_require__(25);

var Vector2 = __webpack_require__(6);

var StyleUtil = __webpack_require__(104);

function isUnchanged(m) {
  return m[0] === 1 && m[1] === 0 && m[2] === 0 && m[3] === 1 && m[4] === 0 && m[5] === 0;
}

var ALIAS_ATTRS_MAP = {
  stroke: 'strokeStyle',
  fill: 'fillStyle',
  opacity: 'globalAlpha'
};
var SHAPE_ATTRS = ['fillStyle', 'font', 'globalAlpha', 'lineCap', 'lineWidth', 'lineJoin', 'miterLimit', 'shadowBlur', 'shadowColor', 'shadowOffsetX', 'shadowOffsetY', 'strokeStyle', 'textAlign', 'textBaseline', 'lineDash', 'shadow' // 兼容支付宝小程序
];
var CLIP_SHAPES = ['circle', 'sector', 'polygon', 'rect', 'polyline'];

var Element =
/*#__PURE__*/
function () {
  var _proto = Element.prototype;

  _proto._initProperties = function _initProperties() {
    this._attrs = {
      zIndex: 0,
      visible: true,
      destroyed: false
    };
  };

  function Element(cfg) {
    this._initProperties();

    Util.mix(this._attrs, cfg);
    var attrs = this._attrs.attrs;

    if (attrs) {
      this.initAttrs(attrs);
    }

    this.initTransform();
  }

  _proto.get = function get(name) {
    return this._attrs[name];
  };

  _proto.set = function set(name, value) {
    this._attrs[name] = value;
  };

  _proto.isGroup = function isGroup() {
    return this.get('isGroup');
  };

  _proto.isShape = function isShape() {
    return this.get('isShape');
  };

  _proto.initAttrs = function initAttrs(attrs) {
    this.attr(Util.mix(this.getDefaultAttrs(), attrs));
  };

  _proto.getDefaultAttrs = function getDefaultAttrs() {
    return {};
  };

  _proto._setAttr = function _setAttr(name, value) {
    var attrs = this._attrs.attrs;

    if (name === 'clip') {
      value = this._setAttrClip(value);
    } else {
      var alias = ALIAS_ATTRS_MAP[name];

      if (alias) {
        attrs[alias] = value;
      }
    }

    attrs[name] = value;
  };

  _proto._getAttr = function _getAttr(name) {
    return this._attrs.attrs[name];
  } // _afterAttrsSet() {}
  ;

  _proto._setAttrClip = function _setAttrClip(clip) {
    if (clip && CLIP_SHAPES.indexOf(clip._attrs.type) > -1) {
      if (clip.get('canvas') === null) {
        clip = Object.assign({}, clip);
      }

      clip.set('parent', this.get('parent'));
      clip.set('context', this.get('context'));
      return clip;
    }

    return null;
  };

  _proto.attr = function attr(name, value) {
    var self = this;
    if (self.get('destroyed')) return null;
    var argumentsLen = arguments.length;

    if (argumentsLen === 0) {
      return self._attrs.attrs;
    }

    if (Util.isObject(name)) {
      this._attrs.bbox = null;

      for (var k in name) {
        self._setAttr(k, name[k]);
      }

      if (self._afterAttrsSet) {
        self._afterAttrsSet();
      }

      return self;
    }

    if (argumentsLen === 2) {
      this._attrs.bbox = null;

      self._setAttr(name, value);

      if (self._afterAttrsSet) {
        self._afterAttrsSet();
      }

      return self;
    }

    return self._getAttr(name);
  };

  _proto.getParent = function getParent() {
    return this.get('parent');
  };

  _proto.draw = function draw(context) {
    if (this.get('destroyed')) {
      return;
    }

    if (this.get('visible')) {
      this.setContext(context);
      this.drawInner(context);
      this.restoreContext(context);
    }
  };

  _proto.setContext = function setContext(context) {
    var clip = this._attrs.attrs.clip;
    context.save();

    if (clip) {
      clip.resetTransform(context);
      clip.createPath(context);
      context.clip();
    }

    this.resetContext(context);
    this.resetTransform(context);
  };

  _proto.restoreContext = function restoreContext(context) {
    context.restore();
  };

  _proto.resetContext = function resetContext(context) {
    var elAttrs = this._attrs.attrs;

    if (!this._attrs.isGroup) {
      for (var k in elAttrs) {
        if (SHAPE_ATTRS.indexOf(k) > -1) {
          var v = elAttrs[k];

          if (k === 'fillStyle' || k === 'strokeStyle') {
            v = StyleUtil.parseStyle(v, this, context);
          }

          if (k === 'lineDash' && context.setLineDash && Util.isArray(v)) {
            context.setLineDash(v);
          } else {
            context[k] = v;
          }
        }
      }
    }
  };

  _proto.hasFill = function hasFill() {
    return this.get('canFill') && this._attrs.attrs.fillStyle;
  };

  _proto.hasStroke = function hasStroke() {
    return this.get('canStroke') && this._attrs.attrs.strokeStyle;
  };

  _proto.drawInner = function drawInner()
  /* context */
  {};

  _proto.show = function show() {
    this.set('visible', true);
    return this;
  };

  _proto.hide = function hide() {
    this.set('visible', false);
    return this;
  };

  _proto.isVisible = function isVisible() {
    return this.get('visible');
  };

  _proto._removeFromParent = function _removeFromParent() {
    var parent = this.get('parent');

    if (parent) {
      var children = parent.get('children');
      Util.Array.remove(children, this);
    }

    return this;
  };

  _proto.remove = function remove(destroy) {
    if (destroy) {
      this.destroy();
    } else {
      this._removeFromParent();
    }
  };

  _proto.destroy = function destroy() {
    var destroyed = this.get('destroyed');

    if (destroyed) {
      return null;
    }

    this._removeFromParent();

    this._attrs = {};
    this.set('destroyed', true);
  };

  _proto.getBBox = function getBBox() {
    return {
      minX: 0,
      maxX: 0,
      minY: 0,
      maxY: 0,
      width: 0,
      height: 0
    };
  };

  _proto.initTransform = function initTransform() {
    var attrs = this._attrs.attrs || {};

    if (!attrs.matrix) {
      attrs.matrix = [1, 0, 0, 1, 0, 0];
    }

    this._attrs.attrs = attrs;
  };

  _proto.getMatrix = function getMatrix() {
    return this._attrs.attrs.matrix;
  };

  _proto.setMatrix = function setMatrix(m) {
    this._attrs.attrs.matrix = [m[0], m[1], m[2], m[3], m[4], m[5]];
  };

  _proto.transform = function transform(actions) {
    var matrix = this._attrs.attrs.matrix;
    this._attrs.attrs.matrix = MatrixUtil.transform(matrix, actions);
    return this;
  };

  _proto.setTransform = function setTransform(actions) {
    this._attrs.attrs.matrix = [1, 0, 0, 1, 0, 0];
    return this.transform(actions);
  };

  _proto.translate = function translate(x, y) {
    var matrix = this._attrs.attrs.matrix;
    MatrixUtil.translate(matrix, matrix, [x, y]);
  };

  _proto.rotate = function rotate(rad) {
    var matrix = this._attrs.attrs.matrix;
    MatrixUtil.rotate(matrix, matrix, rad);
  };

  _proto.scale = function scale(sx, sy) {
    var matrix = this._attrs.attrs.matrix;
    MatrixUtil.scale(matrix, matrix, [sx, sy]);
  };

  _proto.moveTo = function moveTo(x, y) {
    var cx = this._attrs.x || 0;
    var cy = this._attrs.y || 0;
    this.translate(x - cx, y - cy);
    this.set('x', x);
    this.set('y', y);
  };

  _proto.apply = function apply(v) {
    var m = this._attrs.attrs.matrix;
    Vector2.transformMat2d(v, v, m);
    return this;
  };

  _proto.resetTransform = function resetTransform(context) {
    var mo = this._attrs.attrs.matrix;

    if (!isUnchanged(mo)) {
      context.transform(mo[0], mo[1], mo[2], mo[3], mo[4], mo[5]);
    }
  };

  _proto.isDestroyed = function isDestroyed() {
    return this.get('destroyed');
  };

  return Element;
}();

module.exports = Element;

/***/ }),
/* 25 */
/***/ (function(module, exports) {

var Matrix = {
  multiply: function multiply(m1, m2) {
    var m11 = m1[0] * m2[0] + m1[2] * m2[1];
    var m12 = m1[1] * m2[0] + m1[3] * m2[1];
    var m21 = m1[0] * m2[2] + m1[2] * m2[3];
    var m22 = m1[1] * m2[2] + m1[3] * m2[3];
    var dx = m1[0] * m2[4] + m1[2] * m2[5] + m1[4];
    var dy = m1[1] * m2[4] + m1[3] * m2[5] + m1[5];
    return [m11, m12, m21, m22, dx, dy];
  },
  scale: function scale(out, m, v) {
    out[0] = m[0] * v[0];
    out[1] = m[1] * v[0];
    out[2] = m[2] * v[1];
    out[3] = m[3] * v[1];
    out[4] = m[4];
    out[5] = m[5];
    return out;
  },
  rotate: function rotate(out, m, radian) {
    var c = Math.cos(radian);
    var s = Math.sin(radian);
    var m11 = m[0] * c + m[2] * s;
    var m12 = m[1] * c + m[3] * s;
    var m21 = m[0] * -s + m[2] * c;
    var m22 = m[1] * -s + m[3] * c;
    out[0] = m11;
    out[1] = m12;
    out[2] = m21;
    out[3] = m22;
    out[4] = m[4];
    out[5] = m[5];
    return out;
  },
  translate: function translate(out, m, v) {
    out[0] = m[0];
    out[1] = m[1];
    out[2] = m[2];
    out[3] = m[3];
    out[4] = m[4] + m[0] * v[0] + m[2] * v[1];
    out[5] = m[5] + m[1] * v[0] + m[3] * v[1];
    return out;
  },
  transform: function transform(m, actions) {
    var out = [].concat(m);

    for (var i = 0, len = actions.length; i < len; i++) {
      var action = actions[i];

      switch (action[0]) {
        case 't':
          Matrix.translate(out, out, [action[1], action[2]]);
          break;

        case 's':
          Matrix.scale(out, out, [action[1], action[2]]);
          break;

        case 'r':
          Matrix.rotate(out, out, action[1]);
          break;

        default:
          break;
      }
    }

    return out;
  }
};
module.exports = Matrix;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(4),
    Shape = _require.Shape;

module.exports = {
  getClip: function getClip(coord) {
    var start = coord.start;
    var end = coord.end;
    var width = end.x - start.x;
    var height = Math.abs(end.y - start.y);
    var margin = 10;
    var clip;

    if (coord.isPolar) {
      var circleRadius = coord.circleRadius,
          center = coord.center,
          startAngle = coord.startAngle,
          endAngle = coord.endAngle;
      clip = new Shape.Sector({
        attrs: {
          x: center.x,
          y: center.y,
          r: circleRadius,
          r0: 0,
          startAngle: startAngle,
          endAngle: endAngle
        }
      });
    } else {
      clip = new Shape.Rect({
        attrs: {
          x: start.x,
          y: end.y - margin,
          width: width,
          height: height + 2 * margin
        }
      });
    }

    clip.isClip = true;
    return clip;
  },
  isPointInPlot: function isPointInPlot(point, plot) {
    var x = point.x,
        y = point.y;
    var tl = plot.tl,
        tr = plot.tr,
        br = plot.br;
    return x >= tl.x && x <= tr.x && y >= tl.y && y <= br.y;
  }
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.GCanvas=t():e.GCanvas=t()}("undefined"!=typeof self?self:this,function(){return function(e){function t(a){if(i[a])return i[a].exports;var n=i[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,t),n.l=!0,n.exports}var i={};return t.m=e,t.c=i,t.d=function(e,i,a){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:a})},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/",t(t.s=4)}([function(e,t,i){"use strict";function a(e,t){return e.toLowerCase()+"-"+t}Object.defineProperty(t,"__esModule",{value:!0}),t.getTransferedObjectUUID=a},function(e,t,i){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=function(){function e(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}(),o=i(7),s=a(o),u=i(8),d=a(u),c=i(9),l=a(c),f=function(){function e(){n(this,e),this._drawCommands="",this._globalAlpha=1,this._fillStyle="rgb(0,0,0)",this._strokeStyle="rgb(0,0,0)",this._lineWidth=1,this._lineCap="butt",this._lineJoin="miter",this._miterLimit=10,this._globalCompositeOperation="source-over",this._textAlign="start",this._textBaseline="alphabetic",this._font="10px sans-serif",this._savedGlobalAlpha=[],this.timer=null,this.componentId=null,this.createRadialGradient=function(e,t,i,a,n,r){return new l.default(e,t,i,a,n,r)},this.quadraticCurveTo=function(e,t,i,a){this._drawCommands=this._drawCommands.concat("u"+e+","+t+","+i+","+a+";")},this.strokeText=function(e,t,i){var a=e.replace(/!/g,"!!");a=a.replace(/,/g,"!,"),a=a.replace(/;/g,"!;"),this._drawCommands=this._drawCommands.concat("U"+a+","+t+","+i+",0.0;")},this.measureText=function(e){throw new Error("GCanvas not supported yet")},this.isPointInPath=function(e,t){throw new Error("GCanvas not supported yet")},this.className="CanvasRenderingContext2D"}return r(e,[{key:"setTransform",value:function(e,t,i,a,n,r){this._drawCommands=this._drawCommands.concat("t"+(1===e?"1":e.toFixed(2))+","+(0===t?"0":t.toFixed(2))+","+(0===i?"0":i.toFixed(2))+","+(1===a?"1":a.toFixed(2))+","+n.toFixed(2)+","+r.toFixed(2)+";")}},{key:"transform",value:function(e,t,i,a,n,r){this._drawCommands=this._drawCommands.concat("f"+(1===e?"1":e.toFixed(2))+","+(0===t?"0":t.toFixed(2))+","+(0===i?"0":i.toFixed(2))+","+(1===a?"1":a.toFixed(2))+","+n+","+r+";")}},{key:"resetTransform",value:function(){this._drawCommands=this._drawCommands.concat("m;")}},{key:"scale",value:function(e,t){this._drawCommands=this._drawCommands.concat("k"+e.toFixed(2)+","+t.toFixed(2)+";")}},{key:"rotate",value:function(e){this._drawCommands=this._drawCommands.concat("r"+e.toFixed(6)+";")}},{key:"translate",value:function(e,t){this._drawCommands=this._drawCommands.concat("l"+e.toFixed(2)+","+t.toFixed(2)+";")}},{key:"save",value:function(){this._savedGlobalAlpha.push(this._globalAlpha),this._drawCommands=this._drawCommands.concat("v;")}},{key:"restore",value:function(){this._drawCommands=this._drawCommands.concat("e;"),this._globalAlpha=this._savedGlobalAlpha.pop()}},{key:"createPattern",value:function(e,t){return new s.default(e,t)}},{key:"createLinearGradient",value:function(e,t,i,a){return new d.default(e,t,i,a)}},{key:"strokeRect",value:function(e,t,i,a){this._drawCommands=this._drawCommands.concat("s"+e+","+t+","+i+","+a+";")}},{key:"clearRect",value:function(e,t,i,a){this._drawCommands=this._drawCommands.concat("c"+e+","+t+","+i+","+a+";")}},{key:"clip",value:function(){this._drawCommands=this._drawCommands.concat("p;")}},{key:"resetClip",value:function(){this._drawCommands=this._drawCommands.concat("q;")}},{key:"closePath",value:function(){this._drawCommands=this._drawCommands.concat("o;")}},{key:"moveTo",value:function(e,t){this._drawCommands=this._drawCommands.concat("g"+e.toFixed(2)+","+t.toFixed(2)+";")}},{key:"lineTo",value:function(e,t){this._drawCommands=this._drawCommands.concat("i"+e.toFixed(2)+","+t.toFixed(2)+";")}},{key:"bezierCurveTo",value:function(e,t,i,a,n,r){this._drawCommands=this._drawCommands.concat("z"+e.toFixed(2)+","+t.toFixed(2)+","+i.toFixed(2)+","+a.toFixed(2)+","+n.toFixed(2)+","+r.toFixed(2)+";")}},{key:"arcTo",value:function(e,t,i,a,n){this._drawCommands=this._drawCommands.concat("h"+e+","+t+","+i+","+a+","+n+";")}},{key:"beginPath",value:function(){this._drawCommands=this._drawCommands.concat("b;")}},{key:"fillRect",value:function(e,t,i,a){this._drawCommands=this._drawCommands.concat("n"+e+","+t+","+i+","+a+";")}},{key:"rect",value:function(e,t,i,a){this._drawCommands=this._drawCommands.concat("w"+e+","+t+","+i+","+a+";")}},{key:"fill",value:function(){this._drawCommands=this._drawCommands.concat("L;")}},{key:"stroke",value:function(e){this._drawCommands=this._drawCommands.concat("x;")}},{key:"arc",value:function(e,t,i,a,n,r){var o=0;r&&(o=1),this._drawCommands=this._drawCommands.concat("y"+e.toFixed(2)+","+t.toFixed(2)+","+i.toFixed(2)+","+a+","+n+","+o+";")}},{key:"fillText",value:function(e,t,i){var a=e.replace(/!/g,"!!");a=a.replace(/,/g,"!,"),a=a.replace(/;/g,"!;"),this._drawCommands=this._drawCommands.concat("T"+a+","+t+","+i+",0.0;")}},{key:"drawImage",value:function(t,i,a,n,r,o,s,u,d){var c=arguments.length;e.GBridge.bindImageTexture(this.componentId,t.src,t._id),this._drawCommands+=function(){if(3===c){var e=parseFloat(i)||0,l=parseFloat(a)||0;return"d"+t._id+",0,0,"+t.width+","+t.height+","+e+","+l+","+t.width+","+t.height+";"}if(5===c){var f=parseFloat(i)||0,_=parseFloat(a)||0,h=parseInt(n)||t.width,E=parseInt(r)||t.height;return"d"+t._id+",0,0,"+t.width+","+t.height+","+f+","+_+","+h+","+E+";"}if(9===c)return i=parseFloat(i)||0,a=parseFloat(a)||0,n=parseInt(n)||t.width,r=parseInt(r)||t.height,o=parseFloat(o)||0,s=parseFloat(s)||0,u=parseInt(u)||t.width,d=parseInt(d)||t.height,"d"+t._id+","+i+","+a+","+n+","+r+","+o+","+s+","+u+","+d+";"}()}},{key:"fillStyle",set:function(t){if(this._fillStyle=t,"string"==typeof t)this._drawCommands=this._drawCommands.concat("F"+t+";");else if(t instanceof s.default){var i=t._img;e.GBridge.bindImageTexture(this.componentId,i.src,i._id),this._drawCommands=this._drawCommands.concat("G"+i._id+","+t._style+";")}else if(t instanceof d.default){for(var a="D"+t._start_pos._x.toFixed(2)+","+t._start_pos._y.toFixed(2)+","+t._end_pos._x.toFixed(2)+","+t._end_pos._y.toFixed(2)+","+t._stop_count,n=0;n<t._stop_count;++n)a+=","+t._stops[n]._pos+","+t._stops[n]._color;this._drawCommands=this._drawCommands.concat(a+";")}else if(t instanceof l.default){for(var a="H"+t._start_pos._x.toFixed(2)+","+t._start_pos._y.toFixed(2)+","+t._start_pos._r.toFixed(2)+","+t._end_pos._x.toFixed(2)+","+t._end_pos._y.toFixed(2)+","+t._end_pos._r.toFixed(2)+","+t._stop_count,n=0;n<t._stop_count;++n)a+=","+t._stops[n]._pos+","+t._stops[n]._color;this._drawCommands=this._drawCommands.concat(a+";")}},get:function(){return this._fillStyle}},{key:"globalAlpha",get:function(){return this._globalAlpha},set:function(e){this._globalAlpha=e,this._drawCommands=this._drawCommands.concat("a"+e.toFixed(2)+";")}},{key:"strokeStyle",get:function(){return this._strokeStyle},set:function(t){if(this._strokeStyle=t,"string"==typeof t)this._drawCommands=this._drawCommands.concat("S"+t+";");else if(t instanceof s.default){var i=t._img;e.GBridge.bindImageTexture(this.componentId,i.src,i._id),this._drawCommands=this._drawCommands.concat("G"+i._id+","+t._style+";")}else if(t instanceof d.default){for(var a="D"+t._start_pos._x.toFixed(2)+","+t._start_pos._y.toFixed(2)+","+t._end_pos._x.toFixed(2)+","+t._end_pos._y.toFixed(2)+","+t._stop_count,n=0;n<t._stop_count;++n)a+=","+t._stops[n]._pos+","+t._stops[n]._color;this._drawCommands=this._drawCommands.concat(a+";")}else if(t instanceof l.default){for(var a="H"+t._start_pos._x.toFixed(2)+","+t._start_pos._y.toFixed(2)+","+t._start_pos._r.toFixed(2)+","+t._end_pos._x.toFixed(2)+","+t._end_pos._y+",".toFixed(2)+t._end_pos._r.toFixed(2)+","+t._stop_count,n=0;n<t._stop_count;++n)a+=","+t._stops[n]._pos+","+t._stops[n]._color;this._drawCommands=this._drawCommands.concat(a+";")}}},{key:"lineWidth",get:function(){return this._lineWidth},set:function(e){this._lineWidth=e,this._drawCommands=this._drawCommands.concat("W"+e+";")}},{key:"lineCap",get:function(){return this._lineCap},set:function(e){this._lineCap=e,this._drawCommands=this._drawCommands.concat("C"+e+";")}},{key:"lineJoin",get:function(){return this._lineJoin},set:function(e){this._lineJoin=e,this._drawCommands=this._drawCommands.concat("J"+e+";")}},{key:"miterLimit",get:function(){return this._miterLimit},set:function(e){this._miterLimit=e,this._drawCommands=this._drawCommands.concat("M"+e+";")}},{key:"globalCompositeOperation",get:function(){return this._globalCompositeOperation},set:function(e){this._globalCompositeOperation=e;var t=0;switch(e){case"source-over":t=0;break;case"source-atop":t=5;break;case"source-in":t=0;break;case"source-out":t=2;break;case"destination-over":case"destination-atop":case"destination-in":t=4;break;case"destination-out":t=3;break;case"lighter":t=1;break;case"copy":t=2;break;case"xor":t=6;break;default:t=0}this._drawCommands=this._drawCommands.concat("B"+t+";")}},{key:"textAlign",get:function(){return this._textAlign},set:function(e){this._textAlign=e;var t=0;switch(e){case"start":t=0;break;case"end":t=1;break;case"left":t=2;break;case"center":t=3;break;case"right":t=4;break;default:t=0}this._drawCommands=this._drawCommands.concat("A"+t+";")}},{key:"textBaseline",get:function(){return this._textBaseline},set:function(e){this._textBaseline=e;var t=0;switch(e){case"alphabetic":t=0;break;case"middle":t=1;break;case"top":t=2;break;case"hanging":t=3;break;case"bottom":t=4;break;case"ideographic":t=5;break;default:t=0}this._drawCommands=this._drawCommands.concat("E"+t+";")}},{key:"font",get:function(){return this._font},set:function(e){this._font=e,this._drawCommands=this._drawCommands.concat("j"+e+";")}}]),e}();t.default=f,e.exports=t.default},function(e,t,i){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function n(e){return Array.isArray(e)?e:Array.from(e)}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=function(){function e(e,t){var i=[],a=!0,n=!1,r=void 0;try{for(var o,s=e[Symbol.iterator]();!(a=(o=s.next()).done)&&(i.push(o.value),!t||i.length!==t);a=!0);}catch(e){n=!0,r=e}finally{try{!a&&s.return&&s.return()}finally{if(n)throw r}}return i}return function(t,i){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),s=function(){function e(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}(),u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},d=i(10),c=a(d),l=i(11),f=a(l),_=i(12),h=a(_),E=i(13),v=a(E),m=i(14),T=a(m),g=i(15),A=a(g),N=i(16),p=a(N),R=i(17),b=a(R),C=i(18),I=a(C),B=i(19),S=a(B),y=i(3),x=a(y),G=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i="Float32Array";if(t)if(e instanceof Uint8Array)i="Uint8Array";else if(e instanceof Uint16Array)i="Uint16Array";else if(e instanceof Uint32Array)i="Uint32Array";else{if(!(e instanceof Float32Array))throw new Error("Check array type failed. Array type is "+(void 0===e?"undefined":u(e)));i="Float32Array"}return{Uint8Array:1,Uint16Array:2,Uint32Array:4,Float32Array:14}[i]+","+btoa(function(e,t){for(var i="",a=0;a<e.length;a++)0!==a&&(i+=t),i+=e[a];return i}(e,","))},F=function(){function e(t,i,a){var n=this;r(this,e),O.call(this),this._canvas=t,this._type=i,this._version="WebGL 1.0",this._attrs=a,this._map=new Map,Object.keys(c.default).forEach(function(e){return Object.defineProperty(n,e,{value:c.default[e]})})}return s(e,[{key:"canvas",get:function(){return this._canvas}}]),e}(),O=function(){this.className="WebGLRenderingContext",this.activeTexture=function(e){F.GBridge.callNative(this._canvas.id,x.default.activeTexture+","+e,!0)},this.attachShader=function(e,t){F.GBridge.callNative(this._canvas.id,x.default.attachShader+","+e.id+","+t.id,!0)},this.bindAttribLocation=function(e,t,i){F.GBridge.callNative(this._canvas.id,x.default.bindAttribLocation+","+e.id+","+t+","+i,!0)},this.bindBuffer=function(e,t){F.GBridge.callNative(this._canvas.id,x.default.bindBuffer+","+e+","+(t?t.id:0),!0)},this.bindFramebuffer=function(e,t){F.GBridge.callNative(this._canvas.id,x.default.bindFramebuffer+","+e+","+(t?t.id:0),!0)},this.bindRenderbuffer=function(e,t){F.GBridge.callNative(this._canvas.id,x.default.bindRenderbuffer+","+e+","+(t?t.id:0),!0)},this.bindTexture=function(e,t){F.GBridge.callNative(this._canvas.id,x.default.bindTexture+","+e+","+(t?t.id:0),!0)},this.blendColor=function(e,t,i,a){F.GBridge.callNative(this._canvas.id,x.default.blendColor+","+target+","+e+","+t+","+i+","+a,!0)},this.blendEquation=function(e){F.GBridge.callNative(this._canvas.id,x.default.blendEquation+","+e,!0)},this.blendEquationSeparate=function(e,t){F.GBridge.callNative(this._canvas.id,x.default.blendEquationSeparate+","+e+","+t,!0)},this.blendFunc=function(e,t){F.GBridge.callNative(this._canvas.id,x.default.blendFunc+","+e+","+t,!0)},this.blendFuncSeparate=function(e,t,i,a){F.GBridge.callNative(this._canvas.id,x.default.blendFuncSeparate+","+e+","+t+","+i+","+a,!0)},this.bufferData=function(e,t,i){F.GBridge.callNative(this._canvas.id,x.default.bufferData+","+e+","+G(t,!0)+","+i,!0)},this.bufferSubData=function(e,t,i){F.GBridge.callNative(this._canvas.id,x.default.bufferSubData+","+e+","+t+","+G(i,!0),!0)},this.checkFramebufferStatus=function(e){var t=F.GBridge.callNative(this._canvas.id,x.default.checkFramebufferStatus+","+e);return Number(t)},this.clear=function(e){F.GBridge.callNative(this._canvas.id,x.default.clear+","+e),this._canvas._needRender=!0},this.clearColor=function(e,t,i,a){F.GBridge.callNative(this._canvas.id,x.default.clearColor+","+e+","+t+","+i,!0)},this.clearDepth=function(e){F.GBridge.callNative(this._canvas.id,x.default.clearDepth+","+e,!0)},this.clearStencil=function(e){F.GBridge.callNative(this._canvas.id,x.default.clearStencil+","+e)},this.colorMask=function(e,t,i,a){F.GBridge.callNative(this._canvas.id,x.default.colorMask+","+e+","+t+","+i+","+a)},this.compileShader=function(e){F.GBridge.callNative(this._canvas.id,x.default.compileShader+","+e.id,!0)},this.compressedTexImage2D=function(e,t,i,a,n,r,o){F.GBridge.callNative(this._canvas.id,x.default.compressedTexImage2D+","+e+","+t+","+i+","+a+","+n+","+r+","+G(o),!0)},this.compressedTexSubImage2D=function(e,t,i,a,n,r,o,s){F.GBridge.callNative(this._canvas.id,x.default.compressedTexSubImage2D+","+e+","+t+","+i+","+a+","+n+","+r+","+o+","+G(s),!0)},this.copyTexImage2D=function(e,t,i,a,n,r,o,s){F.GBridge.callNative(this._canvas.id,x.default.copyTexImage2D+","+e+","+t+","+i+","+a+","+n+","+r+","+o+","+s,!0)},this.copyTexSubImage2D=function(e,t,i,a,n,r,o,s){F.GBridge.callNative(this._canvas.id,x.default.copyTexSubImage2D+","+e+","+t+","+i+","+a+","+n+","+r+","+o+","+s)},this.createBuffer=function(){var e=F.GBridge.callNative(this._canvas.id,x.default.createBuffer+""),t=new h.default(e);return this._map.set(t.uuid(),t),t},this.createFramebuffer=function(){var e=F.GBridge.callNative(this._canvas.id,x.default.createFramebuffer+""),t=new v.default(e);return this._map.set(t.uuid(),t),t},this.createProgram=function(){var e=F.GBridge.callNative(this._canvas.id,x.default.createProgram+""),t=new p.default(e);return this._map.set(t.uuid(),t),t},this.createRenderbuffer=function(){var e=F.GBridge.callNative(this._canvas.id,x.default.createRenderbuffer+""),t=new T.default(e);return this._map.set(t.uuid(),t),t},this.createShader=function(e){var t=F.GBridge.callNative(this._canvas.id,x.default.createShader+","+e),i=new b.default(t,e);return this._map.set(i.uuid(),i),i},this.createTexture=function(){var e=F.GBridge.callNative(this._canvas.id,x.default.createTexture+""),t=new A.default(e);return this._map.set(t.uuid(),t),t},this.cullFace=function(e){F.GBridge.callNative(this._canvas.id,x.default.cullFace+","+e,!0)},this.deleteBuffer=function(e){F.GBridge.callNative(this._canvas.id,x.default.deleteBuffer+","+e.id,!0)},this.deleteFramebuffer=function(e){F.GBridge.callNative(this._canvas.id,x.default.deleteFramebuffer+","+e.id,!0)},this.deleteProgram=function(e){F.GBridge.callNative(this._canvas.id,x.default.deleteProgram+","+e.id,!0)},this.deleteRenderbuffer=function(e){F.GBridge.callNative(this._canvas.id,x.default.deleteRenderbuffer+","+e.id,!0)},this.deleteShader=function(e){F.GBridge.callNative(this._canvas.id,x.default.deleteShader+","+e.id,!0)},this.deleteTexture=function(e){F.GBridge.callNative(this._canvas.id,x.default.deleteTexture+","+e.id,!0)},this.depthFunc=function(e){F.GBridge.callNative(this._canvas.id,x.default.depthFunc+","+e)},this.depthMask=function(e){F.GBridge.callNative(this._canvas.id,x.default.depthMask+","+Number(e),!0)},this.depthRange=function(e,t){F.GBridge.callNative(this._canvas.id,x.default.depthRange+","+e+","+t,!0)},this.detachShader=function(e,t){F.GBridge.callNative(this._canvas.id,x.default.detachShader+","+e.id+","+t.id,!0)},this.disable=function(e){F.GBridge.callNative(this._canvas.id,x.default.disable+","+e,!0)},this.disableVertexAttribArray=function(e){F.GBridge.callNative(this._canvas.id,x.default.disableVertexAttribArray+","+e,!0)},this.drawArrays=function(e,t,i){F.GBridge.callNative(this._canvas.id,x.default.drawArrays+","+e+","+t+","+i),this._canvas._needRender=!0},this.drawElements=function(e,t,i,a){F.GBridge.callNative(this._canvas.id,x.default.drawElements+","+e+","+t+","+i+","+a+";"),this._canvas._needRender=!0},this.enable=function(e){F.GBridge.callNative(this._canvas.id,x.default.enable+","+e,!0)},this.enableVertexAttribArray=function(e){F.GBridge.callNative(this._canvas.id,x.default.enableVertexAttribArray+","+e,!0)},this.flush=function(){F.GBridge.callNative(this._canvas.id,x.default.flush+"")},this.framebufferRenderbuffer=function(e,t,i,a){F.GBridge.callNative(this._canvas.id,x.default.framebufferRenderbuffer+","+e+","+t+","+i+","+(a?a.id:0),!0)},this.framebufferTexture2D=function(e,t,i,a,n){F.GBridge.callNative(this._canvas.id,x.default.framebufferTexture2D+","+e+","+t+","+i+","+(a?a.id:0)+","+n,!0)},this.frontFace=function(e){F.GBridge.callNative(this._canvas.id,x.default.frontFace+","+e,!0)},this.generateMipmap=function(e){F.GBridge.callNative(this._canvas.id,x.default.generateMipmap+","+e,!0)},this.getActiveAttrib=function(e,t){var i=F.GBridge.callNative(this._canvas.id,x.default.getActiveAttrib+","+e.id+","+t),a=i.split(","),n=o(a,3),r=n[0],s=n[1],u=n[2];return new f.default({type:Number(r),size:Number(s),name:u})},this.getActiveUniform=function(e,t){var i=F.GBridge.callNative(this._canvas.id,x.default.getActiveUniform+","+e.id+","+t),a=i.split(","),n=o(a,3),r=n[0],s=n[1],u=n[2];return new f.default({type:Number(r),size:Number(s),name:u})},this.getAttachedShaders=function(e){var t=this,i=F.GBridge.callNative(this._canvas.id,x.default.getAttachedShaders+","+e.id),a=n(i);a[0];return a.slice(1).map(function(e){return t._map.get(b.default.uuid(e))})},this.getAttribLocation=function(e,t){return F.GBridge.callNative(this._canvas.id,x.default.getAttribLocation+","+e.id+","+t)},this.getBufferParameter=function(e,t){var i=(F.GBridge.callNative(this._canvas.id,x.default.getBufferParameter+","+e+","+t),getBufferParameter),a=o(i,2);a[0];return a[1]},this.getError=function(){return F.GBridge.callNative(this._canvas.id,x.default.getError+"")},this.getExtension=function(e){return null},this.getFramebufferAttachmentParameter=function(e,t,i){var a=F.GBridge.callNative(this._canvas.id,x.default.getFramebufferAttachmentParameter+","+e+","+t+","+i);switch(i){case c.default.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME:return this._map.get(T.default.uuid(a))||this._map.get(A.default.uuid(a))||null;default:return a}},this.getParameter=function(e){var t=F.GBridge.callNative(this._canvas.id,x.default.getParameter+","+e);switch(e){case c.default.VERSION:return this._version;case c.default.ARRAY_BUFFER_BINDING:case c.default.ELEMENT_ARRAY_BUFFER_BINDING:return this._map.get(h.default.uuid(t))||null;case c.default.CURRENT_PROGRAM:return this._map.get(p.default.uuid(t))||null;case c.default.FRAMEBUFFER_BINDING:return this._map.get(v.default.uuid(t))||null;case c.default.RENDERBUFFER_BINDING:return this._map.get(T.default.uuid(t))||null;case c.default.TEXTURE_BINDING_2D:case c.default.TEXTURE_BINDING_CUBE_MAP:return this._map.get(A.default.uuid(t))||null;case c.default.ALIASED_LINE_WIDTH_RANGE:case c.default.ALIASED_POINT_SIZE_RANGE:case c.default.BLEND_COLOR:case c.default.COLOR_CLEAR_VALUE:case c.default.DEPTH_RANGE:case c.default.MAX_VIEWPORT_DIMS:case c.default.SCISSOR_BOX:case c.default.VIEWPORT:case c.default.COMPRESSED_TEXTURE_FORMATS:default:var i=t.split(","),a=n(i),r=(a[0],a.slice(1));return 1===r.length?Number(r[0]):r.map(Number)}},this.getProgramInfoLog=function(e){return F.GBridge.callNative(this._canvas.id,x.default.getProgramInfoLog+","+e.id)},this.getProgramParameter=function(e,t){var i=F.GBridge.callNative(this._canvas.id,x.default.getProgramParameter+","+e.id+","+t),a=i.split(",").map(function(e){return parseInt(e)}),n=o(a,2),r=n[0],s=n[1];if(1===r)return Boolean(s);if(2===r)return s;throw new Error("Unrecongized program paramater "+i+", type: "+(void 0===i?"undefined":u(i)))},this.getRenderbufferParameter=function(e,t){return F.GBridge.callNative(this._canvas.id,x.default.getRenderbufferParameter+","+e+","+t)},this.getShaderInfoLog=function(e){return F.GBridge.callNative(this._canvas.id,x.default.getShaderInfoLog+","+e.id)},this.getShaderParameter=function(e,t){return F.GBridge.callNative(this._canvas.id,x.default.getShaderParameter+","+e.id+","+t)},this.getShaderPrecisionFormat=function(e,t){var i=F.GBridge.callNative(this._canvas.id,x.default.getShaderPrecisionFormat+","+e+","+t),a=o(i,3),n=a[0],r=a[1],s=a[2];return new I.default({rangeMin:Number(n),rangeMax:Number(r),precision:Number(s)})},this.getShaderSource=function(e){return F.GBridge.callNative(this._canvas.id,x.default.getShaderSource+","+e.id)},this.getSupportedExtensions=function(){return Object.keys({})},this.getTexParameter=function(e,t){return F.GBridge.callNative(this._canvas.id,x.default.getTexParameter+","+e+","+t)},this.getUniformLocation=function(e,t){var i=F.GBridge.callNative(this._canvas.id,x.default.getUniformLocation+","+e.id+","+t);return-1===i?null:new S.default(Number(i))},this.getVertexAttrib=function(e,t){var i=F.GBridge.callNative(this._canvas.id,x.default.getVertexAttrib+","+e+","+t);switch(t){case c.default.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING:return this._map.get(h.default.uuid(i))||null;case c.default.CURRENT_VERTEX_ATTRIB:default:return i}},this.getVertexAttribOffset=function(e,t){var i=F.GBridge.callNative(this._canvas.id,x.default.getVertexAttribOffset+","+e+","+t);return Number(i)},this.isBuffer=function(e){var t=F.GBridge.callNative(this._canvas.id,x.default.isBuffer+","+e.id);return Boolean(t)},this.isContextLost=function(){return!1},this.isEnabled=function(e){var t=F.GBridge.callNative(this._canvas.id,x.default.isEnabled+","+e);return Boolean(t)},this.isFramebuffer=function(e){var t=F.GBridge.callNative(this._canvas.id,x.default.isFramebuffer+","+e.id);return Boolean(t)},this.isProgram=function(e){var t=F.GBridge.callNative(this._canvas.id,x.default.isProgram+","+e.id);return Boolean(t)},this.isRenderbuffer=function(e){var t=F.GBridge.callNative(this._canvas.id,x.default.isRenderbuffer+","+renderbuffer.id);return Boolean(t)},this.isShader=function(e){var t=F.GBridge.callNative(this._canvas.id,x.default.isShader+","+e.id);return Boolean(t)},this.isTexture=function(e){var t=F.GBridge.callNative(this._canvas.id,x.default.isTexture+","+e.id);return Boolean(t)},this.lineWidth=function(e){F.GBridge.callNative(this._canvas.id,x.default.lineWidth+","+e,!0)},this.linkProgram=function(e){F.GBridge.callNative(this._canvas.id,x.default.linkProgram+","+e.id,!0)},this.pixelStorei=function(e,t){F.GBridge.callNative(this._canvas.id,x.default.pixelStorei+","+e+","+Number(t))},this.polygonOffset=function(e,t){F.GBridge.callNative(this._canvas.id,x.default.polygonOffset+","+e+","+t)},this.readPixels=function(e,t,i,a,r,o,s){for(var u=F.GBridge.callNative(this._canvas.id,x.default.readPixels+","+e+","+t+","+i+","+a+","+r+","+o),d=u.split(","),c=n(d),l=(c[0],c.slice(1)),f=0;f<l.length;f++)s[f]=parseInt(l[f])},this.renderbufferStorage=function(e,t,i,a){F.GBridge.callNative(this._canvas.id,x.default.renderbufferStorage+","+e+","+t+","+i+","+a,!0)},this.sampleCoverage=function(e,t){F.GBridge.callNative(this._canvas.id,x.default.sampleCoverage+","+e+","+Number(t),!0)},this.scissor=function(e,t,i,a){F.GBridge.callNative(this._canvas.id,x.default.scissor+","+e+","+t+","+i+","+a,!0)},this.shaderSource=function(e,t){F.GBridge.callNative(this._canvas.id,x.default.shaderSource+","+e.id+","+t)},this.stencilFunc=function(e,t,i){F.GBridge.callNative(this._canvas.id,x.default.stencilFunc+","+e+","+t+","+i,!0)},this.stencilFuncSeparate=function(e,t,i,a){F.GBridge.callNative(this._canvas.id,x.default.stencilFuncSeparate+","+e+","+t+","+i+","+a,!0)},this.stencilMask=function(e){F.GBridge.callNative(this._canvas.id,x.default.stencilMask+","+e,!0)},this.stencilMaskSeparate=function(e,t){F.GBridge.callNative(this._canvas.id,x.default.stencilMaskSeparate+","+e+","+t,!0)},this.stencilOp=function(e,t,i){F.GBridge.callNative(this._canvas.id,x.default.stencilOp+","+e+","+t+","+i)},this.stencilOpSeparate=function(e,t,i,a){F.GBridge.callNative(this._canvas.id,x.default.stencilOp+","+e+","+t+","+i+","+a,!0)},this.texImage2D=function(){for(var e,t=arguments.length,i=Array(t),a=0;a<t;a++)i[a]=arguments[a];(e=F.GBridge).texImage2D.apply(e,[this._canvas.id].concat(i))},this.texParameterf=function(e,t,i){F.GBridge.callNative(this._canvas.id,x.default.texParameterf+","+e+","+t+","+i,!0)},this.texParameteri=function(e,t,i){F.GBridge.callNative(this._canvas.id,x.default.texParameteri+","+e+","+t+","+i)},this.texSubImage2D=function(){for(var e,t=arguments.length,i=Array(t),a=0;a<t;a++)i[a]=arguments[a];(e=F.GBridge).texSubImage2D.apply(e,[this._canvas.id].concat(i))},this.uniform1f=function(e,t){F.GBridge.callNative(this._canvas.id,x.default.uniform1f+","+e.id+","+t)},this.uniform1fv=function(e,t){F.GBridge.callNative(this._canvas.id,x.default.uniform1fv+","+e.id+","+G(t),!0)},this.uniform1i=function(e,t){F.GBridge.callNative(this._canvas.id,x.default.uniform1i+","+e.id+","+t)},this.uniform1iv=function(e,t){F.GBridge.callNative(this._canvas.id,x.default.uniform1iv+","+e.id+","+G(t),!0)},this.uniform2f=function(e,t,i){F.GBridge.callNative(this._canvas.id,x.default.uniform2f+","+e.id+","+t+","+i,!0)},this.uniform2fv=function(e,t){F.GBridge.callNative(this._canvas.id,x.default.uniform2fv+","+e.id+","+G(t),!0)},this.uniform2i=function(e,t,i){F.GBridge.callNative(this._canvas.id,x.default.uniform2i+","+e.id+","+t+","+i,!0)},this.uniform2iv=function(e,t){F.GBridge.callNative(this._canvas.id,x.default.uniform2iv+","+e.id+","+G(t),!0)},this.uniform3f=function(e,t,i,a){F.GBridge.callNative(this._canvas.id,x.default.uniform3f+","+e.id+","+t+","+i+","+a,!0)},this.uniform3fv=function(e,t){F.GBridge.callNative(this._canvas.id,x.default.uniform3fv+","+e.id+","+G(t),!0)},this.uniform3i=function(e,t,i,a){F.GBridge.callNative(this._canvas.id,x.default.uniform3i+","+e.id+","+t+","+i+","+a,!0)},this.uniform3iv=function(e,t){F.GBridge.callNative(this._canvas.id,x.default.uniform3iv+","+e.id+","+G(t),!0)},this.uniform4f=function(e,t,i,a,n){F.GBridge.callNative(this._canvas.id,x.default.uniform4f+","+e.id+","+t+","+i+","+a+","+n,!0)},this.uniform4fv=function(e,t){F.GBridge.callNative(this._canvas.id,x.default.uniform4fv+","+e.id+","+G(t),!0)},this.uniform4i=function(e,t,i,a,n){F.GBridge.callNative(this._canvas.id,x.default.uniform4i+","+e.id+","+t+","+i+","+a+","+n,!0)},this.uniform4iv=function(e,t){F.GBridge.callNative(this._canvas.id,x.default.uniform4iv+","+e.id+","+G(t,!0),!0)},this.uniformMatrix2fv=function(e,t,i){F.GBridge.callNative(this._canvas.id,x.default.uniformMatrix2fv+","+e.id+","+Number(t)+","+G(i),!0)},this.uniformMatrix3fv=function(e,t,i){F.GBridge.callNative(this._canvas.id,x.default.uniformMatrix3fv+","+e.id+","+Number(t)+","+G(i),!0)},this.uniformMatrix4fv=function(e,t,i){F.GBridge.callNative(this._canvas.id,x.default.uniformMatrix4fv+","+e.id+","+Number(t)+","+G(i),!0)},this.useProgram=function(e){F.GBridge.callNative(this._canvas.id,x.default.useProgram+","+e.id,!0)},this.validateProgram=function(e){F.GBridge.callNative(this._canvas.id,x.default.validateProgram+","+e.id,!0)},this.vertexAttrib1f=function(e,t){F.GBridge.callNative(this._canvas.id,x.default.vertexAttrib1f+","+e+","+t,!0)},this.vertexAttrib2f=function(e,t,i){F.GBridge.callNative(this._canvas.id,x.default.vertexAttrib2f+","+e+","+t+","+i,!0)},this.vertexAttrib3f=function(e,t,i,a){F.GBridge.callNative(this._canvas.id,x.default.vertexAttrib3f+","+e+","+t+","+i+","+a,!0)},this.vertexAttrib4f=function(e,t,i,a,n){F.GBridge.callNative(this._canvas.id,x.default.vertexAttrib4f+","+e+","+t+","+i+","+a+","+n,!0)},this.vertexAttrib1fv=function(e,t){F.GBridge.callNative(this._canvas.id,x.default.vertexAttrib1fv+","+e+","+G(t),!0)},this.vertexAttrib2fv=function(e,t){F.GBridge.callNative(this._canvas.id,x.default.vertexAttrib2fv+","+e+","+G(t),!0)},this.vertexAttrib3fv=function(e,t){F.GBridge.callNative(this._canvas.id,x.default.vertexAttrib3fv+","+e+","+G(t),!0)},this.vertexAttrib4fv=function(e,t){F.GBridge.callNative(this._canvas.id,x.default.vertexAttrib4fv+","+e+","+G(t),!0)},this.vertexAttribPointer=function(e,t,i,a,n,r){F.GBridge.callNative(this._canvas.id,x.default.vertexAttribPointer+","+e+","+t+","+i+","+Number(a)+","+n+","+r,!0)},this.viewport=function(e,t,i,a){F.GBridge.callNative(this._canvas.id,x.default.viewport+","+e+","+t+","+i+","+a,!0)}};t.default=F,e.exports=t.default},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=1,n={};n.activeTexture=a++,n.attachShader=a++,n.bindAttribLocation=a++,n.bindBuffer=a++,n.bindFramebuffer=a++,n.bindRenderbuffer=a++,n.bindTexture=a++,n.blendColor=a++,n.blendEquation=a++,n.blendEquationSeparate=a++,n.blendFunc=a++,n.blendFuncSeparate=a++,n.bufferData=a++,n.bufferSubData=a++,n.checkFramebufferStatus=a++,n.clear=a++,n.clearColor=a++,n.clearDepth=a++,n.clearStencil=a++,n.colorMask=a++,n.compileShader=a++,n.compressedTexImage2D=a++,n.compressedTexSubImage2D=a++,n.copyTexImage2D=a++,n.copyTexSubImage2D=a++,n.createBuffer=a++,n.createFramebuffer=a++,n.createProgram=a++,n.createRenderbuffer=a++,n.createShader=a++,n.createTexture=a++,n.cullFace=a++,n.deleteBuffer=a++,n.deleteFramebuffer=a++,n.deleteProgram=a++,n.deleteRenderbuffer=a++,n.deleteShader=a++,n.deleteTexture=a++,n.depthFunc=a++,n.depthMask=a++,n.depthRange=a++,n.detachShader=a++,n.disable=a++,n.disableVertexAttribArray=a++,n.drawArrays=a++,n.drawArraysInstancedANGLE=a++,n.drawElements=a++,n.drawElementsInstancedANGLE=a++,n.enable=a++,n.enableVertexAttribArray=a++,n.flush=a++,n.framebufferRenderbuffer=a++,n.framebufferTexture2D=a++,n.frontFace=a++,n.generateMipmap=a++,n.getActiveAttrib=a++,n.getActiveUniform=a++,n.getAttachedShaders=a++,n.getAttribLocation=a++,n.getBufferParameter=a++,n.getContextAttributes=a++,n.getError=a++,n.getExtension=a++,n.getFramebufferAttachmentParameter=a++,n.getParameter=a++,n.getProgramInfoLog=a++,n.getProgramParameter=a++,n.getRenderbufferParameter=a++,n.getShaderInfoLog=a++,n.getShaderParameter=a++,n.getShaderPrecisionFormat=a++,n.getShaderSource=a++,n.getSupportedExtensions=a++,n.getTexParameter=a++,n.getUniform=a++,n.getUniformLocation=a++,n.getVertexAttrib=a++,n.getVertexAttribOffset=a++,n.isBuffer=a++,n.isContextLost=a++,n.isEnabled=a++,n.isFramebuffer=a++,n.isProgram=a++,n.isRenderbuffer=a++,n.isShader=a++,n.isTexture=a++,n.lineWidth=a++,n.linkProgram=a++,n.pixelStorei=a++,n.polygonOffset=a++,n.readPixels=a++,n.renderbufferStorage=a++,n.sampleCoverage=a++,n.scissor=a++,n.shaderSource=a++,n.stencilFunc=a++,n.stencilFuncSeparate=a++,n.stencilMask=a++,n.stencilMaskSeparate=a++,n.stencilOp=a++,n.stencilOpSeparate=a++,n.texImage2D=a++,n.texParameterf=a++,n.texParameteri=a++,n.texSubImage2D=a++,n.uniform1f=a++,n.uniform1fv=a++,n.uniform1i=a++,n.uniform1iv=a++,n.uniform2f=a++,n.uniform2fv=a++,n.uniform2i=a++,n.uniform2iv=a++,n.uniform3f=a++,n.uniform3fv=a++,n.uniform3i=a++,n.uniform3iv=a++,n.uniform4f=a++,n.uniform4fv=a++,n.uniform4i=a++,n.uniform4iv=a++,n.uniformMatrix2fv=a++,n.uniformMatrix3fv=a++,n.uniformMatrix4fv=a++,n.useProgram=a++,n.validateProgram=a++,n.vertexAttrib1f=a++,n.vertexAttrib2f=a++,n.vertexAttrib3f=a++,n.vertexAttrib4f=a++,n.vertexAttrib1fv=a++,n.vertexAttrib2fv=a++,n.vertexAttrib3fv=a++,n.vertexAttrib4fv=a++,n.vertexAttribPointer=a++,n.viewport=a++,t.default=n,e.exports=t.default},function(e,t,i){e.exports=i(5)},function(e,t,i){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function n(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=t.bridge,a=t.debug,n=t.disableAutoSwap,r=t.disableComboCommands,s=u.default.GBridge=o.default.GBridge=c.default.GBridge=f.default.GBridge=i;s.callEnable(e.ref,[0,-1,!1,!1,1,"white",!1]),!0===a&&s.callEnableDebug(),r&&s.callEnableDisableCombo();var d=new o.default(e.ref,{disableAutoSwap:n});return d.width=e.style.width,d.height=e.style.height,d}Object.defineProperty(t,"__esModule",{value:!0}),t.ReactNativeBridge=t.WeexBridge=t.Image=void 0,t.enable=n;var r=i(6),o=a(r),s=i(20),u=a(s),d=i(2),c=a(d),l=i(1),f=a(l),_=i(21),h=a(_),E=i(22),v=a(E);t.Image=u.default,t.WeexBridge=h.default,t.ReactNativeBridge=v.default},function(e,t,i){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=function(){function e(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}(),o=i(1),s=a(o),u=i(2),d=a(u),c=function(){function e(t,i){var a=this,r=i.disableAutoSwap;n(this,e),this.id=null,this._needRender=!0,this.id=t,this._disableAutoSwap=r,r&&(this._swapBuffers=function(){e.GBridge.render(a.id)})}return r(e,[{key:"getContext",value:function(t){var i=this,a=null;if(t.match(/webgl/i)){if(a=new d.default(this),a.componentId=this.id,this._disableAutoSwap)this._swapBuffers=function(){e.GBridge.render(i.id)};else{var n=function(){i._needRender&&(e.GBridge.render(i.id),i._needRender=!1)},r=setInterval(n,16);this._clearAutoSwap=function(){clearInterval(r)}}e.GBridge.callSetContextType(this.id,1)}else{if(!t.match(/2d/i))throw new Error("not supported context "+t);if(a=new s.default(this),a.componentId=this.id,this._disableAutoSwap)this._swapBuffers=function(){var t=a._drawCommands;a._drawCommands="",e.GBridge.render2d(i.id,t)};else{var o=function(){var t=a._drawCommands;a._drawCommands="",e.GBridge.render2d(i.id,t),i._needRender=!1},u=setInterval(o,16);this._clearAutoSwap=function(){clearInterval(u)}}e.GBridge.callSetContextType(this.id,0)}return a}},{key:"reset",value:function(){e.GBridge.callReset(this.id)}}]),e}();t.default=c,e.exports=t.default},function(e,t,i){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function e(t,i){a(this,e),this._style=i,this._img=t};t.default=n,e.exports=t.default},function(e,t,i){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function e(t,i,n,r){a(this,e),this.addColorStop=function(e,t){this._stop_count<5&&0<=e&&e<=1&&(this._stops[this._stop_count]={_pos:e,_color:t},this._stop_count++)},this._start_pos={_x:t,_y:i},this._end_pos={_x:n,_y:r},this._stop_count=0,this._stops=[0,0,0,0,0]};t.default=n,e.exports=t.default},function(e,t,i){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}(),r=function(){function e(t,i,n,r,o,s){a(this,e),this._start_pos={_x:t,_y:i,_r:n},this._end_pos={_x:r,_y:o,_r:s},this._stop_count=0,this._stops=[0,0,0,0,0]}return n(e,[{key:"addColorStop",value:function(e,t){this._stop_count<5&&0<=e&&e<=1&&(this._stops[this._stop_count]={_pos:e,_color:t},this._stop_count++)}}]),e}();t.default=r,e.exports=t.default},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={DEPTH_BUFFER_BIT:256,STENCIL_BUFFER_BIT:1024,COLOR_BUFFER_BIT:16384,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,ZERO:0,ONE:1,SRC_COLOR:768,ONE_MINUS_SRC_COLOR:769,SRC_ALPHA:770,ONE_MINUS_SRC_ALPHA:771,DST_ALPHA:772,ONE_MINUS_DST_ALPHA:773,DST_COLOR:774,ONE_MINUS_DST_COLOR:775,SRC_ALPHA_SATURATE:776,FUNC_ADD:32774,BLEND_EQUATION:32777,BLEND_EQUATION_RGB:32777,BLEND_EQUATION_ALPHA:34877,FUNC_SUBTRACT:32778,FUNC_REVERSE_SUBTRACT:32779,BLEND_DST_RGB:32968,BLEND_SRC_RGB:32969,BLEND_DST_ALPHA:32970,BLEND_SRC_ALPHA:32971,CONSTANT_COLOR:32769,ONE_MINUS_CONSTANT_COLOR:32770,CONSTANT_ALPHA:32771,ONE_MINUS_CONSTANT_ALPHA:32772,BLEND_COLOR:32773,ARRAY_BUFFER:34962,ELEMENT_ARRAY_BUFFER:34963,ARRAY_BUFFER_BINDING:34964,ELEMENT_ARRAY_BUFFER_BINDING:34965,STREAM_DRAW:35040,STATIC_DRAW:35044,DYNAMIC_DRAW:35048,BUFFER_SIZE:34660,BUFFER_USAGE:34661,CURRENT_VERTEX_ATTRIB:34342,FRONT:1028,BACK:1029,FRONT_AND_BACK:1032,TEXTURE_2D:3553,CULL_FACE:2884,BLEND:3042,DITHER:3024,STENCIL_TEST:2960,DEPTH_TEST:2929,SCISSOR_TEST:3089,POLYGON_OFFSET_FILL:32823,SAMPLE_ALPHA_TO_COVERAGE:32926,SAMPLE_COVERAGE:32928,NO_ERROR:0,INVALID_ENUM:1280,INVALID_VALUE:1281,INVALID_OPERATION:1282,OUT_OF_MEMORY:1285,CW:2304,CCW:2305,LINE_WIDTH:2849,ALIASED_POINT_SIZE_RANGE:33901,ALIASED_LINE_WIDTH_RANGE:33902,CULL_FACE_MODE:2885,FRONT_FACE:2886,DEPTH_RANGE:2928,DEPTH_WRITEMASK:2930,DEPTH_CLEAR_VALUE:2931,DEPTH_FUNC:2932,STENCIL_CLEAR_VALUE:2961,STENCIL_FUNC:2962,STENCIL_FAIL:2964,STENCIL_PASS_DEPTH_FAIL:2965,STENCIL_PASS_DEPTH_PASS:2966,STENCIL_REF:2967,STENCIL_VALUE_MASK:2963,STENCIL_WRITEMASK:2968,STENCIL_BACK_FUNC:34816,STENCIL_BACK_FAIL:34817,STENCIL_BACK_PASS_DEPTH_FAIL:34818,STENCIL_BACK_PASS_DEPTH_PASS:34819,STENCIL_BACK_REF:36003,STENCIL_BACK_VALUE_MASK:36004,STENCIL_BACK_WRITEMASK:36005,VIEWPORT:2978,SCISSOR_BOX:3088,COLOR_CLEAR_VALUE:3106,COLOR_WRITEMASK:3107,UNPACK_ALIGNMENT:3317,PACK_ALIGNMENT:3333,MAX_TEXTURE_SIZE:3379,MAX_VIEWPORT_DIMS:3386,SUBPIXEL_BITS:3408,RED_BITS:3410,GREEN_BITS:3411,BLUE_BITS:3412,ALPHA_BITS:3413,DEPTH_BITS:3414,STENCIL_BITS:3415,POLYGON_OFFSET_UNITS:10752,POLYGON_OFFSET_FACTOR:32824,TEXTURE_BINDING_2D:32873,SAMPLE_BUFFERS:32936,SAMPLES:32937,SAMPLE_COVERAGE_VALUE:32938,SAMPLE_COVERAGE_INVERT:32939,COMPRESSED_TEXTURE_FORMATS:34467,DONT_CARE:4352,FASTEST:4353,NICEST:4354,GENERATE_MIPMAP_HINT:33170,BYTE:5120,UNSIGNED_BYTE:5121,SHORT:5122,UNSIGNED_SHORT:5123,INT:5124,UNSIGNED_INT:5125,FLOAT:5126,DEPTH_COMPONENT:6402,ALPHA:6406,RGB:6407,RGBA:6408,LUMINANCE:6409,LUMINANCE_ALPHA:6410,UNSIGNED_SHORT_4_4_4_4:32819,UNSIGNED_SHORT_5_5_5_1:32820,UNSIGNED_SHORT_5_6_5:33635,FRAGMENT_SHADER:35632,VERTEX_SHADER:35633,MAX_VERTEX_ATTRIBS:34921,MAX_VERTEX_UNIFORM_VECTORS:36347,MAX_VARYING_VECTORS:36348,MAX_COMBINED_TEXTURE_IMAGE_UNITS:35661,MAX_VERTEX_TEXTURE_IMAGE_UNITS:35660,MAX_TEXTURE_IMAGE_UNITS:34930,MAX_FRAGMENT_UNIFORM_VECTORS:36349,SHADER_TYPE:35663,DELETE_STATUS:35712,LINK_STATUS:35714,VALIDATE_STATUS:35715,ATTACHED_SHADERS:35717,ACTIVE_UNIFORMS:35718,ACTIVE_ATTRIBUTES:35721,SHADING_LANGUAGE_VERSION:35724,CURRENT_PROGRAM:35725,NEVER:512,LESS:513,EQUAL:514,LEQUAL:515,GREATER:516,NOTEQUAL:517,GEQUAL:518,ALWAYS:519,KEEP:7680,REPLACE:7681,INCR:7682,DECR:7683,INVERT:5386,INCR_WRAP:34055,DECR_WRAP:34056,VENDOR:7936,RENDERER:7937,VERSION:7938,NEAREST:9728,LINEAR:9729,NEAREST_MIPMAP_NEAREST:9984,LINEAR_MIPMAP_NEAREST:9985,NEAREST_MIPMAP_LINEAR:9986,LINEAR_MIPMAP_LINEAR:9987,TEXTURE_MAG_FILTER:10240,TEXTURE_MIN_FILTER:10241,TEXTURE_WRAP_S:10242,TEXTURE_WRAP_T:10243,TEXTURE:5890,TEXTURE_CUBE_MAP:34067,TEXTURE_BINDING_CUBE_MAP:34068,TEXTURE_CUBE_MAP_POSITIVE_X:34069,TEXTURE_CUBE_MAP_NEGATIVE_X:34070,TEXTURE_CUBE_MAP_POSITIVE_Y:34071,TEXTURE_CUBE_MAP_NEGATIVE_Y:34072,TEXTURE_CUBE_MAP_POSITIVE_Z:34073,TEXTURE_CUBE_MAP_NEGATIVE_Z:34074,MAX_CUBE_MAP_TEXTURE_SIZE:34076,TEXTURE0:33984,TEXTURE1:33985,TEXTURE2:33986,TEXTURE3:33987,TEXTURE4:33988,TEXTURE5:33989,TEXTURE6:33990,TEXTURE7:33991,TEXTURE8:33992,TEXTURE9:33993,TEXTURE10:33994,TEXTURE11:33995,TEXTURE12:33996,TEXTURE13:33997,TEXTURE14:33998,TEXTURE15:33999,TEXTURE16:34e3,TEXTURE17:34001,TEXTURE18:34002,TEXTURE19:34003,TEXTURE20:34004,TEXTURE21:34005,TEXTURE22:34006,TEXTURE23:34007,TEXTURE24:34008,TEXTURE25:34009,TEXTURE26:34010,TEXTURE27:34011,TEXTURE28:34012,TEXTURE29:34013,TEXTURE30:34014,TEXTURE31:34015,ACTIVE_TEXTURE:34016,REPEAT:10497,CLAMP_TO_EDGE:33071,MIRRORED_REPEAT:33648,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,INT_VEC2:35667,INT_VEC3:35668,INT_VEC4:35669,BOOL:35670,BOOL_VEC2:35671,BOOL_VEC3:35672,BOOL_VEC4:35673,FLOAT_MAT2:35674,FLOAT_MAT3:35675,FLOAT_MAT4:35676,SAMPLER_2D:35678,SAMPLER_CUBE:35680,VERTEX_ATTRIB_ARRAY_ENABLED:34338,VERTEX_ATTRIB_ARRAY_SIZE:34339,VERTEX_ATTRIB_ARRAY_STRIDE:34340,VERTEX_ATTRIB_ARRAY_TYPE:34341,VERTEX_ATTRIB_ARRAY_NORMALIZED:34922,VERTEX_ATTRIB_ARRAY_POINTER:34373,VERTEX_ATTRIB_ARRAY_BUFFER_BINDING:34975,IMPLEMENTATION_COLOR_READ_TYPE:35738,IMPLEMENTATION_COLOR_READ_FORMAT:35739,COMPILE_STATUS:35713,LOW_FLOAT:36336,MEDIUM_FLOAT:36337,HIGH_FLOAT:36338,LOW_INT:36339,MEDIUM_INT:36340,HIGH_INT:36341,FRAMEBUFFER:36160,RENDERBUFFER:36161,RGBA4:32854,RGB5_A1:32855,RGB565:36194,DEPTH_COMPONENT16:33189,STENCIL_INDEX8:36168,DEPTH_STENCIL:34041,RENDERBUFFER_WIDTH:36162,RENDERBUFFER_HEIGHT:36163,RENDERBUFFER_INTERNAL_FORMAT:36164,RENDERBUFFER_RED_SIZE:36176,RENDERBUFFER_GREEN_SIZE:36177,RENDERBUFFER_BLUE_SIZE:36178,RENDERBUFFER_ALPHA_SIZE:36179,RENDERBUFFER_DEPTH_SIZE:36180,RENDERBUFFER_STENCIL_SIZE:36181,FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE:36048,FRAMEBUFFER_ATTACHMENT_OBJECT_NAME:36049,FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL:36050,FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE:36051,COLOR_ATTACHMENT0:36064,DEPTH_ATTACHMENT:36096,STENCIL_ATTACHMENT:36128,DEPTH_STENCIL_ATTACHMENT:33306,NONE:0,FRAMEBUFFER_COMPLETE:36053,FRAMEBUFFER_INCOMPLETE_ATTACHMENT:36054,FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:36055,FRAMEBUFFER_INCOMPLETE_DIMENSIONS:36057,FRAMEBUFFER_UNSUPPORTED:36061,FRAMEBUFFER_BINDING:36006,RENDERBUFFER_BINDING:36007,MAX_RENDERBUFFER_SIZE:34024,INVALID_FRAMEBUFFER_OPERATION:1286,UNPACK_FLIP_Y_WEBGL:37440,UNPACK_PREMULTIPLY_ALPHA_WEBGL:37441,CONTEXT_LOST_WEBGL:37442,UNPACK_COLORSPACE_CONVERSION_WEBGL:37443,BROWSER_DEFAULT_WEBGL:37444},e.exports=t.default},function(e,t,i){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function e(t){var i=t.type,n=t.name,r=t.size;a(this,e),this.className="WebGLActiveInfo",this.type=i,this.name=n,this.size=r};t.default=n,e.exports=t.default},function(e,t,i){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e){return(0,o.getTransferedObjectUUID)(s,e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=function(){function e(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}(),o=i(0),s="WebGLBuffer",u=function(){function e(t){a(this,e),this.className=s,this.id=t}return r(e,[{key:"uuid",value:function(){return n(this.id)}}]),e}();u.uuid=n,t.default=u,e.exports=t.default},function(e,t,i){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e){return(0,o.getTransferedObjectUUID)(s,e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=function(){function e(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}(),o=i(0),s="WebGLFrameBuffer",u=function(){function e(t){a(this,e),this.className=s,this.id=t}return r(e,[{key:"uuid",value:function(){return n(this.id)}}]),e}();u.uuid=n,t.default=u,e.exports=t.default},function(e,t,i){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e){return(0,o.getTransferedObjectUUID)(s,e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=function(){function e(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}(),o=i(0),s="WebGLRenderBuffer",u=function(){function e(t){a(this,e),this.className=s,this.id=t}return r(e,[{key:"uuid",value:function(){return n(this.id)}}]),e}();u.uuid=n,t.default=u,e.exports=t.default},function(e,t,i){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e){return(0,o.getTransferedObjectUUID)(s,e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=function(){function e(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}(),o=i(0),s="WebGLTexture",u=function(){function e(t,i){a(this,e),this.className=s,this.id=t,this.type=i}return r(e,[{key:"uuid",value:function(){return n(this.id)}}]),e}();u.uuid=n,t.default=u,e.exports=t.default},function(e,t,i){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e){return(0,o.getTransferedObjectUUID)(s,e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=function(){function e(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}(),o=i(0),s="WebGLProgram",u=function(){function e(t){a(this,e),this.className=s,this.id=t}return r(e,[{key:"uuid",value:function(){return n(this.id)}}]),e}();u.uuid=n,t.default=u,e.exports=t.default},function(e,t,i){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e){return(0,o.getTransferedObjectUUID)(s,e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=function(){function e(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}(),o=i(0),s="WebGLShader",u=function(){function e(t,i){a(this,e),this.className=s,this.id=t,this.type=i}return r(e,[{key:"uuid",value:function(){return n(this.id)}}]),e}();u.uuid=n,t.default=u,e.exports=t.default},function(e,t,i){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function e(t){var i=t.rangeMin,n=t.rangeMax,r=t.precision;a(this,e),this.className="WebGLShaderPrecisionFormat",this.rangeMin=i,this.rangeMax=n,this.precision=r};t.default=n,e.exports=t.default},function(e,t,i){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e){return(0,o.getTransferedObjectUUID)(s,e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=function(){function e(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}(),o=i(0),s="WebGLUniformLocation",u=function(){function e(t,i){a(this,e),this.className=s,this.id=t,this.type=i}return r(e,[{key:"uuid",value:function(){return n(this.id)}}]),e}();u.uuid=n,t.default=u,e.exports=t.default},function(e,t,i){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}(),r=1,o=function(){},s=function(){function e(){a(this,e),this._id=r++,this._width=0,this._height=0,this._src=void 0,this._onload=o,this._onerror=o,this.complete=!1}return n(e,[{key:"addEventListener",value:function(e,t){"load"===e?this.onload=t:"error"===e&&(this.onerror=t)}},{key:"removeEventListener",value:function(e,t){"load"===e?this.onload=o:"error"===e&&(this.onerror=o)}},{key:"width",get:function(){return this._width},set:function(e){this._width=e}},{key:"height",get:function(){return this._height},set:function(e){this._height=e}},{key:"src",get:function(){return this._src},set:function(t){var i=this;t.startsWith("//")&&(t="http:"+t),this._src=t,e.GBridge.perloadImage([this._src,this._id],function(e){if("string"==typeof e&&(e=JSON.parse(e)),e.error){var t={type:"error",target:i};i.onerror(t)}else{i.complete=!0,i.width="number"==typeof e.width?e.width:0,i.height="number"==typeof e.height?e.height:0;var t={type:"load",target:i};i.onload(t)}})}},{key:"onload",get:function(){return this._onload},set:function(e){this._onload=e}},{key:"onerror",get:function(){return this._onerror},set:function(e){this._onerror=e}}]),e}();s.GBridge=null,t.default=s,e.exports=t.default},function(e,t,i){"use strict";function a(e,t){for(var i="",a=0;a<e.length;a++)0!==a&&(i+=t),i+=e[a];return i}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){var i=[],a=!0,n=!1,r=void 0;try{for(var o,s=e[Symbol.iterator]();!(a=(o=s.next()).done)&&(i.push(o.value),!t||i.length!==t);a=!0);}catch(e){n=!0,r=e}finally{try{!a&&s.return&&s.return()}finally{if(n)throw r}}return i}return function(t,i){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),r=i(3),o=function(e){return e&&e.__esModule?e:{default:e}}(r),s="undefined"!=typeof WXEnvironment,u=s&&/ios/i.test(WXEnvironment.platform),d=s&&!u,c="undefined"!=typeof weex&&weex.requireModule?weex.requireModule("gcanvas"):"undefined"!=typeof __weex_require__?__weex_require__("@weex-module/gcanvas"):{},l=!1,f=!1,_=function(){var e=[];Object.keys(o.default).forEach(function(t){e[o.default[t]]=t});var t=function(t){return e[parseInt(t)]||"NotFoundMethod"};return function(e,i){var a=i.split(",")[0],n=t(a);console.log("=== callNative - componentId:"+e+"; method: "+n+"; cmds: "+i)}}(),h={},E={callEnable:function(e,t){return h[e]=[],c.enable({componentId:e,config:t})},callEnableDebug:function(){l=!0},callEnableDisableCombo:function(){f=!0},callSetContextType:function(e,t){c.setContextType(t,e)},callReset:function(e){c.resetComponent&&canvasModule.resetComponent(componentId)},render:u?function(e){return c.extendCallNative({contextId:e,type:1610612737})}:function(e){return callGCanvasLinkNative(e,1610612737,"render")},render2d:u?function(e,t){l&&(console.log(">>> >>> render2d ==="),console.log(">>> commands: "+t)),c.render(t,e)}:function(e,t){l&&(console.log(">>> >>> render2d ==="),console.log(">>> commands: "+t)),callGCanvasLinkNative(e,536870913,t)},callExtendCallNative:function(e,t){throw"should not be here anymore "+t},flushNative:u?function(e){var t=a(h[e],";");h[e]=[],l&&(console.log(">>> >>> flush native ==="),console.log(">>> commands: "+t));var i=c.extendCallNative({contextId:e,type:1610612736,args:t}),n=i&&i.result;return l&&console.log(">>> result: "+n),n}:function(e){var t=a(h[e],";");h[e]=[],l&&(console.log(">>> >>> flush native ==="),console.log(">>> commands: "+t));var i=callGCanvasLinkNative(e,1610612736,t);return l&&console.log(">>> result: "+i),i},callNative:function(e,t,i){return l&&_(e,t),h[e].push(t),!i||f?E.flushNative(e):void 0},texImage2D:function(e){for(var t=arguments.length,i=Array(t>1?t-1:0),a=1;a<t;a++)i[a-1]=arguments[a];if(u){if(6===i.length){var r=n(i,6),s=r[0],l=r[1],f=r[2],_=r[3],h=r[4],v=r[5];E.callNative(e,o.default.texImage2D+",6,"+s+","+l+","+f+","+_+","+h+","+v.src)}else if(9===i.length){var m=n(i,9),T=m[0],g=m[1],A=m[2],N=m[3],p=m[4],R=m[5],b=m[6],C=m[7],I=m[8];E.callNative(e,o.default.texImage2D+",9,"+T+","+g+","+A+","+N+","+p+","+R+","+ +b+","+C+","+(I?I.src:0))}}else if(d)if(6===i.length){var B=n(i,6),S=B[0],y=B[1],x=B[2],G=B[3],F=B[4],O=B[5];c.texImage2D(e,S,y,x,G,F,O.src)}else if(9===i.length){var P=n(i,9),L=P[0],w=P[1],U=P[2],M=P[3],D=P[4],k=P[5],X=P[6],V=P[7],H=P[8];c.texImage2D(e,L,w,U,M,D,k,X,V,H?H.src:0)}},texSubImage2D:function(e,t,i,a,n,r,s,l){u?8===arguments.length&&E.callNative(e,o.default.texSubImage2D+",6,"+t+","+i+","+a+","+n,NaN+r+","+s+","+l.src):d&&c.texSubImage2D(e,t,i,a,n,r,s,l.src)},bindImageTexture:function(e,t,i){c.bindImageTexture([t,i],e)},perloadImage:function(e,t){var i=n(e,2),a=i[0],r=i[1];c.preLoadImage([a,r],function(e){e.url=a,e.id=r,t(e)})}};t.default=E,e.exports=t.default},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){var i=[],a=!0,n=!1,r=void 0;try{for(var o,s=e[Symbol.iterator]();!(a=(o=s.next()).done)&&(i.push(o.value),!t||i.length!==t);a=!0);}catch(e){n=!0,r=e}finally{try{!a&&s.return&&s.return()}finally{if(n)throw r}}return i}return function(t,i){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),n=function(){d.Platform.OS},r=function(){d.Platform.OS},o=!1,s=!1,u={},d={GCanvasModule:null,Platform:null,callEnable:function(e,t){return u[e]=[],d.GCanvasModule.enable({componentId:e,config:t})},callEnableDebug:function(){o=!0},callEnableDisableCombo:function(){s=!0},callSetContextType:function(e,t){d.GCanvasModule.setContextType(t,e)},render:function(e){return d.GCanvasModule.extendCallNative({contextId:e,type:1610612737})},render2d:function(e,t){o&&(console.log(">>> >>> render2d ==="),console.log(">>> commands: "+t)),d.GCanvasModule.render(t,e)},flushNative:function(e){},callNative:function(e,t,i){},texImage2D:function(e){for(var t=arguments.length,i=Array(t>1?t-1:0),o=1;o<t;o++)i[o-1]=arguments[o];if(n()){if(6===i.length){var s=a(i,6),u=s[0],c=s[1],l=s[2],f=s[3],_=s[4],h=s[5];d.GBridge.callNative(e,GLmethod.texImage2D+",6,"+u+","+c+","+l+","+f+","+_+","+h.src)}else if(9===i.length){var E=a(i,9),v=E[0],m=E[1],T=E[2],g=E[3],A=E[4],N=E[5],p=E[6],R=E[7],b=E[8];d.GBridge.callNative(e,GLmethod.texImage2D+",9,"+v+","+m+","+T+","+g+","+A+","+N+","+ +p+","+R+","+(b?b.src:0))}}else if(r())if(6===i.length){var C=a(i,6),I=C[0],B=C[1],S=C[2],y=C[3],x=C[4],G=C[5];d.GCanvasModule.texImage2D(e,I,B,S,y,x,G.src)}else if(9===i.length){var F=a(i,9),O=F[0],P=F[1],L=F[2],w=F[3],U=F[4],M=F[5],D=F[6],k=F[7],X=F[8];d.GCanvasModule.texImage2D(e,O,P,L,w,U,M,D,k,X?X.src:0)}},texSubImage2D:function(e,t,i,a,o,s,u,c){n()?8===arguments.length&&d.callNative(e,GLmethod.texSubImage2D+",6,"+t+","+i+","+a+","+o,NaN+s+","+u+","+c.src):r()&&GCanvasModule.texSubImage2D(e,t,i,a,o,s,u,c.src)},bindImageTexture:function(e,t,i){d.GCanvasModule.bindImageTexture([t,i],e,function(e){})},perloadImage:function(e,t){var i=a(e,2),n=i[0],r=i[1];d.GCanvasModule.preLoadImage([n,r],function(e){e.url=n,e.id=r,t(e)})}};t.default=d,e.exports=t.default}])});

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _renderer = __webpack_require__(60);

var _renderer2 = _interopRequireDefault(_renderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var F2 = __webpack_require__(62); // import F2 from '@antv/f2';


F2.track(false);
if (weex.config.env.platform !== 'Web') {
  var strLen = function strLen(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128) {
        len++;
      } else {
        len += 2;
      }
    }

    return len;
  };

  // override some methods

  // 由于支付宝小程序不支持 measureText 方法，故用此方法 mock


  F2.Util.measureText = function (text, font) {
    var fontSize = 12;
    if (font) {
      fontSize = parseInt(font.split(' ')[3], 10);
    }
    fontSize /= 2;
    return {
      width: strLen(text) * fontSize
    };
  };

  F2.Util.addEventListener = function (source, type, listener) {
    source.addListener(type, listener);
  };

  F2.Util.removeEventListener = function (source, type, listener) {
    source.removeListener(type, listener);
  };

  F2.Util.createEvent = function (event, chart) {
    var pixelRatio = chart.get('pixelRatio') || 1;
    var type = event.type;
    var x = 0;
    var y = 0;
    var touches = event.changedTouches;
    if (touches && touches.length > 0) {
      x = touches[0].pageX;
      y = touches[0].pageY;
    }
    return {
      type: type,
      chart: chart,
      x: x * pixelRatio,
      y: y * pixelRatio
    };
  };

  var color1 = '#E8E8E8'; // 坐标轴线、坐标轴网格线的颜色
  var color2 = '#808080'; // 字体颜色
  var labelFontSize = weex.config.env.platform == 'android' ? 16 : 20;
  // 坐标轴的默认样式配置
  var defaultAxis = {
    label: {
      fill: color2,
      fontSize: labelFontSize
    }, // 坐标轴文本的样式
    line: {
      stroke: color1,
      lineWidth: 1,
      top: true
    }, // 坐标轴线的样式
    grid: {
      stroke: color1,
      lineWidth: 1,
      lineDash: [2]
    }, // 坐标轴网格线的样式
    tickLine: null, // 坐标轴刻度线，默认不展示
    labelOffset: 7.5 // 坐标轴文本距离坐标轴线的距离
  };

  var DEFAULT_CFG = {
    itemMarginBottom: 12,
    itemGap: 10,
    showTitle: false,
    titleStyle: {
      fontSize: 26,
      fill: color2,
      textAlign: 'start',
      textBaseline: 'top'
    },
    nameStyle: {
      fill: color2,
      fontSize: 24,
      textAlign: 'start',
      textBaseline: 'middle'
    },
    valueStyle: {
      fill: color2,
      fontSize: 24,
      textAlign: 'start',
      textBaseline: 'middle'
    },
    unCheckStyle: {
      fill: '#bfbfbf'
    },
    itemWidth: 'auto',
    wordSpace: 6,
    selectedMode: 'multiple' // 'multiple' or 'single'
  };

  var Theme = {
    fontFamily: '"Helvetica Neue", "San Francisco", Helvetica, Tahoma, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", sans-serif', // 默认字体
    defaultColor: '#1890FF', // 默认颜色
    pixelRatio: 1, // 默认像素比，具体参数由用户自己设置
    padding: 'auto', // 图表边距，默认自动计算
    appendPadding: 18, // 默认留白，15 像素
    colors: ['#1890FF', '#2FC25B', '#FACC14', '#223273', '#8543E0', '#13C2C2', '#3436C7', '#F04864'], // 默认色系
    shapes: {
      line: ['line', 'dash'],
      point: ['circle', 'hollowCircle']
    },
    sizes: [4, 10], // 默认的大小范围
    axis: {
      bottom: F2.Util.mix({}, defaultAxis, {
        grid: null
      }), // 底部坐标轴配置
      left: F2.Util.mix({}, defaultAxis, {
        line: null
      }), // 左侧坐标轴配置
      right: F2.Util.mix({}, defaultAxis, {
        line: null
      }), // 右侧坐标轴配置
      circle: F2.Util.mix({}, defaultAxis, {
        line: null
      }), // 极坐标下的圆弧坐标轴配置
      radius: F2.Util.mix({}, defaultAxis, {
        labelOffset: 4
      }) // 极坐标下的半径坐标轴配置
    }, // 各种坐标轴配置
    shape: {
      line: {
        lineWidth: 3, // 线的默认宽度
        lineJoin: 'round',
        lineCap: 'round'
      }, // 线图样式配置
      point: {
        lineWidth: 0,
        size: 6 // 圆的默认半径
      }, // 点图样式配置
      area: {
        fillOpacity: 0.1 // 区域图样式配置
      } },
    legend: {
      right: F2.Util.mix({}, DEFAULT_CFG),
      left: F2.Util.mix({}, DEFAULT_CFG),
      top: F2.Util.mix({}, DEFAULT_CFG),
      bottom: F2.Util.mix({}, DEFAULT_CFG),
      marker: {
        symbol: 'circle', // marker 的形状
        radius: 10 // 半径大小
      }
    },
    tooltip: {
      triggerOn: ['touchstart', 'touchmove'],
      // triggerOff: 'touchend',
      showTitle: false,
      showCrosshairs: false,
      crosshairsStyle: {
        stroke: 'rgba(0, 0, 0, 0.25)',
        lineWidth: 2
      },
      showTooltipMarker: true,
      background: {
        radius: 1,
        fill: 'rgba(0, 0, 0, 0.65)',
        padding: [3, 5]
      },
      titleStyle: {
        fontSize: 26,
        fill: '#fff',
        textAlign: 'start',
        textBaseline: 'top'
      },
      nameStyle: {
        fontSize: 26,
        fill: 'rgba(255, 255, 255, 0.65)',
        textAlign: 'start',
        textBaseline: 'middle'
      },
      valueStyle: {
        fontSize: 26,
        fill: '#fff',
        textAlign: 'start',
        textBaseline: 'middle'
      },
      showItemMarker: true,
      itemMarkerStyle: {
        radius: 5,
        symbol: 'circle',
        lineWidth: 1,
        stroke: '#fff'
      },
      layout: 'horizontal'
    },
    _defaultAxis: defaultAxis // 用于获取默认的坐标轴配置
  };

  F2.Global.setTheme(Theme);

  F2.Renderer = _renderer2.default;
}

exports.default = F2;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var isNil = __webpack_require__(30);

function toString(value) {
  if (isNil(value)) return '';
  return value.toString();
}

module.exports = toString;

/***/ }),
/* 30 */
/***/ (function(module, exports) {

// isFinite,
var isNil = function isNil(value) {
  /**
   * isNil(null) => true
   * isNil() => true
   */
  return value === null || value === undefined;
};

module.exports = isNil;

/***/ }),
/* 31 */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isObject = function isObject(value) {
  /**
   * isObject({}) => true
   * isObject([1, 2, 3]) => true
   * isObject(Function) => true
   * isObject(null) => false
   */
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return value !== null && type === 'object' || type === 'function';
};

module.exports = isObject;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var isObjectLike = __webpack_require__(73);
var isType = __webpack_require__(8);

var isPlainObject = function isPlainObject(value) {
  /**
   * isObjectLike(new Foo) => false
   * isObjectLike([1, 2, 3]) => false
   * isObjectLike({ x: 0, y: 0 }) => true
   * isObjectLike(Object.create(null)) => true
   */
  if (!isObjectLike(value) || !isType(value, 'Object')) {
    return false;
  }
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }
  var proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(value) === proto;
};

module.exports = isPlainObject;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(31);
var isArray = __webpack_require__(16);

var each = function each(elements, func) {
  if (!elements) {
    return;
  }
  var rst = void 0;
  if (isArray(elements)) {
    for (var i = 0, len = elements.length; i < len; i++) {
      rst = func(elements[i], i);
      if (rst === false) {
        break;
      }
    }
  } else if (isObject(elements)) {
    for (var k in elements) {
      if (elements.hasOwnProperty(k)) {
        rst = func(elements[k], k);
        if (rst === false) {
          break;
        }
      }
    }
  }
};

module.exports = each;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Base = __webpack_require__(35);

var Plot = __webpack_require__(79);

var Util = __webpack_require__(0);

var Coord = __webpack_require__(80);

var Geom = __webpack_require__(3);

var ScaleController = __webpack_require__(92);

var AxisController = __webpack_require__(100);

var Global = __webpack_require__(1);

var _require = __webpack_require__(4),
    Canvas = _require.Canvas;

var Helper = __webpack_require__(26);

function isFullCircle(coord) {
  var startAngle = coord.startAngle;
  var endAngle = coord.endAngle;

  if (!Util.isNil(startAngle) && !Util.isNil(endAngle) && endAngle - startAngle < Math.PI * 2) {
    return false;
  }

  return true;
}

function compare(a, b) {
  return a - b;
}

function _isScaleExist(scales, compareScale) {
  var flag = false;
  Util.each(scales, function (scale) {
    var scaleValues = [].concat(scale.values);
    var compareScaleValues = [].concat(compareScale.values);

    if (scale.type === compareScale.type && scale.field === compareScale.field && scaleValues.sort(compare).toString() === compareScaleValues.sort(compare).toString()) {
      flag = true;
      return;
    }
  });
  return flag;
}

var Chart =
/*#__PURE__*/
function (_Base) {
  _inheritsLoose(Chart, _Base);

  Chart.initPlugins = function initPlugins() {
    return {
      _plugins: [],
      _cacheId: 0,
      register: function register(plugins) {
        var p = this._plugins;
        [].concat(plugins).forEach(function (plugin) {
          if (p.indexOf(plugin) === -1) {
            p.push(plugin);
          }
        });
        this._cacheId++;
      },
      unregister: function unregister(plugins) {
        var p = this._plugins;
        [].concat(plugins).forEach(function (plugin) {
          var idx = p.indexOf(plugin);

          if (idx !== -1) {
            p.splice(idx, 1);
          }
        });
        this._cacheId++;
      },
      clear: function clear() {
        this._plugins = [];
        this._cacheId++;
      },
      count: function count() {
        return this._plugins.length;
      },
      getAll: function getAll() {
        return this._plugins;
      },
      notify: function notify(chart, hook, args) {
        var descriptors = this.descriptors(chart);
        var ilen = descriptors.length;
        var i;
        var descriptor;
        var plugin;
        var params;
        var method;

        for (i = 0; i < ilen; ++i) {
          descriptor = descriptors[i];
          plugin = descriptor.plugin;
          method = plugin[hook];

          if (typeof method === 'function') {
            params = [chart].concat(args || []);

            if (method.apply(plugin, params) === false) {
              return false;
            }
          }
        }

        return true;
      },
      descriptors: function descriptors(chart) {
        var cache = chart._plugins || (chart._plugins = {});

        if (cache.id === this._cacheId) {
          return cache.descriptors;
        }

        var plugins = [];
        var descriptors = [];

        this._plugins.concat(chart && chart.get('plugins') || []).forEach(function (plugin) {
          var idx = plugins.indexOf(plugin);

          if (idx !== -1) {
            return;
          }

          plugins.push(plugin);
          descriptors.push({
            plugin: plugin
          });
        });

        cache.descriptors = descriptors;
        cache.id = this._cacheId;
        return descriptors;
      }
    };
  };

  var _proto = Chart.prototype;

  _proto.getDefaultCfg = function getDefaultCfg() {
    return {
      /**
       * the id of canvas
       * @type {String}
       */
      id: null,

      /**
       * padding
       * @type {Array|Number}
       */
      padding: Global.padding,

      /**
       * data
       * @type {Array}
       */
      data: null,

      /**
       * scales of chart
       * @type {Object}
       */
      scales: {},

      /**
       * @private
       * geometry instances
       * @type {Array}
       */
      geoms: null,

      /**
       * scale configuration
       * @type {Object}
       */
      colDefs: null,
      pixelRatio: Global.pixelRatio,

      /**
       * filter options
       * @type {Object}
       */
      filters: null,
      appendPadding: Global.appendPadding
    };
  };

  _proto._syncYScales = function _syncYScales() {
    var geoms = this.get('geoms');
    var syncScales = [];
    var min = [];
    var max = [];
    Util.each(geoms, function (geom) {
      var yScale = geom.getYScale();

      if (yScale.isLinear) {
        syncScales.push(yScale);
        min.push(yScale.min);
        max.push(yScale.max);
      }
    });
    min = Math.min.apply(null, min);
    max = Math.max.apply(null, max);
    Util.each(syncScales, function (scale) {
      scale.change({
        min: min
      });
      scale.change({
        max: max
      });
    });
  };

  _proto._getFieldsForLegend = function _getFieldsForLegend() {
    var fields = [];
    var geoms = this.get('geoms');
    Util.each(geoms, function (geom) {
      var attrOptions = geom.get('attrOptions');
      var attrCfg = attrOptions.color;

      if (attrCfg && attrCfg.field && Util.isString(attrCfg.field)) {
        var arr = attrCfg.field.split('*');
        Util.each(arr, function (item) {
          if (fields.indexOf(item) === -1) {
            fields.push(item);
          }
        });
      }
    });
    return fields;
  };

  _proto._createScale = function _createScale(field, data) {
    var scaleController = this.get('scaleController');
    return scaleController.createScale(field, data);
  };

  _proto._adjustScale = function _adjustScale() {
    var self = this;
    var coord = self.get('coord');
    var xScale = self.getXScale();
    var yScales = self.getYScales();
    var scales = [];
    xScale && scales.push(xScale);
    scales = scales.concat(yScales);
    var inFullCircle = coord.isPolar && isFullCircle(coord);
    var scaleController = self.get('scaleController');
    var colDefs = scaleController.defs;
    Util.each(scales, function (scale) {
      if ((scale.isCategory || scale.isIdentity) && scale.values && !(colDefs[scale.field] && colDefs[scale.field].range)) {
        var count = scale.values.length;
        var range;

        if (count === 1) {
          range = [0.5, 1];
        } else {
          var widthRatio = 1;
          var offset = 0;

          if (inFullCircle) {
            if (!coord.transposed) {
              range = [0, 1 - 1 / count];
            } else {
              widthRatio = Global.widthRatio.multiplePie;
              offset = 1 / count * widthRatio;
              range = [offset / 2, 1 - offset / 2];
            }
          } else {
            offset = 1 / count * 1 / 2;
            range = [offset, 1 - offset];
          }
        }

        scale.range = range;
      }
    });
    var geoms = this.get('geoms');

    for (var i = 0; i < geoms.length; i++) {
      var geom = geoms[i];

      if (geom.get('type') === 'interval') {
        var yScale = geom.getYScale();
        var field = yScale.field,
            min = yScale.min,
            max = yScale.max,
            type = yScale.type;

        if (!(colDefs[field] && colDefs[field].min) && type !== 'time') {
          if (min > 0) {
            yScale.change({
              min: 0
            });
          } else if (max <= 0) {
            yScale.change({
              max: 0
            });
          }
        }
      }
    }
  };

  _proto._removeGeoms = function _removeGeoms() {
    var geoms = this.get('geoms');

    while (geoms.length > 0) {
      var geom = geoms.shift();
      geom.destroy();
    }
  };

  _proto._clearGeoms = function _clearGeoms() {
    var geoms = this.get('geoms');

    for (var i = 0, length = geoms.length; i < length; i++) {
      var geom = geoms[i];
      geom.clear();
    }
  };

  _proto._clearInner = function _clearInner() {
    this.set('scales', {});
    this.set('legendItems', null);

    this._clearGeoms();

    Chart.plugins.notify(this, 'clearInner');
    this.get('axisController') && this.get('axisController').clear();
  };

  _proto._execFilter = function _execFilter(data) {
    var filters = this.get('filters');

    if (filters) {
      data = data.filter(function (obj) {
        var rst = true;
        Util.each(filters, function (fn, k) {
          if (fn) {
            rst = fn(obj[k], obj);

            if (!rst) {
              return false;
            }
          }
        });
        return rst;
      });
    }

    return data;
  };

  _proto._initGeoms = function _initGeoms(geoms) {
    var coord = this.get('coord');
    var data = this.get('filteredData');
    var colDefs = this.get('colDefs');

    for (var i = 0, length = geoms.length; i < length; i++) {
      var geom = geoms[i];
      geom.set('data', data);
      geom.set('coord', coord);
      geom.set('colDefs', colDefs);
      geom.init();
    }
  };

  _proto._initCoord = function _initCoord() {
    var plot = this.get('plotRange');
    var coordCfg = Util.mix({
      type: 'cartesian'
    }, this.get('coordCfg'), {
      plot: plot
    });
    var type = coordCfg.type;
    var C = Coord[Util.upperFirst(type)];
    var coord = new C(coordCfg);
    this.set('coord', coord);
  };

  _proto._initLayout = function _initLayout() {
    var padding = this.get('_padding');

    if (!padding) {
      padding = this.get('margin') || this.get('padding');
      padding = Util.parsePadding(padding);
    }

    var top = padding[0] === 'auto' ? 0 : padding[0];
    var right = padding[1] === 'auto' ? 0 : padding[1];
    var bottom = padding[2] === 'auto' ? 0 : padding[2];
    var left = padding[3] === 'auto' ? 0 : padding[3];
    var width = this.get('width');
    var height = this.get('height');
    var plot = new Plot({
      start: {
        x: left,
        y: top
      },
      end: {
        x: width - right,
        y: height - bottom
      }
    });
    this.set('plotRange', plot);
    this.set('plot', plot);
  };

  _proto._initCanvas = function _initCanvas() {
    var self = this;

    try {
      var canvas = new Canvas({
        el: self.get('el') || self.get('id'),
        context: self.get('context'),
        pixelRatio: self.get('pixelRatio'),
        width: self.get('width'),
        height: self.get('height'),
        fontFamily: Global.fontFamily
      });
      self.set('canvas', canvas);
      self.set('width', canvas.get('width'));
      self.set('height', canvas.get('height'));
    } catch (error) {
      throw error;
    }

    Chart.plugins.notify(self, 'afterCanvasInit');

    self._initLayout();
  };

  _proto._initLayers = function _initLayers() {
    var canvas = this.get('canvas');
    this.set('backPlot', canvas.addGroup());
    this.set('middlePlot', canvas.addGroup({
      zIndex: 10
    }));
    this.set('frontPlot', canvas.addGroup({
      zIndex: 20
    }));
  };

  _proto._init = function _init() {
    var self = this;

    self._initCanvas();

    self._initLayers();

    self.set('geoms', []);
    self.set('scaleController', new ScaleController());
    self.set('axisController', new AxisController({
      frontPlot: self.get('frontPlot').addGroup({
        className: 'axisContainer'
      }),
      backPlot: self.get('backPlot').addGroup({
        className: 'axisContainer'
      }),
      chart: self
    }));
    Chart.plugins.notify(self, 'init');
  };

  function Chart(cfg) {
    var _this;

    _this = _Base.call(this, cfg) || this;

    var self = _assertThisInitialized(_this);

    Util.each(Geom, function (geomConstructor, className) {
      var methodName = Util.lowerFirst(className);

      self[methodName] = function (cfg) {
        var geom = new geomConstructor(cfg);
        self.addGeom(geom);
        return geom;
      };
    });

    self._init();

    return _this;
  }
  /**
   * set data and some scale configuration
   * @chainable
   * @param  {Array} data the dataset to visualize
   * @param  {Object} colDefs the configuration for scales
   * @return {Chart} return the chart instance
   */


  _proto.source = function source(data, colDefs) {
    this.set('data', data);

    if (colDefs) {
      this.scale(colDefs);
    }

    return this;
  };

  _proto.scale = function scale(field, cfg) {
    var colDefs = this.get('colDefs') || {};

    if (Util.isObject(field)) {
      Util.mix(colDefs, field);
    } else {
      colDefs[field] = cfg;
    }

    this.set('colDefs', colDefs);
    var scaleController = this.get('scaleController');
    scaleController.defs = colDefs;
    return this;
  }
  /**
   * configure the axis
   * @chainable
   * @param  {String|Boolean} field the field name of data
   * @param  {Object} cfg configuration for axis
   * @return {Chart} return the chart instance
   */
  ;

  _proto.axis = function axis(field, cfg) {
    var axisController = this.get('axisController');

    if (!field) {
      axisController.axisCfg = null;
    } else {
      axisController.axisCfg = axisController.axisCfg || {};
      axisController.axisCfg[field] = cfg;
    }

    return this;
  }
  /**
   * configure the coordinate
   * @chainable
   * @param  {String} type set the type of coodinate
   * @param  {Object} cfg configuration for coordinate
   * @return {Chart} return the chart instance
   */
  ;

  _proto.coord = function coord(type, cfg) {
    var coordCfg;

    if (Util.isObject(type)) {
      coordCfg = type;
    } else {
      coordCfg = cfg || {};
      coordCfg.type = type || 'cartesian';
    }

    this.set('coordCfg', coordCfg);
    return this;
  };

  _proto.filter = function filter(field, condition) {
    var filters = this.get('filters') || {};
    filters[field] = condition;
    this.set('filters', filters);
  }
  /**
   * render the chart
   * @chainable
   * @return {Chart} return the chart instance
   */
  ;

  _proto.render = function render() {
    var canvas = this.get('canvas');
    var geoms = this.get('geoms');
    var data = this.get('data') || [];

    var filteredData = this._execFilter(data); // filter data


    this.set('filteredData', filteredData);

    this._initCoord(); // initialization coordinate instance


    Chart.plugins.notify(this, 'beforeGeomInit');

    this._initGeoms(geoms); // init all geometry instances


    this.get('syncY') && this._syncYScales();

    this._adjustScale(); // do some adjust for data


    Chart.plugins.notify(this, 'beforeGeomDraw');

    this._renderAxis();

    var middlePlot = this.get('middlePlot');

    if (this.get('limitInPlot') && !middlePlot.attr('clip')) {
      var coord = this.get('coord');
      var clip = Helper.getClip(coord);
      clip.set('canvas', middlePlot.get('canvas'));
      middlePlot.attr('clip', clip);
    }

    for (var i = 0, length = geoms.length; i < length; i++) {
      var geom = geoms[i];
      geom.paint();
    }

    Chart.plugins.notify(this, 'afterGeomDraw');
    canvas.sort();
    this.get('frontPlot').sort();
    Chart.plugins.notify(this, 'beforeCanvasDraw');
    canvas.draw();
    return this;
  }
  /**
   * clear the chart, include geometris and all the shapes
   * @chainable
   * @return {Chart} return the chart
   */
  ;

  _proto.clear = function clear() {
    Chart.plugins.notify(this, 'clear');

    this._removeGeoms();

    this._clearInner();

    this.set('filters', null);
    this.set('isUpdate', false);
    this.set('_padding', null);
    var canvas = this.get('canvas');
    canvas.draw();
    return this;
  };

  _proto.repaint = function repaint() {
    this.set('isUpdate', true);
    Chart.plugins.notify(this, 'repaint');

    this._clearInner();

    this.render();
  };

  _proto.changeData = function changeData(data) {
    this.set('data', data);
    Chart.plugins.notify(this, 'changeData');
    this.set('_padding', null);
    this.repaint();
  };

  _proto.changeSize = function changeSize(width, height) {
    if (width) {
      this.set('width', width);
    } else {
      width = this.get('width');
    }

    if (height) {
      this.set('height', height);
    } else {
      height = this.get('height');
    }

    var canvas = this.get('canvas');
    canvas.changeSize(width, height);

    this._initLayout();

    this.repaint();
    return this;
  };

  _proto.destroy = function destroy() {
    this.clear();
    var canvas = this.get('canvas');
    canvas.destroy();
    Chart.plugins.notify(this, 'afterCanvasDestroyed');

    if (this._interactions) {
      Util.each(this._interactions, function (interaction) {
        interaction.destroy();
      });
    }

    _Base.prototype.destroy.call(this);
  }
  /**
   * calculate dataset's position on canvas
   * @param  {Object} record the dataset
   * @return {Object} return the position
   */
  ;

  _proto.getPosition = function getPosition(record) {
    var self = this;
    var coord = self.get('coord');
    var xScale = self.getXScale();
    var yScale = self.getYScales()[0];
    var xField = xScale.field;
    var x = xScale.scale(record[xField]);
    var yField = yScale.field;
    var y = yScale.scale(record[yField]);
    return coord.convertPoint({
      x: x,
      y: y
    });
  }
  /**
   * get the data item of the point
   * @param  {Object} point canvas position
   * @return {Object} return the data item
   */
  ;

  _proto.getRecord = function getRecord(point) {
    var self = this;
    var coord = self.get('coord');
    var xScale = self.getXScale();
    var yScale = self.getYScales()[0];
    var invertPoint = coord.invertPoint(point);
    var record = {};
    record[xScale.field] = xScale.invert(invertPoint.x);
    record[yScale.field] = yScale.invert(invertPoint.y);
    return record;
  }
  /**
   * get the dataset of the point
   * @param  {Object} point canvas position
   * @return {Array} return the dataset
  **/
  ;

  _proto.getSnapRecords = function getSnapRecords(point) {
    var geom = this.get('geoms')[0];
    var data = [];

    if (geom) {
      // need to judge
      data = geom.getSnapRecords(point);
    }

    return data;
  }
  /**
   * creat scale instances
   * @param  {String} field field name of data
   * @return {Scale} return the scale
   */
  ;

  _proto.createScale = function createScale(field) {
    var data = this.get('data');
    var filteredData = this.get('filteredData');

    if (filteredData.length) {
      var legendFields = this._getFieldsForLegend();

      if (legendFields.indexOf(field) === -1) {
        data = filteredData;
      }
    }

    var scales = this.get('scales');

    if (!scales[field]) {
      scales[field] = this._createScale(field, data);
    }

    return scales[field];
  }
  /**
   * @protected
   * add geometry instance to geoms
   * @param {Geom} geom geometry instance
   */
  ;

  _proto.addGeom = function addGeom(geom) {
    var geoms = this.get('geoms');
    var middlePlot = this.get('middlePlot');
    geoms.push(geom);
    geom.set('chart', this);
    geom.set('container', middlePlot.addGroup());
  }
  /**
   * get the scale of x axis
   * @return {Scale} return the scale
   */
  ;

  _proto.getXScale = function getXScale() {
    var self = this;
    var geoms = self.get('geoms');
    var xScale = geoms[0].getXScale();
    return xScale;
  }
  /**
   * get the scale of y axis
   * @return {Array} return the scale
   */
  ;

  _proto.getYScales = function getYScales() {
    var geoms = this.get('geoms');
    var rst = [];
    Util.each(geoms, function (geom) {
      var yScale = geom.getYScale();

      if (rst.indexOf(yScale) === -1) {
        rst.push(yScale);
      }
    });
    return rst;
  };

  _proto.getLegendItems = function getLegendItems() {
    if (this.get('legendItems')) {
      return this.get('legendItems');
    }

    var legendItems = {};
    var scales = [];
    var geoms = this.get('geoms');
    Util.each(geoms, function (geom) {
      var colorAttr = geom.getAttr('color');

      if (colorAttr) {
        var scale = colorAttr.getScale('color'); // 只支持分类图例

        if (scale.isCategory && !_isScaleExist(scales, scale)) {
          scales.push(scale);
          var field = scale.field;
          var ticks = scale.getTicks();
          var items = [];
          Util.each(ticks, function (tick) {
            var text = tick.text;
            var name = text;
            var scaleValue = tick.value;
            var value = scale.invert(scaleValue);
            var color = colorAttr.mapping(value).join('') || Global.defaultColor;
            var marker = {
              fill: color,
              radius: 3,
              symbol: 'circle',
              stroke: '#fff'
            };
            items.push({
              name: name,
              // for display
              dataValue: value,
              // the origin value
              checked: true,
              marker: marker
            });
          });
          legendItems[field] = items;
        }
      }
    });
    this.set('legendItems', legendItems);
    return legendItems;
  } // register the plugins
  ;

  _proto.registerPlugins = function registerPlugins(plugins) {
    var self = this;
    var chartPlugins = self.get('plugins') || [];

    if (!Util.isArray(chartPlugins)) {
      chartPlugins = [chartPlugins];
    }

    [].concat(plugins).forEach(function (plugin) {
      if (chartPlugins.indexOf(plugin) === -1) {
        plugin.init && plugin.init(self); // init

        chartPlugins.push(plugin);
      }
    });
    Chart.plugins._cacheId++;
    self.set('plugins', chartPlugins);
  };

  _proto._renderAxis = function _renderAxis() {
    var axisController = this.get('axisController');
    var xScale = this.getXScale();
    var yScales = this.getYScales();
    var coord = this.get('coord');
    Chart.plugins.notify(this, 'beforeRenderAxis');
    axisController.createAxis(coord, xScale, yScales);
  };

  _proto._isAutoPadding = function _isAutoPadding() {
    if (this.get('_padding')) {
      return false;
    }

    var padding = this.get('padding');

    if (Util.isArray(padding)) {
      return padding.indexOf('auto') !== -1;
    }

    return padding === 'auto';
  };

  _proto._updateLayout = function _updateLayout(padding) {
    var width = this.get('width');
    var height = this.get('height');
    var start = {
      x: padding[3],
      y: padding[0]
    };
    var end = {
      x: width - padding[1],
      y: height - padding[2]
    };
    var plot = this.get('plot');
    var coord = this.get('coord');
    plot.reset(start, end);
    coord.reset(plot);
  };

  return Chart;
}(Base);

Chart.plugins = Chart.initPlugins();
module.exports = Chart;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview Base class of chart and geometry
 * @author dxq613@gmail.com
 */
var Util = __webpack_require__(0);

var Base =
/*#__PURE__*/
function () {
  var _proto = Base.prototype;

  _proto.getDefaultCfg = function getDefaultCfg() {
    return {};
  };

  function Base(cfg) {
    var attrs = {};
    var defaultCfg = this.getDefaultCfg();
    this._attrs = attrs;
    Util.mix(attrs, defaultCfg, cfg);
  }

  _proto.get = function get(name) {
    return this._attrs[name];
  };

  _proto.set = function set(name, value) {
    this._attrs[name] = value;
  };

  _proto.destroy = function destroy() {
    this._attrs = {};
    this.destroyed = true;
  };

  return Base;
}();

module.exports = Base;

/***/ }),
/* 36 */
/***/ (function(module, exports) {

// isFinite,
var isNil = function isNil(value) {
  /**
   * isNil(null) => true
   * isNil() => true
   */
  return value === null || value === undefined;
};

module.exports = isNil;

/***/ }),
/* 37 */
/***/ (function(module, exports) {

var toString = {}.toString;
var isType = function isType(value, type) {
  return toString.call(value) === '[object ' + type + ']';
};

module.exports = isType;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(84);
var isArray = __webpack_require__(18);

var each = function each(elements, func) {
  if (!elements) {
    return;
  }
  var rst = void 0;
  if (isArray(elements)) {
    for (var i = 0, len = elements.length; i < len; i++) {
      rst = func(elements[i], i);
      if (rst === false) {
        break;
      }
    }
  } else if (isObject(elements)) {
    for (var k in elements) {
      if (elements.hasOwnProperty(k)) {
        rst = func(elements[k], k);
        if (rst === false) {
          break;
        }
      }
    }
  }
};

module.exports = each;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Base = __webpack_require__(10);

var catAuto = __webpack_require__(40);

var each = __webpack_require__(11);

var isNumber = __webpack_require__(14);

var isString = __webpack_require__(22);

var Category =
/*#__PURE__*/
function (_Base) {
  _inheritsLoose(Category, _Base);

  function Category() {
    return _Base.apply(this, arguments) || this;
  }

  var _proto = Category.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {
    _Base.prototype._initDefaultCfg.call(this);

    this.type = 'cat';
    /**
     * 是否分类度量
     * @type {Boolean}
     */

    this.isCategory = true;
    this.isRounding = true; // 是否进行取整操作
  }
  /**
   * @override
   */
  ;

  _proto.init = function init() {
    var self = this;
    var values = self.values;
    var tickCount = self.tickCount;
    each(values, function (v, i) {
      values[i] = v.toString();
    });

    if (!self.ticks) {
      var ticks = values;

      if (tickCount) {
        var temp = catAuto({
          maxCount: tickCount,
          data: values,
          isRounding: self.isRounding
        });
        ticks = temp.ticks;
      }

      this.ticks = ticks;
    }
  }
  /**
   * @override
   */
  ;

  _proto.getText = function getText(value) {
    if (this.values.indexOf(value) === -1 && isNumber(value)) {
      value = this.values[Math.round(value)];
    }

    return _Base.prototype.getText.call(this, value);
  }
  /**
   * @override
   */
  ;

  _proto.translate = function translate(value) {
    var index = this.values.indexOf(value);

    if (index === -1 && isNumber(value)) {
      index = value;
    } else if (index === -1) {
      index = NaN;
    }

    return index;
  }
  /**
   * @override
   */
  ;

  _proto.scale = function scale(value) {
    var rangeMin = this.rangeMin();
    var rangeMax = this.rangeMax();
    var percent;

    if (isString(value) || this.values.indexOf(value) !== -1) {
      value = this.translate(value);
    }

    if (this.values.length > 1) {
      percent = value / (this.values.length - 1);
    } else {
      percent = value;
    }

    return rangeMin + percent * (rangeMax - rangeMin);
  }
  /**
   * @override
   */
  ;

  _proto.invert = function invert(value) {
    if (isString(value)) {
      // 如果已经是字符串
      return value;
    }

    var min = this.rangeMin();
    var max = this.rangeMax(); // 归一到 范围内

    if (value < min) {
      value = min;
    }

    if (value > max) {
      value = max;
    }

    var percent = (value - min) / (max - min);
    var index = Math.round(percent * (this.values.length - 1)) % this.values.length;
    index = index || 0;
    return this.values[index];
  };

  return Category;
}(Base);

Base.Cat = Category;
module.exports = Category;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview 计算分类的的坐标点
 * @author dxq613@gmail.com
 */
var each = __webpack_require__(11);

var MAX_COUNT = 8;
var SUB_COUNT = 4; // 控制个数不能过小

function getSimpleArray(data) {
  var arr = [];
  each(data, function (sub) {
    arr = arr.concat(sub);
  });
  return arr;
}

function getGreatestFactor(count, number) {
  var i;

  for (i = number; i > 0; i--) {
    if (count % i === 0) {
      break;
    }
  } // 如果是素数，没有可以整除的数字


  if (i === 1) {
    for (i = number; i > 0; i--) {
      if ((count - 1) % i === 0) {
        break;
      }
    }
  }

  return i;
}

module.exports = function (info) {
  var rst = {};
  var ticks = [];
  var isRounding = info.isRounding;
  var categories = getSimpleArray(info.data);
  var length = categories.length;
  var maxCount = info.maxCount || MAX_COUNT;
  var tickCount;

  if (isRounding) {
    // 取整操作
    tickCount = getGreatestFactor(length - 1, maxCount - 1) + 1; // 如果计算出来只有两个坐标点，则直接使用传入的 maxCount

    if (tickCount === 2) {
      tickCount = maxCount;
    } else if (tickCount < maxCount - SUB_COUNT) {
      tickCount = maxCount - SUB_COUNT;
    }
  } else {
    tickCount = maxCount;
  }

  if (!isRounding && length <= tickCount + tickCount / 2) {
    ticks = [].concat(categories);
  } else {
    var step = parseInt(length / (tickCount - 1), 10);
    var groups = categories.map(function (e, i) {
      return i % step === 0 ? categories.slice(i, i + step) : null;
    }).filter(function (e) {
      return e;
    });

    for (var i = 1, groupLen = groups.length; i < groupLen && (isRounding ? i * step < length - step : i < tickCount - 1); i++) {
      ticks.push(groups[i][0]);
    }

    if (categories.length) {
      ticks.unshift(categories[0]);
      var last = categories[length - 1];

      if (ticks.indexOf(last) === -1) {
        ticks.push(last);
      }
    }
  }

  rst.categories = categories;
  rst.ticks = ticks;
  return rst;
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(0);

var Shape = __webpack_require__(2);

var SHAPE_MAP = {};
var INDEX = '_INDEX';

function getComparer(compare) {
  return function (left, right) {
    var result = compare(left, right);
    return result === 0 ? left[INDEX] - right[INDEX] : result;
  };
}

module.exports = {
  getGroupClass: function getGroupClass() {},
  getChildren: function getChildren() {
    return this.get('children');
  },
  addShape: function addShape(type, cfg) {
    if (cfg === void 0) {
      cfg = {};
    }

    var canvas = this.get('canvas');
    var shapeType = SHAPE_MAP[type];

    if (!shapeType) {
      shapeType = Util.upperFirst(type);
      SHAPE_MAP[type] = shapeType;
    }

    cfg.canvas = canvas;

    if (shapeType === 'Text' && canvas && canvas.get('fontFamily')) {
      cfg.attrs.fontFamily = cfg.attrs.fontFamily || canvas.get('fontFamily');
    }

    var shape = new Shape[shapeType](cfg);
    this.add(shape);
    return shape;
  },
  addGroup: function addGroup(cfg) {
    var canvas = this.get('canvas');
    var groupClass = this.getGroupClass();
    cfg = Util.mix({}, cfg);
    cfg.canvas = canvas;
    cfg.parent = this;
    var rst = new groupClass(cfg);
    this.add(rst);
    return rst;
  },
  contain: function contain(item) {
    var children = this.get('children');
    return children.indexOf(item) > -1;
  },
  sort: function sort() {
    var children = this.get('children');

    for (var i = 0, len = children.length; i < len; i++) {
      var child = children[i];
      child[INDEX] = i;
    }

    children.sort(getComparer(function (obj1, obj2) {
      return obj1.get('zIndex') - obj2.get('zIndex');
    }));
    return this;
  },
  clear: function clear() {
    var children = this.get('children');

    while (children.length !== 0) {
      children[children.length - 1].remove(true);
    }

    return this;
  },
  add: function add(items) {
    var self = this;
    var children = self.get('children');

    if (!Util.isArray(items)) {
      items = [items];
    }

    for (var i = 0, len = items.length; i < len; i++) {
      var item = items[i];
      var parent = item.get('parent');

      if (parent) {
        var descendants = parent.get('children');
        Util.Array.remove(descendants, item);
      }

      self._setEvn(item);

      children.push(item);
    }

    return self;
  },
  _setEvn: function _setEvn(item) {
    var self = this;
    item._attrs.parent = self;
    item._attrs.context = self._attrs.context;
    item._attrs.canvas = self._attrs.canvas;
    var clip = item._attrs.attrs.clip;

    if (clip) {
      clip.set('parent', self);
      clip.set('context', self.get('context'));
    }

    if (item._attrs.isGroup) {
      var children = item._attrs.children;

      for (var i = 0, len = children.length; i < len; i++) {
        item._setEvn(children[i]);
      }
    }
  }
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Util = __webpack_require__(0);

var Element = __webpack_require__(24);

var Container = __webpack_require__(41);

var Vector2 = __webpack_require__(6);

var Group =
/*#__PURE__*/
function (_Element) {
  _inheritsLoose(Group, _Element);

  function Group() {
    return _Element.apply(this, arguments) || this;
  }

  var _proto = Group.prototype;

  _proto._initProperties = function _initProperties() {
    this._attrs = {
      zIndex: 0,
      visible: true,
      destroyed: false,
      isGroup: true,
      children: []
    };
  };

  _proto.drawInner = function drawInner(context) {
    var children = this.get('children');

    for (var i = 0, len = children.length; i < len; i++) {
      var child = children[i];
      child.draw(context);
    }

    return this;
  };

  _proto.getBBox = function getBBox() {
    var self = this;
    var minX = Infinity;
    var maxX = -Infinity;
    var minY = Infinity;
    var maxY = -Infinity;
    var children = self.get('children');

    for (var i = 0, length = children.length; i < length; i++) {
      var child = children[i];

      if (child.get('visible')) {
        var box = child.getBBox();

        if (!box) {
          continue;
        }

        var leftTop = [box.minX, box.minY];
        var leftBottom = [box.minX, box.maxY];
        var rightTop = [box.maxX, box.minY];
        var rightBottom = [box.maxX, box.maxY];
        var matrix = child.attr('matrix');
        Vector2.transformMat2d(leftTop, leftTop, matrix);
        Vector2.transformMat2d(leftBottom, leftBottom, matrix);
        Vector2.transformMat2d(rightTop, rightTop, matrix);
        Vector2.transformMat2d(rightBottom, rightBottom, matrix);
        minX = Math.min(leftTop[0], leftBottom[0], rightTop[0], rightBottom[0], minX);
        maxX = Math.max(leftTop[0], leftBottom[0], rightTop[0], rightBottom[0], maxX);
        minY = Math.min(leftTop[1], leftBottom[1], rightTop[1], rightBottom[1], minY);
        maxY = Math.max(leftTop[1], leftBottom[1], rightTop[1], rightBottom[1], maxY);
      }
    }

    return {
      minX: minX,
      minY: minY,
      maxX: maxX,
      maxY: maxY,
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    };
  };

  _proto.destroy = function destroy() {
    if (this.get('destroyed')) {
      return;
    }

    this.clear();

    _Element.prototype.destroy.call(this);
  };

  return Group;
}(Element);

Util.mix(Group.prototype, Container, {
  getGroupClass: function getGroupClass() {
    return Group;
  }
});
module.exports = Group;

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = {
  requestAnimationFrame: typeof window === 'object' && window.requestAnimationFrame ? window.requestAnimationFrame : function (fn) {
    return setTimeout(fn, 16);
  }
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview convert the line to curve
 * @author dxq613@gmail.com
 */
var Vector2 = __webpack_require__(6);

function getPoint(v) {
  return [v.x, v.y];
}

function smoothBezier(points, smooth, isLoop, constraint) {
  var cps = [];
  var prevPoint;
  var nextPoint;
  var hasConstraint = !!constraint;
  var min;
  var max;
  var point;
  var len;
  var l;
  var i;

  if (hasConstraint) {
    min = [Infinity, Infinity];
    max = [-Infinity, -Infinity];

    for (i = 0, l = points.length; i < l; i++) {
      point = getPoint(points[i]);
      Vector2.min(min, min, point);
      Vector2.max(max, max, point);
    }

    Vector2.min(min, min, constraint[0]);
    Vector2.max(max, max, constraint[1]);
  }

  for (i = 0, len = points.length; i < len; i++) {
    point = getPoint(points[i]);

    if (isLoop) {
      prevPoint = getPoint(points[i ? i - 1 : len - 1]);
      nextPoint = getPoint(points[(i + 1) % len]);
    } else {
      if (i === 0 || i === len - 1) {
        cps.push([point[0], point[1]]);
        continue;
      } else {
        prevPoint = getPoint(points[i - 1]);
        nextPoint = getPoint(points[i + 1]);
      }
    }

    var v = Vector2.sub([], nextPoint, prevPoint);
    Vector2.scale(v, v, smooth);
    var d0 = Vector2.distance(point, prevPoint);
    var d1 = Vector2.distance(point, nextPoint);
    var sum = d0 + d1;

    if (sum !== 0) {
      d0 /= sum;
      d1 /= sum;
    }

    var v1 = Vector2.scale([], v, -d0);
    var v2 = Vector2.scale([], v, d1);
    var cp0 = Vector2.add([], point, v1);
    var cp1 = Vector2.add([], point, v2);

    if (hasConstraint) {
      Vector2.max(cp0, cp0, min);
      Vector2.min(cp0, cp0, max);
      Vector2.max(cp1, cp1, min);
      Vector2.min(cp1, cp1, max);
    }

    cps.push([cp0[0], cp0[1]]);
    cps.push([cp1[0], cp1[1]]);
  }

  if (isLoop) {
    cps.push(cps.shift());
  }

  return cps;
}

function catmullRom2bezier(pointList, z, constraint) {
  var isLoop = !!z;
  var controlPointList = smoothBezier(pointList, 0.4, isLoop, constraint);
  var len = pointList.length;
  var d1 = [];
  var cp1;
  var cp2;
  var p;

  for (var i = 0; i < len - 1; i++) {
    cp1 = controlPointList[i * 2];
    cp2 = controlPointList[i * 2 + 1];
    p = pointList[i + 1];
    d1.push(['C', cp1[0], cp1[1], cp2[0], cp2[1], p.x, p.y]);
  }

  if (isLoop) {
    cp1 = controlPointList[len];
    cp2 = controlPointList[len + 1];
    p = pointList[0];
    d1.push(['C', cp1[0], cp1[1], cp2[0], cp2[1], p.x, p.y]);
  }

  return d1;
}

module.exports = {
  smooth: catmullRom2bezier
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Geom = __webpack_require__(3);

var ShapeUtil = __webpack_require__(15);

var Util = __webpack_require__(0);

__webpack_require__(46);

var Path =
/*#__PURE__*/
function (_Geom) {
  _inheritsLoose(Path, _Geom);

  function Path() {
    return _Geom.apply(this, arguments) || this;
  }

  var _proto = Path.prototype;

  _proto.getDefaultCfg = function getDefaultCfg() {
    var cfg = _Geom.prototype.getDefaultCfg.call(this);

    cfg.type = 'path';
    cfg.shapeType = 'line';
    return cfg;
  };

  _proto.getDrawCfg = function getDrawCfg(obj) {
    var cfg = _Geom.prototype.getDrawCfg.call(this, obj);

    cfg.isStack = this.hasAdjust('stack');
    return cfg;
  };

  _proto.draw = function draw(data, shapeFactory) {
    var self = this;
    var container = self.get('container');
    var yScale = self.getYScale();
    var connectNulls = self.get('connectNulls');
    var splitArray = ShapeUtil.splitArray(data, yScale.field, connectNulls);
    var cfg = this.getDrawCfg(data[0]);
    cfg.origin = data;
    Util.each(splitArray, function (subData, splitedIndex) {
      cfg.splitedIndex = splitedIndex;
      cfg.points = subData;
      self.drawShape(cfg.shape, data[0], cfg, container, shapeFactory);
    });
  };

  return Path;
}(Geom);

Geom.Path = Path;
module.exports = Path;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(0);

var Shape = __webpack_require__(5);

var ShapeUtil = __webpack_require__(15);

var Global = __webpack_require__(1); // register line geom


var Line = Shape.registerFactory('line', {
  defaultShapeType: 'line'
});

function getStyle(cfg) {
  var style = {
    strokeStyle: cfg.color
  };

  if (cfg.size >= 0) {
    style.lineWidth = cfg.size;
  }

  Util.mix(style, cfg.style);
  return Util.mix({}, Global.shape.line, style);
}

function drawLines(cfg, container, style, smooth) {
  var points = cfg.points;

  if (points.length && Util.isArray(points[0].y)) {
    var topPoints = [];
    var bottomPoints = [];

    for (var i = 0, len = points.length; i < len; i++) {
      var point = points[i];
      var tmp = ShapeUtil.splitPoints(point);
      bottomPoints.push(tmp[0]);
      topPoints.push(tmp[1]);
    }

    if (cfg.isInCircle) {
      topPoints.push(topPoints[0]);
      bottomPoints.push(bottomPoints[0]);
    }

    if (cfg.isStack) {
      return container.addShape('Polyline', {
        className: 'line',
        attrs: Util.mix({
          points: topPoints,
          smooth: smooth
        }, style)
      });
    }

    var topShape = container.addShape('Polyline', {
      className: 'line',
      attrs: Util.mix({
        points: topPoints,
        smooth: smooth
      }, style)
    });
    var bottomShape = container.addShape('Polyline', {
      className: 'line',
      attrs: Util.mix({
        points: bottomPoints,
        smooth: smooth
      }, style)
    });
    return [topShape, bottomShape];
  }

  if (cfg.isInCircle) {
    points.push(points[0]);
  }

  return container.addShape('Polyline', {
    className: 'line',
    attrs: Util.mix({
      points: points,
      smooth: smooth
    }, style)
  });
}

var SHAPES = ['line', 'smooth', 'dash'];
Util.each(SHAPES, function (shapeType) {
  Shape.registerShape('line', shapeType, {
    draw: function draw(cfg, container) {
      var smooth = shapeType === 'smooth';
      var style = getStyle(cfg);

      if (shapeType === 'dash') {
        style.lineDash = Global.lineDash;
      }

      return drawLines(cfg, container, style, smooth);
    }
  });
});
module.exports = Line;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview Utility for calculate the with ratui in x axis
 * @author sima.zhang1990@gmail.com
 * @author dxq613@gmail.com
 */
var Global = __webpack_require__(1);

var Util = __webpack_require__(0);

var SizeMixin = {
  getDefalutSize: function getDefalutSize() {
    var defaultSize = this.get('defaultSize');

    if (!defaultSize) {
      var coord = this.get('coord');
      var xScale = this.getXScale();
      var dataArray = this.get('dataArray');
      var values = Util.uniq(xScale.values);
      var count = values.length;
      var range = xScale.range;
      var normalizeSize = 1 / count;
      var widthRatio = 1;

      if (coord && coord.isPolar) {
        if (coord.transposed && count > 1) {
          widthRatio = Global.widthRatio.multiplePie;
        } else {
          widthRatio = Global.widthRatio.rose;
        }
      } else {
        if (xScale.isLinear) {
          normalizeSize *= range[1] - range[0];
        }

        widthRatio = Global.widthRatio.column;
      }

      normalizeSize *= widthRatio;

      if (this.hasAdjust('dodge')) {
        normalizeSize = normalizeSize / dataArray.length;
      }

      defaultSize = normalizeSize;
      this.set('defaultSize', defaultSize);
    }

    return defaultSize;
  },
  getDimWidth: function getDimWidth(dimName) {
    var coord = this.get('coord');
    var start = coord.convertPoint({
      x: 0,
      y: 0
    });
    var end = coord.convertPoint({
      x: dimName === 'x' ? 1 : 0,
      y: dimName === 'x' ? 0 : 1
    });
    var width = 0;

    if (start && end) {
      width = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
    }

    return width;
  },
  _getWidth: function _getWidth() {
    var width = this.get('_width');

    if (!width) {
      var coord = this.get('coord');

      if (coord && coord.isPolar && !coord.transposed) {
        width = (coord.endAngle - coord.startAngle) * coord.circleRadius;
      } else {
        width = this.getDimWidth('x');
      }

      this.set('_width', width);
    }

    return width;
  },
  _toNormalizedSize: function _toNormalizedSize(size) {
    var width = this._getWidth();

    return size / width;
  },
  _toCoordSize: function _toCoordSize(normalizeSize) {
    var width = this._getWidth();

    return width * normalizeSize;
  },
  getNormalizedSize: function getNormalizedSize(obj) {
    var size = this.getAttrValue('size', obj);

    if (Util.isNil(size)) {
      size = this.getDefalutSize();
    } else {
      size = this._toNormalizedSize(size);
    }

    return size;
  },
  getSize: function getSize(obj) {
    var size = this.getAttrValue('size', obj);

    if (Util.isNil(size)) {
      var normalizeSize = this.getDefalutSize();
      size = this._toCoordSize(normalizeSize);
    }

    return size;
  }
};
module.exports = SizeMixin;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var isType = __webpack_require__(129);

var isArray = Array.isArray ? Array.isArray : function (value) {
  return isType(value, 'Array');
};

module.exports = isArray;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * marker shapes，used for tooltip and legend
 */
var Util = __webpack_require__(0);

var _require = __webpack_require__(4),
    Shape = _require.Shape;

var SYMBOLS = {
  circle: function circle(x, y, r, ctx) {
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
  },
  square: function square(x, y, r, ctx) {
    ctx.moveTo(x - r, y - r);
    ctx.lineTo(x + r, y - r);
    ctx.lineTo(x + r, y + r);
    ctx.lineTo(x - r, y + r);
    ctx.closePath();
  }
};

var Marker =
/*#__PURE__*/
function (_Shape) {
  _inheritsLoose(Marker, _Shape);

  function Marker() {
    return _Shape.apply(this, arguments) || this;
  }

  var _proto = Marker.prototype;

  _proto._initProperties = function _initProperties() {
    _Shape.prototype._initProperties.call(this);

    this._attrs.canFill = true;
    this._attrs.canStroke = true;
    this._attrs.type = 'marker';
  };

  _proto.getDefaultAttrs = function getDefaultAttrs() {
    return {
      x: 0,
      y: 0,
      lineWidth: 0
    };
  };

  _proto.createPath = function createPath(context) {
    var attrs = this.get('attrs');
    var x = attrs.x,
        y = attrs.y,
        radius = attrs.radius;
    var symbol = attrs.symbol || 'circle';
    var method;

    if (Util.isFunction(symbol)) {
      method = symbol;
    } else {
      method = SYMBOLS[symbol];
    }

    context.beginPath();
    method(x, y, radius, context, this);
  };

  _proto.calculateBox = function calculateBox() {
    var attrs = this.get('attrs');
    var x = attrs.x,
        y = attrs.y,
        radius = attrs.radius;
    return {
      minX: x - radius,
      minY: y - radius,
      maxX: x + radius,
      maxY: y + radius
    };
  };

  return Marker;
}(Shape);

module.exports = Marker;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(0);

var _require = __webpack_require__(4),
    Group = _require.Group;

var Marker = __webpack_require__(49);

var MARKER_RADIUS = 3;

var List =
/*#__PURE__*/
function () {
  var _proto = List.prototype;

  _proto.getDefaultCfg = function getDefaultCfg() {
    return {
      showTitle: false,

      /**
       * title string
       * @type {?String}
       */
      title: null,

      /**
       * items array
       * @type {?Array}
       */
      items: null,

      /**
       * offset between title and items
       * @type {Number}
       */
      titleGap: 12,

      /**
       * offset between each item
       * @type {Number}
       */
      itemGap: 10,

      /**
       * the offset between each item in vertical direaction
       * @type {Number}
       */
      itemMarginBottom: 12,

      /**
       * the formatter for item text
       * @type {[type]}
       */
      itemFormatter: null,
      itemWidth: null,

      /**
       * offset between marker and text
       * @type {Number}
       */
      wordSpace: 6,
      x: 0,
      y: 0,
      layout: 'horizontal',

      /**
       * the join string of `name` and `value`
       * @type {String}
       */
      joinString: ': '
    };
  };

  function List(cfg) {
    Util.deepMix(this, this.getDefaultCfg(), cfg);

    this._init();

    this._renderTitle();

    this._renderItems();
  }

  _proto._init = function _init() {
    var container = new Group({
      zIndex: this.zIndex || 0
    });
    this.container = container;
    var wrapper = container.addGroup();
    this.wrapper = wrapper;
    var itemsGroup = wrapper.addGroup({
      className: 'itemsGroup'
    });
    this.itemsGroup = itemsGroup;

    if (this.parent) {
      this.parent.add(container);
    }
  };

  _proto._renderTitle = function _renderTitle(title) {
    title = title || this.title;
    var titleShape = this.titleShape;
    var titleHeight = 0;

    if (this.showTitle && title) {
      if (titleShape && !titleShape.get('destroyed')) {
        titleShape.attr('text', title);
      } else {
        var wrapper = this.wrapper,
            titleStyle = this.titleStyle;
        titleShape = wrapper.addShape('text', {
          className: 'title',
          attrs: Util.mix({
            x: 0,
            y: 0,
            text: title
          }, titleStyle)
        });
        this.titleShape = titleShape;
      }

      titleHeight = titleShape.getBBox().height + this.titleGap;
    }

    this._titleHeight = titleHeight;
  };

  _proto._renderItems = function _renderItems(items) {
    var self = this;
    items = items || self.items;

    if (!items) {
      return;
    }

    if (self.reversed) {
      items.reverse();
    }

    Util.each(items, function (item, index) {
      self._addItem(item, index);
    });

    if (items.length > 1) {
      this._adjustItems();
    }

    this._renderBackground();
  };

  _proto._renderBackground = function _renderBackground() {
    var background = this.background;

    if (background) {
      var container = this.container;
      var wrapper = this.wrapper;

      var _wrapper$getBBox = wrapper.getBBox(),
          minX = _wrapper$getBBox.minX,
          minY = _wrapper$getBBox.minY,
          width = _wrapper$getBBox.width,
          height = _wrapper$getBBox.height;

      var padding = background.padding || [0, 0, 0, 0];
      padding = Util.parsePadding(padding);
      var attrs = Util.mix({
        x: minX - padding[3],
        y: minY - padding[0],
        width: width + padding[1] + padding[3],
        height: height + padding[0] + padding[2]
      }, background);
      var backShape = this.backShape;

      if (backShape) {
        backShape.attr(attrs);
      } else {
        backShape = container.addShape('Rect', {
          zIndex: -1,
          attrs: attrs
        });
      }

      this.backShape = backShape;
      container.sort();
    }
  };

  _proto._addItem = function _addItem(item) {
    var itemsGroup = this.itemsGroup;
    var itemGroup = itemsGroup.addGroup({
      name: item.name,
      value: item.value,
      dataValue: item.dataValue,
      checked: item.checked
    });
    var unCheckStyle = this.unCheckStyle,
        unCheckColor = this.unCheckColor,
        nameStyle = this.nameStyle,
        valueStyle = this.valueStyle,
        wordSpace = this.wordSpace;
    var marker = item.marker,
        value = item.value;
    var startX = 0;

    if (unCheckColor) {
      unCheckStyle.fill = unCheckColor;
    }

    if (marker) {
      var radius = marker.radius || MARKER_RADIUS;
      var markerAttrs = Util.mix({
        x: radius,
        y: this._titleHeight
      }, marker);

      if (item.checked === false) {
        Util.mix(markerAttrs, unCheckStyle);
      }

      var markerShape = new Marker({
        className: 'item-marker',
        attrs: markerAttrs
      });
      itemGroup.add(markerShape);
      startX += markerShape.getBBox().width + wordSpace;
    }

    var nameText;
    var name = item.name;

    if (name) {
      var joinString = this.joinString || '';
      name = value ? name + joinString : name;
      nameText = itemGroup.addShape('text', {
        className: 'name',
        attrs: Util.mix({
          x: startX,
          y: this._titleHeight,
          text: this._formatItemValue(name)
        }, nameStyle, item.checked === false ? unCheckStyle : null)
      });
    }

    if (value) {
      var valueX = startX;

      if (nameText) {
        valueX += nameText.getBBox().width;
      }

      itemGroup.addShape('text', {
        className: 'value',
        attrs: Util.mix({
          x: valueX,
          y: this._titleHeight,
          text: value
        }, valueStyle, item.checked === false ? unCheckStyle : null)
      });
    }

    return itemGroup;
  };

  _proto._formatItemValue = function _formatItemValue(value) {
    var formatter = this.itemFormatter;

    if (formatter) {
      value = formatter.call(this, value);
    }

    return value;
  };

  _proto._getMaxItemWidth = function _getMaxItemWidth() {
    var width;
    var itemWidth = this.itemWidth;

    if (Util.isNumber(itemWidth) || Util.isNil(itemWidth)) {
      return itemWidth;
    }

    if (itemWidth === 'auto') {
      var itemsGroup = this.itemsGroup;
      var children = itemsGroup.get('children');
      var count = children.length;
      var maxItemWidth = 0;

      for (var i = 0; i < count; i++) {
        var _children$i$getBBox = children[i].getBBox(),
            _width = _children$i$getBBox.width;

        maxItemWidth = Math.max(maxItemWidth, _width);
      }

      var maxLength = this.maxLength;
      var itemGap = this.itemGap;
      var twoAvgWidth = (maxLength - itemGap) / 2;
      var threeAvgWidth = (maxLength - itemGap * 2) / 3;

      if (count === 2) {
        width = Math.max(maxItemWidth, twoAvgWidth);
      } else {
        // 1. max <= 3Avg, 3Avg
        // 2. 3Avg < max && max < 2avg, 2avg
        // 3. max > 2avg, max, one column
        if (maxItemWidth <= threeAvgWidth) {
          width = threeAvgWidth;
        } else if (maxItemWidth <= twoAvgWidth) {
          width = twoAvgWidth;
        } else {
          width = maxItemWidth;
        }
      }

      return width;
    }
  };

  _proto._adjustHorizontal = function _adjustHorizontal() {
    var maxLength = this.maxLength,
        itemsGroup = this.itemsGroup;
    var children = itemsGroup.get('children');
    var itemGap = this.itemGap,
        itemMarginBottom = this.itemMarginBottom;
    var titleHeight = this._titleHeight;
    var row = 0;
    var rowWidth = 0;
    var width;
    var height;

    var itemWidth = this._getMaxItemWidth();

    var legendHitBoxes = [];

    for (var i = 0, len = children.length; i < len; i++) {
      var child = children[i];
      var box = child.getBBox();
      var childHeight = box.height;
      var childWidth = box.width;
      width = itemWidth || childWidth;
      height = childHeight + itemMarginBottom;

      if (width - (maxLength - rowWidth) > 0.0001) {
        row++;
        rowWidth = 0;
      }

      child.moveTo(rowWidth, row * height);
      legendHitBoxes.push({
        x: rowWidth,
        y: row * height + titleHeight - childHeight / 2,
        width: childWidth * 1.375,
        height: childHeight * 1.375
      });
      rowWidth += width + itemGap;
    }

    this.legendHitBoxes = legendHitBoxes;
    return;
  };

  _proto._adjustVertical = function _adjustVertical() {
    var maxLength = this.maxLength,
        itemsGroup = this.itemsGroup;
    var itemGap = this.itemGap,
        itemMarginBottom = this.itemMarginBottom,
        itemWidth = this.itemWidth;
    var titleHeight = this._titleHeight;
    var children = itemsGroup.get('children');
    var colHeight = 0;
    var width;
    var height;
    var maxItemWidth = 0;
    var totalWidth = 0;
    var legendHitBoxes = [];

    for (var i = 0, length = children.length; i < length; i++) {
      var child = children[i];
      var bbox = child.getBBox();
      width = bbox.width;
      height = bbox.height;

      if (Util.isNumber(itemWidth)) {
        maxItemWidth = itemWidth + itemGap;
      } else if (width > maxItemWidth) {
        maxItemWidth = width + itemGap;
      }

      if (maxLength - colHeight < height) {
        colHeight = 0;
        totalWidth += maxItemWidth;
        child.moveTo(totalWidth, 0);
        legendHitBoxes.push({
          x: totalWidth,
          y: titleHeight - height / 2,
          width: width * 1.375,
          height: height * 1.375
        });
      } else {
        child.moveTo(totalWidth, colHeight);
        legendHitBoxes.push({
          x: totalWidth,
          y: colHeight - height / 2 + titleHeight,
          width: width * 1.375,
          height: height * 1.375
        });
      }

      colHeight += height + itemMarginBottom;
    }

    this.legendHitBoxes = legendHitBoxes;
    return;
  };

  _proto._adjustItems = function _adjustItems() {
    var layout = this.layout;

    if (layout === 'horizontal') {
      this._adjustHorizontal();
    } else {
      this._adjustVertical();
    }
  };

  _proto.moveTo = function moveTo(x, y) {
    this.x = x;
    this.y = y;
    var container = this.container;
    container && container.moveTo(x, y);
    return this;
  };

  _proto.setItems = function setItems(items) {
    this.clearItems();

    this._renderItems(items);
  };

  _proto.setTitle = function setTitle(title) {
    this._renderTitle(title);
  };

  _proto.clearItems = function clearItems() {
    var itemsGroup = this.itemsGroup;
    itemsGroup.clear();
  };

  _proto.getWidth = function getWidth() {
    var container = this.container;
    var bbox = container.getBBox();
    return bbox.width;
  };

  _proto.getHeight = function getHeight() {
    var container = this.container;
    var bbox = container.getBBox();
    return bbox.height;
  };

  _proto.show = function show() {
    var container = this.container;
    container.show();
  };

  _proto.hide = function hide() {
    var container = this.container;
    container.hide();
  };

  _proto.clear = function clear() {
    var container = this.container;
    container.clear();
    container.remove(true);
  };

  return List;
}();

module.exports = List;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Animate configuration and register
 * @author sima.zhang1990@gmail.com
 */
var Util = __webpack_require__(0);

var defaultAnimationCfg = {
  appear: {
    duration: 450,
    easing: 'quadraticOut'
  },
  // 'appear' animation options
  update: {
    duration: 300,
    easing: 'quadraticOut'
  },
  // 'update' animation options
  enter: {
    duration: 300,
    easing: 'quadraticOut'
  },
  // 'enter' animation options
  leave: {
    duration: 350,
    easing: 'quadraticIn'
  } // 'leave' animation options

};
var Animate = {
  defaultCfg: {},
  Action: {},
  getAnimation: function getAnimation(geomType, coord, animationType) {
    var geomAnimateCfg = this.defaultCfg[geomType];

    if (geomAnimateCfg) {
      var animation = geomAnimateCfg[animationType];

      if (Util.isFunction(animation)) {
        return animation(coord);
      }
    }

    return false;
  },
  getAnimateCfg: function getAnimateCfg(geomType, animationType) {
    var defaultCfg = defaultAnimationCfg[animationType];
    var geomConfig = this.defaultCfg[geomType];

    if (geomConfig && geomConfig.cfg && geomConfig.cfg[animationType]) {
      return Util.deepMix({}, defaultCfg, geomConfig.cfg[animationType]);
    }

    return defaultCfg;
  },
  registerAnimation: function registerAnimation(animationName, animationFun) {
    if (!this.Action) {
      this.Action = {};
    }

    this.Action[animationName] = animationFun;
  }
};
module.exports = Animate;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Utility
 * @author sima.zhang1990@gmail.com
 */
var _require = __webpack_require__(4),
    Matrix = _require.Matrix;

var Util = __webpack_require__(0);

var Helpers = {
  getCoordInfo: function getCoordInfo(coord) {
    var start = coord.start;
    var end = coord.end;
    return {
      start: start,
      end: end,
      width: end.x - start.x,
      height: Math.abs(end.y - start.y)
    };
  },
  getScaledMatrix: function getScaledMatrix(shape, v, direct) {
    var scaledMatrix;
    shape.apply(v);
    var x = v[0];
    var y = v[1];

    if (direct === 'x') {
      shape.transform([['t', x, y], ['s', 0.01, 1], ['t', -x, -y]]);
      var matrix = shape.getMatrix();
      scaledMatrix = Matrix.transform(matrix, [['t', x, y], ['s', 100, 1], ['t', -x, -y]]);
    } else if (direct === 'y') {
      shape.transform([['t', x, y], ['s', 1, 0.01], ['t', -x, -y]]);

      var _matrix = shape.getMatrix();

      scaledMatrix = Matrix.transform(_matrix, [['t', x, y], ['s', 1, 100], ['t', -x, -y]]);
    } else if (direct === 'xy') {
      shape.transform([['t', x, y], ['s', 0.01, 0.01], ['t', -x, -y]]);

      var _matrix2 = shape.getMatrix();

      scaledMatrix = Matrix.transform(_matrix2, [['t', x, y], ['s', 100, 100], ['t', -x, -y]]);
    }

    return scaledMatrix;
  },
  getAnimateParam: function getAnimateParam(animateCfg, index, id) {
    var result = {};

    if (animateCfg.delay) {
      result.delay = Util.isFunction(animateCfg.delay) ? animateCfg.delay(index, id) : animateCfg.delay;
    }

    result.easing = animateCfg.easing;
    result.duration = animateCfg.duration;
    result.delay = animateCfg.delay;
    return result;
  },
  doAnimation: function doAnimation(shape, endState, animateCfg, callback) {
    var id = shape._id;
    var index = shape.get('index');

    var _Helpers$getAnimatePa = Helpers.getAnimateParam(animateCfg, index, id),
        easing = _Helpers$getAnimatePa.easing,
        delay = _Helpers$getAnimatePa.delay,
        duration = _Helpers$getAnimatePa.duration;

    var anim = shape.animate().to({
      attrs: endState,
      duration: duration,
      delay: delay,
      easing: easing
    });

    if (callback) {
      anim.onEnd(function () {
        callback();
      });
    }
  }
};
module.exports = Helpers;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*global Vue*/

/* weex initialized here, please do not move this line */
var _require = __webpack_require__(54),
    router = _require.router;

var App = __webpack_require__(167);
/* eslint-disable no-new */
new Vue(Vue.util.extend({ el: '#root', router: router }, App));
router.push('/');

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = undefined;

var _vueRouter = __webpack_require__(55);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _chart = __webpack_require__(56);

var _chart2 = _interopRequireDefault(_chart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global Vue */
Vue.use(_vueRouter2.default);

var router = exports.router = new _vueRouter2.default({
  routes: [{
    path: '/',
    name: 'chart',
    component: _chart2.default
  }]
});

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/*!
  * vue-router v3.1.3
  * (c) 2019 Evan You
  * @license MIT
  */
/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if ("development" !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

function isError (err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1
}

function isExtendedError (constructor, err) {
  return (
    err instanceof constructor ||
    // _name is to support IE9 too
    (err && (err.name === constructor.name || err._name === constructor._name))
  )
}

function extend (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

var View = {
  name: 'RouterView',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    // used by devtools to display a router-view badge
    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      var vnodeData = parent.$vnode && parent.$vnode.data;
      if (vnodeData) {
        if (vnodeData.routerView) {
          depth++;
        }
        if (vnodeData.keepAlive && parent._inactive) {
          inactive = true;
        }
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children)
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h()
    }

    var component = cache[name] = matched.components[name];

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (
        (val && current !== vm) ||
        (!val && current === vm)
      ) {
        matched.instances[name] = val;
      }
    }

    // also register instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // register instance in init hook
    // in case kept-alive component be actived when routes changed
    data.hook.init = function (vnode) {
      if (vnode.data.keepAlive &&
        vnode.componentInstance &&
        vnode.componentInstance !== matched.instances[name]
      ) {
        matched.instances[name] = vnode.componentInstance;
      }
    };

    // resolve props
    var propsToPass = data.props = resolveProps(route, matched.props && matched.props[name]);
    if (propsToPass) {
      // clone to prevent mutation
      propsToPass = data.props = extend({}, propsToPass);
      // pass non-declared props as attrs
      var attrs = data.attrs = data.attrs || {};
      for (var key in propsToPass) {
        if (!component.props || !(key in component.props)) {
          attrs[key] = propsToPass[key];
          delete propsToPass[key];
        }
      }
    }

    return h(component, data, children)
  }
};

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      if (true) {
        warn(
          false,
          "props in \"" + (route.path) + "\" is a " + (typeof config) + ", " +
          "expecting an object, function or boolean."
        );
      }
  }
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery,
  _parseQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    "development" !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    parsedQuery[key] = extraQuery[key];
  }
  return parsedQuery
}

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null;
  return res ? ("?" + res) : ''
}

/*  */

var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom,
  router
) {
  var stringifyQuery = router && router.options.stringifyQuery;

  var query = location.query || {};
  try {
    query = clone(query);
  } catch (e) {}

  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery);
  }
  return Object.freeze(route)
}

function clone (value) {
  if (Array.isArray(value)) {
    return value.map(clone)
  } else if (value && typeof value === 'object') {
    var res = {};
    for (var key in value) {
      res[key] = clone(value[key]);
    }
    return res
  } else {
    return value
  }
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (
  ref,
  _stringifyQuery
) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  // handle null value #1566
  if (!a || !b) { return a === b }
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal)
    }
    return String(aVal) === String(bVal)
  })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}
pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

/*  */

// $flow-disable-line
var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  params = params || {};
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = pathToRegexp_1.compile(path));

    // Fix #2505 resolving asterisk routes { name: 'not-found', params: { pathMatch: '/not-found' }}
    if (params.pathMatch) { params[0] = params.pathMatch; }

    return filler(params, { pretty: true })
  } catch (e) {
    if (true) {
      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
    }
    return ''
  } finally {
    // delete the 0 if it was added
    delete params[0];
  }
}

/*  */

function normalizeLocation (
  raw,
  current,
  append,
  router
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next._normalized) {
    return next
  } else if (next.name) {
    return extend({}, raw)
  }

  // relative params
  if (!next.path && next.params && current) {
    next = extend({}, next);
    next._normalized = true;
    var params = extend(extend({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, ("path " + (current.path)));
    } else if (true) {
      warn(false, "relative params navigation requires a current route.");
    }
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : basePath;

  var query = resolveQuery(
    parsedPath.query,
    next.query,
    router && router.options.parseQuery
  );

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var noop = function () {};

var Link = {
  name: 'RouterLink',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(
      this.to,
      current,
      this.append
    );
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback =
      globalActiveClass == null ? 'router-link-active' : globalActiveClass;
    var exactActiveClassFallback =
      globalExactActiveClass == null
        ? 'router-link-exact-active'
        : globalExactActiveClass;
    var activeClass =
      this.activeClass == null ? activeClassFallback : this.activeClass;
    var exactActiveClass =
      this.exactActiveClass == null
        ? exactActiveClassFallback
        : this.exactActiveClass;

    var compareTarget = route.redirectedFrom
      ? createRoute(null, normalizeLocation(route.redirectedFrom), null, router)
      : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact
      ? classes[exactActiveClass]
      : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location, noop);
        } else {
          router.push(location, noop);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) {
        on[e] = handler;
      });
    } else {
      on[this.event] = handler;
    }

    var data = { class: classes };

    var scopedSlot =
      !this.$scopedSlots.$hasNormal &&
      this.$scopedSlots.default &&
      this.$scopedSlots.default({
        href: href,
        route: route,
        navigate: handler,
        isActive: classes[activeClass],
        isExactActive: classes[exactActiveClass]
      });

    if (scopedSlot) {
      if (scopedSlot.length === 1) {
        return scopedSlot[0]
      } else if (scopedSlot.length > 1 || !scopedSlot.length) {
        if (true) {
          warn(
            false,
            ("RouterLink with to=\"" + (this.props.to) + "\" is trying to use a scoped slot but it didn't provide exactly one child.")
          );
        }
        return scopedSlot.length === 0 ? h() : h('span', {}, scopedSlot)
      }
    }

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var aData = (a.data = extend({}, a.data));
        aData.on = aData.on || {};
        // transform existing events in both objects into arrays so we can push later
        for (var event in aData.on) {
          var handler$1 = aData.on[event];
          if (event in on) {
            aData.on[event] = Array.isArray(handler$1) ? handler$1 : [handler$1];
          }
        }
        // append new listeners for router-link
        for (var event$1 in on) {
          if (event$1 in aData.on) {
            // on[event] is always a function
            aData.on[event$1].push(on[event$1]);
          } else {
            aData.on[event$1] = handler;
          }
        }

        var aAttrs = (a.data.attrs = extend({}, a.data.attrs));
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
};

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function install (Vue) {
  if (install.installed && _Vue === Vue) { return }
  install.installed = true;

  _Vue = Vue;

  var isDef = function (v) { return v !== undefined; };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed () {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this._routerRoot._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this._routerRoot._route }
  });

  Vue.component('RouterView', View);
  Vue.component('RouterLink', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function createRouteMap (
  routes,
  oldPathList,
  oldPathMap,
  oldNameMap
) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  // $flow-disable-line
  var pathMap = oldPathMap || Object.create(null);
  // $flow-disable-line
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  if (true) {
    // warn if routes do not include leading slashes
    var found = pathList
    // check for missing leading slash
      .filter(function (path) { return path && path.charAt(0) !== '*' && path.charAt(0) !== '/'; });

    if (found.length > 0) {
      var pathNames = found.map(function (path) { return ("- " + path); }).join('\n');
      warn(false, ("Non-nested routes must include a leading slash character. Fix the following routes: \n" + pathNames));
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathList,
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (true) {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(
        path || name
      )) + " cannot be a " + "string id. Use an actual component instead."
    );
  }

  var pathToRegexpOptions =
    route.pathToRegexpOptions || {};
  var normalizedPath = normalizePath(path, parent, pathToRegexpOptions.strict);

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props:
      route.props == null
        ? {}
        : route.components
          ? route.props
          : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (true) {
      if (
        route.name &&
        !route.redirect &&
        route.children.some(function (child) { return /^\/?$/.test(child.path); })
      ) {
        warn(
          false,
          "Named Route '" + (route.name) + "' has a default child route. " +
            "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
            "the default child route will not be rendered. Remove the name from " +
            "this route and use the name of the default child route for named " +
            "links instead."
        );
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias) ? route.alias : [route.alias];
    for (var i = 0; i < aliases.length; ++i) {
      var alias = aliases[i];
      if ("development" !== 'production' && alias === path) {
        warn(
          false,
          ("Found an alias with the same value as the path: \"" + path + "\". You have to remove that alias. It will be ignored in development.")
        );
        // skip in dev to make it work
        continue
      }

      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/' // matchAs
      );
    }
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if ("development" !== 'production' && !matchAs) {
      warn(
        false,
        "Duplicate named routes definition: " +
          "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function compileRouteRegex (
  path,
  pathToRegexpOptions
) {
  var regex = pathToRegexp_1(path, [], pathToRegexpOptions);
  if (true) {
    var keys = Object.create(null);
    regex.keys.forEach(function (key) {
      warn(
        !keys[key.name],
        ("Duplicate param keys in route with path: \"" + path + "\"")
      );
      keys[key.name] = true;
    });
  }
  return regex
}

function normalizePath (
  path,
  parent,
  strict
) {
  if (!strict) { path = path.replace(/\/$/, ''); }
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

/*  */



function createMatcher (
  routes,
  router
) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (true) {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      if (!record) { return _createRoute(null, location) }
      var paramNames = record.regex.keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
      return _createRoute(record, location, redirectedFrom)
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
      ? originalRedirect(createRoute(record, location, null, router))
      : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      if (true) {
        warn(
          false, ("invalid redirect option: " + (JSON.stringify(redirect)))
        );
      }
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (true) {
        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      if (true) {
        warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      }
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom, router)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  regex,
  path,
  params
) {
  var m = path.match(regex);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      // Fix #1994: using * with props: true generates a param named 0
      params[key.name || 'pathMatch'] = val;
    }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */

// use User Timing api (if present) for more accurate key precision
var Time =
  inBrowser && window.performance && window.performance.now
    ? window.performance
    : Date;

function genStateKey () {
  return Time.now().toFixed(3)
}

var _key = genStateKey();

function getStateKey () {
  return _key
}

function setStateKey (key) {
  return (_key = key)
}

/*  */

var positionStore = Object.create(null);

function setupScroll () {
  // Fix for #1585 for Firefox
  // Fix for #2195 Add optional third attribute to workaround a bug in safari https://bugs.webkit.org/show_bug.cgi?id=182678
  // Fix for #2774 Support for apps loaded from Windows file shares not mapped to network drives: replaced location.origin with
  // window.location.protocol + '//' + window.location.host
  // location.host contains the port and location.hostname doesn't
  var protocolAndPath = window.location.protocol + '//' + window.location.host;
  var absolutePath = window.location.href.replace(protocolAndPath, '');
  window.history.replaceState({ key: getStateKey() }, '', absolutePath);
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  if (true) {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior.call(
      router,
      to,
      from,
      isPop ? position : null
    );

    if (!shouldScroll) {
      return
    }

    if (typeof shouldScroll.then === 'function') {
      shouldScroll
        .then(function (shouldScroll) {
          scrollToPosition((shouldScroll), position);
        })
        .catch(function (err) {
          if (true) {
            assert(false, err.toString());
          }
        });
    } else {
      scrollToPosition(shouldScroll, position);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function normalizeOffset (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

var hashStartsWithNumberRE = /^#\d/;

function scrollToPosition (shouldScroll, position) {
  var isObject = typeof shouldScroll === 'object';
  if (isObject && typeof shouldScroll.selector === 'string') {
    // getElementById would still fail if the selector contains a more complicated query like #main[data-attr]
    // but at the same time, it doesn't make much sense to select an element with an id and an extra selector
    var el = hashStartsWithNumberRE.test(shouldScroll.selector) // $flow-disable-line
      ? document.getElementById(shouldScroll.selector.slice(1)) // $flow-disable-line
      : document.querySelector(shouldScroll.selector);

    if (el) {
      var offset =
        shouldScroll.offset && typeof shouldScroll.offset === 'object'
          ? shouldScroll.offset
          : {};
      offset = normalizeOffset(offset);
      position = getElementPosition(el, offset);
    } else if (isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
  } else if (isObject && isValidPosition(shouldScroll)) {
    position = normalizePosition(shouldScroll);
  }

  if (position) {
    window.scrollTo(position.x, position.y);
  }
}

/*  */

var supportsPushState =
  inBrowser &&
  (function () {
    var ua = window.navigator.userAgent;

    if (
      (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
      ua.indexOf('Mobile Safari') !== -1 &&
      ua.indexOf('Chrome') === -1 &&
      ua.indexOf('Windows Phone') === -1
    ) {
      return false
    }

    return window.history && 'pushState' in window.history
  })();

function pushState (url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: getStateKey() }, '', url);
    } else {
      history.pushState({ key: setStateKey(genStateKey()) }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */

function resolveAsyncComponents (matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default;
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function'
            ? resolvedDef
            : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          "development" !== 'production' && warn(false, msg);
          if (!error) {
            error = isError(reason)
              ? reason
              : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) { next(); }
  }
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

var hasSymbol =
  typeof Symbol === 'function' &&
  typeof Symbol.toStringTag === 'symbol';

function isESModule (obj) {
  return obj.__esModule || (hasSymbol && obj[Symbol.toStringTag] === 'Module')
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once (fn) {
  var called = false;
  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (called) { return }
    called = true;
    return fn.apply(this, args)
  }
}

var NavigationDuplicated = /*@__PURE__*/(function (Error) {
  function NavigationDuplicated (normalizedLocation) {
    Error.call(this);
    this.name = this._name = 'NavigationDuplicated';
    // passing the message to super() doesn't seem to work in the transpiled version
    this.message = "Navigating to current location (\"" + (normalizedLocation.fullPath) + "\") is not allowed";
    // add a stack property so services like Sentry can correctly display it
    Object.defineProperty(this, 'stack', {
      value: new Error().stack,
      writable: true,
      configurable: true
    });
    // we could also have used
    // Error.captureStackTrace(this, this.constructor)
    // but it only exists on node and chrome
  }

  if ( Error ) NavigationDuplicated.__proto__ = Error;
  NavigationDuplicated.prototype = Object.create( Error && Error.prototype );
  NavigationDuplicated.prototype.constructor = NavigationDuplicated;

  return NavigationDuplicated;
}(Error));

// support IE9
NavigationDuplicated._name = 'NavigationDuplicated';

/*  */

var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError (errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo (
  location,
  onComplete,
  onAbort
) {
    var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(
    route,
    function () {
      this$1.updateRoute(route);
      onComplete && onComplete(route);
      this$1.ensureURL();

      // fire ready cbs once
      if (!this$1.ready) {
        this$1.ready = true;
        this$1.readyCbs.forEach(function (cb) {
          cb(route);
        });
      }
    },
    function (err) {
      if (onAbort) {
        onAbort(err);
      }
      if (err && !this$1.ready) {
        this$1.ready = true;
        this$1.readyErrorCbs.forEach(function (cb) {
          cb(err);
        });
      }
    }
  );
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function (err) {
    // after merging https://github.com/vuejs/vue-router/pull/2771 we
    // When the user navigates through history through back/forward buttons
    // we do not want to throw the error. We only throw it if directly calling
    // push/replace. That's why it's not included in isError
    if (!isExtendedError(NavigationDuplicated, err) && isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) {
          cb(err);
        });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    route.matched.length === current.matched.length
  ) {
    this.ensureURL();
    return abort(new NavigationDuplicated(route))
  }

  var ref = resolveQueue(
    this.current.matched,
    route.matched
  );
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort()
    }
    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (
          typeof to === 'string' ||
          (typeof to === 'object' &&
            (typeof to.path === 'string' || typeof to.name === 'string'))
        ) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();
          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) {
            cb();
          });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = (baseEl && baseEl.getAttribute('href')) || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  if (instance) {
    return function boundRouteGuard () {
      return guard.apply(instance, arguments)
    }
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(
    activated,
    'beforeRouteEnter',
    function (guard, _, match, key) {
      return bindEnterGuard(guard, match, key, cbs, isValid)
    }
  )
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
      next(cb);
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (
    instances[key] &&
    !instances[key]._isBeingDestroyed // do not reuse being destroyed instance
  ) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

/*  */

var HTML5History = /*@__PURE__*/(function (History) {
  function HTML5History (router, base) {
    var this$1 = this;

    History.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    var initLocation = getLocation(this.base);
    window.addEventListener('popstate', function (e) {
      var current = this$1.current;

      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      var location = getLocation(this$1.base);
      if (this$1.current === START && location === initLocation) {
        return
      }

      this$1.transitionTo(location, function (route) {
        if (supportsScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if ( History ) HTML5History.__proto__ = History;
  HTML5History.prototype = Object.create( History && History.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = decodeURI(window.location.pathname);
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */

var HashHistory = /*@__PURE__*/(function (History) {
  function HashHistory (router, base, fallback) {
    History.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History ) HashHistory.__proto__ = History;
  HashHistory.prototype = Object.create( History && History.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    window.addEventListener(
      supportsPushState ? 'popstate' : 'hashchange',
      function () {
        var current = this$1.current;
        if (!ensureSlash()) {
          return
        }
        this$1.transitionTo(getHash(), function (route) {
          if (supportsScroll) {
            handleScroll(this$1.router, route, current, true);
          }
          if (!supportsPushState) {
            replaceHash(route.fullPath);
          }
        });
      }
    );
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(
      location,
      function (route) {
        pushHash(route.fullPath);
        handleScroll(this$1.router, route, fromRoute, false);
        onComplete && onComplete(route);
      },
      onAbort
    );
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(
      location,
      function (route) {
        replaceHash(route.fullPath);
        handleScroll(this$1.router, route, fromRoute, false);
        onComplete && onComplete(route);
      },
      onAbort
    );
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(cleanPath(base + '/#' + location));
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  // empty path
  if (index < 0) { return '' }

  href = href.slice(index + 1);
  // decode the hash but not the search or hash
  // as search(query) is already decoded
  // https://github.com/vuejs/vue-router/issues/2708
  var searchIndex = href.indexOf('?');
  if (searchIndex < 0) {
    var hashIndex = href.indexOf('#');
    if (hashIndex > -1) {
      href = decodeURI(href.slice(0, hashIndex)) + href.slice(hashIndex);
    } else { href = decodeURI(href); }
  } else {
    if (searchIndex > -1) {
      href = decodeURI(href.slice(0, searchIndex)) + href.slice(searchIndex);
    }
  }

  return href
}

function getUrl (path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  return (base + "#" + path)
}

function pushHash (path) {
  if (supportsPushState) {
    pushState(getUrl(path));
  } else {
    window.location.hash = path;
  }
}

function replaceHash (path) {
  if (supportsPushState) {
    replaceState(getUrl(path));
  } else {
    window.location.replace(getUrl(path));
  }
}

/*  */

var AbstractHistory = /*@__PURE__*/(function (History) {
  function AbstractHistory (router, base) {
    History.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History ) AbstractHistory.__proto__ = History;
  AbstractHistory.prototype = Object.create( History && History.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(
      location,
      function (route) {
        this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
        this$1.index++;
        onComplete && onComplete(route);
      },
      onAbort
    );
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(
      location,
      function (route) {
        this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
        onComplete && onComplete(route);
      },
      onAbort
    );
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(
      route,
      function () {
        this$1.index = targetIndex;
        this$1.updateRoute(route);
      },
      function (err) {
        if (isExtendedError(NavigationDuplicated, err)) {
          this$1.index = targetIndex;
        }
      }
    );
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */



var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      if (true) {
        assert(false, ("invalid mode: " + mode));
      }
  }
};

var prototypeAccessors = { currentRoute: { configurable: true } };

VueRouter.prototype.match = function match (
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

  "development" !== 'production' && assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` " +
    "before creating root instance."
  );

  this.apps.push(app);

  // set up app destroyed handler
  // https://github.com/vuejs/vue-router/issues/2639
  app.$once('hook:destroyed', function () {
    // clean out app from this.apps array once destroyed
    var index = this$1.apps.indexOf(app);
    if (index > -1) { this$1.apps.splice(index, 1); }
    // ensure we still have a main app or null if no apps
    // we do not release the router so it can be reused
    if (this$1.app === app) { this$1.app = this$1.apps[0] || null; }
  });

  // main app previously initialized
  // return as we don't need to set up new history listener
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener,
      setupHashListener
    );
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  return registerHook(this.beforeHooks, fn)
};

VueRouter.prototype.beforeResolve = function beforeResolve (fn) {
  return registerHook(this.resolveHooks, fn)
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  return registerHook(this.afterHooks, fn)
};

VueRouter.prototype.onReady = function onReady (cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError (errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

  // $flow-disable-line
  if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
    return new Promise(function (resolve, reject) {
      this$1.history.push(location, resolve, reject);
    })
  } else {
    this.history.push(location, onComplete, onAbort);
  }
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

  // $flow-disable-line
  if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
    return new Promise(function (resolve, reject) {
      this$1.history.replace(location, resolve, reject);
    })
  } else {
    this.history.replace(location, onComplete, onAbort);
  }
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? to.matched
      ? to
      : this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  current = current || this.history.current;
  var location = normalizeLocation(
    to,
    current,
    append,
    this
  );
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

function registerHook (list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) { list.splice(i, 1); }
  }
}

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '3.1.3';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ __webpack_exports__["default"] = (VueRouter);


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* script */
__vue_exports__ = __webpack_require__(57)

/* template */
var __vue_template__ = __webpack_require__(166)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "D:\\Person\\Project\\Weex\\weex_deer\\src\\pages\\chart.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pie = __webpack_require__(58);

var _pie2 = _interopRequireDefault(_pie);

var _chart = __webpack_require__(161);

var _chart2 = _interopRequireDefault(_chart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

function randomScalingFactor() {
  return Math.round(Math.random() * 3000);
}
exports.default = {
  components: {
    pie: _pie2.default,
    chart: _chart2.default
  },
  data: function data() {
    return {
      pieData: [{
        percent: 10,
        a: 1,
        name: '食品'
      }, {
        percent: 40,
        a: 1,
        name: '饮料'
      }, {
        percent: 50,
        a: 1,
        name: '服装'
      }],
      chartData: [[{
        type: 'line',
        date: '2016-08-08 00:00:00',
        value: randomScalingFactor()
      }, {
        type: 'line',
        date: '2016-08-08 00:10:00',
        value: randomScalingFactor()
      }, {
        type: 'line',
        date: '2016-08-08 00:30:00',
        value: randomScalingFactor()
      }, {
        type: 'line',
        date: '2016-08-09 00:35:00',
        value: randomScalingFactor()
      }, {
        type: 'line',
        date: '2016-08-09 01:00:00',
        value: randomScalingFactor()
      }, {
        type: 'line',
        date: '2016-08-09 01:20:00',
        value: randomScalingFactor()
      }, {
        type: 'line',
        date: '2016-08-10 01:40:00',
        value: randomScalingFactor()
      }, {
        type: 'line',
        date: '2016-08-10 02:00:00',
        value: randomScalingFactor()
      }, {
        type: 'line',
        date: '2016-08-10 02:20:00',
        value: randomScalingFactor()
      }]],
      chartData2: [[{
        type: 'line',
        date: '2016-08-08 00:00:00',
        value: randomScalingFactor()
      }, {
        type: 'line',
        date: '2016-08-08 00:10:00',
        value: randomScalingFactor()
      }, {
        type: 'line',
        date: '2016-08-08 00:30:00',
        value: randomScalingFactor()
      }, {
        type: 'line',
        date: '2016-08-09 00:35:00',
        value: randomScalingFactor()
      }, {
        type: 'line',
        date: '2016-08-09 01:00:00',
        value: randomScalingFactor()
      }, {
        type: 'line',
        date: '2016-08-09 01:20:00',
        value: randomScalingFactor()
      }, {
        type: 'line',
        date: '2016-08-10 01:40:00',
        value: randomScalingFactor()
      }, {
        type: 'line',
        date: '2016-08-10 02:00:00',
        value: randomScalingFactor()
      }, {
        type: 'line',
        date: '2016-08-10 02:20:00',
        value: randomScalingFactor()
      }]],
      chartData3: [[{
        type: 'line',
        date: '2016-08-08 00:00:00',
        value: randomScalingFactor()
      }, {
        type: 'line',
        date: '2016-08-08 00:10:00',
        value: randomScalingFactor()
      }, {
        type: 'line',
        date: '2016-08-08 00:30:00',
        value: randomScalingFactor()
      }, {
        type: 'line',
        date: '2016-08-09 00:35:00',
        value: randomScalingFactor()
      }, {
        type: 'line',
        date: '2016-08-09 01:00:00',
        value: randomScalingFactor()
      }, {
        type: 'line',
        date: '2016-08-09 01:20:00',
        value: randomScalingFactor()
      }, {
        type: 'line',
        date: '2016-08-10 01:40:00',
        value: randomScalingFactor()
      }, {
        type: 'line',
        date: '2016-08-10 02:00:00',
        value: randomScalingFactor()
      }, {
        type: 'line',
        date: '2016-08-10 02:20:00',
        value: randomScalingFactor()
      }]]
    };
  }
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* script */
__vue_exports__ = __webpack_require__(59)

/* template */
var __vue_template__ = __webpack_require__(160)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "D:\\Person\\Project\\Weex\\weex_deer\\src\\components\\chart\\pie.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _gcanvas = __webpack_require__(27);

var _f = __webpack_require__(28);

var _f2 = _interopRequireDefault(_f);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    width: {
      default: 750
    },
    height: {
      default: 524
    },
    backgroundColor: {
      type: String,
      default: "#ffffff"
    },
    animation: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: "pie"
    },
    data: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    ringWidth: {
      default: 0.5
    },
    colors: {
      type: Array,
      default: function _default() {
        return ["#68AEFF", "#0075E5", "#FFB73F", "#FF596D", "#DC143C"];
      }
    }
  },
  data: function data() {
    return {
      chart: null
    };
  },

  watch: {
    data: function data() {
      this.renderChart(this.data);
    }
  },
  mounted: function mounted() {
    this.renderChart(this.data);
  },

  methods: {
    renderChart: function renderChart(chartData) {
      if (!this.chart) this.initChart(chartData);else this.chart.changeData(chartData);
    },
    initChart: function initChart(chartData) {
      var that = this;
      // Step 1: 创建 Chart 对象
      if (weex.config.env.platform != "Web") {
        var ref = this.$refs.canvas_holder;
        ref = (0, _gcanvas.enable)(ref, { bridge: _gcanvas.WeexBridge });
        var ctx = ref.getContext("2d");
        var canvas = new _f2.default.Renderer(ctx);
        this.canvas = canvas;
        this.chart = new _f2.default.Chart({
          el: canvas, // 将第三步创建的 canvas 对象的上下文传入
          width: this.width, // 必选，图表宽度，同 canvas 的宽度相同
          height: this.height, // 必选，图表高度，同 canvas 的高度相同
          animate: false
        });
      } else {
        this.chart = new _f2.default.Chart({
          id: "pieChart",
          pixelRatio: window.devicePixelRatio // 指定分辨率
        });
      }
      var chart = this.chart;
      this.register();
      this.renderPie(chart);
      // chart.animate(this.animation)
      // chart.source(chartData, {
      //   percent: {
      //     formatter: function formatter(val) {
      //       return val + '%';
      //     }
      //   }
      // });
      // chart.tooltip(false);
      // chart.legend(false);
      // chart.coord('polar', {
      //   transposed: true,
      //   innerRadius: 0.4,
      //   radius: 0.75
      // });
      // chart.axis(false);
      // chart.interval().position('a*percent').color('name', this.colors).adjust('stack');

      // chart.render();
      // // 绘制内阴影
      // var frontPlot = chart.get('frontPlot');
      // var coord = chart.get('coord'); // 获取坐标系对象
      // frontPlot.addShape('sector', {
      //   attrs: {
      //     x: coord.center.x,
      //     y: coord.center.y,
      //     r: coord.circleRadius * coord.innerRadius * 1.2, // 全半径
      //     r0: coord.circleRadius * coord.innerRadius,
      //     fill: '#000',
      //     opacity: 0.15
      //   }
      // });
      // chart.get('canvas').draw();
    },
    renderPie: function renderPie(chart) {
      var data = [{
        amount: 20,
        ratio: 0.1,
        memo: "学习",
        const: "const"
      }, {
        amount: 100,
        ratio: 0.1,
        memo: "睡觉1",
        const: "const"
      }, {
        amount: 100,
        ratio: 0.1,
        memo: "睡觉2",
        const: "const"
      }, {
        amount: 100,
        ratio: 0.13,
        memo: "睡觉3",
        const: "const"
      }, {
        amount: 100,
        ratio: 0.12,
        memo: "娱乐",
        const: "const"
      }, {
        amount: 100,
        ratio: 0.15,
        memo: "看电影",
        const: "const"
      }, {
        amount: 100,
        ratio: 0.1,
        memo: "写作业",
        const: "const"
      }, {
        amount: 10,
        ratio: 0.05,
        memo: "吃饭",
        const: "const"
      }, {
        amount: 30,
        ratio: 0.1,
        memo: "讲礼貌",
        const: "const"
      }, {
        amount: 10,
        ratio: 0.05,
        memo: "看电视",
        const: "const"
      }, {
        amount: 10,
        ratio: 0.05,
        memo: "其他",
        const: "const"
      }];

      chart.source(data);
      chart.coord("polar", {
        transposed: true,
        innerRadius: 0.55,
        radius: 0.75
      });
      chart.axis(false);
      chart.legend(false);
      // chart.legend({
      //   position: 'right',
      //   marker: 'square',
      //   itemFormatter: function itemFormatter(val) {
      //     return val;
      //   }
      // });
      chart.tooltip(false);
      // chart.guide(false)
      var isWeb = weex.config.env.platform === "Web";
      chart.guide().text({
        position: ["50%", "50%"],
        content: "待配货\n1254件",
        style: {
          fontSize: isWeb ? 16 : 28,
          textAlign: "center",
          textBaseLine: "middle"
        }
      });
      // 配置文本饼图
      // chart.pieLabel({
      //   sidePadding: 75,
      //   label1: function label1(data) {
      //     return {
      //       text: data.memo,
      //       fill: '#808080'
      //     };
      //   },
      //   label2: function label2(data) {
      //     return {
      //       fill: '#000000',
      //       text: '$' + data.amount.toFixed(2),
      //       fontWeight: 500,
      //       fontSize: 10
      //     };
      //   }
      // });
      chart.interval().position("const*ratio").color("memo", ["#A0E65C", "#7087FA", "#FAAF64", "#A9DAF2", "#FFD147", "#CCCCCC", "#FA6464", "#FA64AE", "#DA61F2", "#A364FA", "#5CE6A1"]).adjust("stack").shape("pie-with-icon");
      chart.render();

      // 绘制内阴影
      var frontPlot = chart.get("frontPlot");
      var coord = chart.get("coord"); // 获取坐标系对象
      frontPlot.addShape("sector", {
        attrs: {
          x: coord.center.x,
          y: coord.center.y,
          r: coord.circleRadius * coord.innerRadius * 1.1, // 全半径
          r0: coord.circleRadius * coord.innerRadius,
          fill: "#fff",
          opacity: 0.4
        }
      });
      frontPlot.addShape("sector", {
        attrs: {
          x: coord.center.x,
          y: coord.center.y,
          r: coord.circleRadius * coord.innerRadius * 1.84, // 全半径
          r0: coord.circleRadius * coord.innerRadius * 1.74,
          fill: "#fff",
          opacity: 0.8
        }
      });
      // container.addShape('text', {
      //   attrs: {
      //     x: numbricCenter.x,
      //     y: numbricCenter.y,
      //     textAlign: 'center',
      //     textBaseline: 'middle',
      //     fontSize: 28,
      //     text: '21%', // cfg.origin._origin.percent,
      //     fill: '#fff',
      //     fontWeight: '400'
      //   }
      // });
      chart.get("canvas").draw();
    },
    register: function register() {
      // 根据角度和圆心求坐标
      function _getEndPoint(center, angle, r) {
        return {
          x: center.x + r * Math.cos(angle),
          y: center.y + r * Math.sin(angle)
        };
      }
      var _F = _f2.default,
          Shape = _F.Shape,
          Util = _F.Util,
          G = _F.G;
      var Vector2 = G.Vector2;
      var fontSize = weex.config.env.platform === "Web" ? 12 : 24;
      Shape.registerShape("interval", "pie-with-icon", {
        draw: function draw(cfg, container) {
          var points = this.parsePoints(cfg.points);
          var style = Util.mix({
            fill: cfg.color
          }, cfg.style);
          var coord = this._coord;
          if (cfg.isInCircle && coord.transposed) {
            // 只处理极坐标y
            var newPoints = [points[0], points[3], points[2], points[1]];

            var _cfg$center = cfg.center,
                x = _cfg$center.x,
                y = _cfg$center.y;

            var v = [1, 0];
            var v0 = [newPoints[0].x - x, newPoints[0].y - y];
            var v1 = [newPoints[1].x - x, newPoints[1].y - y];
            var v2 = [newPoints[2].x - x, newPoints[2].y - y];

            var startAngle = Vector2.angleTo(v, v1);
            var endAngle = Vector2.angleTo(v, v2);
            var r0 = Vector2.length(v0);
            var r = Vector2.length(v1);

            if (startAngle >= 1.5 * Math.PI) {
              startAngle = startAngle - 2 * Math.PI;
            }

            if (endAngle >= 1.5 * Math.PI) {
              endAngle = endAngle - 2 * Math.PI;
            }

            var middleAngle = (startAngle + endAngle) / 2;
            var numbricCenter = _getEndPoint(cfg.center, middleAngle, (r + r0) / 2);

            var sector = container.addShape("Sector", {
              className: "interval",
              attrs: Util.mix({
                x: x,
                y: y,
                r: r,
                r0: r0,
                startAngle: startAngle,
                endAngle: endAngle
              }, style)
            });

            var sectorBBox = sector.getBBox();
            if (sectorBBox.width >= fontSize && sectorBBox.height >= fontSize) {
              // 确定扇形部分可以放下 iconfont
              var text = container.addShape("text", {
                attrs: {
                  x: numbricCenter.x,
                  y: numbricCenter.y,
                  fontFamily: "charts-icon",
                  textAlign: "center",
                  textBaseline: "middle",
                  fontSize: fontSize,
                  text: (cfg.origin._origin.ratio * 100).toFixed(0) + "%",
                  fill: "#fff",
                  fontWeight: "400"
                }
              });

              return [sector, text];
            }
            return sector;
          }
        }
      });
    }
  }
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wolfy87Eventemitter = __webpack_require__(61);

var _wolfy87Eventemitter2 = _interopRequireDefault(_wolfy87Eventemitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Renderer = function (_EventEmitter) {
  _inherits(Renderer, _EventEmitter);

  function Renderer(myCtx) {
    _classCallCheck(this, Renderer);

    var _this = _possibleConstructorReturn(this, (Renderer.__proto__ || Object.getPrototypeOf(Renderer)).call(this));

    var self = _this;
    self.ctx = myCtx;
    self.style = {}; // just mock
    // self._initContext(myCtx);
    return _this;
  }

  _createClass(Renderer, [{
    key: 'getContext',
    value: function getContext(type) {
      if (type === '2d') {
        return this.ctx;
      }
    }
  }]);

  return Renderer;
}(_wolfy87Eventemitter2.default);

exports.default = Renderer;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * EventEmitter v5.2.8 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - https://oli.me.uk/
 * @preserve
 */

;(function (exports) {
    'use strict';

    /**
     * Class for managing events.
     * Can be extended to provide event functionality in other classes.
     *
     * @class EventEmitter Manages event registering and emitting.
     */
    function EventEmitter() {}

    // Shortcuts to improve speed and size
    var proto = EventEmitter.prototype;
    var originalGlobalValue = exports.EventEmitter;

    /**
     * Finds the index of the listener for the event in its storage array.
     *
     * @param {Function[]} listeners Array of listeners to search through.
     * @param {Function} listener Method to look for.
     * @return {Number} Index of the specified listener, -1 if not found
     * @api private
     */
    function indexOfListener(listeners, listener) {
        var i = listeners.length;
        while (i--) {
            if (listeners[i].listener === listener) {
                return i;
            }
        }

        return -1;
    }

    /**
     * Alias a method while keeping the context correct, to allow for overwriting of target method.
     *
     * @param {String} name The name of the target method.
     * @return {Function} The aliased method
     * @api private
     */
    function alias(name) {
        return function aliasClosure() {
            return this[name].apply(this, arguments);
        };
    }

    /**
     * Returns the listener array for the specified event.
     * Will initialise the event object and listener arrays if required.
     * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
     * Each property in the object response is an array of listener functions.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Function[]|Object} All listener functions for the event.
     */
    proto.getListeners = function getListeners(evt) {
        var events = this._getEvents();
        var response;
        var key;

        // Return a concatenated array of all matching events if
        // the selector is a regular expression.
        if (evt instanceof RegExp) {
            response = {};
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    response[key] = events[key];
                }
            }
        }
        else {
            response = events[evt] || (events[evt] = []);
        }

        return response;
    };

    /**
     * Takes a list of listener objects and flattens it into a list of listener functions.
     *
     * @param {Object[]} listeners Raw listener objects.
     * @return {Function[]} Just the listener functions.
     */
    proto.flattenListeners = function flattenListeners(listeners) {
        var flatListeners = [];
        var i;

        for (i = 0; i < listeners.length; i += 1) {
            flatListeners.push(listeners[i].listener);
        }

        return flatListeners;
    };

    /**
     * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Object} All listener functions for an event in an object.
     */
    proto.getListenersAsObject = function getListenersAsObject(evt) {
        var listeners = this.getListeners(evt);
        var response;

        if (listeners instanceof Array) {
            response = {};
            response[evt] = listeners;
        }

        return response || listeners;
    };

    function isValidListener (listener) {
        if (typeof listener === 'function' || listener instanceof RegExp) {
            return true
        } else if (listener && typeof listener === 'object') {
            return isValidListener(listener.listener)
        } else {
            return false
        }
    }

    /**
     * Adds a listener function to the specified event.
     * The listener will not be added if it is a duplicate.
     * If the listener returns true then it will be removed after it is called.
     * If you pass a regular expression as the event name then the listener will be added to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListener = function addListener(evt, listener) {
        if (!isValidListener(listener)) {
            throw new TypeError('listener must be a function');
        }

        var listeners = this.getListenersAsObject(evt);
        var listenerIsWrapped = typeof listener === 'object';
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
                listeners[key].push(listenerIsWrapped ? listener : {
                    listener: listener,
                    once: false
                });
            }
        }

        return this;
    };

    /**
     * Alias of addListener
     */
    proto.on = alias('addListener');

    /**
     * Semi-alias of addListener. It will add a listener that will be
     * automatically removed after its first execution.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addOnceListener = function addOnceListener(evt, listener) {
        return this.addListener(evt, {
            listener: listener,
            once: true
        });
    };

    /**
     * Alias of addOnceListener.
     */
    proto.once = alias('addOnceListener');

    /**
     * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
     * You need to tell it what event names should be matched by a regex.
     *
     * @param {String} evt Name of the event to create.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvent = function defineEvent(evt) {
        this.getListeners(evt);
        return this;
    };

    /**
     * Uses defineEvent to define multiple events.
     *
     * @param {String[]} evts An array of event names to define.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvents = function defineEvents(evts) {
        for (var i = 0; i < evts.length; i += 1) {
            this.defineEvent(evts[i]);
        }
        return this;
    };

    /**
     * Removes a listener function from the specified event.
     * When passed a regular expression as the event name, it will remove the listener from all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to remove the listener from.
     * @param {Function} listener Method to remove from the event.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListener = function removeListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var index;
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                index = indexOfListener(listeners[key], listener);

                if (index !== -1) {
                    listeners[key].splice(index, 1);
                }
            }
        }

        return this;
    };

    /**
     * Alias of removeListener
     */
    proto.off = alias('removeListener');

    /**
     * Adds listeners in bulk using the manipulateListeners method.
     * If you pass an object as the first argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
     * You can also pass it a regular expression to add the array of listeners to all events that match it.
     * Yeah, this function does quite a bit. That's probably a bad thing.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListeners = function addListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(false, evt, listeners);
    };

    /**
     * Removes listeners in bulk using the manipulateListeners method.
     * If you pass an object as the first argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be removed.
     * You can also pass it a regular expression to remove the listeners from all events that match it.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListeners = function removeListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(true, evt, listeners);
    };

    /**
     * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
     * The first argument will determine if the listeners are removed (true) or added (false).
     * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be added/removed.
     * You can also pass it a regular expression to manipulate the listeners of all events that match it.
     *
     * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
        var i;
        var value;
        var single = remove ? this.removeListener : this.addListener;
        var multiple = remove ? this.removeListeners : this.addListeners;

        // If evt is an object then pass each of its properties to this method
        if (typeof evt === 'object' && !(evt instanceof RegExp)) {
            for (i in evt) {
                if (evt.hasOwnProperty(i) && (value = evt[i])) {
                    // Pass the single listener straight through to the singular method
                    if (typeof value === 'function') {
                        single.call(this, i, value);
                    }
                    else {
                        // Otherwise pass back to the multiple function
                        multiple.call(this, i, value);
                    }
                }
            }
        }
        else {
            // So evt must be a string
            // And listeners must be an array of listeners
            // Loop over it and pass each one to the multiple method
            i = listeners.length;
            while (i--) {
                single.call(this, evt, listeners[i]);
            }
        }

        return this;
    };

    /**
     * Removes all listeners from a specified event.
     * If you do not specify an event then all listeners will be removed.
     * That means every event will be emptied.
     * You can also pass a regex to remove all events that match it.
     *
     * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeEvent = function removeEvent(evt) {
        var type = typeof evt;
        var events = this._getEvents();
        var key;

        // Remove different things depending on the state of evt
        if (type === 'string') {
            // Remove all listeners for the specified event
            delete events[evt];
        }
        else if (evt instanceof RegExp) {
            // Remove all events matching the regex.
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    delete events[key];
                }
            }
        }
        else {
            // Remove all listeners in all events
            delete this._events;
        }

        return this;
    };

    /**
     * Alias of removeEvent.
     *
     * Added to mirror the node API.
     */
    proto.removeAllListeners = alias('removeEvent');

    /**
     * Emits an event of your choice.
     * When emitted, every listener attached to that event will be executed.
     * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
     * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
     * So they will not arrive within the array on the other side, they will be separate.
     * You can also pass a regular expression to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {Array} [args] Optional array of arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emitEvent = function emitEvent(evt, args) {
        var listenersMap = this.getListenersAsObject(evt);
        var listeners;
        var listener;
        var i;
        var key;
        var response;

        for (key in listenersMap) {
            if (listenersMap.hasOwnProperty(key)) {
                listeners = listenersMap[key].slice(0);

                for (i = 0; i < listeners.length; i++) {
                    // If the listener returns true then it shall be removed from the event
                    // The function is executed either with a basic call or an apply if there is an args array
                    listener = listeners[i];

                    if (listener.once === true) {
                        this.removeListener(evt, listener.listener);
                    }

                    response = listener.listener.apply(this, args || []);

                    if (response === this._getOnceReturnValue()) {
                        this.removeListener(evt, listener.listener);
                    }
                }
            }
        }

        return this;
    };

    /**
     * Alias of emitEvent
     */
    proto.trigger = alias('emitEvent');

    /**
     * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
     * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {...*} Optional additional arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emit = function emit(evt) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(evt, args);
    };

    /**
     * Sets the current value to check against when executing listeners. If a
     * listeners return value matches the one set here then it will be removed
     * after execution. This value defaults to true.
     *
     * @param {*} value The new value to check for when executing listeners.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.setOnceReturnValue = function setOnceReturnValue(value) {
        this._onceReturnValue = value;
        return this;
    };

    /**
     * Fetches the current value to check against when executing listeners. If
     * the listeners return value matches this one then it should be removed
     * automatically. It will return true by default.
     *
     * @return {*|Boolean} The current value to check for or the default, true.
     * @api private
     */
    proto._getOnceReturnValue = function _getOnceReturnValue() {
        if (this.hasOwnProperty('_onceReturnValue')) {
            return this._onceReturnValue;
        }
        else {
            return true;
        }
    };

    /**
     * Fetches the events object and creates one if required.
     *
     * @return {Object} The events storage object.
     * @api private
     */
    proto._getEvents = function _getEvents() {
        return this._events || (this._events = {});
    };

    /**
     * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
     *
     * @return {Function} Non conflicting EventEmitter class.
     */
    EventEmitter.noConflict = function noConflict() {
        exports.EventEmitter = originalGlobalValue;
        return EventEmitter;
    };

    // Expose the class either via AMD, CommonJS or the global object
    if (true) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
            return EventEmitter;
        }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
    else if (typeof module === 'object' && module.exports){
        module.exports = EventEmitter;
    }
    else {
        exports.EventEmitter = EventEmitter;
    }
}(typeof window !== 'undefined' ? window : this || {}));


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Default, without interactins
 */
var F2 = __webpack_require__(63);

__webpack_require__(114);

__webpack_require__(126);

__webpack_require__(135); // polar coordinate


__webpack_require__(136); // the axis for polar coordinate


__webpack_require__(137); // timeCat scale


__webpack_require__(142);

__webpack_require__(143);

__webpack_require__(144);

__webpack_require__(145);

__webpack_require__(146);

__webpack_require__(147);

__webpack_require__(148);

var Tooltip = __webpack_require__(149);

var Guide = __webpack_require__(152);

var Legend = __webpack_require__(153);

var Animation = __webpack_require__(154);

F2.Animate = __webpack_require__(51); // register plugins

F2.Chart.plugins.register([Tooltip, Legend, Guide, Animation]);
module.exports = F2;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var Core = {};

var Global = __webpack_require__(1);

Core.Global = Global;
Core.version = Global.version;
Core.Chart = __webpack_require__(34);
Core.Shape = __webpack_require__(5);
Core.G = __webpack_require__(4);
Core.Util = __webpack_require__(0); // Core.track = function(enable) {
//   Global.trackable = enable;
// };
// require('./track');
// 2018-12-27 关闭打点

Core.track = function () {
  return null;
};

module.exports = Core;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview default theme
 * @author dxq613@gail.com
 */
var Util = __webpack_require__(0);

var color1 = '#E8E8E8'; // color of axis-line and axis-grid

var color2 = '#808080'; // color of axis label

var defaultAxis = {
  label: {
    fill: color2,
    fontSize: 10
  },
  line: {
    stroke: color1,
    lineWidth: 1
  },
  grid: {
    type: 'line',
    stroke: color1,
    lineWidth: 1,
    lineDash: [2]
  },
  tickLine: null,
  labelOffset: 7.5
};
var Theme = {
  fontFamily: '"Helvetica Neue", "San Francisco", Helvetica, Tahoma, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", sans-serif',
  defaultColor: '#1890FF',
  pixelRatio: 1,
  padding: 'auto',
  appendPadding: 15,
  colors: ['#1890FF', '#2FC25B', '#FACC14', '#223273', '#8543E0', '#13C2C2', '#3436C7', '#F04864'],
  shapes: {
    line: ['line', 'dash'],
    point: ['circle', 'hollowCircle']
  },
  sizes: [4, 10],
  axis: {
    common: defaultAxis,
    // common axis configuration
    bottom: Util.mix({}, defaultAxis, {
      grid: null
    }),
    left: Util.mix({}, defaultAxis, {
      line: null
    }),
    right: Util.mix({}, defaultAxis, {
      line: null
    }),
    circle: Util.mix({}, defaultAxis, {
      line: null
    }),
    radius: Util.mix({}, defaultAxis, {
      labelOffset: 4
    })
  },
  shape: {
    line: {
      lineWidth: 2,
      lineJoin: 'round',
      lineCap: 'round'
    },
    point: {
      lineWidth: 0,
      size: 3
    },
    area: {
      fillOpacity: 0.1
    }
  },
  _defaultAxis: defaultAxis
};
module.exports = Theme;

/***/ }),
/* 65 */
/***/ (function(module, exports) {

var DomUtil;
/**
 * Detects support for options object argument in addEventListener.
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
 * @private
 */

var supportsEventListenerOptions = function () {
  var supports = false;

  try {
    var options = Object.defineProperty({}, 'passive', {
      get: function get() {
        supports = true;
      }
    });
    window.addEventListener('e', null, options);
  } catch (e) {// continue regardless of error
  }

  return supports;
}(); // Default passive to true as expected by Chrome for 'touchstart' and 'touchend' events.
// https://github.com/chartjs/Chart.js/issues/4287


var eventListenerOptions = supportsEventListenerOptions ? {
  passive: true
} : false;

function createEvent(type, chart, x, y, nativeEvent) {
  return {
    type: type,
    chart: chart,
    "native": nativeEvent || null,
    x: x !== undefined ? x : null,
    y: y !== undefined ? y : null
  };
}

function fromNativeEvent(event, chart) {
  var type = event.type;
  var point = {};
  var touches = event.targetTouches;

  if (touches && touches.length > 0) {
    point.x = touches[0].clientX;
    point.y = touches[0].clientY;
  } else {
    point.x = event.clientX;
    point.y = event.clientY;
  }

  var canvas = chart.get('canvas');
  var pos = DomUtil.getRelativePosition(point, canvas);
  return createEvent(type, chart, pos.x, pos.y, event);
}

DomUtil = {
  /* global wx, my, module */
  isWx: typeof wx === 'object' && typeof wx.getSystemInfoSync === 'function',
  // weixin miniprogram
  isMy: typeof my === 'object' && typeof my.getSystemInfoSync === 'function',
  // ant miniprogram
  isNode: typeof module !== 'undefined' && typeof module.exports !== 'undefined',
  // in node
  isBrowser: typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.sessionStorage !== 'undefined',
  // in browser
  getPixelRatio: function getPixelRatio() {
    return window && window.devicePixelRatio || 1;
  },
  getStyle: function getStyle(el, property) {
    return el.currentStyle ? el.currentStyle[property] : document.defaultView.getComputedStyle(el, null).getPropertyValue(property);
  },
  getWidth: function getWidth(el) {
    var width = this.getStyle(el, 'width');

    if (width === 'auto') {
      width = el.offsetWidth;
    }

    return parseFloat(width);
  },
  getHeight: function getHeight(el) {
    var height = this.getStyle(el, 'height');

    if (height === 'auto') {
      height = el.offsetHeight;
    }

    return parseFloat(height);
  },
  getDomById: function getDomById(id) {
    if (!id) {
      return null;
    }

    return document.getElementById(id);
  },
  getRelativePosition: function getRelativePosition(point, canvas) {
    var canvasDom = canvas.get('el');

    var _canvasDom$getBoundin = canvasDom.getBoundingClientRect(),
        top = _canvasDom$getBoundin.top,
        right = _canvasDom$getBoundin.right,
        bottom = _canvasDom$getBoundin.bottom,
        left = _canvasDom$getBoundin.left;

    var paddingLeft = parseFloat(this.getStyle(canvasDom, 'padding-left'));
    var paddingTop = parseFloat(this.getStyle(canvasDom, 'padding-top'));
    var paddingRight = parseFloat(this.getStyle(canvasDom, 'padding-right'));
    var paddingBottom = parseFloat(this.getStyle(canvasDom, 'padding-bottom'));
    var width = right - left - paddingLeft - paddingRight;
    var height = bottom - top - paddingTop - paddingBottom;
    var pixelRatio = canvas.get('pixelRatio');
    var mouseX = (point.x - left - paddingLeft) / width * canvasDom.width / pixelRatio;
    var mouseY = (point.y - top - paddingTop) / height * canvasDom.height / pixelRatio;
    return {
      x: mouseX,
      y: mouseY
    };
  },
  addEventListener: function addEventListener(source, type, listener) {
    DomUtil.isBrowser && source.addEventListener(type, listener, eventListenerOptions);
  },
  removeEventListener: function removeEventListener(source, type, listener) {
    DomUtil.isBrowser && source.removeEventListener(type, listener, eventListenerOptions);
  },
  createEvent: function createEvent(event, chart) {
    return fromNativeEvent(event, chart);
  },
  measureText: function measureText(text, font, ctx) {
    if (!ctx) {
      ctx = document.createElement('canvas').getContext('2d');
    }

    ctx.font = font || '12px sans-serif';
    return ctx.measureText(text);
  }
};
module.exports = DomUtil;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var toString = __webpack_require__(29);

var upperFirst = function upperFirst(value) {
  var str = toString(value);
  return str.charAt(0).toUpperCase() + str.substring(1);
};

module.exports = upperFirst;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var toString = __webpack_require__(29);

var lowerFirst = function lowerFirst(value) {
  var str = toString(value);
  return str.charAt(0).toLowerCase() + str.substring(1);
};

module.exports = lowerFirst;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var isType = __webpack_require__(8);

var isString = function isString(str) {
  return isType(str, 'String');
};

module.exports = isString;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * 判断是否数字
 * @return {Boolean} 是否数字
 */
var isType = __webpack_require__(8);

var isNumber = function isNumber(value) {
  return isType(value, 'Number');
};
module.exports = isNumber;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * 是否是布尔类型
 *
 * @param {Object} value 测试的值
 * @return {Boolean}
 */
var isType = __webpack_require__(8);

var isBoolean = function isBoolean(value) {
  return isType(value, 'Boolean');
};

module.exports = isBoolean;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * 是否为函数
 * @param  {*} fn 对象
 * @return {Boolean}  是否函数
 */
var isType = __webpack_require__(8);

var isFunction = function isFunction(value) {
  return isType(value, 'Function');
};

module.exports = isFunction;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var isType = __webpack_require__(8);

var isDate = function isDate(value) {
  return isType(value, 'Date');
};

module.exports = isDate;

/***/ }),
/* 73 */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isObjectLike = function isObjectLike(value) {
  /**
   * isObjectLike({}) => true
   * isObjectLike([1, 2, 3]) => true
   * isObjectLike(Function) => false
   * isObjectLike(null) => false
   */
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null;
};

module.exports = isObjectLike;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var isPlainObject = __webpack_require__(32);
var isArray = __webpack_require__(16);

var MAX_MIX_LEVEL = 5;

function _deepMix(dist, src, level, maxLevel) {
  level = level || 0;
  maxLevel = maxLevel || MAX_MIX_LEVEL;
  for (var key in src) {
    if (src.hasOwnProperty(key)) {
      var value = src[key];
      if (value !== null && isPlainObject(value)) {
        if (!isPlainObject(dist[key])) {
          dist[key] = {};
        }
        if (level < maxLevel) {
          _deepMix(dist[key], value, level + 1, maxLevel);
        } else {
          dist[key] = src[key];
        }
      } else if (isArray(value)) {
        dist[key] = [];
        dist[key] = dist[key].concat(value);
      } else if (value !== undefined) {
        dist[key] = value;
      }
    }
  }
}

var deepMix = function deepMix() {
  var args = new Array(arguments.length);
  var length = args.length;
  for (var i = 0; i < length; i++) {
    args[i] = arguments[i];
  }
  var rst = args[0];
  for (var _i = 1; _i < length; _i++) {
    _deepMix(rst, args[_i]);
  }
  return rst;
};

module.exports = deepMix;

/***/ }),
/* 75 */
/***/ (function(module, exports) {

function _mix(dist, obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key) && key !== 'constructor' && obj[key] !== undefined) {
      dist[key] = obj[key];
    }
  }
}

var mix = function mix(dist, src1, src2, src3) {
  if (src1) _mix(dist, src1);
  if (src2) _mix(dist, src2);
  if (src3) _mix(dist, src3);
  return dist;
};

module.exports = mix;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var each = __webpack_require__(33);
var contains = __webpack_require__(77);

var uniq = function uniq(arr) {
  var resultArr = [];
  each(arr, function (item) {
    if (!contains(resultArr, item)) {
      resultArr.push(item);
    }
  });
  return resultArr;
};

module.exports = uniq;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var isArrayLike = __webpack_require__(78);

var indexOf = Array.prototype.indexOf;

var contains = function contains(arr, value) {
  if (!isArrayLike(arr)) {
    return false;
  }
  return indexOf.call(arr, value) > -1;
};

module.exports = contains;

/***/ }),
/* 78 */
/***/ (function(module, exports) {

var isArrayLike = function isArrayLike(value) {
  /**
   * isArrayLike([1, 2, 3]) => true
   * isArrayLike(document.body.children) => true
   * isArrayLike('abc') => true
   * isArrayLike(Function) => false
   */
  return value !== null && typeof value !== 'function' && isFinite(value.length);
};

module.exports = isArrayLike;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(0);

var Plot =
/*#__PURE__*/
function () {
  function Plot(cfg) {
    Util.mix(this, cfg);

    this._init();
  }

  var _proto = Plot.prototype;

  _proto._init = function _init() {
    var self = this;
    var start = self.start;
    var end = self.end;
    var xMin = Math.min(start.x, end.x);
    var xMax = Math.max(start.x, end.x);
    var yMin = Math.min(start.y, end.y);
    var yMax = Math.max(start.y, end.y);
    this.tl = {
      x: xMin,
      y: yMin
    };
    this.tr = {
      x: xMax,
      y: yMin
    };
    this.bl = {
      x: xMin,
      y: yMax
    };
    this.br = {
      x: xMax,
      y: yMax
    };
    this.width = xMax - xMin;
    this.height = yMax - yMin;
  }
  /**
   * reset
   * @param  {Object} start start point
   * @param  {Object} end end point
   */
  ;

  _proto.reset = function reset(start, end) {
    this.start = start;
    this.end = end;

    this._init();
  }
  /**
   * check the point is in the range of plot
   * @param  {Nubmer}  x x value
   * @param  {[type]}  y y value
   * @return {Boolean} return the result
   */
  ;

  _proto.isInRange = function isInRange(x, y) {
    if (Util.isObject(x)) {
      y = x.y;
      x = x.x;
    }

    var tl = this.tl;
    var br = this.br;
    return tl.x <= x && x <= br.x && tl.y <= y && y <= br.y;
  };

  return Plot;
}();

module.exports = Plot;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var Coord = __webpack_require__(17);

__webpack_require__(81);

module.exports = Coord;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Base = __webpack_require__(17);

var Cartesian =
/*#__PURE__*/
function (_Base) {
  _inheritsLoose(Cartesian, _Base);

  function Cartesian() {
    return _Base.apply(this, arguments) || this;
  }

  var _proto = Cartesian.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {
    this.type = 'cartesian';
    this.transposed = false;
    this.isRect = true;
  };

  _proto.init = function init(start, end) {
    this.x = {
      start: start.x,
      end: end.x
    };
    this.y = {
      start: start.y,
      end: end.y
    };
  };

  _proto.convertPoint = function convertPoint(point) {
    var self = this;
    var transposed = self.transposed;
    var xDim = transposed ? 'y' : 'x';
    var yDim = transposed ? 'x' : 'y';
    var x = self.x;
    var y = self.y;
    return {
      x: x.start + (x.end - x.start) * point[xDim],
      y: y.start + (y.end - y.start) * point[yDim]
    };
  };

  _proto.invertPoint = function invertPoint(point) {
    var self = this;
    var transposed = self.transposed;
    var xDim = transposed ? 'y' : 'x';
    var yDim = transposed ? 'x' : 'y';
    var x = self.x;
    var y = self.y;
    var rst = {};
    rst[xDim] = (point.x - x.start) / (x.end - x.start);
    rst[yDim] = (point.y - y.start) / (y.end - y.start);
    return rst;
  };

  return Cartesian;
}(Base);

Base.Cartesian = Cartesian;
Base.Rect = Cartesian;
module.exports = Cartesian;

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  Position: __webpack_require__(83),
  Shape: __webpack_require__(87),
  Size: __webpack_require__(88),
  Color: __webpack_require__(89)
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var isNil = __webpack_require__(36);

var isArray = __webpack_require__(18);

var each = __webpack_require__(38);

var Base = __webpack_require__(12);

var Position =
/*#__PURE__*/
function (_Base) {
  _inheritsLoose(Position, _Base);

  function Position(cfg) {
    var _this;

    _this = _Base.call(this, cfg) || this;
    _this.names = ['x', 'y'];
    _this.type = 'position';
    return _this;
  }

  var _proto = Position.prototype;

  _proto.mapping = function mapping(x, y) {
    var scales = this.scales;
    var coord = this.coord;
    var scaleX = scales[0];
    var scaleY = scales[1];
    var rstX;
    var rstY;
    var obj;

    if (isNil(x) || isNil(y)) {
      return [];
    }

    if (isArray(y) && isArray(x)) {
      rstX = [];
      rstY = [];

      for (var i = 0, j = 0, xLen = x.length, yLen = y.length; i < xLen && j < yLen; i++, j++) {
        obj = coord.convertPoint({
          x: scaleX.scale(x[i]),
          y: scaleY.scale(y[j])
        });
        rstX.push(obj.x);
        rstY.push(obj.y);
      }
    } else if (isArray(y)) {
      x = scaleX.scale(x);
      rstY = [];
      each(y, function (yVal) {
        yVal = scaleY.scale(yVal);
        obj = coord.convertPoint({
          x: x,
          y: yVal
        });

        if (rstX && rstX !== obj.x) {
          if (!isArray(rstX)) {
            rstX = [rstX];
          }

          rstX.push(obj.x);
        } else {
          rstX = obj.x;
        }

        rstY.push(obj.y);
      });
    } else if (isArray(x)) {
      y = scaleY.scale(y);
      rstX = [];
      each(x, function (xVal) {
        xVal = scaleX.scale(xVal);
        obj = coord.convertPoint({
          x: xVal,
          y: y
        });

        if (rstY && rstY !== obj.y) {
          if (!isArray(rstY)) {
            rstY = [rstY];
          }

          rstY.push(obj.y);
        } else {
          rstY = obj.y;
        }

        rstX.push(obj.x);
      });
    } else {
      x = scaleX.scale(x);
      y = scaleY.scale(y);
      var point = coord.convertPoint({
        x: x,
        y: y
      });
      rstX = point.x;
      rstY = point.y;
    }

    return [rstX, rstY];
  };

  return Position;
}(Base);

module.exports = Position;

/***/ }),
/* 84 */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isObject = function isObject(value) {
  /**
   * isObject({}) => true
   * isObject([1, 2, 3]) => true
   * isObject(Function) => true
   * isObject(null) => false
   */
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return value !== null && type === 'object' || type === 'function';
};

module.exports = isObject;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var isType = __webpack_require__(37);

var isString = function isString(str) {
  return isType(str, 'String');
};

module.exports = isString;

/***/ }),
/* 86 */
/***/ (function(module, exports) {

function _mix(dist, obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key) && key !== 'constructor' && obj[key] !== undefined) {
      dist[key] = obj[key];
    }
  }
}

var mix = function mix(dist, src1, src2, src3) {
  if (src1) _mix(dist, src1);
  if (src2) _mix(dist, src2);
  if (src3) _mix(dist, src3);
  return dist;
};

module.exports = mix;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Base = __webpack_require__(12);

var Shape =
/*#__PURE__*/
function (_Base) {
  _inheritsLoose(Shape, _Base);

  function Shape(cfg) {
    var _this;

    _this = _Base.call(this, cfg) || this;
    _this.names = ['shape'];
    _this.type = 'shape';
    _this.gradient = null;
    return _this;
  }
  /**
   * @override
   */


  var _proto = Shape.prototype;

  _proto.getLinearValue = function getLinearValue(percent) {
    var values = this.values;
    var index = Math.round((values.length - 1) * percent);
    return values[index];
  };

  return Shape;
}(Base);

module.exports = Shape;

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Base = __webpack_require__(12);

var Size =
/*#__PURE__*/
function (_Base) {
  _inheritsLoose(Size, _Base);

  function Size(cfg) {
    var _this;

    _this = _Base.call(this, cfg) || this;
    _this.names = ['size'];
    _this.type = 'size';
    _this.gradient = null;
    return _this;
  }

  return Size;
}(Base);

module.exports = Size;

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Util = __webpack_require__(0);

var ColorUtil = __webpack_require__(90);

var Base = __webpack_require__(12);

var Color =
/*#__PURE__*/
function (_Base) {
  _inheritsLoose(Color, _Base);

  function Color(cfg) {
    var _this;

    _this = _Base.call(this, cfg) || this;
    _this.names = ['color'];
    _this.type = 'color';
    _this.gradient = null;

    if (Util.isString(_this.values)) {
      _this.linear = true;
    }

    return _this;
  }
  /**
   * @override
   */


  var _proto = Color.prototype;

  _proto.getLinearValue = function getLinearValue(percent) {
    var gradient = this.gradient;

    if (!gradient) {
      var values = this.values;
      gradient = ColorUtil.gradient(values);
      this.gradient = gradient;
    }

    return gradient(percent);
  };

  return Color;
}(Base);

module.exports = Color;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(0); // Get the interpolation between colors


function getValue(start, end, percent, index) {
  var value = start[index] + (end[index] - start[index]) * percent;
  return value;
} // convert to hex


function arr2hex(arr) {
  return '#' + toRGBValue(arr[0]) + toRGBValue(arr[1]) + toRGBValue(arr[2]);
}

function toRGBValue(value) {
  value = Math.round(value);
  value = value.toString(16);

  if (value.length === 1) {
    value = '0' + value;
  }

  return value;
}

function calColor(colors, percent) {
  var steps = colors.length - 1;
  var step = Math.floor(steps * percent);
  var left = steps * percent - step;
  var start = colors[step];
  var end = step === steps ? start : colors[step + 1];
  var rgb = arr2hex([getValue(start, end, left, 0), getValue(start, end, left, 1), getValue(start, end, left, 2)]);
  return rgb;
}

function hex2arr(str) {
  var arr = [];
  arr.push(parseInt(str.substr(1, 2), 16));
  arr.push(parseInt(str.substr(3, 2), 16));
  arr.push(parseInt(str.substr(5, 2), 16));
  return arr;
}

var colorCache = {
  black: '#000000',
  blue: '#0000ff',
  grey: '#808080',
  green: '#008000',
  orange: '#ffa500',
  pink: '#ffc0cb',
  purple: '#800080',
  red: '#ff0000',
  white: '#ffffff',
  yellow: '#ffff00'
};
var ColorUtil = {
  /**
   * Returns a hexadecimal string representing this color in RGB space, such as #f7eaba.
   * @param  {String} color color value
   * @return {String} Returns a hexadecimal string
   */
  toHex: function toHex(color) {
    if (colorCache[color]) {
      return colorCache[color];
    }

    if (color[0] === '#') {
      if (color.length === 7) {
        return color;
      }

      var hex = color.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (m, r, g, b) {
        return '#' + r + r + g + g + b + b;
      }); // hex3 to hex6

      colorCache[color] = hex;
      return hex;
    } // rgb/rgba to hex


    var rst = color.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    rst.shift();
    rst = arr2hex(rst);
    colorCache[color] = rst;
    return rst;
  },
  hex2arr: hex2arr,

  /**
   * handle the gradient color
   * @param  {Array} colors the colors
   * @return {String} return the color value
   */
  gradient: function gradient(colors) {
    var points = [];

    if (Util.isString(colors)) {
      colors = colors.split('-');
    }

    Util.each(colors, function (color) {
      if (color.indexOf('#') === -1) {
        color = ColorUtil.toHex(color);
      }

      points.push(hex2arr(color));
    });
    return function (percent) {
      return calColor(points, percent);
    };
  }
};
module.exports = ColorUtil;

/***/ }),
/* 91 */
/***/ (function(module, exports) {

function _mix(dist, obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key) && key !== 'constructor' && obj[key] !== undefined) {
      dist[key] = obj[key];
    }
  }
}

var mix = function mix(dist, src1, src2, src3) {
  if (src1) _mix(dist, src1);
  if (src2) _mix(dist, src2);
  if (src3) _mix(dist, src3);
  return dist;
};

module.exports = mix;

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(0);

var Global = __webpack_require__(1);

var Scale = __webpack_require__(93);

var SCALE_TYPES_MAP = {
  linear: 'Linear',
  cat: 'Cat',
  timeCat: 'TimeCat',
  identity: 'Identity'
};

var ScaleController =
/*#__PURE__*/
function () {
  function ScaleController(cfg) {
    // defs 列定义
    this.defs = {};
    Util.mix(this, cfg);
  }

  var _proto = ScaleController.prototype;

  _proto._getDef = function _getDef(field) {
    var defs = this.defs;
    var def = null;

    if (Global.scales[field] || defs[field]) {
      def = Util.mix({}, Global.scales[field]);
      Util.each(defs[field], function (v, k) {
        if (Util.isNil(v)) {
          delete def[k];
        } else {
          def[k] = v;
        }
      });
    }

    return def;
  };

  _proto._getDefaultType = function _getDefaultType(field, data, def) {
    if (def && def.type) {
      return def.type;
    }

    var type = 'linear';
    var value = Util.Array.firstValue(data, field);

    if (Util.isArray(value)) {
      value = value[0];
    }

    if (Util.isString(value)) {
      type = 'cat';
    }

    return type;
  };

  _proto._getScaleCfg = function _getScaleCfg(type, field, data, def) {
    var values;

    if (def && def.values) {
      values = def.values;
    } else {
      values = Util.Array.values(data, field);
    }

    var cfg = {
      field: field,
      values: values
    };

    if (type !== 'cat' && type !== 'timeCat') {
      if (!def || !(def.min && def.max)) {
        var _Util$Array$getRange = Util.Array.getRange(values),
            min = _Util$Array$getRange.min,
            max = _Util$Array$getRange.max;

        cfg.min = min;
        cfg.max = max;
        cfg.nice = true;
      }
    } else {
      cfg.isRounding = false; // used for tickCount calculation
    }

    return cfg;
  };

  _proto.createScale = function createScale(field, data) {
    var self = this;

    var def = self._getDef(field);

    var scale;

    if (!data || !data.length) {
      if (def && def.type) {
        def.field = field;
        scale = new Scale[SCALE_TYPES_MAP[def.type]](def);
      } else {
        scale = new Scale.Identity({
          value: field,
          field: field.toString(),
          values: [field]
        });
      }

      return scale;
    }

    var firstObj = data[0];
    var firstValue = firstObj[field];

    if (firstValue === null) {
      firstValue = Util.Array.firstValue(data, field);
    }

    if (Util.isNumber(field) || Util.isNil(firstValue) && !def) {
      scale = new Scale.Identity({
        value: field,
        field: field.toString(),
        values: [field]
      });
    } else {
      var type = self._getDefaultType(field, data, def);

      var cfg = self._getScaleCfg(type, field, data, def);

      def && Util.mix(cfg, def);
      scale = new Scale[SCALE_TYPES_MAP[type]](cfg);
    }

    return scale;
  };

  return ScaleController;
}();

module.exports = ScaleController;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var Scale = __webpack_require__(10);

__webpack_require__(96);

__webpack_require__(99);

__webpack_require__(39);

module.exports = Scale;

/***/ }),
/* 94 */
/***/ (function(module, exports) {

function _mix(dist, obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key) && key !== 'constructor' && obj[key] !== undefined) {
      dist[key] = obj[key];
    }
  }
}

var mix = function mix(dist, src1, src2, src3) {
  if (src1) _mix(dist, src1);
  if (src2) _mix(dist, src2);
  if (src3) _mix(dist, src3);
  return dist;
};

module.exports = mix;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var isType = __webpack_require__(13);

var isArray = Array.isArray ? Array.isArray : function (value) {
  return isType(value, 'Array');
};

module.exports = isArray;

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * @fileOverview The measurement of linear data scale function
 * @author dxq613@gmail.com
 */
var isNil = __webpack_require__(21);

var each = __webpack_require__(11);

var Base = __webpack_require__(10);

var numberAuto = __webpack_require__(97);
/**
 * 线性度量
 * @class Scale.Linear
 */


var Linear =
/*#__PURE__*/
function (_Base) {
  _inheritsLoose(Linear, _Base);

  function Linear() {
    return _Base.apply(this, arguments) || this;
  }

  var _proto = Linear.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {
    _Base.prototype._initDefaultCfg.call(this);

    var self = this;
    self.type = 'linear';
    self.isLinear = true;
    /**
     * 是否为了用户习惯，优化min,max和ticks，如果进行优化，则会根据生成的ticks调整min,max，否则舍弃(min,max)范围之外的ticks
     * @type {Boolean}
     * @default false
     */

    self.nice = false;
    /**
     * min value of the scale
     * @type {Number}
     * @default null
     */

    self.min = null;
    /**
     * min value limitted of the scale
     * @type {Number}
     * @default null
     */

    self.minLimit = null;
    /**
     * max value of the scale
     * @type {Number}
     * @default null
     */

    self.max = null;
    /**
     * max value limitted of the scale
     * @type {Number}
     * @default null
     */

    self.maxLimit = null;
    /**
     * 自动生成标记时的个数
     * @type {Number}
     * @default null
     */

    self.tickCount = null;
    /**
     * 坐标轴点之间的间距，指的是真实数据的差值
     * @type {Number}
     * @default null
     */

    self.tickInterval = null;
    /**
     * 坐标轴点之间的最小间距，指的是真实数据的差值
     * @type {Number}
     * @default null
     */

    self.minTickInterval = null;
    /**
     * 用于计算坐标点时逼近的数组
     * @type {Array}
     */

    self.snapArray = null;
  }
  /**
   * @protected
   * @override
   */
  ;

  _proto.init = function init() {
    var self = this;

    if (!self.ticks) {
      self.min = self.translate(self.min);
      self.max = self.translate(self.max);
      self.initTicks();
    } else {
      var ticks = self.ticks;
      var firstValue = self.translate(ticks[0]);
      var lastValue = self.translate(ticks[ticks.length - 1]);

      if (isNil(self.min) || self.min > firstValue) {
        self.min = firstValue;
      }

      if (isNil(self.max) || self.max < lastValue) {
        self.max = lastValue;
      }
    }
  }
  /**
   * 计算坐标点
   * @protected
   * @return {Array} 计算完成的坐标点
   */
  ;

  _proto.calculateTicks = function calculateTicks() {
    var min = this.min,
        max = this.max,
        minLimit = this.minLimit,
        maxLimit = this.maxLimit,
        tickCount = this.tickCount,
        tickInterval = this.tickInterval,
        minTickInterval = this.minTickInterval,
        snapArray = this.snapArray;

    if (tickCount === 1) {
      throw new Error('linear scale\'tickCount should not be 1');
    }

    if (max < min) {
      throw new Error("max: " + max + " should not be less than min: " + min);
    }

    var tmp = numberAuto({
      min: min,
      max: max,
      minLimit: minLimit,
      maxLimit: maxLimit,
      minCount: tickCount,
      maxCount: tickCount,
      interval: tickInterval,
      minTickInterval: minTickInterval,
      snapArray: snapArray
    });
    return tmp.ticks;
  } // 初始化ticks
  ;

  _proto.initTicks = function initTicks() {
    var self = this;
    var calTicks = self.calculateTicks();

    if (self.nice) {
      // 如果需要优化显示的tick
      self.ticks = calTicks;
      self.min = calTicks[0];
      self.max = calTicks[calTicks.length - 1];
    } else {
      var ticks = [];
      each(calTicks, function (tick) {
        if (tick >= self.min && tick <= self.max) {
          ticks.push(tick);
        }
      }); // 如果 ticks 为空，直接输入最小值、最大值

      if (!ticks.length) {
        ticks.push(self.min);
        ticks.push(self.max);
      }

      self.ticks = ticks;
    }
  }
  /**
   * @override
   */
  ;

  _proto.scale = function scale(value) {
    if (isNil(value)) {
      return NaN;
    }

    var max = this.max;
    var min = this.min;

    if (max === min) {
      return 0;
    }

    var percent = (value - min) / (max - min);
    var rangeMin = this.rangeMin();
    var rangeMax = this.rangeMax();
    return rangeMin + percent * (rangeMax - rangeMin);
  }
  /**
   * @override
   */
  ;

  _proto.invert = function invert(value) {
    var percent = (value - this.rangeMin()) / (this.rangeMax() - this.rangeMin());
    return this.min + percent * (this.max - this.min);
  };

  return Linear;
}(Base);

Base.Linear = Linear;
module.exports = Linear;

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview 自动计算数字坐标轴
 * @author dxq613@gmail.com
 */
var isNil = __webpack_require__(21);

var isNumber = __webpack_require__(14);

var AutoUtil = __webpack_require__(98);

var MIN_COUNT = 5;
var MAX_COUNT = 7;
var SNAP_COUNT_ARRAY = [0, 1, 1.2, 1.5, 1.6, 2, 2.2, 2.4, 2.5, 3, 4, 5, 6, 7.5, 8, 10];
var SNAP_ARRAY = [0, 1, 2, 4, 5, 10];
var EPS = 1e-12;

module.exports = function (info) {
  var min = info.min;
  var max = info.max;
  var interval = info.interval;
  var minTickInterval = info.minTickInterval;
  var ticks = [];
  var minCount = info.minCount || MIN_COUNT;
  var maxCount = info.maxCount || MAX_COUNT;
  var isFixedCount = minCount === maxCount; // 是否限定死了个数

  var minLimit = isNil(info.minLimit) ? -Infinity : info.minLimit; // 限定的最小值

  var maxLimit = isNil(info.maxLimit) ? Infinity : info.maxLimit; // 限定最大值

  var avgCount = (minCount + maxCount) / 2;
  var count = avgCount; // 用户传入的逼近数组

  var snapArray = info.snapArray ? info.snapArray : isFixedCount ? SNAP_COUNT_ARRAY : SNAP_ARRAY; // 如果限定大小范围，同时大小范围等于用户传入的范围，同时限定了个数，interval 按照个数均分

  if (min === minLimit && max === maxLimit && isFixedCount) {
    interval = (max - min) / (count - 1);
  }

  if (isNil(min)) {
    min = 0;
  }

  if (isNil(max)) {
    max = 0;
  }

  if (Math.abs(max - min) < EPS) {
    if (min === 0) {
      max = 1;
    } else {
      if (min > 0) {
        min = 0;
      } else {
        max = 0;
      }
    }

    if (max - min < 5 && !interval && max - min >= 1) {
      interval = 1;
    }
  }

  if (isNil(interval)) {
    // 计算间距
    var temp = (max - min) / (avgCount - 1);
    interval = AutoUtil.snapFactorTo(temp, snapArray, 'ceil');

    if (maxCount !== minCount) {
      count = parseInt((max - min) / interval, 10);

      if (count > maxCount) {
        count = maxCount;
      }

      if (count < minCount) {
        count = minCount;
      } // 不确定tick的个数时，使得tick偏小


      interval = AutoUtil.snapFactorTo((max - min) / (count - 1), snapArray, 'floor');
    }
  } // interval should not be less than minTickInterval


  if (isNumber(minTickInterval) && interval < minTickInterval) {
    interval = minTickInterval;
  }

  if (info.interval || maxCount !== minCount) {
    // 校正 max 和 min
    max = Math.min(AutoUtil.snapMultiple(max, interval, 'ceil'), maxLimit); // 向上逼近

    min = Math.max(AutoUtil.snapMultiple(min, interval, 'floor'), minLimit); // 向下逼近

    count = Math.round((max - min) / interval);
    min = AutoUtil.fixedBase(min, interval);
    max = AutoUtil.fixedBase(max, interval);
  } else {
    avgCount = parseInt(avgCount, 10); // 取整

    var avg = (max + min) / 2;
    var avgTick = AutoUtil.snapMultiple(avg, interval, 'ceil');
    var sideCount = Math.floor((avgCount - 2) / 2);
    var maxTick = avgTick + sideCount * interval;
    var minTick;

    if (avgCount % 2 === 0) {
      minTick = avgTick - sideCount * interval;
    } else {
      minTick = avgTick - (sideCount + 1) * interval;
    }

    var prevMaxTick = null; // 如果减去intervl, fixBase后，新的minTick没有大于之前的值，就退出，防止死循环

    while (maxTick < max && (prevMaxTick === null || maxTick > prevMaxTick)) {
      // 保证计算出来的刻度最大值 maxTick 不小于数据最大值 max
      prevMaxTick = maxTick;
      maxTick = AutoUtil.fixedBase(maxTick + interval, interval);
    }

    var prevMinTick = null; // 如果减去intervl, fixBase后，新的minTick没有小于之前的值，就退出，防止死循环

    while (minTick > min && (prevMinTick === null || minTick < prevMinTick)) {
      // 保证计算出来的刻度最小值 minTick 不小于数据最大值 min
      prevMinTick = minTick;
      minTick = AutoUtil.fixedBase(minTick - interval, interval); // 防止超常浮点数计算问题
    }

    max = maxTick;
    min = minTick;
  }

  max = Math.min(max, maxLimit);
  min = Math.max(min, minLimit);
  ticks.push(min);

  for (var i = 1; i < count; i++) {
    var tickValue = AutoUtil.fixedBase(interval * i + min, interval);

    if (tickValue < max) {
      ticks.push(tickValue);
    }
  }

  if (ticks[ticks.length - 1] < max) {
    ticks.push(max);
  }

  return {
    min: min,
    max: max,
    interval: interval,
    count: count,
    ticks: ticks
  };
};

/***/ }),
/* 98 */
/***/ (function(module, exports) {

/**
 * @fileOverview 计算方法
 * @author dxq613@gmail.com
 */
// 如果小数点后面超过 10 位浮点数时进行一下处理
var DECIMAL_LENGTH = 12; // 获取系数

function getFactor(v) {
  var factor = 1;

  if (v === Infinity || v === -Infinity) {
    throw new Error('Not support Infinity!');
  }

  if (v < 1) {
    var count = 0;

    while (v < 1) {
      factor = factor / 10;
      v = v * 10;
      count++;
    } // 浮点数计算出现问题


    if (factor.toString().length > DECIMAL_LENGTH) {
      factor = parseFloat(factor.toFixed(count));
    }
  } else {
    while (v > 10) {
      factor = factor * 10;
      v = v / 10;
    }
  }

  return factor;
} // 取小于当前值的


function arrayFloor(values, value) {
  var length = values.length;

  if (length === 0) {
    return NaN;
  }

  var pre = values[0];

  if (value < values[0]) {
    return NaN;
  }

  if (value >= values[length - 1]) {
    return values[length - 1];
  }

  for (var i = 1; i < values.length; i++) {
    if (value < values[i]) {
      break;
    }

    pre = values[i];
  }

  return pre;
} // 大于当前值的第一个


function arrayCeiling(values, value) {
  var length = values.length;

  if (length === 0) {
    return NaN;
  } // var pre = values[0];


  var rst;

  if (value > values[length - 1]) {
    return NaN;
  }

  if (value < values[0]) {
    return values[0];
  }

  for (var i = 1; i < values.length; i++) {
    if (value <= values[i]) {
      rst = values[i];
      break;
    }
  }

  return rst;
}

var Util = {
  // 获取逼近的数值
  snapFactorTo: function snapFactorTo(v, arr, snapType) {
    // 假设 v = -512,isFloor = true
    if (isNaN(v)) {
      return NaN;
    }

    var factor = 1; // 计算系数

    if (v !== 0) {
      if (v < 0) {
        factor = -1;
      }

      v = v * factor; // v = 512

      var tmpFactor = getFactor(v);
      factor = factor * tmpFactor; // factor = -100

      v = v / tmpFactor; // v = 5.12
    }

    if (snapType === 'floor') {
      v = Util.snapFloor(arr, v); // v = 5
    } else if (snapType === 'ceil') {
      v = Util.snapCeiling(arr, v); // v = 6
    } else {
      v = Util.snapTo(arr, v); // 四舍五入 5
    }

    var rst = parseFloat((v * factor).toPrecision(DECIMAL_LENGTH)); // 如果出现浮点数计算问题，需要处理一下
    // 如果出现浮点数计算问题，需要处理一下

    if (Math.abs(factor) < 1 && rst.toString().length > DECIMAL_LENGTH) {
      var decimalVal = parseInt(1 / factor);
      var symbol = factor > 0 ? 1 : -1;
      rst = v / decimalVal * symbol;
    }

    return rst;
  },
  // 获取逼近的倍数
  snapMultiple: function snapMultiple(v, base, snapType) {
    var div;

    if (snapType === 'ceil') {
      div = Math.ceil(v / base);
    } else if (snapType === 'floor') {
      div = Math.floor(v / base);
    } else {
      div = Math.round(v / base);
    }

    return div * base;
  },

  /**
   * 获取逼近的值，用于对齐数据
   * @param  {Array} values   数据集合
   * @param  {Number} value   数值
   * @return {Number} 逼近的值
   */
  snapTo: function snapTo(values, value) {
    // 这里假定values是升序排列
    var floorVal = arrayFloor(values, value);
    var ceilingVal = arrayCeiling(values, value);

    if (isNaN(floorVal) || isNaN(ceilingVal)) {
      if (values[0] >= value) {
        return values[0];
      }

      var last = values[values.length - 1];

      if (last <= value) {
        return last;
      }
    }

    if (Math.abs(value - floorVal) < Math.abs(ceilingVal - value)) {
      return floorVal;
    }

    return ceilingVal;
  },

  /**
   * 获取逼近的最小值，用于对齐数据
   * @param  {Array} values   数据集合
   * @param  {Number} value   数值
   * @return {Number} 逼近的最小值
   */
  snapFloor: function snapFloor(values, value) {
    // 这里假定values是升序排列
    return arrayFloor(values, value);
  },

  /**
   * 获取逼近的最大值，用于对齐数据
   * @param  {Array} values   数据集合
   * @param  {Number} value   数值
   * @return {Number} 逼近的最大值
   */
  snapCeiling: function snapCeiling(values, value) {
    // 这里假定values是升序排列
    return arrayCeiling(values, value);
  },
  fixedBase: function fixedBase(v, base) {
    var str = base.toString();
    var index = str.indexOf('.');
    var indexOfExp = str.indexOf('e-'); // 判断是否带小数点，1.000001 1.23e-9

    if (index < 0 && indexOfExp < 0) {
      // base为整数
      return Math.round(v);
    }

    var length = indexOfExp >= 0 ? parseInt(str.substr(indexOfExp + 2), 10) : str.substr(index + 1).length;

    if (length > 20) {
      length = 20;
    }

    return parseFloat(v.toFixed(length));
  }
};
module.exports = Util;

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Base = __webpack_require__(10);

var isNumber = __webpack_require__(14);

var Identity =
/*#__PURE__*/
function (_Base) {
  _inheritsLoose(Identity, _Base);

  function Identity() {
    return _Base.apply(this, arguments) || this;
  }

  var _proto = Identity.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {
    _Base.prototype._initDefaultCfg.call(this);

    this.isIdentity = true;
    this.type = 'identity';
    /**
     * 常量值
     * @type {*}
     */

    this.value = null;
  }
  /**
   * @override
   */
  ;

  _proto.getText = function getText() {
    return this.value.toString();
  }
  /**
   * @override
   */
  ;

  _proto.scale = function scale(value) {
    if (this.value !== value && isNumber(value)) {
      return value;
    }

    return this.range[0];
  }
  /**
   * @override
   */
  ;

  _proto.invert = function invert() {
    return this.value;
  };

  return Identity;
}(Base);

Base.Identity = Identity;
module.exports = Identity;

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(0);

var Axis = __webpack_require__(101);

var Global = __webpack_require__(1);

var _require = __webpack_require__(4),
    Shape = _require.Shape;

function formatTicks(ticks) {
  var tmp = ticks.slice(0);

  if (tmp.length > 0) {
    var first = tmp[0];
    var last = tmp[tmp.length - 1];

    if (first.value !== 0) {
      tmp.unshift({
        value: 0
      });
    }

    if (last.value !== 1) {
      tmp.push({
        value: 1
      });
    }
  }

  return tmp;
}

var AxisController =
/*#__PURE__*/
function () {
  function AxisController(cfg) {
    this.axisCfg = {};
    this.frontPlot = null;
    this.backPlot = null;
    this.axes = {}; // store the axes's options

    Util.mix(this, cfg);
  }

  var _proto = AxisController.prototype;

  _proto._isHide = function _isHide(field) {
    var axisCfg = this.axisCfg;
    return !axisCfg || axisCfg[field] === false;
  };

  _proto._getLinePosition = function _getLinePosition(scale, dimType, index, transposed) {
    var position = '';
    var field = scale.field;
    var axisCfg = this.axisCfg;

    if (axisCfg[field] && axisCfg[field].position) {
      position = axisCfg[field].position;
    } else if (dimType === 'x') {
      position = transposed ? 'left' : 'bottom';
    } else if (dimType === 'y') {
      position = index ? 'right' : 'left';

      if (transposed) {
        position = 'bottom';
      }
    }

    return position;
  };

  _proto._getLineCfg = function _getLineCfg(coord, dimType, position) {
    var start;
    var end;
    var factor = 1; // Mark clockwise or counterclockwise

    if (dimType === 'x') {
      start = {
        x: 0,
        y: 0
      };
      end = {
        x: 1,
        y: 0
      };
    } else {
      if (position === 'right') {
        // there will be several y axes
        start = {
          x: 1,
          y: 0
        };
        end = {
          x: 1,
          y: 1
        };
      } else {
        start = {
          x: 0,
          y: 0
        };
        end = {
          x: 0,
          y: 1
        };
        factor = -1;
      }
    }

    if (coord.transposed) {
      factor *= -1;
    }

    return {
      offsetFactor: factor,
      start: coord.convertPoint(start),
      end: coord.convertPoint(end)
    };
  };

  _proto._getCircleCfg = function _getCircleCfg(coord) {
    return {
      startAngle: coord.startAngle,
      endAngle: coord.endAngle,
      center: coord.center,
      radius: coord.circleRadius
    };
  };

  _proto._getRadiusCfg = function _getRadiusCfg(coord) {
    var transposed = coord.transposed;
    var start;
    var end;

    if (transposed) {
      start = {
        x: 0,
        y: 0
      };
      end = {
        x: 1,
        y: 0
      };
    } else {
      start = {
        x: 0,
        y: 0
      };
      end = {
        x: 0,
        y: 1
      };
    }

    return {
      offsetFactor: -1,
      start: coord.convertPoint(start),
      end: coord.convertPoint(end)
    };
  };

  _proto._getAxisCfg = function _getAxisCfg(coord, scale, verticalScale, dimType, defaultCfg) {
    var self = this;
    var axisCfg = this.axisCfg;
    var ticks = scale.getTicks();
    var cfg = Util.deepMix({
      ticks: ticks,
      frontContainer: this.frontPlot,
      backContainer: this.backPlot
    }, defaultCfg, axisCfg[scale.field]);
    var labels = [];
    var label = cfg.label;
    var count = ticks.length;
    var maxWidth = 0;
    var maxHeight = 0;
    var labelCfg = label;
    Util.each(ticks, function (tick, index) {
      if (Util.isFunction(label)) {
        var executedLabel = label(tick.text, index, count);
        labelCfg = executedLabel ? Util.mix({}, Global._defaultAxis.label, executedLabel) : null;
      }

      if (labelCfg) {
        var textStyle = {};

        if (labelCfg.textAlign) {
          textStyle.textAlign = labelCfg.textAlign;
        }

        if (labelCfg.textBaseline) {
          textStyle.textBaseline = labelCfg.textBaseline;
        }

        var axisLabel = new Shape.Text({
          className: 'axis-label',
          attrs: Util.mix({
            x: 0,
            y: 0,
            text: tick.text,
            fontFamily: self.chart.get('canvas').get('fontFamily')
          }, labelCfg),
          value: tick.value,
          textStyle: textStyle,
          top: labelCfg.top,
          context: self.chart.get('canvas').get('context')
        });
        labels.push(axisLabel);

        var _axisLabel$getBBox = axisLabel.getBBox(),
            width = _axisLabel$getBBox.width,
            height = _axisLabel$getBBox.height;

        maxWidth = Math.max(maxWidth, width);
        maxHeight = Math.max(maxHeight, height);
      }
    });
    cfg.labels = labels;
    cfg.maxWidth = maxWidth;
    cfg.maxHeight = maxHeight;
    return cfg;
  };

  _proto._createAxis = function _createAxis(coord, scale, verticalScale, dimType, index) {
    if (index === void 0) {
      index = '';
    }

    var self = this;
    var coordType = coord.type;
    var transposed = coord.transposed;
    var type;
    var key;
    var defaultCfg;

    if (coordType === 'cartesian' || coordType === 'rect') {
      var position = self._getLinePosition(scale, dimType, index, transposed);

      defaultCfg = Global.axis[position];
      defaultCfg.position = position;
      type = 'Line';
      key = position;
    } else {
      if (dimType === 'x' && !transposed || dimType === 'y' && transposed) {
        defaultCfg = Global.axis.circle;
        type = 'Circle';
        key = 'circle';
      } else {
        defaultCfg = Global.axis.radius;
        type = 'Line';
        key = 'radius';
      }
    }

    var cfg = self._getAxisCfg(coord, scale, verticalScale, dimType, defaultCfg);

    cfg.type = type;
    cfg.dimType = dimType;
    cfg.verticalScale = verticalScale;
    cfg.index = index;
    this.axes[key] = cfg;
  };

  _proto.createAxis = function createAxis(coord, xScale, yScales) {
    var self = this;

    if (xScale && !self._isHide(xScale.field)) {
      self._createAxis(coord, xScale, yScales[0], 'x');
    }

    Util.each(yScales, function (yScale, index) {
      if (!self._isHide(yScale.field)) {
        self._createAxis(coord, yScale, xScale, 'y', index);
      }
    });
    var axes = this.axes;
    var chart = self.chart;

    if (chart._isAutoPadding()) {
      var userPadding = Util.parsePadding(chart.get('padding'));
      var appendPadding = Util.parsePadding(chart.get('appendPadding'));
      var legendRange = chart.get('legendRange') || {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      };
      var padding = [userPadding[0] === 'auto' ? legendRange.top + appendPadding[0] * 2 : userPadding[0], userPadding[1] === 'auto' ? legendRange.right + appendPadding[1] : userPadding[1], userPadding[2] === 'auto' ? legendRange.bottom + appendPadding[2] : userPadding[2], userPadding[3] === 'auto' ? legendRange.left + appendPadding[3] : userPadding[3]];

      if (coord.isPolar) {
        var circleAxis = axes.circle;

        if (circleAxis) {
          var maxHeight = circleAxis.maxHeight,
              maxWidth = circleAxis.maxWidth,
              labelOffset = circleAxis.labelOffset;
          padding[0] += maxHeight + labelOffset;
          padding[1] += maxWidth + labelOffset;
          padding[2] += maxHeight + labelOffset;
          padding[3] += maxWidth + labelOffset;
        }
      } else {
        if (axes.right && userPadding[1] === 'auto') {
          var _axes$right = axes.right,
              _maxWidth = _axes$right.maxWidth,
              _labelOffset = _axes$right.labelOffset;
          padding[1] += _maxWidth + _labelOffset;
        }

        if (axes.left && userPadding[3] === 'auto') {
          var _axes$left = axes.left,
              _maxWidth2 = _axes$left.maxWidth,
              _labelOffset2 = _axes$left.labelOffset;
          padding[3] += _maxWidth2 + _labelOffset2;
        }

        if (axes.bottom && userPadding[2] === 'auto') {
          var _axes$bottom = axes.bottom,
              _maxHeight = _axes$bottom.maxHeight,
              _labelOffset3 = _axes$bottom.labelOffset;
          padding[2] += _maxHeight + _labelOffset3;
        }
      }

      chart.set('_padding', padding);

      chart._updateLayout(padding);
    }

    Util.each(axes, function (axis) {
      var type = axis.type,
          grid = axis.grid,
          verticalScale = axis.verticalScale,
          ticks = axis.ticks,
          dimType = axis.dimType,
          position = axis.position,
          index = axis.index;
      var appendCfg;

      if (coord.isPolar) {
        if (type === 'Line') {
          appendCfg = self._getRadiusCfg(coord);
        } else if (type === 'Circle') {
          appendCfg = self._getCircleCfg(coord);
        }
      } else {
        appendCfg = self._getLineCfg(coord, dimType, position);
      }

      if (grid && verticalScale) {
        var gridPoints = [];
        var verticalTicks = formatTicks(verticalScale.getTicks());
        Util.each(ticks, function (tick) {
          var subPoints = [];
          Util.each(verticalTicks, function (verticalTick) {
            var x = dimType === 'x' ? tick.value : verticalTick.value;
            var y = dimType === 'x' ? verticalTick.value : tick.value;

            if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
              var point = coord.convertPoint({
                x: x,
                y: y
              });
              subPoints.push(point);
            }
          });
          gridPoints.push({
            points: subPoints,
            _id: 'axis-' + dimType + index + '-grid-' + tick.tickValue
          });
        });
        axis.gridPoints = gridPoints;

        if (coord.isPolar) {
          axis.center = coord.center;
          axis.startAngle = coord.startAngle;
          axis.endAngle = coord.endAngle;
        }
      }

      appendCfg._id = 'axis-' + dimType;

      if (!Util.isNil(index)) {
        appendCfg._id = 'axis-' + dimType + index;
      }

      new Axis[type](Util.mix(axis, appendCfg));
    });
  };

  _proto.clear = function clear() {
    this.axes = {};
    this.frontPlot.clear();
    this.backPlot.clear();
  };

  return AxisController;
}();

module.exports = AxisController;

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var Abstract = __webpack_require__(23);

__webpack_require__(102);

module.exports = Abstract;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Util = __webpack_require__(0);

var Abstract = __webpack_require__(23);

var Line =
/*#__PURE__*/
function (_Abstract) {
  _inheritsLoose(Line, _Abstract);

  function Line() {
    return _Abstract.apply(this, arguments) || this;
  }

  var _proto = Line.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {
    _Abstract.prototype._initDefaultCfg.call(this);

    this.start = null;
    this.end = null;
  };

  _proto.getOffsetPoint = function getOffsetPoint(value) {
    var start = this.start,
        end = this.end;
    return {
      x: start.x + (end.x - start.x) * value,
      y: start.y + (end.y - start.y) * value
    };
  };

  _proto.getAxisVector = function getAxisVector() {
    var start = this.start,
        end = this.end;
    return [end.x - start.x, end.y - start.y];
  };

  _proto.drawLine = function drawLine(lineCfg) {
    var container = this.getContainer(lineCfg.top);
    var start = this.start,
        end = this.end;
    container.addShape('line', {
      className: 'axis-line',
      attrs: Util.mix({
        x1: start.x,
        y1: start.y,
        x2: end.x,
        y2: end.y
      }, lineCfg)
    });
  };

  return Line;
}(Abstract);

Abstract.Line = Line;
module.exports = Line;

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(0);

var Container = __webpack_require__(41);

var Group = __webpack_require__(42);

var _require = __webpack_require__(43),
    requestAnimationFrame = _require.requestAnimationFrame;

var Canvas =
/*#__PURE__*/
function () {
  var _proto = Canvas.prototype;

  _proto.get = function get(name) {
    return this._attrs[name];
  };

  _proto.set = function set(name, value) {
    this._attrs[name] = value;
  };

  function Canvas(cfg) {
    this._attrs = Util.mix({
      type: 'canvas',
      children: []
    }, cfg);

    this._initPixelRatio();

    this._initCanvas();
  }

  _proto._initPixelRatio = function _initPixelRatio() {
    var pixelRatio = this.get('pixelRatio');

    if (!pixelRatio) {
      this.set('pixelRatio', Util.getPixelRatio());
    }
  };

  _proto.beforeDraw = function beforeDraw() {
    var context = this._attrs.context;
    var el = this._attrs.el;
    !Util.isWx && !Util.isMy && context && context.clearRect(0, 0, el.width, el.height);
  };

  _proto._initCanvas = function _initCanvas() {
    var self = this;
    var el = self.get('el');
    var context = self.get('context');
    var canvas;

    if (context) {
      // CanvasRenderingContext2D
      canvas = context.canvas;
    } else if (Util.isString(el)) {
      // HTMLElement's id
      canvas = Util.getDomById(el);
    } else {
      // HTMLElement
      canvas = el;
    }

    if (!canvas) {
      throw new Error('Please specify the id or el of the chart!');
    }

    if (context && canvas && !canvas.getContext) {
      canvas.getContext = function () {
        return context;
      };
    }

    var width = self.get('width');

    if (!width) {
      width = Util.getWidth(canvas);
    }

    var height = self.get('height');

    if (!height) {
      height = Util.getHeight(canvas);
    }

    self.set('canvas', this);
    self.set('el', canvas);
    self.set('context', context || canvas.getContext('2d'));
    self.changeSize(width, height);
  };

  _proto.changeSize = function changeSize(width, height) {
    var pixelRatio = this.get('pixelRatio');
    var canvasDOM = this.get('el');

    if (Util.isBrowser) {
      canvasDOM.style.width = width + 'px';
      canvasDOM.style.height = height + 'px';
    }

    if (!Util.isWx && !Util.isMy) {
      canvasDOM.width = width * pixelRatio;
      canvasDOM.height = height * pixelRatio;

      if (pixelRatio !== 1) {
        var ctx = this.get('context');
        ctx.scale(pixelRatio, pixelRatio);
      }
    }

    this.set('width', width);
    this.set('height', height);
  };

  _proto.getWidth = function getWidth() {
    var pixelRatio = this.get('pixelRatio');
    var width = this.get('width');
    return width * pixelRatio;
  };

  _proto.getHeight = function getHeight() {
    var pixelRatio = this.get('pixelRatio');
    var height = this.get('height');
    return height * pixelRatio;
  };

  _proto.getPointByClient = function getPointByClient(clientX, clientY) {
    var el = this.get('el');
    var bbox = el.getBoundingClientRect();
    var width = bbox.right - bbox.left;
    var height = bbox.bottom - bbox.top;
    return {
      x: (clientX - bbox.left) * (el.width / width),
      y: (clientY - bbox.top) * (el.height / height)
    };
  };

  _proto._beginDraw = function _beginDraw() {
    this._attrs.toDraw = true;
  };

  _proto._endDraw = function _endDraw() {
    this._attrs.toDraw = false;
  };

  _proto.draw = function draw() {
    var self = this;

    function drawInner() {
      self.set('animateHandler', requestAnimationFrame(function () {
        self.set('animateHandler', undefined);

        if (self.get('toDraw')) {
          drawInner();
        }
      }));
      self.beforeDraw();

      try {
        var context = self._attrs.context;
        var children = self._attrs.children;

        for (var i = 0, len = children.length; i < len; i++) {
          var child = children[i];
          child.draw(context);
        }

        if (Util.isWx || Util.isMy) {
          context.draw();
        }
      } catch (ev) {
        console.warn('error in draw canvas, detail as:');
        console.warn(ev);

        self._endDraw();
      }

      self._endDraw();
    }

    if (self.get('destroyed')) {
      return;
    }

    if (self.get('animateHandler')) {
      this._beginDraw();
    } else {
      drawInner();
    }
  };

  _proto.destroy = function destroy() {
    if (this.get('destroyed')) {
      return;
    }

    this.clear();
    this._attrs = {};
    this.set('destroyed', true);
  };

  _proto.isDestroyed = function isDestroyed() {
    return this.get('destroyed');
  };

  return Canvas;
}();

Util.mix(Canvas.prototype, Container, {
  getGroupClass: function getGroupClass() {
    return Group;
  }
});
module.exports = Canvas;

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(0);

function _mod(n, m) {
  return (n % m + m) % m;
}

function _addStop(steps, gradient) {
  Util.each(steps, function (item) {
    item = item.split(':');
    gradient.addColorStop(Number(item[0]), item[1]);
  });
} // the string format: 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff'


function _parseLineGradient(color, shape, context) {
  var arr = color.split(' ');
  var angle = arr[0].slice(2, arr[0].length - 1);
  angle = _mod(parseFloat(angle) * Math.PI / 180, Math.PI * 2);
  var steps = arr.slice(1);

  var _shape$getBBox = shape.getBBox(),
      minX = _shape$getBBox.minX,
      minY = _shape$getBBox.minY,
      maxX = _shape$getBBox.maxX,
      maxY = _shape$getBBox.maxY;

  var start;
  var end;

  if (angle >= 0 && angle < 0.5 * Math.PI) {
    start = {
      x: minX,
      y: minY
    };
    end = {
      x: maxX,
      y: maxY
    };
  } else if (0.5 * Math.PI <= angle && angle < Math.PI) {
    start = {
      x: maxX,
      y: minY
    };
    end = {
      x: minX,
      y: maxY
    };
  } else if (Math.PI <= angle && angle < 1.5 * Math.PI) {
    start = {
      x: maxX,
      y: maxY
    };
    end = {
      x: minX,
      y: minY
    };
  } else {
    start = {
      x: minX,
      y: maxY
    };
    end = {
      x: maxX,
      y: minY
    };
  }

  var tanTheta = Math.tan(angle);
  var tanTheta2 = tanTheta * tanTheta;
  var x = (end.x - start.x + tanTheta * (end.y - start.y)) / (tanTheta2 + 1) + start.x;
  var y = tanTheta * (end.x - start.x + tanTheta * (end.y - start.y)) / (tanTheta2 + 1) + start.y;
  var gradient = context.createLinearGradient(start.x, start.y, x, y);

  _addStop(steps, gradient);

  return gradient;
} // the string format: 'r(0.5, 0.5, 0.1) 0:#ffffff 1:#1890ff'


function _parseRadialGradient(color, shape, context) {
  var arr = color.split(' ');
  var circleCfg = arr[0].slice(2, arr[0].length - 1);
  circleCfg = circleCfg.split(',');
  var fx = parseFloat(circleCfg[0]);
  var fy = parseFloat(circleCfg[1]);
  var fr = parseFloat(circleCfg[2]);
  var steps = arr.slice(1); // if radius is 0, no gradient, stroke with the last color

  if (fr === 0) {
    var _color = steps[steps.length - 1];
    return _color.split(':')[1];
  }

  var _shape$getBBox2 = shape.getBBox(),
      width = _shape$getBBox2.width,
      height = _shape$getBBox2.height,
      minX = _shape$getBBox2.minX,
      minY = _shape$getBBox2.minY;

  var r = Math.sqrt(width * width + height * height) / 2;
  var gradient = context.createRadialGradient(minX + width * fx, minY + height * fy, fr * r, minX + width / 2, minY + height / 2, r);

  _addStop(steps, gradient);

  return gradient;
}

module.exports = {
  parseStyle: function parseStyle(color, shape, context) {
    if (color[1] === '(') {
      try {
        var firstCode = color[0];

        if (firstCode === 'l') {
          return _parseLineGradient(color, shape, context);
        } else if (firstCode === 'r') {
          return _parseRadialGradient(color, shape, context);
        }
      } catch (ev) {
        console.error('error in parsing gradient string, please check if there are any extra whitespaces.');
        console.error(ev);
      }
    }

    return color;
  }
};

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Util = __webpack_require__(0);

var Shape = __webpack_require__(2);

var Rect =
/*#__PURE__*/
function (_Shape) {
  _inheritsLoose(Rect, _Shape);

  function Rect() {
    return _Shape.apply(this, arguments) || this;
  }

  var _proto = Rect.prototype;

  _proto._initProperties = function _initProperties() {
    _Shape.prototype._initProperties.call(this);

    this._attrs.canFill = true;
    this._attrs.canStroke = true;
    this._attrs.type = 'rect';
  };

  _proto.getDefaultAttrs = function getDefaultAttrs() {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      radius: 0,
      lineWidth: 0
    };
  };

  _proto.createPath = function createPath(context) {
    var self = this;
    var attrs = self.get('attrs');
    var x = attrs.x,
        y = attrs.y,
        width = attrs.width,
        height = attrs.height;
    context.beginPath();
    var radius = attrs.radius;

    if (!radius || !(width * height)) {
      context.rect(x, y, width, height);
    } else {
      radius = Util.parsePadding(radius);
      context.moveTo(x + radius[0], y);
      context.lineTo(x + width - radius[1], y);
      context.arc(x + width - radius[1], y + radius[1], radius[1], -Math.PI / 2, 0, false);
      context.lineTo(x + width, y + height - radius[2]);
      context.arc(x + width - radius[2], y + height - radius[2], radius[2], 0, Math.PI / 2, false);
      context.lineTo(x + radius[3], y + height);
      context.arc(x + radius[3], y + height - radius[3], radius[3], Math.PI / 2, Math.PI, false);
      context.lineTo(x, y + radius[0]);
      context.arc(x + radius[0], y + radius[0], radius[0], Math.PI, Math.PI * 3 / 2, false);
      context.closePath();
    }
  };

  _proto.calculateBox = function calculateBox() {
    var attrs = this.get('attrs');
    var x = attrs.x,
        y = attrs.y,
        width = attrs.width,
        height = attrs.height;
    return {
      minX: x,
      minY: y,
      maxX: x + width,
      maxY: y + height
    };
  };

  return Rect;
}(Shape);

Shape.Rect = Rect;
module.exports = Rect;

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Shape = __webpack_require__(2);

var Circle =
/*#__PURE__*/
function (_Shape) {
  _inheritsLoose(Circle, _Shape);

  function Circle() {
    return _Shape.apply(this, arguments) || this;
  }

  var _proto = Circle.prototype;

  _proto._initProperties = function _initProperties() {
    _Shape.prototype._initProperties.call(this);

    this._attrs.canFill = true;
    this._attrs.canStroke = true;
    this._attrs.type = 'circle';
  };

  _proto.getDefaultAttrs = function getDefaultAttrs() {
    return {
      x: 0,
      y: 0,
      r: 0,
      lineWidth: 0
    };
  };

  _proto.createPath = function createPath(context) {
    var attrs = this.get('attrs');
    var x = attrs.x,
        y = attrs.y,
        r = attrs.r;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, false);
    context.closePath();
  };

  _proto.calculateBox = function calculateBox() {
    var attrs = this.get('attrs');
    var x = attrs.x,
        y = attrs.y,
        r = attrs.r;
    return {
      minX: x - r,
      maxX: x + r,
      minY: y - r,
      maxY: y + r
    };
  };

  return Circle;
}(Shape);

Shape.Circle = Circle;
module.exports = Circle;

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Shape = __webpack_require__(2);

var bbox = __webpack_require__(9);

var Line =
/*#__PURE__*/
function (_Shape) {
  _inheritsLoose(Line, _Shape);

  function Line() {
    return _Shape.apply(this, arguments) || this;
  }

  var _proto = Line.prototype;

  _proto._initProperties = function _initProperties() {
    _Shape.prototype._initProperties.call(this);

    this._attrs.canStroke = true;
    this._attrs.type = 'line';
  };

  _proto.getDefaultAttrs = function getDefaultAttrs() {
    return {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
      lineWidth: 1
    };
  };

  _proto.createPath = function createPath(context) {
    var attrs = this.get('attrs');
    var x1 = attrs.x1,
        y1 = attrs.y1,
        x2 = attrs.x2,
        y2 = attrs.y2;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
  };

  _proto.calculateBox = function calculateBox() {
    var attrs = this.get('attrs');
    var x1 = attrs.x1,
        y1 = attrs.y1,
        x2 = attrs.x2,
        y2 = attrs.y2,
        lineWidth = attrs.lineWidth;
    return bbox.getBBoxFromLine(x1, y1, x2, y2, lineWidth);
  };

  return Line;
}(Shape);

Shape.Line = Line;
module.exports = Line;

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Shape = __webpack_require__(2);

var bbox = __webpack_require__(9);

var Polygon =
/*#__PURE__*/
function (_Shape) {
  _inheritsLoose(Polygon, _Shape);

  function Polygon() {
    return _Shape.apply(this, arguments) || this;
  }

  var _proto = Polygon.prototype;

  _proto._initProperties = function _initProperties() {
    _Shape.prototype._initProperties.call(this);

    this._attrs.canFill = true;
    this._attrs.canStroke = true;
    this._attrs.type = 'polygon';
  };

  _proto.getDefaultAttrs = function getDefaultAttrs() {
    return {
      points: null,
      lineWidth: 0
    };
  };

  _proto.createPath = function createPath(context) {
    var self = this;
    var attrs = self.get('attrs');
    var points = attrs.points;
    context.beginPath();

    for (var i = 0, len = points.length; i < len; i++) {
      var point = points[i];

      if (i === 0) {
        context.moveTo(point.x, point.y);
      } else {
        context.lineTo(point.x, point.y);
      }
    }

    context.closePath();
  };

  _proto.calculateBox = function calculateBox() {
    var attrs = this.get('attrs');
    var points = attrs.points;
    return bbox.getBBoxFromPoints(points);
  };

  return Polygon;
}(Shape);

Shape.Polygon = Polygon;
module.exports = Polygon;

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Shape = __webpack_require__(2);

var Smooth = __webpack_require__(44);

var bbox = __webpack_require__(9); // filter the point which x or y is NaN


function _filterPoints(points) {
  var filteredPoints = [];

  for (var i = 0, len = points.length; i < len; i++) {
    var point = points[i];

    if (!isNaN(point.x) && !isNaN(point.y)) {
      filteredPoints.push(point);
    }
  }

  return filteredPoints;
}

var Polyline =
/*#__PURE__*/
function (_Shape) {
  _inheritsLoose(Polyline, _Shape);

  function Polyline() {
    return _Shape.apply(this, arguments) || this;
  }

  var _proto = Polyline.prototype;

  _proto._initProperties = function _initProperties() {
    _Shape.prototype._initProperties.call(this);

    this._attrs.canFill = true;
    this._attrs.canStroke = true;
    this._attrs.type = 'polyline';
  };

  _proto.getDefaultAttrs = function getDefaultAttrs() {
    return {
      points: null,
      lineWidth: 1,
      smooth: false
    };
  };

  _proto.createPath = function createPath(context) {
    var self = this;
    var attrs = self.get('attrs');
    var points = attrs.points,
        smooth = attrs.smooth;

    var filteredPoints = _filterPoints(points);

    context.beginPath();

    if (filteredPoints.length) {
      context.moveTo(filteredPoints[0].x, filteredPoints[0].y);

      if (smooth) {
        var constaint = [[0, 0], [1, 1]];
        var sps = Smooth.smooth(filteredPoints, false, constaint);

        for (var i = 0, n = sps.length; i < n; i++) {
          var sp = sps[i];
          context.bezierCurveTo(sp[1], sp[2], sp[3], sp[4], sp[5], sp[6]);
        }
      } else {
        var _i;

        var l;

        for (_i = 1, l = filteredPoints.length - 1; _i < l; _i++) {
          context.lineTo(filteredPoints[_i].x, filteredPoints[_i].y);
        }

        context.lineTo(filteredPoints[l].x, filteredPoints[l].y);
      }
    }
  };

  _proto.calculateBox = function calculateBox() {
    var attrs = this.get('attrs');
    var points = attrs.points,
        smooth = attrs.smooth,
        lineWidth = attrs.lineWidth;

    var filteredPoints = _filterPoints(points);

    if (smooth) {
      var newPoints = [];
      var constaint = [[0, 0], [1, 1]];
      var sps = Smooth.smooth(filteredPoints, false, constaint);

      for (var i = 0, n = sps.length; i < n; i++) {
        var sp = sps[i];

        if (i === 0) {
          newPoints.push([filteredPoints[0].x, filteredPoints[0].y, sp[1], sp[2], sp[3], sp[4], sp[5], sp[6]]);
        } else {
          var lastPoint = sps[i - 1];
          newPoints.push([lastPoint[5], lastPoint[6], sp[1], sp[2], sp[3], sp[4], sp[5], sp[6]]);
        }
      }

      return bbox.getBBoxFromBezierGroup(newPoints, lineWidth);
    }

    return bbox.getBBoxFromPoints(filteredPoints, lineWidth);
  };

  return Polyline;
}(Shape);

Shape.Polyline = Polyline;
module.exports = Polyline;

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Shape = __webpack_require__(2);

var bbox = __webpack_require__(9);

var Arc =
/*#__PURE__*/
function (_Shape) {
  _inheritsLoose(Arc, _Shape);

  function Arc() {
    return _Shape.apply(this, arguments) || this;
  }

  var _proto = Arc.prototype;

  _proto._initProperties = function _initProperties() {
    _Shape.prototype._initProperties.call(this);

    this._attrs.canStroke = true;
    this._attrs.canFill = true;
    this._attrs.type = 'arc';
  };

  _proto.getDefaultAttrs = function getDefaultAttrs() {
    return {
      x: 0,
      y: 0,
      r: 0,
      startAngle: 0,
      endAngle: Math.PI * 2,
      anticlockwise: false,
      lineWidth: 1
    };
  };

  _proto.createPath = function createPath(context) {
    var attrs = this.get('attrs');
    var x = attrs.x,
        y = attrs.y,
        r = attrs.r,
        startAngle = attrs.startAngle,
        endAngle = attrs.endAngle,
        anticlockwise = attrs.anticlockwise;
    context.beginPath();

    if (startAngle !== endAngle) {
      context.arc(x, y, r, startAngle, endAngle, anticlockwise);
    }
  };

  _proto.calculateBox = function calculateBox() {
    var attrs = this.get('attrs');
    var x = attrs.x,
        y = attrs.y,
        r = attrs.r,
        startAngle = attrs.startAngle,
        endAngle = attrs.endAngle,
        anticlockwise = attrs.anticlockwise;
    return bbox.getBBoxFromArc(x, y, r, startAngle, endAngle, anticlockwise);
  };

  return Arc;
}(Shape);

Shape.Arc = Arc;
module.exports = Arc;

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Shape = __webpack_require__(2);

var bbox = __webpack_require__(9);

var Sector =
/*#__PURE__*/
function (_Shape) {
  _inheritsLoose(Sector, _Shape);

  function Sector() {
    return _Shape.apply(this, arguments) || this;
  }

  var _proto = Sector.prototype;

  _proto._initProperties = function _initProperties() {
    _Shape.prototype._initProperties.call(this);

    this._attrs.canFill = true;
    this._attrs.canStroke = true;
    this._attrs.type = 'sector';
  };

  _proto.getDefaultAttrs = function getDefaultAttrs() {
    return {
      x: 0,
      y: 0,
      lineWidth: 0,
      r: 0,
      r0: 0,
      startAngle: 0,
      endAngle: Math.PI * 2,
      anticlockwise: false
    };
  };

  _proto.createPath = function createPath(context) {
    var attrs = this.get('attrs');
    var x = attrs.x,
        y = attrs.y,
        startAngle = attrs.startAngle,
        endAngle = attrs.endAngle,
        r = attrs.r,
        r0 = attrs.r0,
        anticlockwise = attrs.anticlockwise;
    context.beginPath();
    var unitX = Math.cos(startAngle);
    var unitY = Math.sin(startAngle);
    context.moveTo(unitX * r0 + x, unitY * r0 + y);
    context.lineTo(unitX * r + x, unitY * r + y); // 当扇形的角度非常小的时候，就不进行弧线的绘制；或者整个只有1个扇形时，会出现end<0的情况不绘制

    if (Math.abs(endAngle - startAngle) > 0.0001 || startAngle === 0 && endAngle < 0) {
      context.arc(x, y, r, startAngle, endAngle, anticlockwise);
      context.lineTo(Math.cos(endAngle) * r0 + x, Math.sin(endAngle) * r0 + y);

      if (r0 !== 0) {
        context.arc(x, y, r0, endAngle, startAngle, !anticlockwise);
      }
    }

    context.closePath();
  };

  _proto.calculateBox = function calculateBox() {
    var attrs = this.get('attrs');
    var x = attrs.x,
        y = attrs.y,
        r = attrs.r,
        r0 = attrs.r0,
        startAngle = attrs.startAngle,
        endAngle = attrs.endAngle,
        anticlockwise = attrs.anticlockwise;
    var outerBBox = bbox.getBBoxFromArc(x, y, r, startAngle, endAngle, anticlockwise);
    var innerBBox = bbox.getBBoxFromArc(x, y, r0, startAngle, endAngle, anticlockwise);
    return {
      minX: Math.min(outerBBox.minX, innerBBox.minX),
      minY: Math.min(outerBBox.minY, innerBBox.minY),
      maxX: Math.max(outerBBox.maxX, innerBBox.maxX),
      maxY: Math.max(outerBBox.maxY, innerBBox.maxY)
    };
  };

  return Sector;
}(Shape);

Shape.Sector = Sector;
module.exports = Sector;

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Util = __webpack_require__(0);

var Shape = __webpack_require__(2);

var textWidthCacheCounter = 0;
var textWidthCache = {};
var TEXT_CACHE_MAX = 5000;

var Text =
/*#__PURE__*/
function (_Shape) {
  _inheritsLoose(Text, _Shape);

  function Text() {
    return _Shape.apply(this, arguments) || this;
  }

  var _proto = Text.prototype;

  _proto._initProperties = function _initProperties() {
    _Shape.prototype._initProperties.call(this);

    this._attrs.canFill = true;
    this._attrs.canStroke = true;
    this._attrs.type = 'text';
  };

  _proto.getDefaultAttrs = function getDefaultAttrs() {
    return {
      lineWidth: 0,
      lineCount: 1,
      fontSize: 12,
      fontFamily: 'sans-serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontVariant: 'normal',
      textAlign: 'start',
      textBaseline: 'bottom',
      lineHeight: null,
      textArr: null
    };
  };

  _proto._getFontStyle = function _getFontStyle() {
    var attrs = this._attrs.attrs;
    var fontSize = attrs.fontSize,
        fontFamily = attrs.fontFamily,
        fontWeight = attrs.fontWeight,
        fontStyle = attrs.fontStyle,
        fontVariant = attrs.fontVariant;
    return fontStyle + " " + fontVariant + " " + fontWeight + " " + fontSize + "px " + fontFamily;
  };

  _proto._afterAttrsSet = function _afterAttrsSet() {
    var attrs = this._attrs.attrs;
    attrs.font = this._getFontStyle();

    if (attrs.text) {
      var text = attrs.text;
      var textArr = null;
      var lineCount = 1;

      if (Util.isString(text) && text.indexOf('\n') !== -1) {
        textArr = text.split('\n');
        lineCount = textArr.length;
      }

      attrs.lineCount = lineCount;
      attrs.textArr = textArr;
    }

    this.set('attrs', attrs);
  };

  _proto._getTextHeight = function _getTextHeight() {
    var attrs = this._attrs.attrs;

    if (attrs.height) {
      return attrs.height;
    }

    var lineCount = attrs.lineCount;
    var fontSize = attrs.fontSize * 1;

    if (lineCount > 1) {
      var spaceingY = this._getSpaceingY();

      return fontSize * lineCount + spaceingY * (lineCount - 1);
    }

    return fontSize;
  };

  _proto._getSpaceingY = function _getSpaceingY() {
    var attrs = this._attrs.attrs;
    var lineHeight = attrs.lineHeight;
    var fontSize = attrs.fontSize * 1;
    return lineHeight ? lineHeight - fontSize : fontSize * 0.14;
  };

  _proto.drawInner = function drawInner(context) {
    var self = this;
    var attrs = self._attrs.attrs;
    var text = attrs.text;
    var x = attrs.x;
    var y = attrs.y;

    if (Util.isNil(text) || isNaN(x) || isNaN(y)) {
      // text will be 0
      return;
    }

    var textArr = attrs.textArr;
    var fontSize = attrs.fontSize * 1;

    var spaceingY = self._getSpaceingY();

    if (attrs.rotate) {
      // do rotation
      context.translate(x, y);
      context.rotate(attrs.rotate);
      x = 0;
      y = 0;
    }

    var textBaseline = attrs.textBaseline;
    var height;

    if (textArr) {
      height = self._getTextHeight();
    }

    var subY; // context.beginPath();

    if (self.hasFill()) {
      var fillOpacity = attrs.fillOpacity;

      if (!Util.isNil(fillOpacity) && fillOpacity !== 1) {
        context.globalAlpha = fillOpacity;
      }

      if (textArr) {
        for (var i = 0, len = textArr.length; i < len; i++) {
          var subText = textArr[i];
          subY = y + i * (spaceingY + fontSize) - height + fontSize; // bottom;

          if (textBaseline === 'middle') {
            subY += height - fontSize - (height - fontSize) / 2;
          }

          if (textBaseline === 'top') {
            subY += height - fontSize;
          }

          context.fillText(subText, x, subY);
        }
      } else {
        context.fillText(text, x, y);
      }
    }

    if (self.hasStroke()) {
      if (textArr) {
        for (var _i = 0, _len = textArr.length; _i < _len; _i++) {
          var _subText = textArr[_i];
          subY = y + _i * (spaceingY + fontSize) - height + fontSize; // bottom;

          if (textBaseline === 'middle') {
            subY += height - fontSize - (height - fontSize) / 2;
          }

          if (textBaseline === 'top') {
            subY += height - fontSize;
          }

          context.strokeText(_subText, x, subY);
        }
      } else {
        context.strokeText(text, x, y);
      }
    }
  };

  _proto.calculateBox = function calculateBox() {
    var self = this;
    var attrs = self._attrs.attrs;
    var x = attrs.x,
        y = attrs.y,
        textAlign = attrs.textAlign,
        textBaseline = attrs.textBaseline;

    var width = self._getTextWidth(); // attrs.width


    if (!width) {
      return {
        minX: x,
        minY: y,
        maxX: x,
        maxY: y
      };
    }

    var height = self._getTextHeight(); // attrs.height


    var point = {
      x: x,
      y: y - height
    }; // default textAlign: start, textBaseline: bottom

    if (textAlign) {
      if (textAlign === 'end' || textAlign === 'right') {
        point.x -= width;
      } else if (textAlign === 'center') {
        point.x -= width / 2;
      }
    }

    if (textBaseline) {
      if (textBaseline === 'top') {
        point.y += height;
      } else if (textBaseline === 'middle') {
        point.y += height / 2;
      }
    }

    return {
      minX: point.x,
      minY: point.y,
      maxX: point.x + width,
      maxY: point.y + height
    };
  };

  _proto._getTextWidth = function _getTextWidth() {
    var attrs = this._attrs.attrs;

    if (attrs.width) {
      return attrs.width;
    }

    var text = attrs.text;
    var context = this.get('context');
    if (Util.isNil(text)) return undefined;
    var font = attrs.font;
    var textArr = attrs.textArr;
    var key = text + '' + font;

    if (textWidthCache[key]) {
      return textWidthCache[key];
    }

    var width = 0;

    if (textArr) {
      for (var i = 0, length = textArr.length; i < length; i++) {
        var subText = textArr[i];
        width = Math.max(width, Util.measureText(subText, font, context).width);
      }
    } else {
      width = Util.measureText(text, font, context).width;
    }

    if (textWidthCacheCounter > TEXT_CACHE_MAX) {
      textWidthCacheCounter = 0;
      textWidthCache = {};
    }

    textWidthCacheCounter++;
    textWidthCache[key] = width;
    return width;
  };

  return Text;
}(Shape);

Shape.Text = Text;
module.exports = Text;

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Shape = __webpack_require__(2);

var Custom =
/*#__PURE__*/
function (_Shape) {
  _inheritsLoose(Custom, _Shape);

  function Custom() {
    return _Shape.apply(this, arguments) || this;
  }

  var _proto = Custom.prototype;

  _proto._initProperties = function _initProperties() {
    _Shape.prototype._initProperties.call(this);

    this._attrs.canFill = true;
    this._attrs.canStroke = true;
    this._attrs.createPath = null;
    this._attrs.type = 'custom';
  };

  _proto.createPath = function createPath(context) {
    var createPath = this.get('createPath');
    createPath && createPath.call(this, context);
  };

  _proto.calculateBox = function calculateBox() {
    var calculateBox = this.get('calculateBox');
    return calculateBox && calculateBox.call(this);
  };

  return Custom;
}(Shape);

Shape.Custom = Custom;
module.exports = Custom;

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var Geom = __webpack_require__(3);

__webpack_require__(115);

__webpack_require__(45);

__webpack_require__(117);

__webpack_require__(118);

__webpack_require__(120);

__webpack_require__(122);

__webpack_require__(124);

module.exports = Geom;

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Util = __webpack_require__(0);

var Geom = __webpack_require__(3);

__webpack_require__(116);

var Point =
/*#__PURE__*/
function (_Geom) {
  _inheritsLoose(Point, _Geom);

  function Point() {
    return _Geom.apply(this, arguments) || this;
  }

  var _proto = Point.prototype;

  _proto.getDefaultCfg = function getDefaultCfg() {
    var cfg = _Geom.prototype.getDefaultCfg.call(this);

    cfg.type = 'point';
    cfg.shapeType = 'point';
    cfg.generatePoints = true;
    return cfg;
  };

  _proto.draw = function draw(data, shapeFactory) {
    var self = this;
    var container = self.get('container');
    Util.each(data, function (obj) {
      var shape = obj.shape;
      var cfg = self.getDrawCfg(obj);

      if (Util.isArray(obj.y)) {
        var hasStack = self.hasAdjust('stack');
        Util.each(obj.y, function (y, idx) {
          cfg.y = y;

          if (!hasStack || idx !== 0) {
            self.drawShape(shape, obj, cfg, container, shapeFactory);
          }
        });
      } else if (!Util.isNil(obj.y)) {
        self.drawShape(shape, obj, cfg, container, shapeFactory);
      }
    });
  };

  return Point;
}(Geom);

Geom.Point = Point;
module.exports = Point;

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(0);

var Global = __webpack_require__(1);

var ShapeUtil = __webpack_require__(15);

var Shape = __webpack_require__(5);

var SHAPES = ['circle', 'hollowCircle', 'rect'];
var Point = Shape.registerFactory('point', {
  defaultShapeType: 'circle',
  getDefaultPoints: function getDefaultPoints(pointInfo) {
    return ShapeUtil.splitPoints(pointInfo);
  }
});

function getPointsCfg(cfg) {
  var style = {
    lineWidth: 0,
    stroke: cfg.color,
    fill: cfg.color
  };

  if (cfg.size) {
    style.size = cfg.size;
  }

  Util.mix(style, cfg.style);
  return Util.mix({}, Global.shape.point, style);
}

function drawShape(cfg, container, shape) {
  if (cfg.size === 0) return;
  var pointCfg = getPointsCfg(cfg);
  var size = pointCfg.r || pointCfg.size;
  var x = cfg.x;
  var y = !Util.isArray(cfg.y) ? [cfg.y] : cfg.y;

  if (shape === 'hollowCircle') {
    pointCfg.lineWidth = 1;
    pointCfg.fill = null;
  }

  for (var i = 0, len = y.length; i < len; i++) {
    if (shape === 'rect') {
      return container.addShape('Rect', {
        className: 'point',
        attrs: Util.mix({
          x: x - size,
          y: y[i] - size,
          width: size * 2,
          height: size * 2
        }, pointCfg)
      });
    }

    return container.addShape('Circle', {
      className: 'point',
      attrs: Util.mix({
        x: x,
        y: y[i],
        r: size
      }, pointCfg)
    });
  }
}

Util.each(SHAPES, function (shapeType) {
  Shape.registerShape('point', shapeType, {
    draw: function draw(cfg, container) {
      return drawShape(cfg, container, shapeType);
    }
  });
});
module.exports = Point;

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Path = __webpack_require__(45);

var Geom = __webpack_require__(3);

__webpack_require__(46);

var Line =
/*#__PURE__*/
function (_Path) {
  _inheritsLoose(Line, _Path);

  function Line() {
    return _Path.apply(this, arguments) || this;
  }

  var _proto = Line.prototype;

  _proto.getDefaultCfg = function getDefaultCfg() {
    var cfg = _Path.prototype.getDefaultCfg.call(this);

    cfg.type = 'line';
    cfg.sortable = true;
    return cfg;
  };

  return Line;
}(Path);

Geom.Line = Line;
module.exports = Line;

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * @fileOverview area geometry
 * @author dxq613 @gmail.com
 * @author sima.zhang1990@gmail.com
 */
var Geom = __webpack_require__(3);

var ShapeUtil = __webpack_require__(15);

var Util = __webpack_require__(0);

__webpack_require__(119);

var Area =
/*#__PURE__*/
function (_Geom) {
  _inheritsLoose(Area, _Geom);

  function Area() {
    return _Geom.apply(this, arguments) || this;
  }

  var _proto = Area.prototype;

  /**
   * get the default configuration
   * @protected
   * @return {Object} return the result
   */
  _proto.getDefaultCfg = function getDefaultCfg() {
    var cfg = _Geom.prototype.getDefaultCfg.call(this);

    cfg.type = 'area';
    cfg.shapeType = 'area';
    cfg.generatePoints = true;
    cfg.sortable = true;
    return cfg;
  };

  _proto.draw = function draw(data, shapeFactory) {
    var self = this;
    var container = self.get('container');
    var cfg = this.getDrawCfg(data[0]);
    var yScale = self.getYScale();
    var connectNulls = self.get('connectNulls');
    var splitArray = ShapeUtil.splitArray(data, yScale.field, connectNulls);
    cfg.origin = data;
    Util.each(splitArray, function (subData, splitedIndex) {
      cfg.splitedIndex = splitedIndex;
      var points = subData.map(function (obj) {
        return obj.points;
      });
      cfg.points = points;
      self.drawShape(cfg.shape, data[0], cfg, container, shapeFactory);
    });
  };

  return Area;
}(Geom);

Geom.Area = Area;
module.exports = Area;

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(0);

var Shape = __webpack_require__(5);

var Smooth = __webpack_require__(44);

var bbox = __webpack_require__(9);

var Global = __webpack_require__(1);

function equals(v1, v2) {
  return Math.abs(v1 - v2) < 0.00001;
}

function notEmpty(value) {
  return !isNaN(value) && !Util.isNil(value);
}

function filterPoints(points) {
  var filteredPoints = []; // filter the point which x or y is NaN

  for (var i = 0, len = points.length; i < len; i++) {
    var point = points[i];

    if (notEmpty(point.x) && notEmpty(point.y)) {
      filteredPoints.push(point);
    }
  }

  return filteredPoints;
}

function equalsCenter(points, center) {
  var eqls = true;
  Util.each(points, function (point) {
    if (!equals(point.x, center.x) || !equals(point.y, center.y)) {
      eqls = false;
      return false;
    }
  });
  return eqls;
}

function drawRectShape(topPoints, bottomPoints, container, style, isSmooth) {
  var shape;
  var points = topPoints.concat(bottomPoints);

  if (isSmooth) {
    shape = container.addShape('Custom', {
      className: 'area',
      attrs: Util.mix({
        points: points
      }, style),
      createPath: function createPath(context) {
        var constaint = [[0, 0], [1, 1]];
        var points = filterPoints(this._attrs.attrs.points);
        var pointsLen = points.length;
        var topPoints = points.slice(0, pointsLen / 2);
        var bottomPoints = points.slice(pointsLen / 2, pointsLen);
        var topSps = Smooth.smooth(topPoints, false, constaint);
        context.beginPath();
        context.moveTo(topPoints[0].x, topPoints[0].y);

        for (var i = 0, n = topSps.length; i < n; i++) {
          var sp = topSps[i];
          context.bezierCurveTo(sp[1], sp[2], sp[3], sp[4], sp[5], sp[6]);
        }

        if (bottomPoints.length) {
          var bottomSps = Smooth.smooth(bottomPoints, false, constaint);
          context.lineTo(bottomPoints[0].x, bottomPoints[0].y);

          for (var _i = 0, _n = bottomSps.length; _i < _n; _i++) {
            var _sp = bottomSps[_i];
            context.bezierCurveTo(_sp[1], _sp[2], _sp[3], _sp[4], _sp[5], _sp[6]);
          }
        }

        context.closePath();
      },
      calculateBox: function calculateBox() {
        var points = filterPoints(this._attrs.attrs.points);
        return bbox.getBBoxFromPoints(points);
      }
    });
  } else {
    shape = container.addShape('Polyline', {
      className: 'area',
      attrs: Util.mix({
        points: points
      }, style)
    });
  }

  return shape;
}

function drawShape(cfg, container, isSmooth) {
  var self = this;
  var points = cfg.points;
  var topPoints = [];
  var bottomPoints = [];
  Util.each(points, function (point) {
    bottomPoints.push(point[0]);
    topPoints.push(point[1]);
  });
  var style = Util.mix({
    fillStyle: cfg.color
  }, Global.shape.area, cfg.style);
  bottomPoints.reverse();
  topPoints = self.parsePoints(topPoints);
  bottomPoints = self.parsePoints(bottomPoints);

  if (cfg.isInCircle) {
    topPoints.push(topPoints[0]);
    bottomPoints.unshift(bottomPoints[bottomPoints.length - 1]);

    if (equalsCenter(bottomPoints, cfg.center)) {
      bottomPoints = [];
    }
  }

  return drawRectShape(topPoints, bottomPoints, container, style, isSmooth);
}

var Area = Shape.registerFactory('area', {
  defaultShapeType: 'area',
  getDefaultPoints: function getDefaultPoints(obj) {
    var x = obj.x;
    var y = obj.y;
    var y0 = obj.y0;
    y = Util.isArray(y) ? y : [y0, y];
    var points = [];
    points.push({
      x: x,
      y: y[0]
    }, {
      x: x,
      y: y[1]
    });
    return points;
  }
});
var SHAPES = ['area', 'smooth'];
Util.each(SHAPES, function (shapeType) {
  Shape.registerShape('area', shapeType, {
    draw: function draw(cfg, container) {
      var smooth = shapeType === 'smooth';
      return drawShape.call(this, cfg, container, smooth);
    }
  });
});
module.exports = Area;

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Geom = __webpack_require__(3);

var Util = __webpack_require__(0);

var SizeMixin = __webpack_require__(47);

__webpack_require__(121);

var Interval =
/*#__PURE__*/
function (_Geom) {
  _inheritsLoose(Interval, _Geom);

  var _proto = Interval.prototype;

  _proto.getDefaultCfg = function getDefaultCfg() {
    var cfg = _Geom.prototype.getDefaultCfg.call(this);

    cfg.type = 'interval';
    cfg.shapeType = 'interval';
    cfg.generatePoints = true;
    return cfg;
  };

  function Interval(cfg) {
    var _this;

    _this = _Geom.call(this, cfg) || this;
    Util.mix(_assertThisInitialized(_this), SizeMixin);
    return _this;
  }

  _proto.createShapePointsCfg = function createShapePointsCfg(obj) {
    var cfg = _Geom.prototype.createShapePointsCfg.call(this, obj);

    cfg.size = this.getNormalizedSize(obj);
    return cfg;
  };

  _proto.clearInner = function clearInner() {
    _Geom.prototype.clearInner.call(this);

    this.set('defaultSize', null);
  };

  return Interval;
}(Geom);

Geom.Interval = Interval;
module.exports = Interval;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(0);

var Shape = __webpack_require__(5);

var Vector2 = __webpack_require__(6);

var Global = __webpack_require__(1);

function getRectPoints(cfg) {
  var x = cfg.x,
      y = cfg.y,
      y0 = cfg.y0,
      size = cfg.size;
  var ymin = y0;
  var ymax = y;

  if (Util.isArray(y)) {
    ymax = y[1];
    ymin = y[0];
  }

  var xmin;
  var xmax;

  if (Util.isArray(x)) {
    xmin = x[0];
    xmax = x[1];
  } else {
    xmin = x - size / 2;
    xmax = x + size / 2;
  }

  return [{
    x: xmin,
    y: ymin
  }, {
    x: xmin,
    y: ymax
  }, {
    x: xmax,
    y: ymax
  }, {
    x: xmax,
    y: ymin
  }];
}

function getRectRange(points) {
  var xValues = [];
  var yValues = [];

  for (var i = 0, len = points.length; i < len; i++) {
    var point = points[i];
    xValues.push(point.x);
    yValues.push(point.y);
  }

  var xMin = Math.min.apply(null, xValues);
  var yMin = Math.min.apply(null, yValues);
  var xMax = Math.max.apply(null, xValues);
  var yMax = Math.max.apply(null, yValues);
  return {
    x: xMin,
    y: yMin,
    width: xMax - xMin,
    height: yMax - yMin
  };
}

var Interval = Shape.registerFactory('interval', {
  defaultShapeType: 'rect',
  getDefaultPoints: function getDefaultPoints(cfg) {
    return getRectPoints(cfg);
  }
});
Shape.registerShape('interval', 'rect', {
  draw: function draw(cfg, container) {
    var points = this.parsePoints(cfg.points);
    var style = Util.mix({
      fill: cfg.color
    }, Global.shape.interval, cfg.style);

    if (cfg.isInCircle) {
      var newPoints = points.slice(0);

      if (this._coord.transposed) {
        newPoints = [points[0], points[3], points[2], points[1]];
      }

      var _cfg$center = cfg.center,
          x = _cfg$center.x,
          y = _cfg$center.y;
      var v = [1, 0];
      var v0 = [newPoints[0].x - x, newPoints[0].y - y];
      var v1 = [newPoints[1].x - x, newPoints[1].y - y];
      var v2 = [newPoints[2].x - x, newPoints[2].y - y];
      var startAngle = Vector2.angleTo(v, v1);
      var endAngle = Vector2.angleTo(v, v2);
      var r0 = Vector2.length(v0);
      var r = Vector2.length(v1);

      if (startAngle >= 1.5 * Math.PI) {
        startAngle = startAngle - 2 * Math.PI;
      }

      if (endAngle >= 1.5 * Math.PI) {
        endAngle = endAngle - 2 * Math.PI;
      }

      return container.addShape('Sector', {
        className: 'interval',
        attrs: Util.mix({
          x: x,
          y: y,
          r: r,
          r0: r0,
          startAngle: startAngle,
          endAngle: endAngle
        }, style)
      });
    }

    var rectCfg = getRectRange(points);
    return container.addShape('rect', {
      className: 'interval',
      attrs: Util.mix(rectCfg, style)
    });
  }
});
module.exports = Interval;

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Geom = __webpack_require__(3);

var Util = __webpack_require__(0);

__webpack_require__(123);

var Polygon =
/*#__PURE__*/
function (_Geom) {
  _inheritsLoose(Polygon, _Geom);

  function Polygon() {
    return _Geom.apply(this, arguments) || this;
  }

  var _proto = Polygon.prototype;

  _proto.getDefaultCfg = function getDefaultCfg() {
    var cfg = _Geom.prototype.getDefaultCfg.call(this);

    cfg.type = 'polygon';
    cfg.shapeType = 'polygon';
    cfg.generatePoints = true;
    return cfg;
  };

  _proto.createShapePointsCfg = function createShapePointsCfg(obj) {
    var cfg = _Geom.prototype.createShapePointsCfg.call(this, obj);

    var self = this;
    var x = cfg.x;
    var y = cfg.y;
    var temp;

    if (!(Util.isArray(x) && Util.isArray(y))) {
      var xScale = self.getXScale();
      var yScale = self.getYScale();
      var xCount = xScale.values ? xScale.values.length : xScale.ticks.length;
      var yCount = yScale.values ? yScale.values.length : yScale.ticks.length;
      var xOffset = 0.5 * 1 / xCount;
      var yOffset = 0.5 * 1 / yCount;

      if (xScale.isCategory && yScale.isCategory) {
        x = [x - xOffset, x - xOffset, x + xOffset, x + xOffset];
        y = [y - yOffset, y + yOffset, y + yOffset, y - yOffset];
      } else if (Util.isArray(x)) {
        temp = x;
        x = [temp[0], temp[0], temp[1], temp[1]];
        y = [y - yOffset / 2, y + yOffset / 2, y + yOffset / 2, y - yOffset / 2];
      } else if (Util.isArray(y)) {
        temp = y;
        y = [temp[0], temp[1], temp[1], temp[0]];
        x = [x - xOffset / 2, x - xOffset / 2, x + xOffset / 2, x + xOffset / 2];
      }

      cfg.x = x;
      cfg.y = y;
    }

    return cfg;
  };

  return Polygon;
}(Geom);

Geom.Polygon = Polygon;
module.exports = Polygon;

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var Shape = __webpack_require__(5);

var Util = __webpack_require__(0);

var Polygon = Shape.registerFactory('polygon', {
  defaultShapeType: 'polygon',
  getDefaultPoints: function getDefaultPoints(pointInfo) {
    var points = [];
    var x = pointInfo.x,
        y = pointInfo.y;

    for (var i = 0, len = x.length; i < len; i++) {
      points.push({
        x: x[i],
        y: y[i]
      });
    }

    return points;
  }
});
Shape.registerShape('polygon', 'polygon', {
  draw: function draw(cfg, container) {
    var points = this.parsePoints(cfg.points);
    var style = Util.mix({
      fill: cfg.color,
      points: points
    }, cfg.style);
    return container.addShape('Polygon', {
      className: 'polygon',
      attrs: style
    });
  }
});
module.exports = Polygon;

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Geom = __webpack_require__(3);

var Util = __webpack_require__(0);

var SizeMixin = __webpack_require__(47);

__webpack_require__(125);

var Schema =
/*#__PURE__*/
function (_Geom) {
  _inheritsLoose(Schema, _Geom);

  var _proto = Schema.prototype;

  _proto.getDefaultCfg = function getDefaultCfg() {
    var cfg = _Geom.prototype.getDefaultCfg.call(this);

    cfg.type = 'schema';
    cfg.shapeType = 'schema';
    cfg.generatePoints = true;
    return cfg;
  };

  function Schema(cfg) {
    var _this;

    _this = _Geom.call(this, cfg) || this;
    Util.mix(_assertThisInitialized(_this), SizeMixin);
    return _this;
  }

  _proto.createShapePointsCfg = function createShapePointsCfg(obj) {
    var cfg = _Geom.prototype.createShapePointsCfg.call(this, obj);

    cfg.size = this.getNormalizedSize(obj);
    return cfg;
  };

  _proto.clearInner = function clearInner() {
    _Geom.prototype.clearInner.call(this);

    this.set('defaultSize', null);
  };

  return Schema;
}(Geom);

Geom.Schema = Schema;
module.exports = Schema;

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var Shape = __webpack_require__(5);

var Util = __webpack_require__(0);

function _sortValue(value) {
  var sorted = value.sort(function (a, b) {
    return a < b ? 1 : -1;
  });
  var length = sorted.length;

  if (length < 4) {
    var min = sorted[length - 1];

    for (var i = 0; i < 4 - length; i++) {
      sorted.push(min);
    }
  }

  return sorted;
} // from left bottom corner, and clockwise


function getCandlePoints(x, y, width) {
  var yValues = _sortValue(y);

  var points = [{
    x: x,
    y: yValues[0]
  }, {
    x: x,
    y: yValues[1]
  }, {
    x: x - width / 2,
    y: yValues[2]
  }, {
    x: x - width / 2,
    y: yValues[1]
  }, {
    x: x + width / 2,
    y: yValues[1]
  }, {
    x: x + width / 2,
    y: yValues[2]
  }, {
    x: x,
    y: yValues[2]
  }, {
    x: x,
    y: yValues[3]
  }];
  return points;
}

var Schema = Shape.registerFactory('schema', {});
Shape.registerShape('schema', 'candle', {
  getPoints: function getPoints(cfg) {
    return getCandlePoints(cfg.x, cfg.y, cfg.size);
  },
  draw: function draw(cfg, container) {
    var points = this.parsePoints(cfg.points);
    var style = Util.mix({
      stroke: cfg.color,
      fill: cfg.color,
      lineWidth: 1
    }, cfg.style);
    return container.addShape('Custom', {
      className: 'schema',
      attrs: style,
      createPath: function createPath(ctx) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        ctx.lineTo(points[1].x, points[1].y);
        ctx.moveTo(points[2].x, points[2].y);

        for (var i = 3; i < 6; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }

        ctx.closePath();
        ctx.moveTo(points[6].x, points[6].y);
        ctx.lineTo(points[7].x, points[7].y);
      }
    });
  }
});
module.exports = Schema;

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  Stack: __webpack_require__(127),
  Dodge: __webpack_require__(131)
};

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(128);

module.exports = Stack;

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var isArray = __webpack_require__(48);

var isNil = __webpack_require__(130);

var Adjust = __webpack_require__(19);

var Stack =
/*#__PURE__*/
function (_Adjust) {
  _inheritsLoose(Stack, _Adjust);

  function Stack() {
    return _Adjust.apply(this, arguments) || this;
  }

  var _proto = Stack.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {
    this.xField = null; // 调整对应的 x 方向对应的字段名称

    this.yField = null; // 调整对应的 y 方向对应的字段名称
  };

  _proto.processAdjust = function processAdjust(dataArray) {
    this.processStack(dataArray);
  };

  _proto.processStack = function processStack(dataArray) {
    var self = this;
    var xField = self.xField;
    var yField = self.yField;
    var count = dataArray.length;
    var stackCache = {
      positive: {},
      negative: {}
    }; // 层叠顺序翻转

    if (self.reverseOrder) {
      dataArray = dataArray.slice(0).reverse();
    }

    for (var i = 0; i < count; i++) {
      var data = dataArray[i];

      for (var j = 0, len = data.length; j < len; j++) {
        var item = data[j];
        var x = item[xField] || 0;
        var y = item[yField];
        var xkey = x.toString();
        y = isArray(y) ? y[1] : y;

        if (!isNil(y)) {
          var direction = y >= 0 ? 'positive' : 'negative';

          if (!stackCache[direction][xkey]) {
            stackCache[direction][xkey] = 0;
          }

          item[yField] = [stackCache[direction][xkey], y + stackCache[direction][xkey]];
          stackCache[direction][xkey] += y;
        }
      }
    }
  };

  return Stack;
}(Adjust);

Adjust.Stack = Stack;
module.exports = Stack;

/***/ }),
/* 129 */
/***/ (function(module, exports) {

var toString = {}.toString;
var isType = function isType(value, type) {
  return toString.call(value) === '[object ' + type + ']';
};

module.exports = isType;

/***/ }),
/* 130 */
/***/ (function(module, exports) {

// isFinite,
var isNil = function isNil(value) {
  /**
   * isNil(null) => true
   * isNil() => true
   */
  return value === null || value === undefined;
};

module.exports = isNil;

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var Dodge = __webpack_require__(132);

module.exports = Dodge;

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Adjust = __webpack_require__(19);

var each = __webpack_require__(133);

var MARGIN_RATIO = 1 / 2;
var DODGE_RATIO = 1 / 2;

var Dodge =
/*#__PURE__*/
function (_Adjust) {
  _inheritsLoose(Dodge, _Adjust);

  function Dodge() {
    return _Adjust.apply(this, arguments) || this;
  }

  var _proto = Dodge.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {
    /**
     * 调整过程中,2个数据的间距
     * @type {Number}
     */
    this.marginRatio = MARGIN_RATIO;
    /**
     * 调整占单位宽度的比例,例如：占2个分类间距的 1/2
     * @type {Number}
     */

    this.dodgeRatio = DODGE_RATIO;
    this.adjustNames = ['x', 'y']; // 调整的维度，默认,x,y都做调整
  };

  _proto.getDodgeOffset = function getDodgeOffset(range, index, count) {
    var self = this;
    var pre = range.pre;
    var next = range.next;
    var tickLength = next - pre;
    var width = tickLength * self.dodgeRatio / count;
    var margin = self.marginRatio * width;
    var offset = 1 / 2 * (tickLength - count * width - (count - 1) * margin) + ((index + 1) * width + index * margin) - 1 / 2 * width - 1 / 2 * tickLength;
    return (pre + next) / 2 + offset;
  };

  _proto.processAdjust = function processAdjust(dataArray) {
    var self = this;
    var count = dataArray.length;
    var xField = self.xField;
    each(dataArray, function (data, index) {
      for (var i = 0, len = data.length; i < len; i++) {
        var obj = data[i];
        var value = obj[xField];
        var range = {
          pre: len === 1 ? value - 1 : value - 0.5,
          next: len === 1 ? value + 1 : value + 0.5
        };
        var dodgeValue = self.getDodgeOffset(range, index, count);
        obj[xField] = dodgeValue;
      }
    });
  };

  return Dodge;
}(Adjust);

Adjust.Dodge = Dodge;
module.exports = Dodge;

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(134);
var isArray = __webpack_require__(48);

var each = function each(elements, func) {
  if (!elements) {
    return;
  }
  var rst = void 0;
  if (isArray(elements)) {
    for (var i = 0, len = elements.length; i < len; i++) {
      rst = func(elements[i], i);
      if (rst === false) {
        break;
      }
    }
  } else if (isObject(elements)) {
    for (var k in elements) {
      if (elements.hasOwnProperty(k)) {
        rst = func(elements[k], k);
        if (rst === false) {
          break;
        }
      }
    }
  }
};

module.exports = each;

/***/ }),
/* 134 */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isObject = function isObject(value) {
  /**
   * isObject({}) => true
   * isObject([1, 2, 3]) => true
   * isObject(Function) => true
   * isObject(null) => false
   */
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return value !== null && type === 'object' || type === 'function';
};

module.exports = isObject;

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Base = __webpack_require__(17);

var Vector2 = __webpack_require__(6);

var Matrix = __webpack_require__(25);

var Polar =
/*#__PURE__*/
function (_Base) {
  _inheritsLoose(Polar, _Base);

  function Polar() {
    return _Base.apply(this, arguments) || this;
  }

  var _proto = Polar.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {
    this.type = 'polar';
    this.startAngle = -Math.PI / 2;
    this.endAngle = Math.PI * 3 / 2;
    this.inner = 0;
    this.innerRadius = 0; // alias

    this.isPolar = true;
    this.transposed = false;
    this.center = null;
    this.radius = null; // relative, 0 ~ 1
  };

  _proto.init = function init(start, end) {
    var self = this;
    var inner = self.inner || self.innerRadius;
    var width = Math.abs(end.x - start.x);
    var height = Math.abs(end.y - start.y);
    var maxRadius;
    var center;

    if (self.startAngle === -Math.PI && self.endAngle === 0) {
      maxRadius = Math.min(width / 2, height);
      center = {
        x: (start.x + end.x) / 2,
        y: start.y
      };
    } else {
      maxRadius = Math.min(width, height) / 2;
      center = {
        x: (start.x + end.x) / 2,
        y: (start.y + end.y) / 2
      };
    }

    var radius = self.radius;

    if (radius > 0 && radius <= 1) {
      maxRadius = maxRadius * radius;
    }

    this.x = {
      start: self.startAngle,
      end: self.endAngle
    };
    this.y = {
      start: maxRadius * inner,
      end: maxRadius
    };
    this.center = center;
    this.circleRadius = maxRadius; // the radius value in px
  };

  _proto.convertPoint = function convertPoint(point) {
    var self = this;
    var center = self.center;
    var transposed = self.transposed;
    var xDim = transposed ? 'y' : 'x';
    var yDim = transposed ? 'x' : 'y';
    var x = self.x;
    var y = self.y;
    var angle = x.start + (x.end - x.start) * point[xDim];
    var radius = y.start + (y.end - y.start) * point[yDim];
    return {
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius
    };
  };

  _proto.invertPoint = function invertPoint(point) {
    var self = this;
    var center = self.center,
        transposed = self.transposed,
        x = self.x,
        y = self.y;
    var xDim = transposed ? 'y' : 'x';
    var yDim = transposed ? 'x' : 'y';
    var m = [1, 0, 0, 1, 0, 0];
    Matrix.rotate(m, m, x.start);
    var startV = [1, 0];
    Vector2.transformMat2d(startV, startV, m);
    startV = [startV[0], startV[1]];
    var pointV = [point.x - center.x, point.y - center.y];

    if (Vector2.zero(pointV)) {
      return {
        x: 0,
        y: 0
      };
    }

    var theta = Vector2.angleTo(startV, pointV, x.end < x.start);

    if (Math.abs(theta - Math.PI * 2) < 0.001) {
      theta = 0;
    }

    var l = Vector2.length(pointV);
    var percentX = theta / (x.end - x.start);
    percentX = x.end - x.start > 0 ? percentX : -percentX;
    var percentY = (l - y.start) / (y.end - y.start);
    var rst = {};
    rst[xDim] = percentX;
    rst[yDim] = percentY;
    return rst;
  };

  return Polar;
}(Base);

Base.Polar = Polar;
module.exports = Polar;

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Util = __webpack_require__(0);

var Abstract = __webpack_require__(23);

var Circle =
/*#__PURE__*/
function (_Abstract) {
  _inheritsLoose(Circle, _Abstract);

  function Circle() {
    return _Abstract.apply(this, arguments) || this;
  }

  var _proto = Circle.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {
    _Abstract.prototype._initDefaultCfg.call(this);

    this.startAngle = -Math.PI / 2; // start angle，in radian

    this.endAngle = Math.PI * 3 / 2; // end angle, in radian

    this.radius = null; // radius

    this.center = null; // center
  };

  _proto.getOffsetPoint = function getOffsetPoint(value) {
    var startAngle = this.startAngle,
        endAngle = this.endAngle;
    var angle = startAngle + (endAngle - startAngle) * value;
    return this._getCirclePoint(angle);
  };

  _proto._getCirclePoint = function _getCirclePoint(angle, radius) {
    var self = this;
    var center = self.center;
    radius = radius || self.radius;
    return {
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius
    };
  };

  _proto.getTextAlignInfo = function getTextAlignInfo(point, offset) {
    var self = this;
    var offsetVector = self.getOffsetVector(point, offset);
    var align;
    var baseLine = 'middle';

    if (offsetVector[0] > 0) {
      align = 'left';
    } else if (offsetVector[0] < 0) {
      align = 'right';
    } else {
      align = 'center';

      if (offsetVector[1] > 0) {
        baseLine = 'top';
      } else if (offsetVector[1] < 0) {
        baseLine = 'bottom';
      }
    }

    return {
      textAlign: align,
      textBaseline: baseLine
    };
  };

  _proto.getAxisVector = function getAxisVector(point) {
    var center = this.center;
    var factor = this.offsetFactor;
    return [(point.y - center.y) * factor, (point.x - center.x) * -1 * factor];
  };

  _proto.drawLine = function drawLine(lineCfg) {
    var center = this.center,
        radius = this.radius,
        startAngle = this.startAngle,
        endAngle = this.endAngle;
    var container = this.getContainer(lineCfg.top);
    container.addShape('arc', {
      className: 'axis-line',
      attrs: Util.mix({
        x: center.x,
        y: center.y,
        r: radius,
        startAngle: startAngle,
        endAngle: endAngle
      }, lineCfg)
    });
  };

  return Circle;
}(Abstract);

Abstract.Circle = Circle;
module.exports = Circle;

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

var TimeCat = __webpack_require__(138);

module.exports = TimeCat;

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * @fileOverview 时间数据作为分类类型
 * @author dxq613@gmail.com
 */
var Base = __webpack_require__(10);

var Category = __webpack_require__(39);

var fecha = __webpack_require__(139);

var catAuto = __webpack_require__(40);

var TimeUtil = __webpack_require__(140);

var each = __webpack_require__(11);

var isNumber = __webpack_require__(14);

var isObject = __webpack_require__(20);

var isString = __webpack_require__(22);
/**
 * 度量的构造函数
 * @class Scale.TimeCategory
 */


var TimeCategory =
/*#__PURE__*/
function (_Category) {
  _inheritsLoose(TimeCategory, _Category);

  function TimeCategory() {
    return _Category.apply(this, arguments) || this;
  }

  var _proto = TimeCategory.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {
    _Category.prototype._initDefaultCfg.call(this);

    this.type = 'timeCat';
    /**
     * 是否需要排序，默认进行排序
     * @type {Boolean}
     */

    this.sortable = true;
    this.tickCount = 5;
    /**
     * 时间格式化
     * @type {String}
     */

    this.mask = 'YYYY-MM-DD';
  };

  _proto.init = function init() {
    var self = this;
    var values = this.values; // 针对时间分类类型，会将时间统一转换为时间戳

    each(values, function (v, i) {
      values[i] = self._toTimeStamp(v);
    });

    if (this.sortable) {
      // 允许排序
      values.sort(function (v1, v2) {
        return v1 - v2;
      });
    }

    if (!self.ticks) {
      self.ticks = this.calculateTicks();
    }
  }
  /**
   * 计算 ticks
   * @return {array} 返回 ticks 数组
   */
  ;

  _proto.calculateTicks = function calculateTicks() {
    var self = this;
    var count = self.tickCount;
    var ticks;

    if (count) {
      var temp = catAuto({
        maxCount: count,
        data: self.values,
        isRounding: self.isRounding
      });
      ticks = temp.ticks;
    } else {
      ticks = self.values;
    }

    return ticks;
  }
  /**
   * @override
   */
  ;

  _proto.translate = function translate(value) {
    value = this._toTimeStamp(value);
    var index = this.values.indexOf(value);

    if (index === -1) {
      if (isNumber(value) && value < this.values.length) {
        index = value;
      } else {
        index = NaN;
      }
    }

    return index;
  }
  /**
   * @override
   */
  ;

  _proto.scale = function scale(value) {
    var rangeMin = this.rangeMin();
    var rangeMax = this.rangeMax();
    var index = this.translate(value);
    var percent;

    if (this.values.length === 1 || isNaN(index)) {
      // is index is NAN should not be set as 0
      percent = index;
    } else if (index > -1) {
      percent = index / (this.values.length - 1);
    } else {
      percent = 0;
    }

    return rangeMin + percent * (rangeMax - rangeMin);
  }
  /**
   * @override
   */
  ;

  _proto.getText = function getText(value) {
    var result = '';
    var index = this.translate(value);

    if (index > -1) {
      result = this.values[index];
    } else {
      result = value;
    }

    var formatter = this.formatter;
    result = parseInt(result, 10);
    result = formatter ? formatter(result) : fecha.format(result, this.mask);
    return result;
  }
  /**
   * @override
   */
  ;

  _proto.getTicks = function getTicks() {
    var self = this;
    var ticks = this.ticks;
    var rst = [];
    each(ticks, function (tick) {
      var obj;

      if (isObject(tick)) {
        obj = tick;
      } else {
        obj = {
          text: isString(tick) ? tick : self.getText(tick),
          value: self.scale(tick),
          tickValue: tick // 用于坐标轴上文本动画时确定前后帧的对应关系

        };
      }

      rst.push(obj);
    });
    return rst;
  } // 将时间转换为时间戳
  ;

  _proto._toTimeStamp = function _toTimeStamp(value) {
    return TimeUtil.toTimeStamp(value);
  };

  return TimeCategory;
}(Category);

Base.TimeCat = TimeCategory;
module.exports = TimeCategory;

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;(function (main) {
  'use strict';

  /**
   * Parse or format dates
   * @class fecha
   */
  var fecha = {};
  var token = /d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g;
  var twoDigits = /\d\d?/;
  var threeDigits = /\d{3}/;
  var fourDigits = /\d{4}/;
  var word = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;
  var literal = /\[([^]*?)\]/gm;
  var noop = function () {
  };

  function shorten(arr, sLen) {
    var newArr = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      newArr.push(arr[i].substr(0, sLen));
    }
    return newArr;
  }

  function monthUpdate(arrName) {
    return function (d, v, i18n) {
      var index = i18n[arrName].indexOf(v.charAt(0).toUpperCase() + v.substr(1).toLowerCase());
      if (~index) {
        d.month = index;
      }
    };
  }

  function pad(val, len) {
    val = String(val);
    len = len || 2;
    while (val.length < len) {
      val = '0' + val;
    }
    return val;
  }

  var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var monthNamesShort = shorten(monthNames, 3);
  var dayNamesShort = shorten(dayNames, 3);
  fecha.i18n = {
    dayNamesShort: dayNamesShort,
    dayNames: dayNames,
    monthNamesShort: monthNamesShort,
    monthNames: monthNames,
    amPm: ['am', 'pm'],
    DoFn: function DoFn(D) {
      return D + ['th', 'st', 'nd', 'rd'][D % 10 > 3 ? 0 : (D - D % 10 !== 10) * D % 10];
    }
  };

  var formatFlags = {
    D: function(dateObj) {
      return dateObj.getDate();
    },
    DD: function(dateObj) {
      return pad(dateObj.getDate());
    },
    Do: function(dateObj, i18n) {
      return i18n.DoFn(dateObj.getDate());
    },
    d: function(dateObj) {
      return dateObj.getDay();
    },
    dd: function(dateObj) {
      return pad(dateObj.getDay());
    },
    ddd: function(dateObj, i18n) {
      return i18n.dayNamesShort[dateObj.getDay()];
    },
    dddd: function(dateObj, i18n) {
      return i18n.dayNames[dateObj.getDay()];
    },
    M: function(dateObj) {
      return dateObj.getMonth() + 1;
    },
    MM: function(dateObj) {
      return pad(dateObj.getMonth() + 1);
    },
    MMM: function(dateObj, i18n) {
      return i18n.monthNamesShort[dateObj.getMonth()];
    },
    MMMM: function(dateObj, i18n) {
      return i18n.monthNames[dateObj.getMonth()];
    },
    YY: function(dateObj) {
      return String(dateObj.getFullYear()).substr(2);
    },
    YYYY: function(dateObj) {
      return pad(dateObj.getFullYear(), 4);
    },
    h: function(dateObj) {
      return dateObj.getHours() % 12 || 12;
    },
    hh: function(dateObj) {
      return pad(dateObj.getHours() % 12 || 12);
    },
    H: function(dateObj) {
      return dateObj.getHours();
    },
    HH: function(dateObj) {
      return pad(dateObj.getHours());
    },
    m: function(dateObj) {
      return dateObj.getMinutes();
    },
    mm: function(dateObj) {
      return pad(dateObj.getMinutes());
    },
    s: function(dateObj) {
      return dateObj.getSeconds();
    },
    ss: function(dateObj) {
      return pad(dateObj.getSeconds());
    },
    S: function(dateObj) {
      return Math.round(dateObj.getMilliseconds() / 100);
    },
    SS: function(dateObj) {
      return pad(Math.round(dateObj.getMilliseconds() / 10), 2);
    },
    SSS: function(dateObj) {
      return pad(dateObj.getMilliseconds(), 3);
    },
    a: function(dateObj, i18n) {
      return dateObj.getHours() < 12 ? i18n.amPm[0] : i18n.amPm[1];
    },
    A: function(dateObj, i18n) {
      return dateObj.getHours() < 12 ? i18n.amPm[0].toUpperCase() : i18n.amPm[1].toUpperCase();
    },
    ZZ: function(dateObj) {
      var o = dateObj.getTimezoneOffset();
      return (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4);
    }
  };

  var parseFlags = {
    D: [twoDigits, function (d, v) {
      d.day = v;
    }],
    Do: [new RegExp(twoDigits.source + word.source), function (d, v) {
      d.day = parseInt(v, 10);
    }],
    M: [twoDigits, function (d, v) {
      d.month = v - 1;
    }],
    YY: [twoDigits, function (d, v) {
      var da = new Date(), cent = +('' + da.getFullYear()).substr(0, 2);
      d.year = '' + (v > 68 ? cent - 1 : cent) + v;
    }],
    h: [twoDigits, function (d, v) {
      d.hour = v;
    }],
    m: [twoDigits, function (d, v) {
      d.minute = v;
    }],
    s: [twoDigits, function (d, v) {
      d.second = v;
    }],
    YYYY: [fourDigits, function (d, v) {
      d.year = v;
    }],
    S: [/\d/, function (d, v) {
      d.millisecond = v * 100;
    }],
    SS: [/\d{2}/, function (d, v) {
      d.millisecond = v * 10;
    }],
    SSS: [threeDigits, function (d, v) {
      d.millisecond = v;
    }],
    d: [twoDigits, noop],
    ddd: [word, noop],
    MMM: [word, monthUpdate('monthNamesShort')],
    MMMM: [word, monthUpdate('monthNames')],
    a: [word, function (d, v, i18n) {
      var val = v.toLowerCase();
      if (val === i18n.amPm[0]) {
        d.isPm = false;
      } else if (val === i18n.amPm[1]) {
        d.isPm = true;
      }
    }],
    ZZ: [/([\+\-]\d\d:?\d\d|Z)/, function (d, v) {
      if (v === 'Z') v = '+00:00';
      var parts = (v + '').match(/([\+\-]|\d\d)/gi), minutes;

      if (parts) {
        minutes = +(parts[1] * 60) + parseInt(parts[2], 10);
        d.timezoneOffset = parts[0] === '+' ? minutes : -minutes;
      }
    }]
  };
  parseFlags.dd = parseFlags.d;
  parseFlags.dddd = parseFlags.ddd;
  parseFlags.DD = parseFlags.D;
  parseFlags.mm = parseFlags.m;
  parseFlags.hh = parseFlags.H = parseFlags.HH = parseFlags.h;
  parseFlags.MM = parseFlags.M;
  parseFlags.ss = parseFlags.s;
  parseFlags.A = parseFlags.a;


  // Some common format strings
  fecha.masks = {
    default: 'ddd MMM DD YYYY HH:mm:ss',
    shortDate: 'M/D/YY',
    mediumDate: 'MMM D, YYYY',
    longDate: 'MMMM D, YYYY',
    fullDate: 'dddd, MMMM D, YYYY',
    shortTime: 'HH:mm',
    mediumTime: 'HH:mm:ss',
    longTime: 'HH:mm:ss.SSS'
  };

  /***
   * Format a date
   * @method format
   * @param {Date|number} dateObj
   * @param {string} mask Format of the date, i.e. 'mm-dd-yy' or 'shortDate'
   */
  fecha.format = function (dateObj, mask, i18nSettings) {
    var i18n = i18nSettings || fecha.i18n;

    if (typeof dateObj === 'number') {
      dateObj = new Date(dateObj);
    }

    if (Object.prototype.toString.call(dateObj) !== '[object Date]' || isNaN(dateObj.getTime())) {
      throw new Error('Invalid Date in fecha.format');
    }

    mask = fecha.masks[mask] || mask || fecha.masks['default'];

    var literals = [];

    // Make literals inactive by replacing them with ??
    mask = mask.replace(literal, function($0, $1) {
      literals.push($1);
      return '??';
    });
    // Apply formatting rules
    mask = mask.replace(token, function ($0) {
      return $0 in formatFlags ? formatFlags[$0](dateObj, i18n) : $0.slice(1, $0.length - 1);
    });
    // Inline literal values back into the formatted value
    return mask.replace(/\?\?/g, function() {
      return literals.shift();
    });
  };

  /**
   * Parse a date string into an object, changes - into /
   * @method parse
   * @param {string} dateStr Date string
   * @param {string} format Date parse format
   * @returns {Date|boolean}
   */
  fecha.parse = function (dateStr, format, i18nSettings) {
    var i18n = i18nSettings || fecha.i18n;

    if (typeof format !== 'string') {
      throw new Error('Invalid format in fecha.parse');
    }

    format = fecha.masks[format] || format;

    // Avoid regular expression denial of service, fail early for really long strings
    // https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS
    if (dateStr.length > 1000) {
      return false;
    }

    var isValid = true;
    var dateInfo = {};
    format.replace(token, function ($0) {
      if (parseFlags[$0]) {
        var info = parseFlags[$0];
        var index = dateStr.search(info[0]);
        if (!~index) {
          isValid = false;
        } else {
          dateStr.replace(info[0], function (result) {
            info[1](dateInfo, result, i18n);
            dateStr = dateStr.substr(index + result.length);
            return result;
          });
        }
      }

      return parseFlags[$0] ? '' : $0.slice(1, $0.length - 1);
    });

    if (!isValid) {
      return false;
    }

    var today = new Date();
    if (dateInfo.isPm === true && dateInfo.hour != null && +dateInfo.hour !== 12) {
      dateInfo.hour = +dateInfo.hour + 12;
    } else if (dateInfo.isPm === false && +dateInfo.hour === 12) {
      dateInfo.hour = 0;
    }

    var date;
    if (dateInfo.timezoneOffset != null) {
      dateInfo.minute = +(dateInfo.minute || 0) - +dateInfo.timezoneOffset;
      date = new Date(Date.UTC(dateInfo.year || today.getFullYear(), dateInfo.month || 0, dateInfo.day || 1,
        dateInfo.hour || 0, dateInfo.minute || 0, dateInfo.second || 0, dateInfo.millisecond || 0));
    } else {
      date = new Date(dateInfo.year || today.getFullYear(), dateInfo.month || 0, dateInfo.day || 1,
        dateInfo.hour || 0, dateInfo.minute || 0, dateInfo.second || 0, dateInfo.millisecond || 0);
    }
    return date;
  };

  /* istanbul ignore next */
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = fecha;
  } else if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return fecha;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    main.fecha = fecha;
  }
})(this);


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview 提取公共代码到util方法
 * @author dxq613@gmail.com
 */
var isString = __webpack_require__(22);

var isDate = __webpack_require__(141);

module.exports = {
  toTimeStamp: function toTimeStamp(value) {
    if (isString(value)) {
      if (value.indexOf('T') > 0) {
        value = new Date(value).getTime();
      } else {
        value = new Date(value.replace(/-/ig, '/')).getTime();
      }
    }

    if (isDate(value)) {
      value = value.getTime();
    }

    return value;
  }
};

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

var isType = __webpack_require__(13);

var isDate = function isDate(value) {
  return isType(value, 'Date');
};

module.exports = isDate;

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Util = __webpack_require__(0);

var GuideBase = __webpack_require__(7);

var Arc =
/*#__PURE__*/
function (_GuideBase) {
  _inheritsLoose(Arc, _GuideBase);

  function Arc() {
    return _GuideBase.apply(this, arguments) || this;
  }

  var _proto = Arc.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {
    this.type = 'arc';
    /**
     * start point
     * @type {Array | Function}
     */

    this.start = [];
    /**
     * end point
     * @type {Array | Function}
     */

    this.end = [];
    /**
     * style configuration
     * @type {Object}
     */

    this.style = {
      stroke: '#999',
      lineWidth: 1
    };
  };

  _proto.render = function render(coord, container) {
    var self = this;
    var start = self.parsePoint(coord, self.start);
    var end = self.parsePoint(coord, self.end);

    if (!start || !end) {
      return;
    }

    var coordCenter = coord.center;
    var radius = Math.sqrt((start.x - coordCenter.x) * (start.x - coordCenter.x) + (start.y - coordCenter.y) * (start.y - coordCenter.y));
    var startAngle = Math.atan2(start.y - coordCenter.y, start.x - coordCenter.x);
    var endAngle = Math.atan2(end.y - coordCenter.y, end.x - coordCenter.x);
    var shape = container.addShape('arc', {
      className: 'guide-arc',
      attrs: Util.mix({
        x: coordCenter.x,
        y: coordCenter.y,
        r: radius,
        startAngle: startAngle,
        endAngle: endAngle
      }, self.style)
    });
    self.element = shape;
    return shape;
  };

  return Arc;
}(GuideBase);

GuideBase.Arc = Arc;
module.exports = Arc;

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Util = __webpack_require__(0);

var GuideBase = __webpack_require__(7);

function getOffsetFromAlign(alignX, alignY, width, height) {
  var result = [];

  if (alignX === 'left' && alignY === 'top') {
    result[0] = 0;
    result[1] = 0;
  } else if (alignX === 'right' && alignY === 'top') {
    result[0] = -width;
    result[1] = 0;
  } else if (alignX === 'left' && alignY === 'bottom') {
    result[0] = 0;
    result[1] = Math.floor(-height);
  } else if (alignX === 'right' && alignY === 'bottom') {
    result[0] = Math.floor(-width);
    result[1] = Math.floor(-height);
  } else if (alignX === 'right' && alignY === 'middle') {
    result[0] = Math.floor(-width);
    result[1] = Math.floor(-height / 2);
  } else if (alignX === 'left' && alignY === 'middle') {
    result[0] = 0;
    result[1] = Math.floor(-height / 2);
  } else if (alignX === 'center' && alignY === 'bottom') {
    result[0] = Math.floor(-width / 2);
    result[1] = Math.floor(-height);
  } else if (alignX === 'center' && alignY === 'top') {
    result[0] = Math.floor(-width / 2);
    result[1] = 0;
  } else {
    result[0] = Math.floor(-width / 2);
    result[1] = Math.floor(-height / 2);
  }

  return result;
}

function modifyCSS(DOM, CSS) {
  for (var key in CSS) {
    if (CSS.hasOwnProperty(key)) {
      DOM.style[key] = CSS[key];
    }
  }

  return DOM;
}

function createDom(str) {
  var container = document.createElement('div');
  str = str.replace(/(^\s*)|(\s*$)/g, '');
  container.innerHTML = '' + str;
  return container.childNodes[0];
}

var Html =
/*#__PURE__*/
function (_GuideBase) {
  _inheritsLoose(Html, _GuideBase);

  function Html() {
    return _GuideBase.apply(this, arguments) || this;
  }

  var _proto = Html.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {
    this.type = 'html';
    /**
     * dom position
     * @type {Object | Array}
     */

    this.position = null;
    /**
      * alignment for horizontal direction，can be 'left','center','right'
      * @type {String}
      */

    this.alignX = 'center';
    /**
      * alignment for vertical direction，can be 'top', 'middle', 'bottom'
      * @type {String}
      */

    this.alignY = 'middle';
    /**
      * offset for horizontal direction
      * @type {Number}
      */

    this.offsetX = null;
    /**
      * offset for vertical direction
      * @type {Number}
      */

    this.offsetY = null;
    /**
    * the html string
    *@type {String | Function}
    */

    this.html = null;
  } // override paint
  ;

  _proto.render = function render(coord, container) {
    var self = this;
    var position = self.parsePoint(coord, self.position);

    if (!position) {
      return;
    }

    var myNode = createDom(self.html);
    myNode = modifyCSS(myNode, {
      position: 'absolute',
      top: Math.floor(position.y) + 'px',
      left: Math.floor(position.x) + 'px',
      visibility: 'hidden'
    });
    var canvasDom = container.get('canvas').get('el');
    var parentNode = canvasDom.parentNode;
    parentNode = modifyCSS(parentNode, {
      position: 'relative'
    });
    var wrapperNode = createDom('<div class="guideWapper" style="position: absolute;top: 0; left: 0;"></div>');
    parentNode.appendChild(wrapperNode);
    wrapperNode.appendChild(myNode);
    var canvasOffsetTop = canvasDom.offsetTop;
    var canvasOffsetLeft = canvasDom.offsetLeft;
    var alignX = self.alignX,
        alignY = self.alignY,
        offsetX = self.offsetX,
        offsetY = self.offsetY;
    var width = Util.getWidth(myNode);
    var height = Util.getHeight(myNode);
    var newOffset = getOffsetFromAlign(alignX, alignY, width, height);
    position.x = position.x + newOffset[0] + canvasOffsetLeft;
    position.y = position.y + newOffset[1] + canvasOffsetTop;

    if (offsetX) {
      position.x += offsetX;
    }

    if (offsetY) {
      position.y += offsetY;
    }

    modifyCSS(myNode, {
      top: Math.floor(position.y) + 'px',
      left: Math.floor(position.x) + 'px',
      visibility: 'visible'
    });
    self.element = wrapperNode;
  };

  _proto.remove = function remove() {
    var element = this.element;
    element && element.parentNode && element.parentNode.removeChild(element);
  };

  return Html;
}(GuideBase);

GuideBase.Html = Html;
module.exports = Html;

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Util = __webpack_require__(0);

var GuideBase = __webpack_require__(7);

var Line =
/*#__PURE__*/
function (_GuideBase) {
  _inheritsLoose(Line, _GuideBase);

  function Line() {
    return _GuideBase.apply(this, arguments) || this;
  }

  var _proto = Line.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {
    this.type = 'line';
    this.start = [];
    this.end = [];
    this.style = {
      stroke: '#000',
      lineWidth: 1
    };
  };

  _proto.render = function render(coord, container) {
    var points = [];
    points[0] = this.parsePoint(coord, this.start);
    points[1] = this.parsePoint(coord, this.end);

    if (!points[0] || !points[1]) {
      return;
    }

    var shape = container.addShape('Line', {
      className: 'guide-line',
      attrs: Util.mix({
        x1: points[0].x,
        y1: points[0].y,
        x2: points[1].x,
        y2: points[1].y
      }, this.style)
    });
    this.element = shape;
    return shape;
  };

  return Line;
}(GuideBase);

GuideBase.Line = Line;
module.exports = Line;

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Util = __webpack_require__(0);

var GuideBase = __webpack_require__(7);

var Rect =
/*#__PURE__*/
function (_GuideBase) {
  _inheritsLoose(Rect, _GuideBase);

  function Rect() {
    return _GuideBase.apply(this, arguments) || this;
  }

  var _proto = Rect.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {
    this.type = 'rect';
    this.start = [];
    this.end = [];
    this.style = {
      fill: '#CCD7EB',
      opacity: 0.4
    };
  };

  _proto.render = function render(coord, container) {
    var start = this.parsePoint(coord, this.start);
    var end = this.parsePoint(coord, this.end);

    if (!start || !end) {
      return;
    }

    var shape = container.addShape('rect', {
      className: 'guide-rect',
      attrs: Util.mix({
        x: Math.min(start.x, end.x),
        y: Math.min(start.y, end.y),
        width: Math.abs(end.x - start.x),
        height: Math.abs(start.y - end.y)
      }, this.style)
    });
    this.element = shape;
    return shape;
  };

  return Rect;
}(GuideBase);

GuideBase.Rect = Rect;
module.exports = Rect;

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Util = __webpack_require__(0);

var GuideBase = __webpack_require__(7);

var Text =
/*#__PURE__*/
function (_GuideBase) {
  _inheritsLoose(Text, _GuideBase);

  function Text() {
    return _GuideBase.apply(this, arguments) || this;
  }

  var _proto = Text.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {
    this.type = 'text';
    /**
     * the position of text
     * @type {Function | Array}
     */

    this.position = null;
    /**
     * the display content
     * @type {String}
     */

    this.content = null;
    /**
     * style configuration for text
     * @type {Object}
     */

    this.style = {
      fill: '#000'
    };
    /**
     * offset of horizontal direction
     * @type {Number}
     */

    this.offsetX = 0;
    /**
     * offset of vertical direction
     * @type {Number}
     */

    this.offsetY = 0;
  };

  _proto.render = function render(coord, container) {
    var position = this.position;
    var point = this.parsePoint(coord, position);

    if (!point) {
      return;
    }

    var content = this.content,
        style = this.style,
        offsetX = this.offsetX,
        offsetY = this.offsetY;

    if (offsetX) {
      point.x += offsetX;
    }

    if (offsetY) {
      point.y += offsetY;
    }

    var shape = container.addShape('text', {
      className: 'guide-text',
      attrs: Util.mix({
        x: point.x,
        y: point.y,
        text: content
      }, style)
    });
    this.element = shape;
    return shape;
  };

  return Text;
}(GuideBase);

GuideBase.Text = Text;
module.exports = Text;

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Util = __webpack_require__(0);

var GuideBase = __webpack_require__(7);

var Tag =
/*#__PURE__*/
function (_GuideBase) {
  _inheritsLoose(Tag, _GuideBase);

  function Tag() {
    return _GuideBase.apply(this, arguments) || this;
  }

  var _proto = Tag.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {
    this.type = 'tag';
    this.position = null;
    this.content = null;
    this.direct = 'tl';
    this.autoAdjust = true;
    this.offsetX = 0;
    this.offsetY = 0;
    this.side = 4;
    this.background = {
      padding: 5,
      radius: 2,
      fill: '#1890FF'
    };
    this.textStyle = {
      fontSize: 12,
      fill: '#fff',
      textAlign: 'center',
      textBaseline: 'middle'
    };
    this.withPoint = true;
    this.pointStyle = {
      fill: '#1890FF',
      r: 3,
      lineWidth: 1,
      stroke: '#fff'
    };
  };

  _proto._getDirect = function _getDirect(container, point, tagWidth, tagHeight) {
    var direct = this.direct;
    var side = this.side;
    var canvas = container.get('canvas');
    var clientWidth = canvas.get('width');
    var clientHeight = canvas.get('height');
    var x = point.x,
        y = point.y;
    var vertical = direct[0];
    var horizontal = direct[1]; // adjust for vertical direction

    if (vertical === 't' && y - side - tagHeight < 0) {
      vertical = 'b';
    } else if (vertical === 'b' && y + side + tagHeight > clientHeight) {
      vertical = 't';
    } // adjust for horizontal direction


    var diff = vertical === 'c' ? side : 0;

    if (horizontal === 'l' && x - diff - tagWidth < 0) {
      horizontal = 'r';
    } else if (horizontal === 'r' && x + diff + tagWidth > clientWidth) {
      horizontal = 'l';
    } else if (horizontal === 'c') {
      if (tagWidth / 2 + x + diff > clientWidth) {
        horizontal = 'l';
      } else if (x - tagWidth / 2 - diff < 0) {
        horizontal = 'r';
      }
    }

    direct = vertical + horizontal;
    return direct;
  };

  _proto.render = function render(coord, container) {
    var position = this.parsePoint(coord, this.position);

    if (!position) {
      return;
    }

    var content = this.content,
        background = this.background,
        textStyle = this.textStyle;
    var shapes = [];
    var wrapperContainer = container.addGroup({
      className: 'guide-tag'
    });

    if (this.withPoint) {
      var pointShape = wrapperContainer.addShape('Circle', {
        className: 'guide-tag-point',
        attrs: Util.mix({
          x: position.x,
          y: position.y
        }, this.pointStyle)
      });
      shapes.push(pointShape);
    }

    var tagContainer = wrapperContainer.addGroup(); // create a text shape

    var tagText = tagContainer.addShape('text', {
      className: 'guide-tag-text',
      zIndex: 1,
      attrs: Util.mix({
        x: 0,
        y: 0,
        text: content
      }, textStyle)
    });
    shapes.push(tagText); // create background box

    var textBBox = tagText.getBBox();
    var padding = Util.parsePadding(background.padding);
    var tagWidth = textBBox.width + padding[1] + padding[3];
    var tagHeight = textBBox.height + padding[0] + padding[2];
    var yMin = textBBox.minY - padding[0];
    var xMin = textBBox.minX - padding[3];
    var tagBg = tagContainer.addShape('rect', {
      className: 'guide-tag-bg',
      zIndex: -1,
      attrs: Util.mix({
        x: xMin,
        y: yMin,
        width: tagWidth,
        height: tagHeight
      }, background)
    });
    shapes.push(tagBg);
    var direct = this.autoAdjust ? this._getDirect(container, position, tagWidth, tagHeight) : this.direct;
    var side = this.side;
    var x = position.x + this.offsetX;
    var y = position.y + this.offsetY;
    var arrowPoints;
    var radius = Util.parsePadding(background.radius);

    if (direct === 'tl') {
      arrowPoints = [{
        x: tagWidth + xMin - side - 1,
        y: tagHeight + yMin - 1
      }, // 这个 1 是为了防止出现白边
      {
        x: tagWidth + xMin,
        y: tagHeight + yMin - 1
      }, {
        x: tagWidth + xMin,
        y: tagHeight + side + yMin
      }];
      radius[2] = 0;
      x = x - tagWidth;
      y = y - side - tagHeight;
    } else if (direct === 'cl') {
      arrowPoints = [{
        x: tagWidth + xMin - 1,
        y: (tagHeight - side) / 2 + yMin - 1
      }, {
        x: tagWidth + xMin - 1,
        y: (tagHeight + side) / 2 + yMin + 1
      }, {
        x: tagWidth + side + xMin,
        y: tagHeight / 2 + yMin
      }];
      x = x - tagWidth - side;
      y = y - tagHeight / 2;
    } else if (direct === 'bl') {
      arrowPoints = [{
        x: tagWidth + xMin,
        y: -side + yMin
      }, {
        x: tagWidth + xMin - side - 1,
        y: yMin + 1
      }, {
        x: tagWidth + xMin,
        y: yMin + 1
      }];
      radius[1] = 0;
      x = x - tagWidth;
      y = y + side;
    } else if (direct === 'bc') {
      arrowPoints = [{
        x: tagWidth / 2 + xMin,
        y: -side + yMin
      }, {
        x: (tagWidth - side) / 2 + xMin - 1,
        y: yMin + 1
      }, {
        x: (tagWidth + side) / 2 + xMin + 1,
        y: yMin + 1
      }];
      x = x - tagWidth / 2;
      y = y + side;
    } else if (direct === 'br') {
      arrowPoints = [{
        x: xMin,
        y: yMin - side
      }, {
        x: xMin,
        y: yMin + 1
      }, {
        x: xMin + side + 1,
        y: yMin + 1
      }];
      radius[0] = 0;
      y = y + side;
    } else if (direct === 'cr') {
      arrowPoints = [{
        x: xMin - side,
        y: tagHeight / 2 + yMin
      }, {
        x: xMin + 1,
        y: (tagHeight - side) / 2 + yMin - 1
      }, {
        x: xMin + 1,
        y: (tagHeight + side) / 2 + yMin + 1
      }];
      x = x + side;
      y = y - tagHeight / 2;
    } else if (direct === 'tr') {
      arrowPoints = [{
        x: xMin,
        y: tagHeight + side + yMin
      }, {
        x: xMin,
        y: tagHeight + yMin - 1
      }, {
        x: side + xMin + 1,
        y: tagHeight + yMin - 1
      }];
      radius[3] = 0;
      y = y - tagHeight - side;
    } else if (direct === 'tc') {
      arrowPoints = [{
        x: (tagWidth - side) / 2 + xMin - 1,
        y: tagHeight + yMin - 1
      }, {
        x: (tagWidth + side) / 2 + xMin + 1,
        y: tagHeight + yMin - 1
      }, {
        x: tagWidth / 2 + xMin,
        y: tagHeight + side + yMin
      }];
      x = x - tagWidth / 2;
      y = y - tagHeight - side;
    }

    var sideShape = tagContainer.addShape('Polygon', {
      className: 'guide-tag-side',
      zIndex: 0,
      attrs: {
        points: arrowPoints,
        fill: background.fill
      }
    });
    shapes.push(sideShape);
    tagBg.attr('radius', radius);
    tagContainer.moveTo(x - xMin, y - yMin);
    tagContainer.sort();
    this.element = wrapperContainer;
    return shapes;
  };

  return Tag;
}(GuideBase);

GuideBase.Tag = Tag;
module.exports = Tag;

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Util = __webpack_require__(0);

var GuideBase = __webpack_require__(7);

var Point =
/*#__PURE__*/
function (_GuideBase) {
  _inheritsLoose(Point, _GuideBase);

  function Point() {
    return _GuideBase.apply(this, arguments) || this;
  }

  var _proto = Point.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {
    this.type = 'point';
    this.position = null;
    this.offsetX = 0;
    this.offsetY = 0;
    this.style = {
      fill: '#1890FF',
      r: 3,
      lineWidth: 1,
      stroke: '#fff'
    };
  };

  _proto.render = function render(coord, container) {
    var position = this.parsePoint(coord, this.position);
    if (!position) return null;
    var shape = container.addShape('Circle', {
      className: 'guide-point',
      attrs: Util.mix({
        x: position.x + this.offsetX,
        y: position.y + this.offsetY
      }, this.style)
    });
    this.element = shape;
    return shape;
  };

  return Point;
}(GuideBase);

GuideBase.Point = Point;
module.exports = Point;

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(0);

var Global = __webpack_require__(1);

var Tooltip = __webpack_require__(150);

var Helper = __webpack_require__(26); // Register the default configuration for Tooltip


Global.tooltip = Util.deepMix({
  triggerOn: ['touchstart', 'touchmove'],
  // triggerOff: 'touchend',
  alwaysShow: false,
  showTitle: false,
  showCrosshairs: false,
  crosshairsStyle: {
    stroke: 'rgba(0, 0, 0, 0.25)',
    lineWidth: 1
  },
  showTooltipMarker: true,
  background: {
    radius: 1,
    fill: 'rgba(0, 0, 0, 0.65)',
    padding: [3, 5]
  },
  titleStyle: {
    fontSize: 12,
    fill: '#fff',
    textAlign: 'start',
    textBaseline: 'top'
  },
  nameStyle: {
    fontSize: 12,
    fill: 'rgba(255, 255, 255, 0.65)',
    textAlign: 'start',
    textBaseline: 'middle'
  },
  valueStyle: {
    fontSize: 12,
    fill: '#fff',
    textAlign: 'start',
    textBaseline: 'middle'
  },
  showItemMarker: true,
  itemMarkerStyle: {
    radius: 3,
    symbol: 'circle',
    lineWidth: 1,
    stroke: '#fff'
  },
  layout: 'horizontal',
  snap: false
}, Global.tooltip || {});

function _getTooltipValueScale(geom) {
  var colorAttr = geom.getAttr('color');

  if (colorAttr) {
    var colorScale = colorAttr.getScale(colorAttr.type);

    if (colorScale.isLinear) {
      return colorScale;
    }
  }

  var xScale = geom.getXScale();
  var yScale = geom.getYScale();

  if (yScale) {
    return yScale;
  }

  return xScale;
}

function getTooltipName(geom, origin) {
  var name;
  var nameScale;

  var groupScales = geom._getGroupScales();

  if (groupScales.length) {
    Util.each(groupScales, function (scale) {
      nameScale = scale;
      return false;
    });
  }

  if (nameScale) {
    var field = nameScale.field;
    name = nameScale.getText(origin[field]);
  } else {
    var valueScale = _getTooltipValueScale(geom);

    name = valueScale.alias || valueScale.field;
  }

  return name;
}

function getTooltipValue(geom, origin) {
  var scale = _getTooltipValueScale(geom);

  return scale.getText(origin[scale.field]);
}

function getTooltipTitle(geom, origin) {
  var position = geom.getAttr('position');
  var field = position.getFields()[0];
  var scale = geom.get('scales')[field];
  return scale.getText(origin[scale.field]);
}

function _indexOfArray(items, item) {
  var rst = -1;
  Util.each(items, function (sub, index) {
    if (sub.title === item.title && sub.name === item.name && sub.value === item.value && sub.color === item.color) {
      rst = index;
      return false;
    }
  });
  return rst;
}

function _uniqItems(items) {
  var tmp = [];
  Util.each(items, function (item) {
    var index = _indexOfArray(tmp, item);

    if (index === -1) {
      tmp.push(item);
    } else {
      tmp[index] = item;
    }
  });
  return tmp;
}

function isEqual(arr1, arr2) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}

var TooltipController =
/*#__PURE__*/
function () {
  function TooltipController(cfg) {
    this.enable = true;
    this.cfg = {};
    this.tooltip = null;
    this.chart = null;
    this.timeStamp = 0;
    Util.mix(this, cfg);
    var chart = this.chart;
    this.canvasDom = chart.get('canvas').get('el');
  }

  var _proto = TooltipController.prototype;

  _proto._setCrosshairsCfg = function _setCrosshairsCfg() {
    var self = this;
    var chart = self.chart;
    var defaultCfg = Util.mix({}, Global.tooltip);
    var geoms = chart.get('geoms');
    var shapes = [];
    Util.each(geoms, function (geom) {
      var type = geom.get('type');

      if (shapes.indexOf(type) === -1) {
        shapes.push(type);
      }
    });
    var coordType = chart.get('coord').type;

    if (geoms.length && (coordType === 'cartesian' || coordType === 'rect')) {
      if (shapes.length === 1 && ['line', 'area', 'path', 'point'].indexOf(shapes[0]) !== -1) {
        Util.mix(defaultCfg, {
          showCrosshairs: true
        });
      }
    }

    return defaultCfg;
  };

  _proto._getMaxLength = function _getMaxLength(cfg) {
    if (cfg === void 0) {
      cfg = {};
    }

    var _cfg = cfg,
        layout = _cfg.layout,
        plotRange = _cfg.plotRange;
    return layout === 'horizontal' ? plotRange.br.x - plotRange.bl.x : plotRange.bl.y - plotRange.tr.y;
  };

  _proto.render = function render() {
    var self = this;

    if (self.tooltip) {
      return;
    }

    var chart = self.chart;
    var canvas = chart.get('canvas');
    var frontPlot = chart.get('frontPlot').addGroup({
      className: 'tooltipContainer',
      zIndex: 10
    });
    var backPlot = chart.get('backPlot').addGroup({
      className: 'tooltipContainer'
    });
    var plotRange = chart.get('plotRange');
    var coord = chart.get('coord');

    var defaultCfg = self._setCrosshairsCfg();

    var cfg = self.cfg; // 通过 chart.tooltip() 接口传入的 tooltip 配置项

    var tooltipCfg = Util.deepMix({
      plotRange: plotRange,
      frontPlot: frontPlot,
      backPlot: backPlot,
      canvas: canvas,
      fixed: coord.transposed || coord.isPolar
    }, defaultCfg, cfg); // 创建 tooltip 实例需要的配置，不应该修改 this.cfg，即用户传入的配置

    tooltipCfg.maxLength = self._getMaxLength(tooltipCfg);
    this._tooltipCfg = tooltipCfg;
    var tooltip = new Tooltip(tooltipCfg);
    self.tooltip = tooltip;
    self.bindEvents();
  };

  _proto.clear = function clear() {
    var tooltip = this.tooltip;
    tooltip && tooltip.destroy();
    this.tooltip = null;
    this.prePoint = null;
    this._lastActive = null;
    this.unBindEvents();
  };

  _proto._getTooltipMarkerStyle = function _getTooltipMarkerStyle(cfg) {
    if (cfg === void 0) {
      cfg = {};
    }

    var _cfg2 = cfg,
        type = _cfg2.type,
        items = _cfg2.items;
    var tooltipCfg = this._tooltipCfg;

    if (type === 'rect') {
      var x;
      var y;
      var width;
      var height;
      var chart = this.chart;

      var _chart$get = chart.get('plotRange'),
          tl = _chart$get.tl,
          br = _chart$get.br;

      var coord = chart.get('coord');
      var firstItem = items[0];
      var lastItem = items[items.length - 1];
      var intervalWidth = firstItem.width;

      if (coord.transposed) {
        x = tl.x;
        y = lastItem.y - intervalWidth * 0.75;
        width = br.x - tl.x;
        height = firstItem.y - lastItem.y + 1.5 * intervalWidth;
      } else {
        x = firstItem.x - intervalWidth * 0.75;
        y = tl.y;
        width = lastItem.x - firstItem.x + 1.5 * intervalWidth;
        height = br.y - tl.y;
      }

      cfg.style = Util.mix({
        x: x,
        y: y,
        width: width,
        height: height,
        fill: '#CCD6EC',
        opacity: 0.3
      }, tooltipCfg.tooltipMarkerStyle);
    } else {
      cfg.style = Util.mix({
        radius: 4,
        fill: '#fff',
        lineWidth: 2
      }, tooltipCfg.tooltipMarkerStyle);
    }

    return cfg;
  };

  _proto._setTooltip = function _setTooltip(point, items, tooltipMarkerCfg) {
    if (tooltipMarkerCfg === void 0) {
      tooltipMarkerCfg = {};
    }

    var lastActive = this._lastActive;
    var tooltip = this.tooltip;
    var cfg = this._tooltipCfg;
    items = _uniqItems(items);
    var chart = this.chart;
    var coord = chart.get('coord');
    var yScale = chart.getYScales()[0];
    var snap = cfg.snap;

    if (snap === false && yScale.isLinear) {
      var invertPoint = coord.invertPoint(point);
      var plot = chart.get('plotRange');
      var tip;
      var pos;

      if (Helper.isPointInPlot(point, plot)) {
        if (coord.transposed) {
          tip = yScale.invert(invertPoint.x);
          pos = point.x;
          tooltip.setXTipContent(tip);
          tooltip.setXTipPosition(pos);
          tooltip.setYCrosshairPosition(pos);
        } else {
          tip = yScale.invert(invertPoint.y);
          pos = point.y;
          tooltip.setYTipContent(tip);
          tooltip.setYTipPosition(pos);
          tooltip.setXCrosshairPosition(pos);
        }
      }
    }

    if (cfg.onShow) {
      cfg.onShow({
        x: point.x,
        y: point.y,
        tooltip: tooltip,
        items: items,
        tooltipMarkerCfg: tooltipMarkerCfg
      });
    }

    if (isEqual(lastActive, items)) {
      if (snap === false && (Util.directionEnabled(cfg.crosshairsType, 'y') || cfg.showYTip)) {
        var canvas = this.chart.get('canvas');
        canvas.draw();
      }

      return;
    }

    this._lastActive = items;
    var onChange = cfg.onChange;

    if (onChange) {
      onChange({
        x: point.x,
        y: point.y,
        tooltip: tooltip,
        items: items,
        tooltipMarkerCfg: tooltipMarkerCfg
      });
    }

    var first = items[0];
    var title = first.title || first.name;
    var xTipPosX = first.x;

    if (items.length > 1) {
      xTipPosX = (items[0].x + items[items.length - 1].x) / 2;
    }

    tooltip.setContent(title, items, coord.transposed);
    tooltip.setPosition(items, point);

    if (coord.transposed) {
      var yTipPosY = first.y;

      if (items.length > 1) {
        yTipPosY = (items[0].y + items[items.length - 1].y) / 2;
      }

      tooltip.setYTipContent(title);
      tooltip.setYTipPosition(yTipPosY);
      tooltip.setXCrosshairPosition(yTipPosY);

      if (snap) {
        tooltip.setXTipContent(first.value);
        tooltip.setXTipPosition(xTipPosX);
        tooltip.setYCrosshairPosition(xTipPosX);
      }
    } else {
      tooltip.setXTipContent(title);
      tooltip.setXTipPosition(xTipPosX);
      tooltip.setYCrosshairPosition(xTipPosX);

      if (snap) {
        tooltip.setYTipContent(first.value);
        tooltip.setYTipPosition(first.y);
        tooltip.setXCrosshairPosition(first.y);
      }
    }

    var markerItems = tooltipMarkerCfg.items;

    if (cfg.showTooltipMarker && markerItems.length) {
      tooltipMarkerCfg = this._getTooltipMarkerStyle(tooltipMarkerCfg);
      tooltip.setMarkers(tooltipMarkerCfg);
    } else {
      tooltip.clearMarkers();
    }

    tooltip.show();
  };

  _proto.showTooltip = function showTooltip(point) {
    var self = this;
    var chart = self.chart;
    var tooltipMarkerType;
    var tooltipMarkerItems = [];
    var items = [];
    var cfg = self._tooltipCfg;
    var marker;

    if (cfg.showItemMarker) {
      marker = cfg.itemMarkerStyle;
    }

    var geoms = chart.get('geoms');
    var coord = chart.get('coord');
    Util.each(geoms, function (geom) {
      if (geom.get('visible')) {
        var type = geom.get('type');
        var records = geom.getSnapRecords(point);
        Util.each(records, function (record) {
          if (record.x && record.y) {
            var x = record.x,
                y = record.y,
                _origin = record._origin,
                color = record.color;
            var tooltipItem = {
              x: x,
              y: Util.isArray(y) ? y[1] : y,
              color: color || Global.defaultColor,
              origin: _origin,
              name: getTooltipName(geom, _origin),
              value: getTooltipValue(geom, _origin),
              title: getTooltipTitle(geom, _origin)
            };

            if (marker) {
              tooltipItem.marker = Util.mix({
                fill: color || Global.defaultColor
              }, marker);
            }

            items.push(tooltipItem);

            if (['line', 'area', 'path'].indexOf(type) !== -1) {
              tooltipMarkerType = 'circle';
              tooltipMarkerItems.push(tooltipItem);
            } else if (type === 'interval' && (coord.type === 'cartesian' || coord.type === 'rect')) {
              tooltipMarkerType = 'rect';
              tooltipItem.width = geom.getSize(record._origin);
              tooltipMarkerItems.push(tooltipItem);
            }
          }
        });
      }
    });

    if (items.length) {
      var tooltipMarkerCfg = {
        items: tooltipMarkerItems,
        type: tooltipMarkerType
      };

      self._setTooltip(point, items, tooltipMarkerCfg);
    } else {
      self.hideTooltip();
    }
  };

  _proto.hideTooltip = function hideTooltip() {
    var cfg = this._tooltipCfg;
    this._lastActive = null;
    var tooltip = this.tooltip;

    if (tooltip) {
      tooltip.hide();

      if (cfg.onHide) {
        cfg.onHide({
          tooltip: tooltip
        });
      }

      var canvas = this.chart.get('canvas');
      canvas.draw();
    }
  };

  _proto.handleShowEvent = function handleShowEvent(ev) {
    var chart = this.chart;
    if (!this.enable || chart.get('_closeTooltip')) return;
    var plot = chart.get('plotRange');
    var point = Util.createEvent(ev, chart);

    if (!Helper.isPointInPlot(point, plot) && !this._tooltipCfg.alwaysShow) {
      // not in chart plot
      this.hideTooltip();
      return;
    }

    var lastTimeStamp = this.timeStamp;
    var timeStamp = +new Date();

    if (timeStamp - lastTimeStamp > 16) {
      this.showTooltip(point);
      this.timeStamp = timeStamp;
    }
  };

  _proto.handleHideEvent = function handleHideEvent() {
    var chart = this.chart;
    if (!this.enable || chart.get('_closeTooltip')) return;
    this.hideTooltip();
  };

  _proto.handleDocEvent = function handleDocEvent(ev) {
    var chart = this.chart;
    if (!this.enable || chart.get('_closeTooltip')) return;
    var canvasDom = this.canvasDom;

    if (ev.target !== canvasDom) {
      this.hideTooltip();
    }
  };

  _proto._handleEvent = function _handleEvent(methodName, method, action) {
    var canvasDom = this.canvasDom;
    Util.each([].concat(methodName), function (aMethod) {
      if (action === 'bind') {
        Util.addEventListener(canvasDom, aMethod, method);
      } else {
        Util.removeEventListener(canvasDom, aMethod, method);
      }
    });
  };

  _proto.bindEvents = function bindEvents() {
    var cfg = this._tooltipCfg;
    var triggerOn = cfg.triggerOn,
        triggerOff = cfg.triggerOff,
        alwaysShow = cfg.alwaysShow;
    var showMethod = Util.wrapBehavior(this, 'handleShowEvent');
    var hideMethod = Util.wrapBehavior(this, 'handleHideEvent');
    triggerOn && this._handleEvent(triggerOn, showMethod, 'bind');
    triggerOff && this._handleEvent(triggerOff, hideMethod, 'bind'); // TODO: 当用户点击 canvas 外的事件时 tooltip 消失

    if (!alwaysShow) {
      var docMethod = Util.wrapBehavior(this, 'handleDocEvent');
      Util.isBrowser && Util.addEventListener(document, 'touchstart', docMethod);
    }
  };

  _proto.unBindEvents = function unBindEvents() {
    var cfg = this._tooltipCfg;
    var triggerOn = cfg.triggerOn,
        triggerOff = cfg.triggerOff,
        alwaysShow = cfg.alwaysShow;
    var showMethod = Util.getWrapBehavior(this, 'handleShowEvent');
    var hideMethod = Util.getWrapBehavior(this, 'handleHideEvent');
    triggerOn && this._handleEvent(triggerOn, showMethod, 'unBind');
    triggerOff && this._handleEvent(triggerOff, hideMethod, 'unBind');

    if (!alwaysShow) {
      var docMethod = Util.getWrapBehavior(this, 'handleDocEvent');
      Util.isBrowser && Util.removeEventListener(document, 'touchstart', docMethod);
    }
  };

  return TooltipController;
}();

module.exports = {
  init: function init(chart) {
    var tooltipController = new TooltipController({
      chart: chart
    });
    chart.set('tooltipController', tooltipController);

    chart.tooltip = function (enable, cfg) {
      if (Util.isObject(enable)) {
        cfg = enable;
        enable = true;
      }

      tooltipController.enable = enable;

      if (cfg) {
        tooltipController.cfg = cfg;
      }

      return this;
    };
  },
  afterGeomDraw: function afterGeomDraw(chart) {
    var tooltipController = chart.get('tooltipController');
    tooltipController.render();

    chart.showTooltip = function (point) {
      tooltipController.showTooltip(point);
      return this;
    };

    chart.hideTooltip = function () {
      tooltipController.hideTooltip();
      return this;
    };
  },
  clearInner: function clearInner(chart) {
    var tooltipController = chart.get('tooltipController');
    tooltipController.clear();
  }
};

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(0);

var Marker = __webpack_require__(49);

var Container = __webpack_require__(50);

var TextBox = __webpack_require__(151);

var GAP = 4;
/**
 * TODOList：
 * 1. 移除 fixed 参数
 */

var Tooltip =
/*#__PURE__*/
function () {
  var _proto = Tooltip.prototype;

  _proto.getDefaultCfg = function getDefaultCfg() {
    return {
      /**
       * wether show the crosshairs
       * @type {Object}
       */
      showCrosshairs: false,

      /**
       * the style for crosshairs
       * @type {Object}
       */
      crosshairsStyle: {
        stroke: 'rgba(0, 0, 0, 0.25)',
        lineWidth: 1
      },

      /**
       * the type of crosshairs, optional value is 'x', 'y' or 'xy', default is 'y'
       */
      crosshairsType: 'y',

      /**
       * show or hide the x axis tip
       */
      showXTip: false,

      /**
       * show or hide the y axis tip
       */
      showYTip: false,
      xTip: null,
      xTipBackground: {
        radius: 1,
        fill: 'rgba(0, 0, 0, 0.65)',
        padding: [3, 5]
      },
      yTip: null,
      yTipBackground: {
        radius: 1,
        fill: 'rgba(0, 0, 0, 0.65)',
        padding: [3, 5]
      },

      /**
       * the style for tooltip container's background
       * @type {Object}
       */
      background: null,

      /**
       * layout, can be horizontal or vertical
       * @type {String}
       */
      layout: 'horizontal',
      offsetX: 0,
      offsetY: 0
    };
  };

  function Tooltip(cfg) {
    Util.deepMix(this, this.getDefaultCfg(), cfg);
    var frontPlot = this.frontPlot,
        custom = this.custom;

    if (!custom) {
      // custom means user do customize
      var container = new Container(Util.mix({
        parent: frontPlot,
        zIndex: 3
      }, cfg));
      this.container = container;
      var fixed = this.fixed,
          background = this.background;

      if (!fixed) {
        this.tooltipArrow = frontPlot.addShape('Polygon', {
          className: 'tooltip-arrow',
          visible: false,
          zIndex: 2,
          attrs: Util.mix({
            points: []
          }, background)
        });
      }
    }

    if (this.showXTip) {
      var xTipBackground = this.xTipBackground;
      var xTipBox = new TextBox({
        className: 'xTip',
        background: xTipBackground,
        visible: false
      });
      frontPlot.add(xTipBox.container);
      this.xTipBox = xTipBox;
    }

    if (this.showYTip) {
      var yTipBackground = this.yTipBackground;
      var yTipBox = new TextBox({
        className: 'yTip',
        background: yTipBackground,
        visible: false
      });
      frontPlot.add(yTipBox.container);
      this.yTipBox = yTipBox;
    }

    if (this.showCrosshairs) {
      this._renderCrosshairs();
    }

    frontPlot.sort();
  }

  _proto.setContent = function setContent(title, items) {
    this.title = title;
    this.items = items;

    if (!this.custom) {
      var container = this.container;
      container.setTitle(title);
      container.setItems(items);
    }
  };

  _proto.setYTipContent = function setYTipContent(val) {
    var yTip = this.yTip;

    if (Util.isFunction(yTip)) {
      val = yTip(val);
    } else {
      val = Util.mix({
        text: val
      }, yTip);
    }

    this.yTipBox && this.yTipBox.updateContent(val);
  };

  _proto.setYTipPosition = function setYTipPosition(pos) {
    var plotRange = this.plotRange;
    var crosshairsShapeX = this.crosshairsShapeX;

    if (this.showYTip) {
      var yTipBox = this.yTipBox;
      var yTipHeight = yTipBox.getHeight();
      var yTipWidth = yTipBox.getWidth();
      var posX = plotRange.tl.x - yTipWidth;
      var posY = pos - yTipHeight / 2;

      if (posY <= plotRange.tl.y) {
        posY = plotRange.tl.y;
      }

      if (posY + yTipHeight >= plotRange.br.y) {
        posY = plotRange.br.y - yTipHeight;
      }

      if (posX < 0) {
        posX = plotRange.tl.x;
        crosshairsShapeX && crosshairsShapeX.attr('x1', plotRange.tl.x + yTipWidth);
      }

      yTipBox.updatePosition(posX, posY);
    }
  };

  _proto.setXTipContent = function setXTipContent(val) {
    var xTip = this.xTip;

    if (Util.isFunction(xTip)) {
      val = xTip(val);
    } else {
      val = Util.mix({
        text: val
      }, xTip);
    }

    this.xTipBox && this.xTipBox.updateContent(val);
  };

  _proto.setXTipPosition = function setXTipPosition(pos) {
    var showXTip = this.showXTip,
        canvas = this.canvas,
        plotRange = this.plotRange,
        xTipBox = this.xTipBox,
        crosshairsShapeY = this.crosshairsShapeY;

    if (showXTip) {
      // const el = canvas.get('el');
      // const canvasHeight = Util.getHeight(el);
      var canvasHeight = canvas.get('height');
      var xTipWidth = xTipBox.getWidth();
      var xTipHeight = xTipBox.getHeight();
      var posX = pos - xTipWidth / 2;
      var posY = plotRange.br.y;

      if (posX <= plotRange.tl.x) {
        posX = plotRange.tl.x;
      }

      if (posX + xTipWidth >= plotRange.tr.x) {
        posX = plotRange.tr.x - xTipWidth;
      }

      if (canvasHeight - posY < xTipHeight) {
        posY -= xTipHeight;
      }

      xTipBox.updatePosition(posX, posY);
      crosshairsShapeY && crosshairsShapeY.attr('y1', posY);
    }
  };

  _proto.setXCrosshairPosition = function setXCrosshairPosition(pos) {
    this.crosshairsShapeX && this.crosshairsShapeX.moveTo(0, pos);
  };

  _proto.setYCrosshairPosition = function setYCrosshairPosition(pos) {
    this.crosshairsShapeY && this.crosshairsShapeY.moveTo(pos, 0);
  };

  _proto.setPosition = function setPosition(items) {
    var container = this.container,
        plotRange = this.plotRange,
        offsetX = this.offsetX,
        offsetY = this.offsetY,
        fixed = this.fixed,
        tooltipArrow = this.tooltipArrow;

    if (!container) {
      return;
    }

    var containerBBox = container.container.getBBox();
    var minX = containerBBox.minX,
        minY = containerBBox.minY,
        width = containerBBox.width,
        height = containerBBox.height;
    var tl = plotRange.tl,
        tr = plotRange.tr;
    var posX = 0;
    var posY = tl.y - height - GAP + offsetY;

    if (fixed) {
      var x = (tl.x + tr.x) / 2;
      posX = x - width / 2 + offsetX;
    } else {
      var _x;

      if (items.length > 1) {
        _x = (items[0].x + items[items.length - 1].x) / 2;
      } else {
        _x = items[0].x;
      }

      posX = _x - width / 2 + offsetX;

      if (posX < tl.x) {
        posX = tl.x;
      }

      if (posX + width > tr.x) {
        posX = tr.x - width;
      }

      if (tooltipArrow) {
        tooltipArrow.attr('points', [{
          x: _x - 3,
          y: tl.y - GAP + offsetY
        }, {
          x: _x + 3,
          y: tl.y - GAP + offsetY
        }, {
          x: _x,
          y: tl.y + offsetY
        }]);
        var backShape = container.backShape;
        var radius = Util.parsePadding(backShape.attr('radius'));

        if (_x === tl.x) {
          radius[3] = 0;
          tooltipArrow.attr('points', [{
            x: tl.x,
            y: tl.y + offsetY
          }, {
            x: tl.x,
            y: tl.y - GAP + offsetY
          }, {
            x: tl.x + GAP,
            y: tl.y - GAP + offsetY
          }]);
        } else if (_x === tr.x) {
          radius[2] = 0;
          tooltipArrow.attr('points', [{
            x: tr.x,
            y: tl.y + offsetY
          }, {
            x: tr.x - GAP,
            y: tl.y - GAP + offsetY
          }, {
            x: tr.x,
            y: tl.y - GAP + offsetY
          }]);
        }

        backShape.attr('radius', radius);
      }
    }

    container.moveTo(posX - minX, posY - minY);
  };

  _proto.setMarkers = function setMarkers(cfg) {
    if (cfg === void 0) {
      cfg = {};
    }

    var self = this;
    var _cfg = cfg,
        items = _cfg.items,
        style = _cfg.style,
        type = _cfg.type;

    var markerGroup = self._getMarkerGroup(type);

    if (type === 'circle') {
      for (var i = 0, length = items.length; i < length; i++) {
        var item = items[i];
        var marker = new Marker({
          className: 'tooltip-circle-marker',
          attrs: Util.mix({
            x: item.x,
            y: item.y,
            stroke: item.color
          }, style)
        });
        markerGroup.add(marker);
      }
    } else {
      markerGroup.addShape('rect', {
        className: 'tooltip-rect-marker',
        attrs: style
      });
    }
  };

  _proto.clearMarkers = function clearMarkers() {
    var markerGroup = this.markerGroup;
    markerGroup && markerGroup.clear();
  };

  _proto.show = function show() {
    var crosshairsShapeX = this.crosshairsShapeX;
    var crosshairsShapeY = this.crosshairsShapeY;
    var markerGroup = this.markerGroup;
    var container = this.container;
    var tooltipArrow = this.tooltipArrow;
    var xTipBox = this.xTipBox;
    var yTipBox = this.yTipBox;
    var canvas = this.canvas;
    crosshairsShapeX && crosshairsShapeX.show();
    crosshairsShapeY && crosshairsShapeY.show();
    markerGroup && markerGroup.show();
    container && container.show();
    tooltipArrow && tooltipArrow.show();
    xTipBox && xTipBox.show();
    yTipBox && yTipBox.show();
    canvas.draw();
  };

  _proto.hide = function hide() {
    var crosshairsShapeX = this.crosshairsShapeX;
    var crosshairsShapeY = this.crosshairsShapeY;
    var markerGroup = this.markerGroup;
    var container = this.container;
    var tooltipArrow = this.tooltipArrow;
    var xTipBox = this.xTipBox;
    var yTipBox = this.yTipBox;
    crosshairsShapeX && crosshairsShapeX.hide();
    crosshairsShapeY && crosshairsShapeY.hide();
    markerGroup && markerGroup.hide();
    container && container.hide();
    tooltipArrow && tooltipArrow.hide();
    xTipBox && xTipBox.hide();
    yTipBox && yTipBox.hide();
  };

  _proto.destroy = function destroy() {
    var crosshairsShapeX = this.crosshairsShapeX;
    var crosshairsShapeY = this.crosshairsShapeY;
    var markerGroup = this.markerGroup;
    var container = this.container;
    var tooltipArrow = this.tooltipArrow;
    var xTipBox = this.xTipBox;
    var yTipBox = this.yTipBox;
    crosshairsShapeX && crosshairsShapeX.remove(true);
    crosshairsShapeY && crosshairsShapeY.remove(true);
    markerGroup && markerGroup.remove(true);
    tooltipArrow && tooltipArrow.remove(true);
    container && container.clear();
    xTipBox && xTipBox.clear();
    yTipBox && yTipBox.clear();
    this.destroyed = true;
  };

  _proto._getMarkerGroup = function _getMarkerGroup(type) {
    var markerGroup = this.markerGroup;

    if (!markerGroup) {
      if (type === 'circle') {
        markerGroup = this.frontPlot.addGroup({
          zIndex: 1
        });
        this.frontPlot.sort();
      } else {
        markerGroup = this.backPlot.addGroup();
      }

      this.markerGroup = markerGroup;
    } else {
      markerGroup.clear();
    }

    return markerGroup;
  };

  _proto._renderCrosshairs = function _renderCrosshairs() {
    var crosshairsType = this.crosshairsType,
        crosshairsStyle = this.crosshairsStyle,
        frontPlot = this.frontPlot,
        plotRange = this.plotRange;
    var tl = plotRange.tl,
        br = plotRange.br;

    if (Util.directionEnabled(crosshairsType, 'x')) {
      this.crosshairsShapeX = frontPlot.addShape('Line', {
        className: 'tooltip-crosshairs-x',
        zIndex: 0,
        visible: false,
        attrs: Util.mix({
          x1: tl.x,
          y1: 0,
          x2: br.x,
          y2: 0
        }, crosshairsStyle)
      });
    }

    if (Util.directionEnabled(crosshairsType, 'y')) {
      this.crosshairsShapeY = frontPlot.addShape('Line', {
        className: 'tooltip-crosshairs-y',
        zIndex: 0,
        visible: false,
        attrs: Util.mix({
          x1: 0,
          y1: br.y,
          x2: 0,
          y2: tl.y
        }, crosshairsStyle)
      });
    }
  };

  return Tooltip;
}();

module.exports = Tooltip;

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(0);

var _require = __webpack_require__(4),
    Group = _require.Group;

var TextBox =
/*#__PURE__*/
function () {
  var _proto = TextBox.prototype;

  _proto.getDefaultCfg = function getDefaultCfg() {
    return {
      x: 0,
      y: 0,
      content: '',
      textStyle: {
        fontSize: 12,
        fill: '#fff',
        textAlign: 'center',
        textBaseline: 'middle'
      },
      background: {
        radius: 1,
        fill: 'rgba(0, 0, 0, 0.65)',
        padding: [3, 5]
      },
      width: 0,
      height: 0,
      className: ''
    };
  };

  function TextBox(cfg) {
    Util.deepMix(this, this.getDefaultCfg(), cfg);

    this._init();

    var content = this.content,
        x = this.x,
        y = this.y;

    if (!Util.isNil(content)) {
      this.updateContent(content);
    }

    this.updatePosition(x, y);
  }

  _proto._init = function _init() {
    var content = this.content,
        textStyle = this.textStyle,
        background = this.background,
        className = this.className,
        visible = this.visible;
    var container = new Group({
      className: className,
      zIndex: 0,
      visible: visible
    });
    var text = container.addShape('Text', {
      className: className + '-text',
      zIndex: 1,
      attrs: Util.mix({
        text: content,
        x: 0,
        y: 0
      }, textStyle)
    });
    var backgroundShape = container.addShape('Rect', {
      className: className + '-bg',
      zIndex: -1,
      attrs: Util.mix({
        x: 0,
        y: 0,
        width: 0,
        height: 0
      }, background)
    });
    container.sort();
    this.container = container;
    this.textShape = text;
    this.backgroundShape = backgroundShape;
  };

  _proto._getBBox = function _getBBox() {
    var textShape = this.textShape;
    var background = this.background;
    var textBBox = textShape.getBBox();
    var padding = Util.parsePadding(background.padding);
    var width = textBBox.width + padding[1] + padding[3];
    var height = textBBox.height + padding[0] + padding[2];
    var x = textBBox.minX - padding[3];
    var y = textBBox.minY - padding[0];
    return {
      x: x,
      y: y,
      width: width,
      height: height
    };
  };

  _proto.updateContent = function updateContent(text) {
    var textShape = this.textShape,
        backgroundShape = this.backgroundShape;

    if (!Util.isNil(text)) {
      if (!Util.isObject(text)) {
        text = {
          text: text
        };
      }

      textShape.attr(text); // update box shape

      var _this$_getBBox = this._getBBox(),
          x = _this$_getBBox.x,
          y = _this$_getBBox.y,
          tipWidth = _this$_getBBox.width,
          tipHeight = _this$_getBBox.height;

      var width = this.width || tipWidth;
      var height = this.height || tipHeight;
      backgroundShape.attr({
        x: x,
        y: y,
        width: width,
        height: height
      });
      this._width = width;
      this._height = height;
      this.content = text.text;
    }
  };

  _proto.updatePosition = function updatePosition(x, y) {
    var container = this.container;

    var _this$_getBBox2 = this._getBBox(),
        xMin = _this$_getBBox2.x,
        yMin = _this$_getBBox2.y;

    container.moveTo(x - xMin, y - yMin);
    this.x = x - xMin;
    this.y = y - yMin;
  };

  _proto.getWidth = function getWidth() {
    return this._width;
  };

  _proto.getHeight = function getHeight() {
    return this._height;
  };

  _proto.show = function show() {
    this.container.show();
  };

  _proto.hide = function hide() {
    this.container.hide();
  };

  _proto.clear = function clear() {
    var container = this.container;
    container.clear();
    container.remove(true);
    this.container = null;
    this.textShape = null;
    this.backgroundShape = null;
  };

  return TextBox;
}();

module.exports = TextBox;

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(0);

var Guide = __webpack_require__(7);

var Global = __webpack_require__(1); // register the default configuration for Guide


Global.guide = Util.deepMix({
  line: {
    style: {
      stroke: '#a3a3a3',
      lineWidth: 1
    },
    top: true
  },
  text: {
    style: {
      fill: '#787878',
      textAlign: 'center',
      textBaseline: 'middle'
    },
    offsetX: 0,
    offsetY: 0,
    top: true
  },
  rect: {
    style: {
      fill: '#fafafa'
    },
    top: false
  },
  arc: {
    style: {
      stroke: '#a3a3a3'
    },
    top: true
  },
  html: {
    offsetX: 0,
    offsetY: 0,
    alignX: 'center',
    alignY: 'middle'
  },
  tag: {
    top: true,
    offsetX: 0,
    offsetY: 0,
    side: 4,
    background: {
      padding: 5,
      radius: 2,
      fill: '#1890FF'
    },
    textStyle: {
      fontSize: 12,
      fill: '#fff',
      textAlign: 'center',
      textBaseline: 'middle'
    }
  },
  point: {
    top: true,
    offsetX: 0,
    offsetY: 0,
    style: {
      fill: '#fff',
      r: 3,
      lineWidth: 2,
      stroke: '#1890ff'
    }
  }
}, Global.guide || {});

var GuideController =
/*#__PURE__*/
function () {
  function GuideController(cfg) {
    this.guides = [];
    this.xScale = null;
    this.yScales = null;
    this.guideShapes = [];
    Util.mix(this, cfg);
  }

  var _proto = GuideController.prototype;

  _proto._toString = function _toString(position) {
    if (Util.isFunction(position)) {
      position = position(this.xScale, this.yScales);
    }

    position = position.toString();
    return position;
  };

  _proto._getId = function _getId(shape, guide) {
    var id = guide.id;

    if (!id) {
      var type = guide.type;

      if (type === 'arc' || type === 'line' || type === 'rect') {
        id = this._toString(guide.start) + '-' + this._toString(guide.end);
      } else {
        id = this._toString(guide.position);
      }
    }

    return id;
  };

  _proto.paint = function paint(coord) {
    var self = this;
    var chart = self.chart,
        guides = self.guides,
        xScale = self.xScale,
        yScales = self.yScales;
    var guideShapes = [];
    Util.each(guides, function (guide, idx) {
      guide.xScale = xScale;
      guide.yScales = yScales;
      var container;

      if (guide.type === 'regionFilter') {
        // TODO: RegionFilter support animation
        guide.chart = chart;
      } else {
        container = guide.top ? self.frontPlot : self.backPlot;
      }

      guide.coord = coord;
      guide.container = container;
      guide.canvas = chart.get('canvas');
      var shape = guide.render(coord, container);

      if (shape) {
        var id = self._getId(shape, guide);

        [].concat(shape).forEach(function (s) {
          s._id = s.get('className') + '-' + id;
          s.set('index', idx);
          guideShapes.push(s);
        });
      }
    });
    self.guideShapes = guideShapes;
  };

  _proto.clear = function clear() {
    this.reset();
    this.guides = [];
    return this;
  };

  _proto.reset = function reset() {
    var guides = this.guides;
    Util.each(guides, function (guide) {
      guide.remove();
    });
  };

  _proto._createGuide = function _createGuide(type, cfg) {
    var ClassName = Util.upperFirst(type);
    var guide = new Guide[ClassName](Util.deepMix({}, Global.guide[type], cfg));
    this.guides.push(guide);
    return guide;
  };

  _proto.line = function line(cfg) {
    if (cfg === void 0) {
      cfg = {};
    }

    return this._createGuide('line', cfg);
  };

  _proto.text = function text(cfg) {
    if (cfg === void 0) {
      cfg = {};
    }

    return this._createGuide('text', cfg);
  };

  _proto.arc = function arc(cfg) {
    if (cfg === void 0) {
      cfg = {};
    }

    return this._createGuide('arc', cfg);
  };

  _proto.html = function html(cfg) {
    if (cfg === void 0) {
      cfg = {};
    }

    return this._createGuide('html', cfg);
  };

  _proto.rect = function rect(cfg) {
    if (cfg === void 0) {
      cfg = {};
    }

    return this._createGuide('rect', cfg);
  };

  _proto.tag = function tag(cfg) {
    if (cfg === void 0) {
      cfg = {};
    }

    return this._createGuide('tag', cfg);
  };

  _proto.point = function point(cfg) {
    if (cfg === void 0) {
      cfg = {};
    }

    return this._createGuide('point', cfg);
  };

  _proto.regionFilter = function regionFilter(cfg) {
    if (cfg === void 0) {
      cfg = {};
    }

    return this._createGuide('regionFilter', cfg);
  };

  return GuideController;
}();

module.exports = {
  init: function init(chart) {
    var guideController = new GuideController({
      frontPlot: chart.get('frontPlot').addGroup({
        zIndex: 20,
        className: 'guideContainer'
      }),
      backPlot: chart.get('backPlot').addGroup({
        className: 'guideContainer'
      })
    });
    chart.set('guideController', guideController);
    /**
     * 为图表添加 guide
     * @return {GuideController} 返回 guide 控制器
     */

    chart.guide = function () {
      return guideController;
    };
  },
  afterGeomDraw: function afterGeomDraw(chart) {
    var guideController = chart.get('guideController');

    if (!guideController.guides.length) {
      return;
    }

    var xScale = chart.getXScale();
    var yScales = chart.getYScales();
    var coord = chart.get('coord');
    guideController.xScale = xScale;
    guideController.yScales = yScales;
    guideController.chart = chart; // for regionFilter

    guideController.paint(coord);
  },
  clear: function clear(chart) {
    chart.get('guideController').clear();
  },
  repaint: function repaint(chart) {
    chart.get('guideController').reset();
  }
};

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(0);

var List = __webpack_require__(50);

var Global = __webpack_require__(1);

var LEGEND_GAP = 12;
var MARKER_SIZE = 3;
var DEFAULT_CFG = {
  itemMarginBottom: 12,
  itemGap: 10,
  showTitle: false,
  titleStyle: {
    fontSize: 12,
    fill: '#808080',
    textAlign: 'start',
    textBaseline: 'top'
  },
  nameStyle: {
    fill: '#808080',
    fontSize: 12,
    textAlign: 'start',
    textBaseline: 'middle'
  },
  valueStyle: {
    fill: '#000000',
    fontSize: 12,
    textAlign: 'start',
    textBaseline: 'middle'
  },
  unCheckStyle: {
    fill: '#bfbfbf'
  },
  itemWidth: 'auto',
  wordSpace: 6,
  selectedMode: 'multiple' // 'multiple' or 'single'

}; // Register the default configuration for Legend

Global.legend = Util.deepMix({
  common: DEFAULT_CFG,
  // common legend configuration
  right: Util.mix({
    position: 'right',
    layout: 'vertical'
  }, DEFAULT_CFG),
  left: Util.mix({
    position: 'left',
    layout: 'vertical'
  }, DEFAULT_CFG),
  top: Util.mix({
    position: 'top',
    layout: 'horizontal'
  }, DEFAULT_CFG),
  bottom: Util.mix({
    position: 'bottom',
    layout: 'horizontal'
  }, DEFAULT_CFG)
}, Global.legend || {});

function getPaddingByPos(pos, appendPadding) {
  var padding = 0;
  appendPadding = Util.parsePadding(appendPadding);

  switch (pos) {
    case 'top':
      padding = appendPadding[0];
      break;

    case 'right':
      padding = appendPadding[1];
      break;

    case 'bottom':
      padding = appendPadding[2];
      break;

    case 'left':
      padding = appendPadding[3];
      break;

    default:
      break;
  }

  return padding;
}

var LegendController =
/*#__PURE__*/
function () {
  function LegendController(cfg) {
    this.legendCfg = {};
    this.enable = true;
    this.position = 'top';
    Util.mix(this, cfg);
    var chart = this.chart;
    this.canvasDom = chart.get('canvas').get('el');
    this.clear();
  }

  var _proto = LegendController.prototype;

  _proto.addLegend = function addLegend(scale, items, filteredVals) {
    var self = this;
    var legendCfg = self.legendCfg;
    var field = scale.field;
    var fieldCfg = legendCfg[field];

    if (fieldCfg === false) {
      return null;
    }

    if (fieldCfg && fieldCfg.custom) {
      self.addCustomLegend(field);
    } else {
      var position = legendCfg.position || self.position;

      if (fieldCfg && fieldCfg.position) {
        position = fieldCfg.position;
      }

      if (scale.isCategory) {
        self._addCategoryLegend(scale, items, position, filteredVals);
      }
    }
  };

  _proto.addCustomLegend = function addCustomLegend(field) {
    var self = this;
    var legendCfg = self.legendCfg;

    if (field && legendCfg[field]) {
      legendCfg = legendCfg[field];
    }

    var position = legendCfg.position || self.position;
    var legends = self.legends;
    legends[position] = legends[position] || [];
    var items = legendCfg.items;

    if (!items) {
      return null;
    }

    var container = self.container;
    Util.each(items, function (item) {
      if (!Util.isPlainObject(item.marker)) {
        item.marker = {
          symbol: item.marker || 'circle',
          fill: item.fill,
          radius: MARKER_SIZE
        };
      } else {
        item.marker.radius = item.marker.radius || MARKER_SIZE;
      }

      item.checked = Util.isNil(item.checked) ? true : item.checked;
      item.name = item.name || item.value;
    });
    var legend = new List(Util.deepMix({}, Global.legend[position], legendCfg, {
      maxLength: self._getMaxLength(position),
      items: items,
      parent: container
    }));
    legends[position].push(legend);
  };

  _proto.clear = function clear() {
    var legends = this.legends;
    Util.each(legends, function (legendItems) {
      Util.each(legendItems, function (legend) {
        legend.clear();
      });
    });
    this.legends = {};
    this.unBindEvents();
  };

  _proto._isFiltered = function _isFiltered(scale, values, value) {
    var rst = false;
    Util.each(values, function (val) {
      rst = rst || scale.getText(val) === scale.getText(value);

      if (rst) {
        return false;
      }
    });
    return rst;
  };

  _proto._getMaxLength = function _getMaxLength(position) {
    var chart = this.chart;
    var appendPadding = Util.parsePadding(chart.get('appendPadding'));
    return position === 'right' || position === 'left' ? chart.get('height') - (appendPadding[0] + appendPadding[2]) : chart.get('width') - (appendPadding[1] + appendPadding[3]);
  };

  _proto._addCategoryLegend = function _addCategoryLegend(scale, items, position, filteredVals) {
    var self = this;
    var legendCfg = self.legendCfg,
        legends = self.legends,
        container = self.container,
        chart = self.chart;
    var field = scale.field;
    legends[position] = legends[position] || [];
    var symbol = 'circle';

    if (legendCfg[field] && legendCfg[field].marker) {
      symbol = legendCfg[field].marker;
    } else if (legendCfg.marker) {
      symbol = legendCfg.marker;
    }

    Util.each(items, function (item) {
      if (Util.isPlainObject(symbol)) {
        Util.mix(item.marker, symbol);
      } else {
        item.marker.symbol = symbol;
      }

      if (filteredVals) {
        item.checked = !self._isFiltered(scale, filteredVals, item.dataValue);
      }
    });
    var legendItems = chart.get('legendItems');
    legendItems[field] = items;
    var lastCfg = Util.deepMix({}, Global.legend[position], legendCfg[field] || legendCfg, {
      maxLength: self._getMaxLength(position),
      items: items,
      field: field,
      filteredVals: filteredVals,
      parent: container
    });

    if (lastCfg.showTitle) {
      Util.deepMix(lastCfg, {
        title: scale.alias || scale.field
      });
    }

    var legend = new List(lastCfg);
    legends[position].push(legend);
    return legend;
  };

  _proto._alignLegend = function _alignLegend(legend, pre, position) {
    var self = this;
    var _self$plotRange = self.plotRange,
        tl = _self$plotRange.tl,
        bl = _self$plotRange.bl;
    var chart = self.chart;
    var offsetX = legend.offsetX || 0;
    var offsetY = legend.offsetY || 0;
    var chartWidth = chart.get('width');
    var chartHeight = chart.get('height');
    var appendPadding = Util.parsePadding(chart.get('appendPadding'));
    var legendHeight = legend.getHeight();
    var legendWidth = legend.getWidth();
    var x = 0;
    var y = 0;

    if (position === 'left' || position === 'right') {
      var verticalAlign = legend.verticalAlign || 'middle';
      var height = Math.abs(tl.y - bl.y);
      x = position === 'left' ? appendPadding[3] : chartWidth - legendWidth - appendPadding[1];
      y = (height - legendHeight) / 2 + tl.y;

      if (verticalAlign === 'top') {
        y = tl.y;
      } else if (verticalAlign === 'bottom') {
        y = bl.y - legendHeight;
      }

      if (pre) {
        y = pre.get('y') - legendHeight - LEGEND_GAP;
      }
    } else {
      var align = legend.align || 'left';
      x = appendPadding[3];

      if (align === 'center') {
        x = chartWidth / 2 - legendWidth / 2;
      } else if (align === 'right') {
        x = chartWidth - (legendWidth + appendPadding[1]);
      }

      y = position === 'top' ? appendPadding[0] + Math.abs(legend.container.getBBox().minY) : chartHeight - legendHeight;

      if (pre) {
        var preWidth = pre.getWidth();
        x = pre.x + preWidth + LEGEND_GAP;
      }
    }

    if (position === 'bottom' && offsetY > 0) {
      offsetY = 0;
    }

    if (position === 'right' && offsetX > 0) {
      offsetX = 0;
    }

    legend.moveTo(x + offsetX, y + offsetY);
  };

  _proto.alignLegends = function alignLegends() {
    var self = this;
    var legends = self.legends;
    Util.each(legends, function (legendItems, position) {
      Util.each(legendItems, function (legend, index) {
        var pre = legendItems[index - 1];

        self._alignLegend(legend, pre, position);
      });
    });
    return self;
  };

  _proto.handleEvent = function handleEvent(ev) {
    var self = this;

    function findItem(x, y) {
      var result = null;
      var legends = self.legends;
      Util.each(legends, function (legendItems) {
        Util.each(legendItems, function (legend) {
          var itemsGroup = legend.itemsGroup,
              legendHitBoxes = legend.legendHitBoxes;
          var children = itemsGroup.get('children');

          if (children.length) {
            var legendPosX = legend.x;
            var legendPosY = legend.y;
            Util.each(legendHitBoxes, function (box, index) {
              if (x >= box.x + legendPosX && x <= box.x + box.width + legendPosX && y >= box.y + legendPosY && y <= box.height + box.y + legendPosY) {
                // inbox
                result = {
                  clickedItem: children[index],
                  clickedLegend: legend
                };
                return false;
              }
            });
          }
        });
      });
      return result;
    }

    var chart = self.chart;

    var _Util$createEvent = Util.createEvent(ev, chart),
        x = _Util$createEvent.x,
        y = _Util$createEvent.y;

    var clicked = findItem(x, y);

    if (clicked && clicked.clickedLegend.clickable !== false) {
      var clickedItem = clicked.clickedItem,
          clickedLegend = clicked.clickedLegend;

      if (clickedLegend.onClick) {
        ev.clickedItem = clickedItem;
        clickedLegend.onClick(ev);
      } else if (!clickedLegend.custom) {
        var checked = clickedItem.get('checked');
        var value = clickedItem.get('dataValue');
        var filteredVals = clickedLegend.filteredVals,
            field = clickedLegend.field,
            selectedMode = clickedLegend.selectedMode;
        var isSingeSelected = selectedMode === 'single';

        if (isSingeSelected) {
          chart.filter(field, function (val) {
            return val === value;
          });
        } else {
          if (checked) {
            filteredVals.push(value);
          } else {
            Util.Array.remove(filteredVals, value);
          }

          chart.filter(field, function (val) {
            return filteredVals.indexOf(val) === -1;
          });
        }

        chart.repaint();
      }
    }
  };

  _proto.bindEvents = function bindEvents() {
    var legendCfg = this.legendCfg;
    var triggerOn = legendCfg.triggerOn || 'touchstart';
    var method = Util.wrapBehavior(this, 'handleEvent');
    Util.addEventListener(this.canvasDom, triggerOn, method);
  };

  _proto.unBindEvents = function unBindEvents() {
    var legendCfg = this.legendCfg;
    var triggerOn = legendCfg.triggerOn || 'touchstart';
    var method = Util.getWrapBehavior(this, 'handleEvent');
    Util.removeEventListener(this.canvasDom, triggerOn, method);
  };

  return LegendController;
}();

module.exports = {
  init: function init(chart) {
    var legendController = new LegendController({
      container: chart.get('backPlot'),
      plotRange: chart.get('plotRange'),
      chart: chart
    });
    chart.set('legendController', legendController);

    chart.legend = function (field, cfg) {
      var legendCfg = legendController.legendCfg;
      legendController.enable = true;

      if (Util.isBoolean(field)) {
        legendController.enable = field;
        legendCfg = cfg || {};
      } else if (Util.isObject(field)) {
        legendCfg = field;
      } else {
        legendCfg[field] = cfg;
      }

      legendController.legendCfg = legendCfg;
      return this;
    };
  },
  beforeGeomDraw: function beforeGeomDraw(chart) {
    var legendController = chart.get('legendController');
    if (!legendController.enable) return null; // legend is not displayed

    var legendCfg = legendController.legendCfg;

    if (legendCfg && legendCfg.custom) {
      legendController.addCustomLegend();
    } else {
      var legendItems = chart.getLegendItems();
      var scales = chart.get('scales');
      var filters = chart.get('filters');
      Util.each(legendItems, function (items, field) {
        var scale = scales[field];
        var values = scale.values;
        var filteredVals;

        if (filters && filters[field]) {
          filteredVals = values.filter(function (v) {
            return !filters[field](v);
          });
        } else {
          filteredVals = [];
        }

        legendController.addLegend(scale, items, filteredVals);
      });
    }

    if (legendCfg && legendCfg.clickable !== false) {
      legendController.bindEvents();
    }

    var legends = legendController.legends;
    var legendRange = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
    Util.each(legends, function (legendItems, position) {
      var padding = 0;
      Util.each(legendItems, function (legend) {
        var width = legend.getWidth();
        var height = legend.getHeight();

        if (position === 'top' || position === 'bottom') {
          padding = Math.max(padding, height);

          if (legend.offsetY > 0) {
            padding += legend.offsetY;
          }
        } else {
          padding = Math.max(padding, width);

          if (legend.offsetX > 0) {
            padding += legend.offsetX;
          }
        }
      });
      legendRange[position] = padding + getPaddingByPos(position, chart.get('appendPadding'));
    });
    chart.set('legendRange', legendRange);
  },
  afterGeomDraw: function afterGeomDraw(chart) {
    var legendController = chart.get('legendController');
    legendController.alignLegends();
  },
  clearInner: function clearInner(chart) {
    var legendController = chart.get('legendController');
    legendController.clear();
    chart.set('legendRange', null);
  }
};

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Handle the detail animations
 * @author sima.zhang1990@gmail.com
 */
var Util = __webpack_require__(0);

var Element = __webpack_require__(24);

var Timeline = __webpack_require__(155);

var Animator = __webpack_require__(156);

var Animate = __webpack_require__(51);

var ShapeAction = __webpack_require__(158);

var GroupAction = __webpack_require__(159);

var Chart = __webpack_require__(34);

var timeline;

Element.prototype.animate = function () {
  var attrs = Util.mix({}, this.get('attrs'));
  return new Animator(this, attrs, timeline);
};

Chart.prototype.animate = function (cfg) {
  this.set('animate', cfg);
  return this;
};

Animate.Action = ShapeAction;
Animate.defaultCfg = {
  interval: {
    enter: function enter(coord) {
      if (coord.isPolar && coord.transposed) {
        // for pie chart
        return function (shape) {
          shape.set('zIndex', -1);
          var container = shape.get('parent');
          container.sort();
        };
      }

      return ShapeAction.fadeIn;
    }
  },
  area: {
    enter: function enter(coord) {
      if (coord.isPolar) return null;
      return ShapeAction.fadeIn;
    }
  },
  line: {
    enter: function enter(coord) {
      if (coord.isPolar) return null;
      return ShapeAction.fadeIn;
    }
  },
  path: {
    enter: function enter(coord) {
      if (coord.isPolar) return null;
      return ShapeAction.fadeIn;
    }
  }
};
var GROUP_ANIMATION = {
  line: function line(coord) {
    if (coord.isPolar) {
      return GroupAction.groupScaleInXY;
    }

    return GroupAction.groupWaveIn;
  },
  area: function area(coord) {
    if (coord.isPolar) {
      return GroupAction.groupScaleInXY;
    }

    return GroupAction.groupWaveIn;
  },
  path: function path(coord) {
    if (coord.isPolar) {
      return GroupAction.groupScaleInXY;
    }

    return GroupAction.groupWaveIn;
  },
  point: function point() {
    return GroupAction.shapesScaleInXY;
  },
  interval: function interval(coord) {
    var result;

    if (coord.isPolar) {
      // polar coodinate
      result = GroupAction.groupScaleInXY;

      if (coord.transposed) {
        // pie chart
        result = GroupAction.groupWaveIn;
      }
    } else {
      result = coord.transposed ? GroupAction.groupScaleInX : GroupAction.groupScaleInY;
    }

    return result;
  },
  schema: function schema() {
    return GroupAction.groupWaveIn;
  }
};

function diff(fromAttrs, toAttrs) {
  var endState = {};

  for (var k in toAttrs) {
    if (Util.isNumber(fromAttrs[k]) && fromAttrs[k] !== toAttrs[k]) {
      endState[k] = toAttrs[k];
    } else if (Util.isArray(fromAttrs[k]) && JSON.stringify(fromAttrs[k]) !== JSON.stringify(toAttrs[k])) {
      endState[k] = toAttrs[k];
    }
  }

  return endState;
} // Add a unique id identifier to each shape


function _getShapeId(geom, dataObj, geomIdx) {
  var type = geom.get('type');
  var id = 'geom' + geomIdx + '-' + type;
  var xScale = geom.getXScale();
  var yScale = geom.getYScale();
  var xField = xScale.field || 'x';
  var yField = yScale.field || 'y';
  var yVal = dataObj[yField];
  var xVal;

  if (xScale.isIdentity) {
    xVal = xScale.value;
  } else {
    xVal = dataObj[xField];
  }

  if (type === 'interval' || type === 'schema') {
    id += '-' + xVal;
  } else if (type === 'line' || type === 'area' || type === 'path') {
    id += '-' + type;
  } else {
    id += xScale.isCategory ? '-' + xVal : '-' + xVal + '-' + yVal;
  }

  var groupScales = geom._getGroupScales();

  Util.each(groupScales, function (groupScale) {
    var field = groupScale.field;

    if (groupScale.type !== 'identity') {
      id += '-' + dataObj[field];
    }
  });
  return id;
} // get geometry's shapes


function getShapes(geoms, chart, coord) {
  var shapes = [];
  Util.each(geoms, function (geom, geomIdx) {
    var geomContainer = geom.get('container');
    var geomShapes = geomContainer.get('children');
    var type = geom.get('type');
    var animateCfg = Util.isNil(geom.get('animateCfg')) ? _getAnimateCfgByShapeType(type, chart) : geom.get('animateCfg');

    if (animateCfg !== false) {
      Util.each(geomShapes, function (shape, index) {
        if (shape.get('className') === type) {
          shape._id = _getShapeId(geom, shape.get('origin')._origin, geomIdx);
          shape.set('coord', coord);
          shape.set('animateCfg', animateCfg);
          shape.set('index', index);
          shapes.push(shape);
        }
      });
    }

    geom.set('shapes', geomShapes);
  });
  return shapes;
}

function cache(shapes) {
  var rst = {};

  for (var i = 0, len = shapes.length; i < len; i++) {
    var shape = shapes[i];
    if (!shape._id || shape.isClip) continue;
    var id = shape._id;
    rst[id] = {
      _id: id,
      type: shape.get('type'),
      // the type of shape
      attrs: Util.mix({}, shape._attrs.attrs),
      // the graphics attributes of shape
      className: shape.get('className'),
      geomType: shape.get('className'),
      index: shape.get('index'),
      coord: shape.get('coord'),
      animateCfg: shape.get('animateCfg')
    };
  }

  return rst;
}

function getAnimate(geomType, coord, animationType, animationName) {
  var result;

  if (Util.isFunction(animationName)) {
    result = animationName;
  } else if (Util.isString(animationName)) {
    result = Animate.Action[animationName];
  } else {
    result = Animate.getAnimation(geomType, coord, animationType);
  }

  return result;
}

function getAnimateCfg(geomType, animationType, animateCfg) {
  if (animateCfg === false || Util.isObject(animateCfg) && animateCfg[animationType] === false) {
    return false;
  }

  var defaultCfg = Animate.getAnimateCfg(geomType, animationType);

  if (animateCfg && animateCfg[animationType]) {
    return Util.deepMix({}, defaultCfg, animateCfg[animationType]);
  }

  return defaultCfg;
}

function addAnimate(cache, shapes, canvas) {
  var animate;
  var animateCfg; // the order of animation: leave -> update -> enter

  var updateShapes = [];
  var newShapes = [];
  Util.each(shapes, function (shape) {
    var result = cache[shape._id];

    if (!result) {
      newShapes.push(shape);
    } else {
      shape.set('cacheShape', result);
      updateShapes.push(shape);
      delete cache[shape._id];
    }
  }); // first do the leave animation

  Util.each(cache, function (deletedShape) {
    var className = deletedShape.className,
        coord = deletedShape.coord,
        _id = deletedShape._id,
        attrs = deletedShape.attrs,
        index = deletedShape.index,
        type = deletedShape.type;
    animateCfg = getAnimateCfg(className, 'leave', deletedShape.animateCfg);
    if (animateCfg === false) return true;
    animate = getAnimate(className, coord, 'leave', animateCfg.animation);

    if (Util.isFunction(animate)) {
      var tempShape = canvas.addShape(type, {
        attrs: attrs,
        index: index,
        canvas: canvas,
        className: className
      });
      tempShape._id = _id;
      animate(tempShape, animateCfg, coord);
    }
  }); // then do the update animation

  Util.each(updateShapes, function (updateShape) {
    var className = updateShape.get('className');
    animateCfg = getAnimateCfg(className, 'update', updateShape.get('animateCfg'));
    if (animateCfg === false) return true;
    var coord = updateShape.get('coord');
    var cacheAttrs = updateShape.get('cacheShape').attrs;
    var endState = diff(cacheAttrs, updateShape._attrs.attrs); // 判断如果属性相同的话就不进行变换

    if (Object.keys(endState).length) {
      animate = getAnimate(className, coord, 'update', animateCfg.animation);

      if (Util.isFunction(animate)) {
        animate(updateShape, animateCfg, coord);
      } else {
        updateShape.attr(cacheAttrs);
        updateShape.animate().to({
          attrs: endState,
          duration: animateCfg.duration,
          easing: animateCfg.easing,
          delay: animateCfg.delay
        }).onEnd(function () {
          updateShape.set('cacheShape', null);
        });
      }
    }
  }); // last, enter animation

  Util.each(newShapes, function (newShape) {
    // 新图形元素的进场元素
    var className = newShape.get('className');
    var coord = newShape.get('coord');
    animateCfg = getAnimateCfg(className, 'enter', newShape.get('animateCfg'));
    if (animateCfg === false) return true;
    animate = getAnimate(className, coord, 'enter', animateCfg.animation);

    if (Util.isFunction(animate)) {
      if (className === 'interval' && coord.isPolar && coord.transposed) {
        var index = newShape.get('index');
        var lastShape = updateShapes[index - 1];
        animate(newShape, animateCfg, lastShape);
      } else {
        animate(newShape, animateCfg, coord);
      }
    }
  });
}

function _getAnimateCfgByShapeType(type, chart) {
  if (!type) {
    return null;
  }

  var animateCfg = chart.get('animate');

  if (type.indexOf('guide-tag') > -1) {
    type = 'guide-tag';
  }

  if (Util.isObject(animateCfg)) {
    return animateCfg[type];
  }

  if (animateCfg === false) {
    return false;
  }

  return null;
}

module.exports = {
  afterCanvasInit: function afterCanvasInit()
  /* chart */
  {
    timeline = new Timeline();
    timeline.play();
  },
  beforeCanvasDraw: function beforeCanvasDraw(chart) {
    if (chart.get('animate') === false) {
      return;
    }

    var isUpdate = chart.get('isUpdate');
    var canvas = chart.get('canvas');
    var coord = chart.get('coord');
    var geoms = chart.get('geoms');
    var caches = canvas.get('caches') || [];

    if (caches.length === 0) {
      isUpdate = false;
    }

    var cacheShapes = getShapes(geoms, chart, coord);

    var _chart$get = chart.get('axisController'),
        frontPlot = _chart$get.frontPlot,
        backPlot = _chart$get.backPlot;

    var axisShapes = frontPlot.get('children').concat(backPlot.get('children'));
    var guideShapes = [];

    if (chart.get('guideController')) {
      guideShapes = chart.get('guideController').guideShapes;
    }

    var componentShapes = [];
    axisShapes.concat(guideShapes).forEach(function (s) {
      var className = s.get('className');

      var animateCfg = _getAnimateCfgByShapeType(className, chart);

      s.set('coord', coord);
      s.set('animateCfg', animateCfg);
      componentShapes.push(s);
      cacheShapes.push(s);
    });
    canvas.set('caches', cache(cacheShapes));

    if (isUpdate) {
      addAnimate(caches, cacheShapes, canvas);
    } else {
      // do the appear animation
      var animateCfg;
      var animate;
      Util.each(geoms, function (geom) {
        var type = geom.get('type');
        var geomCfg = Util.isNil(geom.get('animateCfg')) ? _getAnimateCfgByShapeType(type, chart) : geom.get('animateCfg');

        if (geomCfg !== false) {
          animateCfg = getAnimateCfg(type, 'appear', geomCfg);
          animate = getAnimate(type, coord, 'appear', animateCfg.animation);

          if (Util.isFunction(animate)) {
            var shapes = geom.get('shapes');
            Util.each(shapes, function (shape) {
              animate(shape, animateCfg, coord);
            });
          } else if (GROUP_ANIMATION[type]) {
            // do the default animation
            animate = GroupAction[animateCfg.animation] || GROUP_ANIMATION[type](coord);
            var yScale = geom.getYScale();
            var zeroY = coord.convertPoint({
              x: 0,
              y: yScale.scale(geom.getYMinValue())
            });
            var container = geom.get('container');
            animate && animate(container, animateCfg, coord, zeroY);
          }
        }
      }); // do the animation of components

      Util.each(componentShapes, function (shape) {
        var animateCfg = shape.get('animateCfg');
        var className = shape.get('className');

        if (animateCfg && animateCfg.appear) {
          // if user configure
          var defaultCfg = Animate.getAnimateCfg(className, 'appear');
          var appearCfg = Util.deepMix({}, defaultCfg, animateCfg.appear);

          var _animate = getAnimate(className, coord, 'appear', appearCfg.animation);

          if (Util.isFunction(_animate)) {
            _animate(shape, appearCfg, coord);
          }
        }
      });
    }
  },
  afterCanvasDestroyed: function afterCanvasDestroyed()
  /* chart */
  {
    timeline.stop();
  }
};

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(43),
    requestAnimationFrame = _require.requestAnimationFrame;

var clock = typeof performance === 'object' && performance.now ? performance : Date;

var Timeline =
/*#__PURE__*/
function () {
  function Timeline() {
    this.anims = [];
    this.time = null;
    this.playing = false;
    this.canvas = [];
  }

  var _proto = Timeline.prototype;

  _proto.play = function play() {
    var self = this;
    self.time = clock.now();
    self.playing = true;

    function step() {
      if (self.playing) {
        requestAnimationFrame(step);
        self.update();
      }
    }

    requestAnimationFrame(step);
  };

  _proto.stop = function stop() {
    this.playing = false;
    this.time = null;
    this.canvas = [];
  };

  _proto.update = function update() {
    var currentTime = clock.now();
    this.canvas = [];

    for (var i = 0; i < this.anims.length; i++) {
      var propertyAnim = this.anims[i];

      if (currentTime < propertyAnim.startTime || propertyAnim.hasEnded) {
        continue;
      }

      var shape = propertyAnim.shape; // shape

      if (shape.get('destroyed')) {
        this.anims.splice(i, 1);
        i--;
        continue;
      }

      var startState = propertyAnim.startState,
          endState = propertyAnim.endState,
          interpolate = propertyAnim.interpolate,
          duration = propertyAnim.duration;

      if (currentTime >= propertyAnim.startTime && !propertyAnim.hasStarted) {
        propertyAnim.hasStarted = true;

        if (propertyAnim.onStart) {
          propertyAnim.onStart();
        }
      }

      var t = (currentTime - propertyAnim.startTime) / duration;
      t = Math.max(0, Math.min(t, 1));
      t = propertyAnim.easing(t);

      if (propertyAnim.onFrame) {
        propertyAnim.onFrame(t);
      } else {
        for (var key in interpolate) {
          var diff = interpolate[key];
          var value = diff(t);
          var newValue = void 0;

          if (key === 'points') {
            newValue = [];
            var aLen = Math.max(startState.points.length, endState.points.length);

            for (var j = 0; j < aLen; j += 2) {
              newValue.push({
                x: value[j],
                y: value[j + 1]
              });
            }
          } else {
            newValue = value;
          }

          shape._attrs.attrs[key] = newValue;
          shape._attrs.bbox = null; // should clear calculated bbox
        }
      }

      var canvas = shape.get('canvas');

      if (this.canvas.indexOf(canvas) === -1) {
        this.canvas.push(canvas);
      }

      if (propertyAnim.onUpdate) {
        propertyAnim.onUpdate(t);
      }

      if (currentTime >= propertyAnim.endTime && !propertyAnim.hasEnded) {
        propertyAnim.hasEnded = true;

        if (propertyAnim.onEnd) {
          propertyAnim.onEnd();
        }
      }

      if (t === 1) {
        // end
        this.anims.splice(i, 1);
        i--;
      }
    }

    this.canvas.map(function (c) {
      c.draw();
      return c;
    });
    this.time = clock.now();
  };

  return Timeline;
}();

module.exports = Timeline;

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

var Easing = __webpack_require__(157);

function plainArray(arr) {
  var result = [];

  for (var i = 0, len = arr.length; i < len; i++) {
    if (arr[i]) {
      result.push(arr[i].x);
      result.push(arr[i].y);
    }
  }

  return result;
}

function interpolateNumber(a, b) {
  a = +a;
  b -= a;
  return function (t) {
    return a + b * t;
  };
}

function interpolateArray(a, b) {
  var nb = b ? b.length : 0;
  var na = a ? Math.min(nb, a.length) : 0;
  var x = new Array(na);
  var c = new Array(nb);
  var i;

  for (i = 0; i < na; ++i) {
    x[i] = interpolateNumber(a[i], b[i]);
  }

  for (; i < nb; ++i) {
    c[i] = b[i];
  }

  return function (t) {
    for (i = 0; i < na; ++i) {
      c[i] = x[i](t);
    }

    return c;
  };
}

var Animator =
/*#__PURE__*/
function () {
  function Animator(shape, source, timeline) {
    this.hasStarted = false;
    this.hasEnded = false;
    this.shape = shape;
    this.source = source;
    this.timeline = timeline;
    this.animate = null;
  } // delay, attrs, duration, easing


  var _proto = Animator.prototype;

  _proto.to = function to(cfg) {
    if (cfg === void 0) {
      cfg = {};
    }

    var delay = cfg.delay || 0;
    var attrs = cfg.attrs || {};
    var duration = cfg.duration || 1000;
    var easing; // 缓动函数

    if (typeof cfg.easing === 'function') {
      easing = cfg.easing;
    } else {
      easing = Easing[cfg.easing] || Easing.linear;
    }

    var animInfo = {
      shape: this.shape,
      startTime: this.timeline.time + delay,
      duration: duration,
      easing: easing
    };
    var interpolate = {}; // 差值函数

    for (var attrName in attrs) {
      var startValue = this.source[attrName];
      var endValue = attrs[attrName];

      if (attrName === 'points') {
        startValue = plainArray(startValue);
        endValue = plainArray(endValue);
        interpolate.points = interpolateArray(startValue, endValue);
        this.source.points = startValue;
        attrs.points = endValue;
      } else if (attrName === 'matrix') {
        interpolate.matrix = interpolateArray(startValue, endValue);
      } else {
        interpolate[attrName] = interpolateNumber(startValue, endValue);
      }
    }

    animInfo.interpolate = interpolate;
    animInfo.startState = this.source;
    animInfo.endState = attrs;
    animInfo.endTime = animInfo.startTime + duration;
    this.timeline.anims.push(animInfo);
    this.animate = animInfo;
    return this;
  };

  _proto.onFrame = function onFrame(callback) {
    // 自定义每一帧动画的动作
    if (this.animate) {
      this.animate.onFrame = function (frame) {
        callback(frame);
      };
    }

    return this;
  };

  _proto.onStart = function onStart(callback) {
    if (this.animate) {
      this.animate.onStart = function () {
        callback();
      };
    }

    return this;
  };

  _proto.onUpdate = function onUpdate(callback) {
    if (this.animate) {
      this.animate.onUpdate = function (frame) {
        callback(frame);
      };
    }

    return this;
  };

  _proto.onEnd = function onEnd(callback) {
    if (this.animate) {
      this.animate.onEnd = function () {
        callback();
      };
    }

    return this;
  };

  return Animator;
}();

module.exports = Animator;

/***/ }),
/* 157 */
/***/ (function(module, exports) {

var Easing = {
  linear: function linear(k) {
    return k;
  },
  quadraticIn: function quadraticIn(k) {
    return k * k;
  },
  quadraticOut: function quadraticOut(k) {
    return k * (2 - k);
  },
  quadraticInOut: function quadraticInOut(k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k;
    }

    return -0.5 * (--k * (k - 2) - 1);
  },
  cubicIn: function cubicIn(k) {
    return k * k * k;
  },
  cubicOut: function cubicOut(k) {
    return --k * k * k + 1;
  },
  cubicInOut: function cubicInOut(k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k * k;
    }

    return 0.5 * ((k -= 2) * k * k + 2);
  },
  elasticIn: function elasticIn(k) {
    var s;
    var a = 0.1;
    var p = 0.4;
    if (k === 0) return 0;
    if (k === 1) return 1;

    if (!p) {
      p = 0.3;
    }

    if (!a || a < 1) {
      a = 1;
      s = p / 4;
    } else {
      s = p / (2 * Math.PI) * Math.asin(1 / a);
    }

    return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
  },
  elasticOut: function elasticOut(k) {
    var s;
    var a = 0.1;
    var p = 0.4;
    if (k === 0) return 0;
    if (k === 1) return 1;

    if (!p) {
      p = 0.3;
    }

    if (!a || a < 1) {
      a = 1;
      s = p / 4;
    } else {
      s = p / (2 * Math.PI) * Math.asin(1 / a);
    }

    return a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1;
  },
  elasticInOut: function elasticInOut(k) {
    var s;
    var a = 0.1;
    var p = 0.4;
    if (k === 0) return 0;
    if (k === 1) return 1;

    if (!p) {
      p = 0.3;
    }

    if (!a || a < 1) {
      a = 1;
      s = p / 4;
    } else {
      s = p / (2 * Math.PI) * Math.asin(1 / a);
    }

    if ((k *= 2) < 1) {
      return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
    }

    return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
  },
  backIn: function backIn(k) {
    var s = 1.70158;
    return k * k * ((s + 1) * k - s);
  },
  backOut: function backOut(k) {
    var s = 1.70158;
    return (k = k - 1) * k * ((s + 1) * k + s) + 1;
  },
  backInOut: function backInOut(k) {
    var s = 1.70158 * 1.525;

    if ((k *= 2) < 1) {
      return 0.5 * (k * k * ((s + 1) * k - s));
    }

    return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
  },
  bounceIn: function bounceIn(k) {
    return 1 - Easing.bounceOut(1 - k);
  },
  bounceOut: function bounceOut(k) {
    if ((k /= 1) < 1 / 2.75) {
      return 7.5625 * k * k;
    } else if (k < 2 / 2.75) {
      return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
    } else if (k < 2.5 / 2.75) {
      return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
    }

    return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
  },
  bounceInOut: function bounceInOut(k) {
    if (k < 0.5) {
      return Easing.bounceIn(k * 2) * 0.5;
    }

    return Easing.bounceOut(k * 2 - 1) * 0.5 + 0.5;
  }
};
module.exports = Easing;

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Animation functions for shape
 * @author sima.zhang1990@gmail.com
 */
var Util = __webpack_require__(0);

var Helpers = __webpack_require__(52);
/*
function waveIn(shape, animateCfg, coord) {
  const clip = Helpers.getClip(coord);
  clip.set('canvas', shape.get('canvas'));
  shape.attr('clip', clip);
  const onEnd = function() {
    shape.attr('clip', null);
    clip.remove(true);
  };
  Helpers.doAnimation(clip, clip.endState, animateCfg, onEnd);
}

function scaleInX(shape, animateCfg) {
  const box = shape.getBBox();
  const points = shape.get('origin').points;
  let x;
  const y = (box.minY + box.maxY) / 2;

  if (points[0].y - points[1].y > 0) { // 当顶点在零点之下
    x = box.maxX;
  } else {
    x = box.minX;
  }
  const scaledMatrix = Helpers.getScaledMatrix(shape, [ x, y ], 'x');
  Helpers.doAnimation(shape, { matrix: scaledMatrix }, animateCfg);
}

function scaleInY(shape, animateCfg) {
  const box = shape.getBBox();
  const points = shape.get('origin').points;
  const x = (box.minX + box.maxX) / 2;
  let y;

  if (points[0].y - points[1].y <= 0) { // 当顶点在零点之下
    y = box.maxY;
  } else {
    y = box.minY;
  }
  const scaledMatrix = Helpers.getScaledMatrix(shape, [ x, y ], 'x');
  Helpers.doAnimation(shape, { matrix: scaledMatrix }, animateCfg);
}
*/


function fadeIn(shape, animateCfg) {
  var fillOpacity = Util.isNil(shape.attr('fillOpacity')) ? 1 : shape.attr('fillOpacity');
  var strokeOpacity = Util.isNil(shape.attr('strokeOpacity')) ? 1 : shape.attr('strokeOpacity');
  shape.attr('fillOpacity', 0);
  shape.attr('strokeOpacity', 0);
  var endState = {
    fillOpacity: fillOpacity,
    strokeOpacity: strokeOpacity
  };
  Helpers.doAnimation(shape, endState, animateCfg);
}

module.exports = {
  // waveIn,
  // scaleInX,
  // scaleInY,
  fadeIn: fadeIn
};

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Group animate functions
 * @author sima.zhang1990@gmail.com
 */
var Util = __webpack_require__(52);

var Helper = __webpack_require__(26);

var _require = __webpack_require__(4),
    Shape = _require.Shape;

function _groupScaleIn(container, animateCfg, coord, zeroY, type) {
  var _Util$getCoordInfo = Util.getCoordInfo(coord),
      start = _Util$getCoordInfo.start,
      end = _Util$getCoordInfo.end,
      width = _Util$getCoordInfo.width,
      height = _Util$getCoordInfo.height;

  var x;
  var y;
  var clip = new Shape.Rect({
    attrs: {
      x: start.x,
      y: end.y,
      width: width,
      height: height
    }
  });

  if (type === 'y') {
    x = start.x + width / 2;
    y = zeroY.y < start.y ? zeroY.y : start.y;
  } else if (type === 'x') {
    x = zeroY.x > start.x ? zeroY.x : start.x;
    y = start.y + height / 2;
  } else if (type === 'xy') {
    if (coord.isPolar) {
      x = coord.center.x;
      y = coord.center.y;
    } else {
      x = (start.x + end.x) / 2;
      y = (start.y + end.y) / 2;
    }
  }

  var endMatrix = Util.getScaledMatrix(clip, [x, y], type);
  clip.isClip = true;
  clip.endState = {
    matrix: endMatrix
  };
  clip.set('canvas', container.get('canvas'));
  container.attr('clip', clip);

  var onEnd = function onEnd() {
    container.attr('clip', null);
    clip.remove(true);
  };

  Util.doAnimation(clip, clip.endState, animateCfg, onEnd);
}

function _shapeScale(container, animateCfg, type) {
  var shapes = container.get('children');
  var x;
  var y;
  var endMatrix;

  for (var i = 0, len = shapes.length; i < len; i++) {
    var shape = shapes[i];
    var box = shape.getBBox();
    x = (box.minX + box.maxX) / 2;
    y = (box.minY + box.maxY) / 2;
    endMatrix = Util.getScaledMatrix(shape, [x, y], type);
    Util.doAnimation(shape, {
      matrix: endMatrix
    }, animateCfg);
  }
}

function groupScaleInX(container, animateCfg, coord, zeroY) {
  _groupScaleIn(container, animateCfg, coord, zeroY, 'x');
}

function groupScaleInY(container, animateCfg, coord, zeroY) {
  _groupScaleIn(container, animateCfg, coord, zeroY, 'y');
}

function groupScaleInXY(container, animateCfg, coord, zeroY) {
  _groupScaleIn(container, animateCfg, coord, zeroY, 'xy');
}

function shapesScaleInX(container, animateCfg) {
  _shapeScale(container, animateCfg, 'x');
}

function shapesScaleInY(container, animateCfg) {
  _shapeScale(container, animateCfg, 'y');
}

function shapesScaleInXY(container, animateCfg) {
  _shapeScale(container, animateCfg, 'xy');
}

function groupWaveIn(container, animateCfg, coord) {
  var clip = Helper.getClip(coord);
  clip.set('canvas', container.get('canvas'));
  container.attr('clip', clip);

  var onEnd = function onEnd() {
    container.attr('clip', null);
    clip.remove(true);
  };

  var endState = {};

  if (coord.isPolar) {
    var startAngle = coord.startAngle,
        endAngle = coord.endAngle;
    endState.endAngle = endAngle;
    clip.attr('endAngle', startAngle);
  } else {
    var start = coord.start,
        end = coord.end;
    var width = Math.abs(start.x - end.x);
    var height = Math.abs(start.y - end.y);

    if (coord.isTransposed) {
      clip.attr('height', 0);
      endState.height = height;
    } else {
      clip.attr('width', 0);
      endState.width = width;
    }
  }

  Util.doAnimation(clip, endState, animateCfg, onEnd);
}

module.exports = {
  groupWaveIn: groupWaveIn,
  groupScaleInX: groupScaleInX,
  groupScaleInY: groupScaleInY,
  groupScaleInXY: groupScaleInXY,
  shapesScaleInX: shapesScaleInX,
  shapesScaleInY: shapesScaleInY,
  shapesScaleInXY: shapesScaleInXY
};

/***/ }),
/* 160 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('gcanvas', {
    ref: "canvas_holder",
    style: {
      width: (_vm.width) + 'px',
      height: (_vm.height) + 'px',
      backgroundColor: _vm.backgroundColor
    },
    attrs: {
      "id": "pieChart"
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(162)
)

/* script */
__vue_exports__ = __webpack_require__(163)

/* template */
var __vue_template__ = __webpack_require__(165)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "D:\\Person\\Project\\Weex\\weex_deer\\src\\components\\chart\\chart.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-52e81ac0"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 162 */
/***/ (function(module, exports) {

module.exports = {
  "location_line": {
    "width": "2",
    "backgroundColor": "#d3d3d3",
    "position": "absolute"
  }
}

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _gcanvas = __webpack_require__(27);

var _f = __webpack_require__(28);

var _f2 = _interopRequireDefault(_f);

var _config = __webpack_require__(164);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } //
//
//
//
//
//
//
//
//

/* IFTRUE_isNative */

/* FITRUE_isNative */

// import color from '@/common/color';


var animation = weex.requireModule("animation");
exports.default = {
  props: {
    data: {
      type: Array
    },
    width: {
      default: 750
    },
    height: {
      default: 350
    },
    animation: {
      type: Boolean,
      default: true
    },
    scale: {
      type: Number,
      default: 4
    },
    colors: {
      type: Array
    },
    smooth: {
      type: Boolean,
      default: false
    },
    tooltip: {
      type: Boolean,
      default: false
    },
    bgcolor: {
      type: String,
      default: ""
    }
  },
  data: function data() {
    return {
      chart: null,
      locationLineVisible: true,
      lineColor: _config2.default.primaryColor,
      lineStyle: {}
    };
  },

  watch: {
    data: function data() {
      this.renderChart(this.data[0]);
    }
  },
  mounted: function mounted() {
    this.renderChart(this.data[0]);
  },
  destroyed: function destroyed() {
    this.chart && this.chart.destroy();
  },

  computed: {
    chartId: function chartId() {
      return "chart" + this._uid;
    }
  },
  methods: {
    isPointInPlot: function isPointInPlot(point, plot) {
      var x = point.x,
          y = point.y;
      var tl = plot.tl,
          tr = plot.tr,
          br = plot.br;

      return x >= tl.x && x <= tr.x; // && y >= tl.y && y <= br.y
    },
    touchStart: function touchStart(e) {
      if (this.tooltip && weex.config.env.platform != "Web") {
        var plot = this.chart.get("plotRange");
        this.lineStyle = {
          top: plot.tl.y + "px",
          height: plot.br.y - plot.tl.y + "px"
        };
        this.moveLocationLine(e);
      }
    },
    touchMove: function touchMove(e) {
      if (this.tooltip && weex.config.env.platform != "Web") {
        this.moveLocationLine(e);
        // this.chart.showTooltip({ x, y })
      }
    },
    touchEnd: function touchEnd(e) {
      if (this.tooltip && weex.config.env.platform != "Web") {
        // this.chart.hideTooltip()
        this.locationLineVisible = false;
      }
    },
    moveLocationLine: function moveLocationLine(e) {
      var plot = this.chart.get("plotRange");
      var point = _f2.default.Util.createEvent(e, this.chart);
      if (!this.isPointInPlot(point, plot)) {
        this.locationLineVisible = false;
        return;
      }
      var geoms = this.chart.get("geoms");
      var records = geoms[0].getSnapRecords(point);
      if (records && records.length > 0) {
        if (!this.locationLineVisible) this.locationLineVisible = true;
        animation.transition(this.$refs.location_line, {
          styles: {
            transform: "translateX(" + point.x + "px)",
            transformOrigin: "left top"
          }
        }, function () {});
        // if (parseInt(records[0].x) <= point.x)
        this.$emit("sliding", records[0]._origin.data);
      }
    },
    formatDate: function formatDate(date) {
      return date.replace(/(\d{4})[^\d]?(\d{2})[^\d]?(\d{2})/, "$1-$2-$3");
    },
    renderChart: function renderChart(chartData) {
      // let temp =  chartData.map((item) => {
      //   return {
      //     date: this.formatDate(item.date),
      //     value: parseFloat(item.value),
      //     data: item.data,
      //     tag: 0
      //   }
      // })
      // if (!chartData || chartData.length == 0) return ;
      if (!this.chart) this.initChart(chartData);else {
        var _getLimitValue = this.getLimitValue(chartData),
            tagPoints = _getLimitValue.tagPoints,
            limit = _objectWithoutProperties(_getLimitValue, ["tagPoints"]);

        var that = this;
        this.chart.scale("value", _extends({
          tickCount: 5
        }, limit, {
          formatter: function formatter(val) {
            return val.toFixed(that.scale);
          }
        }));
        this.renderTag(tagPoints);
        this.chart.changeData(chartData);
        // this.chart.clear();
        // this.render(this.chart, chartData);
      }
    },
    getLimitValue: function getLimitValue(chartData) {
      var max = void 0,
          min = void 0;
      var firstBuyPoint = void 0,
          lastSalePoint = void 0;
      if (chartData.length > 0) {
        max = min = chartData[0].value;
        for (var i = 1; i < chartData.length; i++) {
          max = Math.max(chartData[i].value, max);
          min = Math.min(chartData[i].value, min);
          if (!firstBuyPoint && chartData[i].tag == 1) {
            firstBuyPoint = [chartData[i].date, chartData[i].value];
          } else if (chartData[i].tag == 2) {
            lastSalePoint = [chartData[i].date, chartData[i].value];
          }
        }
        var period = (max - min) / 6;
        if (min - period < 0) {
          min = min > 0 ? 0 : min - period;
        } else {
          min = min - period;
        }
        if (isNaN(min)) return {};
        return {
          // max: max + period,
          min: min,
          tagPoints: {
            fbPoint: firstBuyPoint,
            lsPoint: lastSalePoint
          }
        };
      }
      return {};
    },
    initChart: function initChart(chartData) {
      var that = this;
      // Step 1: 创建 Chart 对象
      if (weex.config.env.platform != "Web") {
        /* IFTRUE_isNative */
        var ref = this.$refs.canvas_holder;
        ref = (0, _gcanvas.enable)(ref, { bridge: _gcanvas.WeexBridge });
        var ctx = ref.getContext("2d");
        var canvas = new _f2.default.Renderer(ctx);
        this.canvas = canvas;
        this.chart = new _f2.default.Chart({
          el: canvas, // 将第三步创建的 canvas 对象的上下文传入
          width: this.width, // 必选，图表宽度，同 canvas 的宽度相同
          height: this.height // 必选，图表高度，同 canvas 的高度相同
        });
        /* FITRUE_isNative */
      } else {
        /* IFTRUE_isWeb */
        this.chart = new _f2.default.Chart({
          id: that.chartId,
          pixelRatio: window.devicePixelRatio // 指定分辨率
        });
        /* FITRUE_isWeb */
      }
      var chart = this.chart;
      chart.legend(false);
      chart.animate(false); // weex.config.env.platform == 'Web'
      this.render(chart, chartData);
    },
    renderTag: function renderTag(tagPoints) {
      var isWeb = weex.config.env.platform == "Web";
      if (tagPoints && tagPoints.fbPoint) {
        this.chart.guide().tag({
          position: tagPoints.fbPoint,
          content: "买入",
          withPoint: false,
          limitInPlot: true,
          direct: "tr",
          offsetY: isWeb ? -6 : -10,
          background: {
            fill: "#F35833"
          },
          textStyle: {
            fontSize: isWeb ? 12 : 24, // 字体大小
            fill: "#fff" // 字体颜色
          }
        });
      }
      // 卖出 适合 direct为br，但br时可能覆盖到x轴刻度
      if (tagPoints && tagPoints.lsPoint) {
        this.chart.guide().tag({
          position: tagPoints.lsPoint,
          content: "卖出",
          withPoint: false,
          limitInPlot: true,
          direct: "tr",
          offsetY: isWeb ? -6 : -10,
          background: {
            fill: "#518DFE"
          },
          textStyle: {
            fontSize: isWeb ? 12 : 24, // 字体大小
            fill: "#fff" // 字体颜色
          }
        });
      }
    },
    render: function render(chart, chartData) {
      var that = this;
      // Step 2: 载入数据源

      var _getLimitValue2 = this.getLimitValue(chartData),
          tagPoints = _getLimitValue2.tagPoints,
          limit = _objectWithoutProperties(_getLimitValue2, ["tagPoints"]);

      chart.source(chartData, {
        value: _extends({
          tickCount: 5
        }, limit, {
          // max: limit.max,
          formatter: function formatter(val) {
            return val.toFixed(that.scale);
          }
        }),
        date: {
          type: "timeCat",
          range: [0, 1],
          mask: "MM-DD",
          tickCount: 5
        }
      });
      // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
      chart.axis("date", {
        label: function label(text, index, total) {
          var textCfg = {};
          if (index === 0) {
            // textCfg.textAlign = 'start'
          } else if (index === total - 1) {
            textCfg.textAlign = "end";
          }
          return textCfg;
        },
        line: null
      });
      chart.axis(false);
      if (!this.tooltip || weex.config.env.platform != "Web") {
        chart.tooltip(false);
      } else {
        chart.tooltip({
          showCrosshairs: true,
          crosshairsStyle: {
            stoke: "rgba(81, 141, 254, 0.8)",
            width: 12
          },
          custom: true, // 自定义 tooltip 内容框
          onChange: function onChange(obj) {
            var items = obj.items;
            var originData = items[0].origin;
            that.$emit("sliding", originData.data);
          },
          onHide: function onHide() {}
        });
      }
      var lineSize = weex.config.env.platform == "Web" ? 2 : 4;
      if (that.colors && that.colors.length > 0) {
        // {sortable: false}
        var line = chart.line().position("date*value");
        if (this.smooth) {
          line.shape("smooth");
        }
        line.color("type", that.colors).size(lineSize);
      } else {
        // chart.area().position('date*value').color('l(90) 0:#1890FF 1:#f7f7f7').shape('smooth');
        // let lighterColor = color.lighter(that.lineColor);
        // let lightestColor = color.lightest(that.lineColor);
        // chart.area({startOnZero: false}).position('date*value').color('type').style({
        //   fill: `l(90) 0:${lighterColor} 1:${lightestColor}`,
        //   fillOpacity: 0.5
        // });
        // 当图表的数据源已经过排序，可以通过在列定义中设置 sortable: false 来提升性能
        // {sortable: false}
        var _line = chart.line().position("date*value");
        if (this.smooth) {
          _line.shape("smooth");
        }
        _line.color(that.lineColor).size(lineSize);
      }
      var isWeb = weex.config.env.platform == "Web";
      var bgcolor = this.bgcolor;
      // 绘制 tag
      chart.point().position("date*value").size("tag", function (val) {
        return val === 1 || val === 2 ? isWeb ? 4 : 7 : isWeb ? 3 : 5;
      }).style("tag", {
        fill: function fill(val) {
          if (val === 2) {
            return "#518DFE";
          } else if (val === 1) {
            return "#F35833";
          } else {
            return "#ffffff";
          }
        },
        stroke: function stroke(val) {
          if (val === 2) {
            return "#e5eeff";
          } else if (val === 1) {
            return "#feebe7";
          } else {
            return bgcolor || "";
          }
        },
        lineWidth: isWeb ? 2 : 4
      });
      this.renderTag(tagPoints);
      // Step 4: 渲染图表
      chart.render();
    }
  }
};

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var config = {
  primaryColor: '#4688FA'
};
exports.default = config;

/***/ }),
/* 165 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["ml10", "mr20"]
  }, [_c('div', {
    on: {
      "horizontalpan": _vm.touchStart,
      "panmove": _vm.touchMove,
      "panend": _vm.touchEnd
    }
  }, [_c('gcanvas', {
    ref: "canvas_holder",
    style: {
      width: _vm.width + 'px',
      height: _vm.height + 'px'
    },
    attrs: {
      "id": _vm.chartId
    }
  }), (_vm.locationLineVisible) ? _c('div', {
    ref: "location_line",
    staticClass: ["location_line"],
    style: _vm.lineStyle
  }) : _vm._e()], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 166 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('scroller', [_c('pie', {
    attrs: {
      "backgroundColor": "#ffffff",
      "data": _vm.pieData
    }
  }), _c('div', {
    staticStyle: {
      paddingTop: "32px",
      paddingLeft: "32px",
      paddingRight: "32px",
      marginLeft: "32px",
      width: "686px",
      borderRadius: "12px"
    },
    style: {
      backgroundColor: '#233333'
    }
  }, [_vm._m(0), _c('chart', {
    attrs: {
      "colors": ['#ffffff'],
      "bgcolor": "#4688FA",
      "width": "622",
      "height": "160",
      "smooth": true,
      "data": _vm.chartData
    }
  })], 1), _c('div', {
    staticStyle: {
      marginTop: "32px",
      paddingTop: "32px",
      paddingLeft: "32px",
      paddingRight: "32px",
      marginLeft: "32px",
      backgroundColor: "#FFAA33",
      width: "686px",
      borderRadius: "12px"
    }
  }, [_vm._m(1), _c('chart', {
    attrs: {
      "colors": ['#ffffff'],
      "bgcolor": "#FFAA33",
      "width": "622",
      "height": "160",
      "smooth": true,
      "data": _vm.chartData2
    }
  })], 1), _c('div', {
    staticStyle: {
      marginTop: "32px",
      paddingTop: "32px",
      paddingLeft: "32px",
      paddingRight: "32px",
      marginLeft: "32px",
      backgroundColor: "#FF4759",
      width: "686px",
      borderRadius: "12px"
    }
  }, [_vm._m(2), _c('chart', {
    attrs: {
      "colors": ['#ffffff'],
      "bgcolor": "#FF4759",
      "width": "622",
      "height": "160",
      "smooth": true,
      "data": _vm.chartData3
    }
  })], 1)], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      flexDirection: "row",
      justifyContent: "space-between"
    }
  }, [_c('text', {
    staticStyle: {
      color: "#fff",
      fontSize: "28px"
    }
  }, [_vm._v("全部订单")]), _c('text', {
    staticStyle: {
      color: "#fff",
      fontSize: "28px"
    }
  }, [_vm._v("3000")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      flexDirection: "row",
      justifyContent: "space-between"
    }
  }, [_c('text', {
    staticStyle: {
      color: "#fff",
      fontSize: "28px"
    }
  }, [_vm._v("完成订单")]), _c('text', {
    staticStyle: {
      color: "#fff",
      fontSize: "28px"
    }
  }, [_vm._v("2000")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      flexDirection: "row",
      justifyContent: "space-between"
    }
  }, [_c('text', {
    staticStyle: {
      color: "#fff",
      fontSize: "28px"
    }
  }, [_vm._v("取消订单")]), _c('text', {
    staticStyle: {
      color: "#fff",
      fontSize: "28px"
    }
  }, [_vm._v("1000")])])
}]}
module.exports.render._withStripped = true

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(168)
)

/* script */
__vue_exports__ = __webpack_require__(169)

/* template */
var __vue_template__ = __webpack_require__(170)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "D:\\Person\\Project\\Weex\\weex_deer\\src\\index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-1a4d8e3c"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 168 */
/***/ (function(module, exports) {

module.exports = {
  "wrapper": {
    "justifyContent": "center",
    "alignItems": "center"
  },
  "logo": {
    "width": "424",
    "height": "200"
  },
  "greeting": {
    "textAlign": "center",
    "marginTop": "70",
    "fontSize": "50",
    "color": "#41B883"
  },
  "message": {
    "marginTop": "30",
    "marginRight": "30",
    "marginBottom": "30",
    "marginLeft": "30",
    "fontSize": "32",
    "color": "#727272"
  }
}

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//

exports.default = {
  name: 'App',
  data: function data() {
    return {
      logo: 'https://gw.alicdn.com/tfs/TB1yopEdgoQMeJjy1XaXXcSsFXa-640-302.png'
    };
  }
};

/***/ }),
/* 170 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wrapper"]
  }, [_c('router-view')], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ })
/******/ ]);
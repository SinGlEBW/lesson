"use strict";

function _typeof(a) {
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (a) {
        return typeof a
    } : function (a) {
        return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a
    }, _typeof(a)
}

function _classCallCheck(a, b) {
    if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
}

function _defineProperties(a, b) {
    for (var c, d = 0; d < b.length; d++) c = b[d], c.enumerable = c.enumerable || !1, c.configurable = !0, "value" in c && (c.writable = !0), Object.defineProperty(a, c.key, c)
}

function _createClass(a, b, c) {
    return b && _defineProperties(a.prototype, b), c && _defineProperties(a, c), a
}

function _inherits(a, b) {
    if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function");
    a.prototype = Object.create(b && b.prototype, {
        constructor: {
            value: a,
            writable: !0,
            configurable: !0
        }
    }), b && _setPrototypeOf(a, b)
}

function _setPrototypeOf(a, b) {
    return _setPrototypeOf = Object.setPrototypeOf || function (a, b) {
        return a.__proto__ = b, a
    }, _setPrototypeOf(a, b)
}

function _createSuper(a) {
    var b = _isNativeReflectConstruct();
    return function () {
        var c, d = _getPrototypeOf(a);
        if (b) {
            var e = _getPrototypeOf(this).constructor;
            c = Reflect.construct(d, arguments, e)
        } else c = d.apply(this, arguments);
        return _possibleConstructorReturn(this, c)
    }
}

function _possibleConstructorReturn(a, b) {
    return b && ("object" === _typeof(b) || "function" == typeof b) ? b : _assertThisInitialized(a)
}

function _assertThisInitialized(a) {
    if (void 0 === a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return a
}

function _isNativeReflectConstruct() {
    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
    if (Reflect.construct.sham) return !1;
    if ("function" == typeof Proxy) return !0;
    try {
        return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0
    } catch (a) {
        return !1
    }
}

function _getPrototypeOf(a) {
    return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function (a) {
        return a.__proto__ || Object.getPrototypeOf(a)
    }, _getPrototypeOf(a)
}
var MyComponent = /*#__PURE__*/ function (a) {
    function b() {
        return _classCallCheck(this, b), c.apply(this, arguments)
    }
    _inherits(b, a);
    var c = _createSuper(b);
    return _createClass(b, [{
        key: "render",
        value: function render() {
            return 21344
        }
    }]), b
}(React.Component);
ReactDOM.render( /*#__PURE__*/ React.createElement(MyComponent, null), document.querySelector("#box"));
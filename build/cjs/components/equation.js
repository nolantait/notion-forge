"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Equation = void 0;
var react_1 = __importDefault(require("react"));
var utils_1 = require("../utils");
var context_1 = require("../context");
var katexSettings = {
    throwOnError: false,
    strict: false
};
var Equation = function (_a) {
    var math = _a.math, className = _a.className, rest = __rest(_a, ["math", "className"]);
    var components = context_1.useNotionContext().components;
    return (react_1["default"].createElement("span", { role: 'button', tabIndex: 0, className: utils_1.cs('notion-equation', rest.block ? 'notion-equation-block' : 'notion-equation-inline', className) },
        react_1["default"].createElement(components.equation, __assign({ math: math, settings: katexSettings }, rest))));
};
exports.Equation = Equation;
//# sourceMappingURL=equation.js.map
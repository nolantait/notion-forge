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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.GracefulImage = void 0;
var react_1 = __importDefault(require("react"));
var react_image_1 = require("react-image");
var utils_1 = require("../utils");
var GracefulImage = function (props) {
    if (utils_1.isBrowser) {
        return react_1["default"].createElement(react_image_1.Img, __assign({}, props));
    }
    else {
        // @ts-ignore (must use the appropriate subset of props for <img> if using SSR)
        return react_1["default"].createElement("img", __assign({}, props));
    }
};
exports.GracefulImage = GracefulImage;
//# sourceMappingURL=graceful-image.js.map
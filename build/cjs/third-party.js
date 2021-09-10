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
exports.Modal = exports.Equation = exports.Pdf = void 0;
var react_1 = __importDefault(require("react"));
var react_pdf_1 = require("react-pdf");
var react_katex_1 = __importDefault(require("@matejmazur/react-katex"));
exports.Equation = react_katex_1["default"];
var react_modal_1 = __importDefault(require("react-modal"));
exports.Modal = react_modal_1["default"];
var Pdf = function (_a) {
    var file = _a.file, children = _a.children, rest = __rest(_a, ["file", "children"]);
    var _b = react_1["default"].useState(null), numPages = _b[0], setNumPages = _b[1];
    function onDocumentLoadSuccess(_a) {
        var numPages = _a.numPages;
        setNumPages(numPages);
    }
    return (react_1["default"].createElement(react_pdf_1.Document, __assign({ file: file, onLoadSuccess: onDocumentLoadSuccess }, rest), Array.from(new Array(numPages), function (_, index) { return (react_1["default"].createElement(react_pdf_1.Page, { key: "page_" + (index + 1), pageNumber: index + 1 })); })));
};
exports.Pdf = Pdf;
//# sourceMappingURL=third-party.js.map
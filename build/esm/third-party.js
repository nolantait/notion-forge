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
import React from 'react';
import { Page, Document } from 'react-pdf';
import Equation from '@matejmazur/react-katex';
import Modal from 'react-modal';
var Pdf = function (_a) {
    var file = _a.file, children = _a.children, rest = __rest(_a, ["file", "children"]);
    var _b = React.useState(null), numPages = _b[0], setNumPages = _b[1];
    function onDocumentLoadSuccess(_a) {
        var numPages = _a.numPages;
        setNumPages(numPages);
    }
    return (React.createElement(Document, __assign({ file: file, onLoadSuccess: onDocumentLoadSuccess }, rest), Array.from(new Array(numPages), function (_, index) { return (React.createElement(Page, { key: "page_" + (index + 1), pageNumber: index + 1 })); })));
};
export { Pdf, Equation, Modal };
//# sourceMappingURL=third-party.js.map
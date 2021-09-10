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
exports.NotionBlockRenderer = exports.NotionRenderer = void 0;
var react_1 = __importDefault(require("react"));
var medium_zoom_1 = __importDefault(require("medium-zoom"));
var block_1 = require("./block");
var context_1 = require("./context");
var NotionRenderer = function (_a) {
    var components = _a.components, recordMap = _a.recordMap, mapPageUrl = _a.mapPageUrl, mapImageUrl = _a.mapImageUrl, searchNotion = _a.searchNotion, fullPage = _a.fullPage, rootPageId = _a.rootPageId, darkMode = _a.darkMode, previewImages = _a.previewImages, showCollectionViewDropdown = _a.showCollectionViewDropdown, showTableOfContents = _a.showTableOfContents, minTableOfContentsItems = _a.minTableOfContentsItems, defaultPageIcon = _a.defaultPageIcon, defaultPageCover = _a.defaultPageCover, defaultPageCoverPosition = _a.defaultPageCoverPosition, rest = __rest(_a, ["components", "recordMap", "mapPageUrl", "mapImageUrl", "searchNotion", "fullPage", "rootPageId", "darkMode", "previewImages", "showCollectionViewDropdown", "showTableOfContents", "minTableOfContentsItems", "defaultPageIcon", "defaultPageCover", "defaultPageCoverPosition"]);
    var zoom = typeof window !== 'undefined' &&
        medium_zoom_1["default"]({
            container: '.notion-viewport',
            background: 'rgba(0, 0, 0, 0.8)',
            margin: getMediumZoomMargin()
        });
    return (react_1["default"].createElement(context_1.NotionContextProvider, { components: components, recordMap: recordMap, mapPageUrl: mapPageUrl, mapImageUrl: mapImageUrl, searchNotion: searchNotion, fullPage: fullPage, rootPageId: rootPageId, darkMode: darkMode, previewImages: previewImages, showCollectionViewDropdown: showCollectionViewDropdown, showTableOfContents: showTableOfContents, minTableOfContentsItems: minTableOfContentsItems, defaultPageIcon: defaultPageIcon, defaultPageCover: defaultPageCover, defaultPageCoverPosition: defaultPageCoverPosition, zoom: zoom },
        react_1["default"].createElement(exports.NotionBlockRenderer, __assign({}, rest))));
};
exports.NotionRenderer = NotionRenderer;
var NotionBlockRenderer = function (_a) {
    var _b, _c;
    var _d = _a.level, level = _d === void 0 ? 0 : _d, blockId = _a.blockId, props = __rest(_a, ["level", "blockId"]);
    var recordMap = context_1.useNotionContext().recordMap;
    var id = blockId || Object.keys(recordMap.block)[0];
    var block = (_b = recordMap.block[id]) === null || _b === void 0 ? void 0 : _b.value;
    if (!block) {
        if (process.env.NODE_ENV !== 'production') {
            console.warn('missing block', blockId);
        }
        return null;
    }
    return (react_1["default"].createElement(block_1.Block, __assign({ key: id, level: level, block: block }, props), (_c = block === null || block === void 0 ? void 0 : block.content) === null || _c === void 0 ? void 0 : _c.map(function (contentBlockId) { return (react_1["default"].createElement(exports.NotionBlockRenderer, __assign({ key: contentBlockId, blockId: contentBlockId, level: level + 1 }, props))); })));
};
exports.NotionBlockRenderer = NotionBlockRenderer;
function getMediumZoomMargin() {
    var width = window.innerWidth;
    if (width < 500) {
        return 8;
    }
    else if (width < 800) {
        return 20;
    }
    else if (width < 1280) {
        return 30;
    }
    else if (width < 1600) {
        return 40;
    }
    else if (width < 1920) {
        return 48;
    }
    else {
        return 72;
    }
}
//# sourceMappingURL=renderer.js.map
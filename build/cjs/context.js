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
exports.useNotionContext = exports.NotionContextConsumer = exports.NotionContextProvider = exports.dummyLink = void 0;
var react_1 = __importDefault(require("react"));
var utils_1 = require("./utils");
var DefaultLink = function (props) { return (react_1["default"].createElement("a", __assign({ target: '_blank', rel: 'noopener noreferrer' }, props))); };
var DefaultPageLink = function (props) { return react_1["default"].createElement("a", __assign({}, props)); };
var dummyLink = function (_a) {
    var href = _a.href, rel = _a.rel, target = _a.target, title = _a.title, rest = __rest(_a, ["href", "rel", "target", "title"]);
    return (react_1["default"].createElement("span", __assign({}, rest)));
};
exports.dummyLink = dummyLink;
var dummyComponent = function (name) { return function () {
    console.warn("Error using empty component: " + name + "\nYou should override this in NotionRenderer.components");
    return null;
}; };
var defaultComponents = {
    link: DefaultLink,
    pageLink: DefaultPageLink,
    code: dummyComponent('code'),
    equation: dummyComponent('equation'),
    collection: dummyComponent('collection'),
    collectionRow: dummyComponent('collectionRow'),
    pdf: dummyComponent('pdf'),
    tweet: dummyComponent('tweet'),
    modal: dummyComponent('modal')
};
var defaultNotionContext = {
    recordMap: {
        block: {},
        collection: {},
        collection_view: {},
        collection_query: {},
        notion_user: {},
        signed_urls: {}
    },
    components: defaultComponents,
    mapPageUrl: utils_1.defaultMapPageUrl(),
    mapImageUrl: utils_1.defaultMapImageUrl,
    searchNotion: null,
    fullPage: false,
    darkMode: false,
    previewImages: false,
    showCollectionViewDropdown: true,
    showTableOfContents: false,
    minTableOfContentsItems: 3,
    defaultPageIcon: null,
    defaultPageCover: null,
    defaultPageCoverPosition: 0.5,
    zoom: null
};
var ctx = react_1["default"].createContext(defaultNotionContext);
var NotionContextProvider = function (_a) {
    var _b = _a.components, themeComponents = _b === void 0 ? {} : _b, children = _a.children, mapPageUrl = _a.mapPageUrl, mapImageUrl = _a.mapImageUrl, rootPageId = _a.rootPageId, rest = __rest(_a, ["components", "children", "mapPageUrl", "mapImageUrl", "rootPageId"]);
    for (var _i = 0, _c = Object.keys(rest); _i < _c.length; _i++) {
        var key = _c[_i];
        if (rest[key] === undefined) {
            delete rest[key];
        }
    }
    return (react_1["default"].createElement(ctx.Provider, { value: __assign(__assign(__assign({}, defaultNotionContext), rest), { rootPageId: rootPageId, mapPageUrl: mapPageUrl !== null && mapPageUrl !== void 0 ? mapPageUrl : utils_1.defaultMapPageUrl(rootPageId), mapImageUrl: mapImageUrl !== null && mapImageUrl !== void 0 ? mapImageUrl : utils_1.defaultMapImageUrl, components: __assign(__assign({}, defaultComponents), themeComponents) }) }, children));
};
exports.NotionContextProvider = NotionContextProvider;
exports.NotionContextConsumer = ctx.Consumer;
var useNotionContext = function () {
    return react_1["default"].useContext(ctx);
};
exports.useNotionContext = useNotionContext;
//# sourceMappingURL=context.js.map
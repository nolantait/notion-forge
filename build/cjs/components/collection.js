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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.Collection = void 0;
var react_1 = __importDefault(require("react"));
var notion_utils_1 = require("notion-utils");
var react_use_1 = require("react-use");
var rc_dropdown_1 = __importDefault(require("rc-dropdown"));
var rc_menu_1 = __importStar(require("rc-menu"));
var collection_view_icon_1 = require("../icons/collection-view-icon");
var chevron_down_icon_1 = require("../icons/chevron-down-icon");
var collection_view_1 = require("./collection-view");
var page_icon_1 = require("./page-icon");
var context_1 = require("../context");
var utils_1 = require("../utils");
var isServer = typeof window === 'undefined';
var triggers = ['click'];
var Collection = function (_a) {
    var _b, _c, _d, _e;
    var block = _a.block, className = _a.className;
    var _f = context_1.useNotionContext(), recordMap = _f.recordMap, showCollectionViewDropdown = _f.showCollectionViewDropdown;
    var collectionId = block.collection_id, viewIds = block.view_ids;
    var _g = react_use_1.useLocalStorage(block.id, {
        collectionViewId: viewIds[0]
    }), collectionState = _g[0], setCollectionState = _g[1];
    var collectionViewId = viewIds.find(function (id) { return id === collectionState.collectionViewId; }) || viewIds[0];
    var onChangeView = react_1["default"].useCallback(function (_a) {
        var collectionViewId = _a.key;
        console.log('change collection view', collectionViewId);
        setCollectionState(__assign(__assign({}, collectionState), { collectionViewId: collectionViewId }));
    }, [collectionState]);
    var width = react_use_1.useWindowSize().width;
    if (isServer) {
        width = 1024;
    }
    // TODO: customize for mobile?
    var maxNotionBodyWidth = 708;
    var notionBodyWidth = maxNotionBodyWidth;
    var parentPage = notion_utils_1.getBlockParentPage(block, recordMap);
    if ((_b = parentPage === null || parentPage === void 0 ? void 0 : parentPage.format) === null || _b === void 0 ? void 0 : _b.page_full_width) {
        notionBodyWidth = (width - 2 * Math.min(96, width * 0.08)) | 0;
    }
    else {
        notionBodyWidth =
            width < maxNotionBodyWidth
                ? (width - width * 0.02) | 0 // 2vw
                : maxNotionBodyWidth;
    }
    var padding = isServer ? 96 : ((width - notionBodyWidth) / 2) | 0;
    // console.log({ width, notionBodyWidth, padding })
    var collection = (_c = recordMap.collection[collectionId]) === null || _c === void 0 ? void 0 : _c.value;
    var collectionView = (_d = recordMap.collection_view[collectionViewId]) === null || _d === void 0 ? void 0 : _d.value;
    var collectionData = (_e = recordMap.collection_query[collectionId]) === null || _e === void 0 ? void 0 : _e[collectionViewId];
    if (!(collection && collectionView && collectionData)) {
        console.log('skipping missing collection view for block', block.id);
        return null;
    }
    var style = {};
    if (collectionView.type === 'table' || collectionView.type === 'board') {
        style.paddingLeft = padding;
        style.paddingRight = padding;
    }
    var title = notion_utils_1.getTextContent(collection.name).trim();
    if (collection.icon) {
        block.format = __assign(__assign({}, block.format), { page_icon: collection.icon });
    }
    return (react_1["default"].createElement("div", { className: utils_1.cs('notion-collection', className) },
        react_1["default"].createElement("div", { className: 'notion-collection-header', style: style },
            title && (react_1["default"].createElement("div", { className: 'notion-collection-header-title' },
                react_1["default"].createElement(react_1["default"].Fragment, null,
                    react_1["default"].createElement(page_icon_1.PageIcon, { block: block, className: 'notion-page-title-icon', hideDefaultIcon: true }),
                    title))),
            viewIds.length > 1 && showCollectionViewDropdown && (react_1["default"].createElement(rc_dropdown_1["default"], { trigger: triggers, overlay: react_1["default"].createElement(rc_menu_1["default"], { onSelect: onChangeView }, viewIds.map(function (viewId) {
                    var _a;
                    return (react_1["default"].createElement(rc_menu_1.Item, { key: viewId, className: 'notion-collection-view-type-menu-item' },
                        react_1["default"].createElement(CollectionViewColumnDesc, { collectionView: (_a = recordMap.collection_view[viewId]) === null || _a === void 0 ? void 0 : _a.value })));
                })), animation: 'slide-up' },
                react_1["default"].createElement(CollectionViewColumnDesc, { className: 'notion-collection-view-dropdown', collectionView: collectionView },
                    react_1["default"].createElement(chevron_down_icon_1.ChevronDownIcon, { className: 'notion-collection-view-dropdown-icon' }))))),
        react_1["default"].createElement(collection_view_1.CollectionView, { collection: collection, collectionView: collectionView, collectionData: collectionData, padding: padding, width: width })));
};
exports.Collection = Collection;
var CollectionViewColumnDesc = function (_a) {
    var collectionView = _a.collectionView, className = _a.className, children = _a.children, rest = __rest(_a, ["collectionView", "className", "children"]);
    var type = collectionView.type;
    var name = collectionView.name || "" + type[0].toUpperCase() + type.slice(1) + " view";
    return (react_1["default"].createElement("div", __assign({ className: utils_1.cs('notion-collection-view-type', className) }, rest),
        react_1["default"].createElement(collection_view_icon_1.CollectionViewIcon, { className: 'notion-collection-view-type-icon', type: type }),
        react_1["default"].createElement("span", { className: 'notion-collection-view-type-title' }, name),
        children));
};
//# sourceMappingURL=collection.js.map
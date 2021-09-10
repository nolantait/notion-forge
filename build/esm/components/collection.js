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
import React from "react";
import { getBlockParentPage, getTextContent } from "notion-utils";
import { useLocalStorage, useWindowSize } from "react-use";
import Dropdown from "rc-dropdown";
import Menu, { Item as MenuItem } from "rc-menu";
import { CollectionViewIcon } from "../icons/collection-view-icon";
import { ChevronDownIcon } from "../icons/chevron-down-icon";
import { useNotionContext } from "../context";
import { cs } from "../utils";
var isServer = typeof window === "undefined";
var triggers = ["click"];
export var Collection = function (_a) {
    var _b, _c, _d, _e;
    var block = _a.block, className = _a.className;
    var _f = useNotionContext(), recordMap = _f.recordMap, showCollectionViewDropdown = _f.showCollectionViewDropdown, components = _f.components;
    var collectionId = block.collection_id, viewIds = block.view_ids;
    var _g = useLocalStorage(block.id, {
        collectionViewId: viewIds[0]
    }), collectionState = _g[0], setCollectionState = _g[1];
    var collectionViewId = viewIds.find(function (id) { return id === collectionState.collectionViewId; }) || viewIds[0];
    var onChangeView = React.useCallback(function (_a) {
        var collectionViewId = _a.key;
        console.log("change collection view", collectionViewId);
        setCollectionState(__assign(__assign({}, collectionState), { collectionViewId: collectionViewId }));
    }, [collectionState]);
    var width = useWindowSize().width;
    if (isServer) {
        width = 1024;
    }
    // TODO: customize for mobile?
    var maxNotionBodyWidth = 708;
    var notionBodyWidth = maxNotionBodyWidth;
    var parentPage = getBlockParentPage(block, recordMap);
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
        console.log("skipping missing collection view for block", block.id);
        return null;
    }
    var style = {};
    if (collectionView.type === "table" || collectionView.type === "board") {
        style.paddingLeft = padding;
        style.paddingRight = padding;
    }
    var title = getTextContent(collection.name).trim();
    if (collection.icon) {
        block.format = __assign(__assign({}, block.format), { page_icon: collection.icon });
    }
    return (React.createElement("div", { className: cs("notion-collection", className) },
        React.createElement("div", { className: "notion-collection-header", style: style },
            title && (React.createElement("div", { className: "notion-collection-header-title" },
                React.createElement(React.Fragment, null,
                    React.createElement(components.pageIcon, { block: block, className: "notion-page-title-icon", hideDefaultIcon: true }),
                    title))),
            viewIds.length > 1 && showCollectionViewDropdown && (React.createElement(Dropdown, { trigger: triggers, overlay: React.createElement(Menu, { onSelect: onChangeView }, viewIds.map(function (viewId) {
                    var _a;
                    return (React.createElement(MenuItem, { key: viewId, className: "notion-collection-view-type-menu-item" },
                        React.createElement(CollectionViewColumnDesc, { collectionView: (_a = recordMap.collection_view[viewId]) === null || _a === void 0 ? void 0 : _a.value })));
                })), animation: "slide-up" },
                React.createElement(CollectionViewColumnDesc, { className: "notion-collection-view-dropdown", collectionView: collectionView },
                    React.createElement(ChevronDownIcon, { className: "notion-collection-view-dropdown-icon" }))))),
        React.createElement(components.collectionView, { collection: collection, collectionView: collectionView, collectionData: collectionData, padding: padding, width: width })));
};
var CollectionViewColumnDesc = function (_a) {
    var collectionView = _a.collectionView, className = _a.className, children = _a.children, rest = __rest(_a, ["collectionView", "className", "children"]);
    var type = collectionView.type;
    var name = collectionView.name || "" + type[0].toUpperCase() + type.slice(1) + " view";
    return (React.createElement("div", __assign({ className: cs("notion-collection-view-type", className) }, rest),
        React.createElement(CollectionViewIcon, { className: "notion-collection-view-type-icon", type: type }),
        React.createElement("span", { className: "notion-collection-view-type-title" }, name),
        children));
};
//# sourceMappingURL=collection.js.map
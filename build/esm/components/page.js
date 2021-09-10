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
import React from "react";
import { cs } from "../utils";
import { NotionContainer } from "./notion-container";
import { getPageTableOfContents } from "notion-utils";
import { useNotionContext } from "../context";
export var Page = function (props) {
    var _a;
    var _b = useNotionContext(), components = _b.components, mapPageUrl = _b.mapPageUrl, fullPage = _b.fullPage;
    var block = props.block, level = props.level, blockId = props.blockId;
    if (level === 0) {
        if (fullPage) {
            return FullPage(props);
        }
        else {
            return LightPage(props);
        }
    }
    else {
        var blockColor = (_a = block.format) === null || _a === void 0 ? void 0 : _a.block_color;
        var pageLinkStyle = cs("notion-page-link", blockColor && "notion-" + blockColor, blockId);
        return (React.createElement(components.pageLink, { className: pageLinkStyle, href: mapPageUrl(block.id) },
            React.createElement(components.pageTitle, { block: block })));
    }
};
var FullPage = function (props) {
    var _a = useNotionContext(), components = _a.components, defaultPageIcon = _a.defaultPageIcon, defaultPageCover = _a.defaultPageCover, defaultPageCoverPosition = _a.defaultPageCoverPosition, recordMap = _a.recordMap, showTableOfContents = _a.showTableOfContents, minTableOfContentsItems = _a.minTableOfContentsItems, darkMode = _a.darkMode;
    var block = props.block, children = props.children, className = props.className, bodyClassName = props.bodyClassName, footer = props.footer, pageHeader = props.pageHeader, pageFooter = props.pageFooter, pageAside = props.pageAside, pageCover = props.pageCover, blockId = props.blockId;
    var _b = block.format || {}, _c = _b.page_icon, page_icon = _c === void 0 ? defaultPageIcon : _c, _d = _b.page_cover, page_cover = _d === void 0 ? defaultPageCover : _d, _e = _b.page_cover_position, page_cover_position = _e === void 0 ? defaultPageCoverPosition : _e, page_full_width = _b.page_full_width;
    var properties = block.properties;
    var toc = getPageTableOfContents(block, recordMap);
    var hasToc = showTableOfContents && toc.length >= minTableOfContentsItems;
    var hasAside = (hasToc || pageAside) && !page_full_width;
    var containerParams = {
        block: block,
        darkMode: darkMode,
        blockId: blockId,
        className: className,
        pageCover: pageCover || page_cover,
        pageCoverPosition: page_cover_position,
        footer: footer,
        bodyClassName: bodyClassName
    };
    var tableOfContentsStyle = cs("notion-page-content", hasAside && "notion-page-content-has-aside", hasToc && "notion-page-content-has-toc");
    var parentIsCollection = block.parent_table === "collection";
    return (React.createElement(NotionContainer, __assign({}, containerParams),
        page_icon && (React.createElement("div", { className: "notion-page-icon-wrapper" },
            React.createElement(components.pageIcon, { block: block, defaultIcon: defaultPageIcon }))),
        pageHeader,
        React.createElement(components.title, { value: properties === null || properties === void 0 ? void 0 : properties.title, block: block }),
        parentIsCollection && React.createElement(components.collectionRow, { block: block }),
        React.createElement("div", { className: tableOfContentsStyle },
            React.createElement("article", { className: "notion-page-content-inner" }, children),
            hasAside && (React.createElement("aside", { className: "notion-aside" },
                hasToc && React.createElement(components.tableOfContents, { block: block }),
                pageAside))),
        pageFooter));
};
var LightPage = function (props) {
    var _a = useNotionContext(), components = _a.components, darkMode = _a.darkMode;
    var block = props.block, children = props.children, className = props.className, bodyClassName = props.bodyClassName, pageHeader = props.pageHeader, pageFooter = props.pageFooter, blockId = props.blockId;
    var _b = block.format || {}, page_full_width = _b.page_full_width, page_small_text = _b.page_small_text;
    var containerStyle = cs("notion", darkMode ? "dark-mode" : "light-mode", "notion-page", page_full_width && "notion-full-width", page_small_text && "notion-small-text", blockId, className, bodyClassName);
    return (React.createElement("main", { className: containerStyle },
        React.createElement("div", { className: "notion-viewport" }),
        pageHeader,
        block.type === "page" && block.parent_table === "collection" && (React.createElement(components.collectionRow, { block: block })),
        children,
        pageFooter));
};
//# sourceMappingURL=page.js.map
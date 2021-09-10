import React from "react";
import { LazyImage } from "../components/lazy-image";
import { cs, isUrl } from "../utils";
import { useNotionContext } from "../context";
import { getBlockIcon, getTextContent } from "notion-utils";
export var NotionContainer = function (props) {
    var _a;
    var _b = useNotionContext(), mapImageUrl = _b.mapImageUrl, defaultPageIcon = _b.defaultPageIcon, recordMap = _b.recordMap, components = _b.components;
    var block = props.block, pageCover = props.pageCover, footer = props.footer, darkMode = props.darkMode, blockId = props.blockId, className = props.className, pageCoverPosition = props.pageCoverPosition, children = props.children, bodyClassName = props.bodyClassName;
    var properties = block.properties;
    var hasPageCover = pageCover;
    var coverPosition = (1 - (pageCoverPosition || 0.5)) * 100;
    var page_icon = defaultPageIcon;
    var pageIcon = (_a = getBlockIcon(block, recordMap)) !== null && _a !== void 0 ? _a : defaultPageIcon;
    var isPageIconUrl = pageIcon && isUrl(pageIcon);
    var outerContainerStyle = cs("notion", "notion-app", darkMode ? "dark-mode" : "light-mode", blockId, className);
    var innerContainerStyle = cs("notion-page", hasPageCover ? "notion-page-has-cover" : "notion-page-no-cover", page_icon ? "notion-page-has-icon" : "notion-page-no-icon", isPageIconUrl ? "notion-page-has-image-icon" : "notion-page-has-text-icon", "notion-full-page", bodyClassName);
    var renderPageCover = typeof pageCover !== "string" ? (pageCover) : (React.createElement(LazyImage, { src: mapImageUrl(pageCover, block), alt: getTextContent(properties === null || properties === void 0 ? void 0 : properties.title), className: "notion-page-cover", style: {
            objectPosition: "center " + coverPosition + "%"
        } }));
    return (React.createElement("div", { className: outerContainerStyle },
        React.createElement("div", { className: "notion-viewport" }),
        React.createElement("div", { className: "notion-frame" },
            React.createElement(components.pageHeader, null),
            React.createElement("div", { className: "notion-page-scroller" },
                hasPageCover ? renderPageCover : null,
                React.createElement("main", { className: innerContainerStyle }, children),
                footer))));
};
//# sourceMappingURL=notion-container.js.map
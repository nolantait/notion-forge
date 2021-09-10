import React from "react";
import { getTextContent, getPageTableOfContents, getBlockParentPage, uuidToId, } from "notion-utils";
import { LinkIcon } from "../icons/link-icon";
import { useNotionContext } from "../context";
import { cs } from "../utils";
var tocIndentLevelCache = {};
export var Header = function (props) {
    var _a;
    var _b = useNotionContext(), recordMap = _b.recordMap, components = _b.components;
    var block = props.block, blockId = props.blockId;
    if (!block.properties)
        return null;
    var blockColor = (_a = block.format) === null || _a === void 0 ? void 0 : _a.block_color;
    var id = uuidToId(block.id);
    var title = getTextContent(block.properties.title) || "Notion Header " + id;
    // we use a cache here because constructing the ToC is non-trivial
    var indentLevel = tocIndentLevelCache[block.id];
    var indentLevelClass;
    if (indentLevel === undefined) {
        var page = getBlockParentPage(block, recordMap);
        if (page) {
            var toc = getPageTableOfContents(page, recordMap);
            var tocItem = toc.find(function (tocItem) { return tocItem.id === block.id; });
            if (tocItem) {
                indentLevel = tocItem.indentLevel;
                tocIndentLevelCache[block.id] = indentLevel;
            }
        }
    }
    if (indentLevel !== undefined) {
        indentLevelClass = "notion-h-indent-" + indentLevel;
    }
    var isH1 = block.type === "header";
    var isH2 = block.type === "sub_header";
    var isH3 = block.type === "sub_sub_header";
    var classNameStr = cs(isH1 && "notion-h notion-h1", isH2 && "notion-h notion-h2", isH3 && "notion-h notion-h3", blockColor && "notion-" + blockColor, indentLevelClass, blockId);
    var innerHeader = (React.createElement("span", null,
        React.createElement("div", { id: id, className: "notion-header-anchor" }),
        React.createElement("a", { className: "notion-hash-link", href: "#" + id, title: title },
            React.createElement(LinkIcon, null)),
        React.createElement("span", { className: "notion-h-title" },
            React.createElement(components.text, { value: block.properties.title, block: block }))));
    //page title takes the h1 so all header blocks are greater
    if (isH1) {
        return (React.createElement("h2", { className: classNameStr, "data-id": id }, innerHeader));
    }
    else if (isH2) {
        return (React.createElement("h3", { className: classNameStr, "data-id": id }, innerHeader));
    }
    else {
        return (React.createElement("h4", { className: classNameStr, "data-id": id }, innerHeader));
    }
};
//# sourceMappingURL=header.js.map
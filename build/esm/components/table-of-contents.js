import React from "react";
import { cs } from "../utils";
import { getBlockParentPage, getPageTableOfContents, uuidToId, } from "notion-utils";
import useScrollSpy from "../hooks/use-scroll-spy";
import { useNotionContext } from "../context";
export var TableOfContents = function (props) {
    var _a;
    var recordMap = useNotionContext().recordMap;
    var block = props.block, blockId = props.blockId;
    var page = getBlockParentPage(block, recordMap);
    if (!page)
        return null;
    var toc = getPageTableOfContents(page, recordMap);
    var blockColor = (_a = block.format) === null || _a === void 0 ? void 0 : _a.block_color;
    var style = cs("notion-table-of-contents", blockId, blockColor && "notion-" + blockColor);
    return (React.createElement("div", { className: style }, toc.map(function (tocItem) { return (React.createElement("a", { key: tocItem.id, href: "#" + uuidToId(tocItem.id), className: "notion-table-of-contents-item" },
        React.createElement("span", { className: "notion-table-of-contents-item-body", style: {
                display: "inline-block",
                marginLeft: tocItem.indentLevel * 24
            } }, tocItem.text))); })));
};
export var AsideTableOfContents = function (props) {
    var throttleMs = 100;
    var _a = useNotionContext(), darkMode = _a.darkMode, recordMap = _a.recordMap;
    var block = props.block;
    var _b = useScrollSpy(throttleMs), activeSection = _b[0], _setActiveSection = _b[1];
    var toc = getPageTableOfContents(block, recordMap);
    return (React.createElement("div", { className: "notion-aside-table-of-contents" },
        React.createElement("div", { className: "notion-aside-table-of-contents-header" }, "Table of Contents"),
        React.createElement("nav", { className: cs("notion-table-of-contents", !darkMode && "notion-gray") }, toc.map(function (tocItem) {
            var id = uuidToId(tocItem.id);
            return (React.createElement("a", { key: id, href: "#" + id, className: cs("notion-table-of-contents-item", "notion-table-of-contents-item-indent-level-" + tocItem.indentLevel, activeSection === id && "notion-table-of-contents-active-item") },
                React.createElement("span", { className: "notion-table-of-contents-item-body", style: {
                        display: "inline-block",
                        marginLeft: tocItem.indentLevel * 16
                    } }, tocItem.text)));
        }))));
};
//# sourceMappingURL=table-of-contents.js.map
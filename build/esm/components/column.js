import React from "react";
import { cs } from "../utils";
import { useNotionContext } from "../context";
export var Column = function (props) {
    var _a, _b, _c;
    var recordMap = useNotionContext().recordMap;
    var block = props.block, blockId = props.blockId, children = props.children;
    // note: notion uses 46px
    var spacerWidth = "min(32px, 4vw)";
    var ratio = ((_a = block.format) === null || _a === void 0 ? void 0 : _a.column_ratio) || 0.5;
    var parent = (_b = recordMap.block[block.parent_id]) === null || _b === void 0 ? void 0 : _b.value;
    var columns = ((_c = parent === null || parent === void 0 ? void 0 : parent.content) === null || _c === void 0 ? void 0 : _c.length) || Math.max(2, Math.ceil(1.0 / ratio));
    var width = "calc((100% - (" + (columns - 1) + " * " + spacerWidth + ")) * " + ratio + ")";
    var inlineStyle = { width: width };
    var style = cs("notion-column", blockId);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: style, style: inlineStyle }, children),
        React.createElement("div", { className: "notion-spacer" })));
};
//# sourceMappingURL=column.js.map
import React from "react";
import { cs } from "../utils";
import { useNotionContext } from "../context";
export var Callout = function (props) {
    var _a, _b, _c;
    var block = props.block, blockId = props.blockId, children = props.children;
    var components = useNotionContext().components;
    var style = cs("notion-callout", blockId, ((_a = block.format) === null || _a === void 0 ? void 0 : _a.block_color) && "notion-" + ((_b = block.format) === null || _b === void 0 ? void 0 : _b.block_color) + "_co");
    return (React.createElement("div", { className: style },
        React.createElement(components.pageIcon, { block: block }),
        React.createElement("div", { className: "notion-callout-text" },
            React.createElement(components.text, { value: (_c = block.properties) === null || _c === void 0 ? void 0 : _c.title, block: block }),
            children)));
};
//# sourceMappingURL=callout.js.map
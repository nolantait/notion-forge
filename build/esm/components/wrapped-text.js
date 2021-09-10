import React from "react";
import { cs } from "../utils";
import { useNotionContext } from "../context";
export var WrappedText = function (props) {
    var _a, _b, _c;
    var components = useNotionContext().components;
    var block = props.block, blockId = props.blockId, children = props.children;
    if (!block.properties && !((_a = block.content) === null || _a === void 0 ? void 0 : _a.length)) {
        return React.createElement("div", { className: cs("notion-blank", blockId) }, "\u00A0");
    }
    var blockColor = (_b = block.format) === null || _b === void 0 ? void 0 : _b.block_color;
    return (React.createElement("div", { className: cs("notion-text", blockColor && "notion-" + blockColor, blockId) },
        ((_c = block.properties) === null || _c === void 0 ? void 0 : _c.title) && (React.createElement(components.text, { value: block.properties.title, block: block })),
        children && React.createElement("div", { className: "notion-text-children" }, children)));
};
//# sourceMappingURL=wrapped-text.js.map
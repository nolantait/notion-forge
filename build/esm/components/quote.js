import React from "react";
import { cs } from "../utils";
import { useNotionContext } from "../context";
export var Quote = function (props) {
    var _a;
    var components = useNotionContext().components;
    var block = props.block, blockId = props.blockId;
    var properties = block.properties;
    if (!properties)
        return null;
    var blockColor = (_a = block.format) === null || _a === void 0 ? void 0 : _a.block_color;
    var style = cs("notion-quote", blockColor && "notion-" + blockColor, blockId);
    return (React.createElement("blockquote", { className: style },
        React.createElement(components.text, { value: block.properties.title, block: block })));
};
//# sourceMappingURL=quote.js.map
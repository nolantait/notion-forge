import React from "react";
import { cs } from "../utils";
import { useNotionContext } from "../context";
export var Toggle = function (props) {
    var _a;
    var block = props.block, blockId = props.blockId, children = props.children;
    var components = useNotionContext().components;
    var style = cs("notion-toggle", blockId);
    return (React.createElement("details", { className: style },
        React.createElement("summary", null,
            React.createElement(components.text, { value: (_a = block.properties) === null || _a === void 0 ? void 0 : _a.title, block: block })),
        React.createElement("div", null, children)));
};
//# sourceMappingURL=toggle.js.map
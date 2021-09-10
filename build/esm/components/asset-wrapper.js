import React from "react";
import { cs } from "../utils";
import { useNotionContext } from "../context";
export var AssetWrapper = function (props) {
    var _a, _b;
    var block = props.block, blockId = props.blockId;
    var components = useNotionContext().components;
    var value = block;
    return (React.createElement("figure", { className: cs("notion-asset-wrapper", "notion-asset-wrapper-" + block.type, ((_a = value.format) === null || _a === void 0 ? void 0 : _a.block_full_width) && "notion-asset-wrapper-full", blockId) },
        React.createElement(components.asset, { block: value }),
        ((_b = value === null || value === void 0 ? void 0 : value.properties) === null || _b === void 0 ? void 0 : _b.caption) && (React.createElement("figcaption", { className: "notion-asset-caption" },
            React.createElement(components.text, { value: block.properties.caption, block: block })))));
};
//# sourceMappingURL=asset-wrapper.js.map
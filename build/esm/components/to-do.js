import React from "react";
import { useNotionContext } from "../context";
import { cs } from "../utils";
export var Todo = function (props) {
    var _a, _b, _c, _d;
    var components = useNotionContext().components;
    var block = props.block, blockId = props.blockId, children = props.children;
    var isChecked = ((_c = (_b = (_a = block.properties) === null || _a === void 0 ? void 0 : _a.checked) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c[0]) === "Yes";
    var containerStyle = cs("notion-to-do", blockId);
    var wrapperStyle = cs("notion-to-do-body", isChecked && "notion-to-do-checked");
    return (React.createElement("div", { className: containerStyle },
        React.createElement("div", { className: "notion-to-do-item" },
            React.createElement(components.checkbox, { isChecked: isChecked }),
            React.createElement("div", { className: wrapperStyle },
                React.createElement(components.text, { value: (_d = block.properties) === null || _d === void 0 ? void 0 : _d.title, block: block }))),
        React.createElement("div", { className: "notion-to-do-children" }, children)));
};
//# sourceMappingURL=to-do.js.map
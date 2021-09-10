import React from "react";
import { useNotionContext } from "../context";
export var Title = function (_a) {
    var value = _a.value, block = _a.block;
    var components = useNotionContext().components;
    return (React.createElement("h1", { className: "notion-title" },
        React.createElement(components.text, { value: value, block: block })));
};
//# sourceMappingURL=title.js.map
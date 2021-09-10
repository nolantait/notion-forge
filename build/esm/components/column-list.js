import React from "react";
import { cs } from "../utils";
export var ColumnList = function (props) {
    var blockId = props.blockId, children = props.children;
    var style = cs("notion-row", blockId);
    return React.createElement("div", { className: style }, children);
};
//# sourceMappingURL=column-list.js.map
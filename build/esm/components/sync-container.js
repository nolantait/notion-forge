import React from "react";
import { cs } from "../utils";
export var SyncContainer = function (props) {
    var children = props.children, blockId = props.blockId;
    var style = cs("notion-sync-block", blockId);
    return React.createElement("div", { className: style }, children);
};
//# sourceMappingURL=sync-container.js.map
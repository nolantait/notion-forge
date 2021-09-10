import React from "react";
import { cs } from "../utils";
export var TransclusionContainer = function (props) {
    var blockId = props.blockId, children = props.children;
    var style = cs("notion-sync-block", blockId);
    return React.createElement("div", { className: style }, children);
};
//# sourceMappingURL=transclusion-container.js.map
import React from "react";
import { cs } from "../utils";
export var Divider = function (props) {
    var blockId = props.blockId;
    return React.createElement("hr", { className: cs("notion-hr", blockId) });
};
//# sourceMappingURL=divider.js.map
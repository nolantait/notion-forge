import React from "react";
import { useNotionContext } from "../context";
import { cs } from "../utils";
export var Audio = function (props) {
    var block = props.block, className = props.className;
    var recordMap = useNotionContext().recordMap;
    var signedUrl = recordMap.signed_urls[block.id];
    return (React.createElement("div", { className: cs("notion-audio", className) },
        React.createElement("audio", { controls: true, preload: "none", src: signedUrl })));
};
//# sourceMappingURL=audio.js.map
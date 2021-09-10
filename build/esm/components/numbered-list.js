import React from "react";
import { useNotionContext } from "../context";
import { cs, getListNumber } from "../utils";
export var NumberedList = function (props) {
    var _a, _b;
    var recordMap = useNotionContext().recordMap;
    var block = props.block, blockId = props.blockId, children = props.children;
    var content = block.content, properties = block.properties;
    var isTopLevel = block.type !== ((_b = (_a = recordMap.block[block.parent_id]) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.type);
    var hasChildren = content;
    var startingIndex = getListNumber(block.id, recordMap.block);
    var listStyle = cs("notion-list", "notion-list-numbered", blockId);
    var output = null;
    if (hasChildren) {
        output = NestedList(block, listStyle, startingIndex, children);
    }
    else {
        output = properties ? ListItem(block) : null;
    }
    return isTopLevel ? WrapList(output, listStyle, startingIndex) : output;
};
var NestedList = function (block, style, startingIndex, children) {
    var properties = block.properties;
    return (React.createElement(React.Fragment, null,
        properties && ListItem(block),
        WrapList(children, style, startingIndex)));
};
var WrapList = function (content, style, startingIndex) {
    return (React.createElement("ol", { start: startingIndex, className: style }, content));
};
var ListItem = function (block) {
    var components = useNotionContext().components;
    var title = block.properties.title;
    return (React.createElement("li", null,
        React.createElement(components.text, { value: title, block: block })));
};
//# sourceMappingURL=numbered-list.js.map
import React from "react";
import { cs } from "../utils";
import { useNotionContext } from "../context";
import { GracefulImage } from "../components/graceful-image";
import { getTextContent } from "notion-utils";
export var Bookmark = function (props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    var block = props.block, blockId = props.blockId;
    var components = useNotionContext().components;
    if (!block.properties)
        return null;
    var title = getTextContent((_a = block.properties) === null || _a === void 0 ? void 0 : _a.title);
    if (!title) {
        title = getTextContent((_b = block.properties) === null || _b === void 0 ? void 0 : _b.link);
    }
    if (title) {
        if (title.startsWith("http")) {
            try {
                var url = new URL(title);
                title = url.hostname;
            }
            catch (err) {
                // ignore invalid links
            }
        }
    }
    return (React.createElement("div", { className: "notion-row" },
        React.createElement(components.link, { target: "_blank", rel: "noopener noreferrer", className: cs("notion-bookmark", ((_c = block.format) === null || _c === void 0 ? void 0 : _c.block_color) && "notion-" + block.format.block_color, blockId), href: block.properties.link[0][0] },
            React.createElement("div", null,
                title && (React.createElement("div", { className: "notion-bookmark-title" },
                    React.createElement(components.text, { value: [[title]], block: block }))),
                ((_d = block.properties) === null || _d === void 0 ? void 0 : _d.description) && (React.createElement("div", { className: "notion-bookmark-description" },
                    React.createElement(components.text, { value: (_e = block.properties) === null || _e === void 0 ? void 0 : _e.description, block: block }))),
                React.createElement("div", { className: "notion-bookmark-link" },
                    ((_f = block.format) === null || _f === void 0 ? void 0 : _f.bookmark_icon) && (React.createElement(GracefulImage, { src: (_g = block.format) === null || _g === void 0 ? void 0 : _g.bookmark_icon, alt: title, loading: "lazy" })),
                    React.createElement("div", null,
                        React.createElement(components.text, { value: (_h = block.properties) === null || _h === void 0 ? void 0 : _h.link, block: block })))),
            ((_j = block.format) === null || _j === void 0 ? void 0 : _j.bookmark_cover) && (React.createElement("div", { className: "notion-bookmark-image" },
                React.createElement(GracefulImage, { src: (_k = block.format) === null || _k === void 0 ? void 0 : _k.bookmark_cover, alt: getTextContent((_l = block.properties) === null || _l === void 0 ? void 0 : _l.title), loading: "lazy" }))))));
};
//# sourceMappingURL=bookmark.js.map
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from "react";
import { uuidToId } from "notion-utils";
import { useNotionContext } from "./context";
export var Block = function (props) {
    var _a, _b;
    var components = useNotionContext().components;
    var block = props.block, children = props.children, level = props.level, hideBlockId = props.hideBlockId;
    var blockMissing = !block;
    if (blockMissing) {
        return null;
    }
    var blockId = hideBlockId
        ? "notion-block"
        : "notion-block-" + uuidToId(block.id);
    var pageProps = __assign(__assign({}, props), { blockId: blockId });
    // ugly hack to make viewing raw collection views work properly
    // e.g., 6d886ca87ab94c21a16e3b82b43a57fb
    if (level === 0 && block.type === "collection_view") {
        block.type = "collection_view_page";
    }
    switch (block.type) {
        case "collection_view_page":
            return React.createElement(components.collectionViewPage, __assign({}, pageProps));
        case "page":
            return React.createElement(components.page, __assign({}, pageProps));
        case "header":
        // Fallthrough
        case "sub_header":
        // Fallthrough
        case "sub_sub_header":
            return React.createElement(components.header, { block: block, blockId: blockId });
        case "divider":
            return React.createElement(components.divider, null);
        case "text": {
            return (React.createElement(components.wrappedText, { block: block, blockId: blockId }, children));
        }
        case "bulleted_list": {
            return (React.createElement(components.bulletedList, { block: block, blockId: blockId }, children));
        }
        case "numbered_list": {
            return (React.createElement(components.numberedList, { block: block, blockId: blockId }, children));
        }
        case "tweet":
        // fallthrough
        case "maps":
        // fallthrough
        case "pdf":
        // fallthrough
        case "figma":
        // fallthrough
        case "typeform":
        // fallthrough
        case "codepen":
        // fallthrough
        case "excalidraw":
        // fallthrough
        case "image":
        // fallthrough
        case "gist":
        // fallthrough
        case "embed":
        // fallthrough
        case "video":
            return React.createElement(components.assetWrapper, { blockId: blockId, block: block });
        case "drive": {
            var properties = (_a = block.format) === null || _a === void 0 ? void 0 : _a.drive_properties;
            if (!properties) {
                //check if this drive actually needs to be embeded ex. google sheets.
                if ((_b = block.format) === null || _b === void 0 ? void 0 : _b.display_source) {
                    return React.createElement(components.assetWrapper, { blockId: blockId, block: block });
                }
            }
            return (React.createElement(components.googleDrive, { block: block, className: blockId }));
        }
        case "audio": {
            return (React.createElement(components.audio, { block: block, className: blockId }));
        }
        case "file": {
            return (React.createElement(components.file, { block: block, className: blockId }));
        }
        case "equation": {
            var math = block.properties.title[0][0];
            if (!math)
                return null;
            return React.createElement(components.equation, { math: math, block: true, className: blockId });
        }
        case "code": {
            if (block.properties.title) {
                var content = block.properties.title[0][0];
                var language = block.properties.language
                    ? block.properties.language[0][0]
                    : "";
                var caption = block.properties.caption;
                // TODO: add className
                return (React.createElement(React.Fragment, null,
                    React.createElement(components.code, { key: block.id, language: language || "", code: content }),
                    caption && (React.createElement("figcaption", { className: "notion-asset-caption" },
                        React.createElement(components.text, { value: caption, block: block })))));
            }
            break;
        }
        case "column_list": {
            return (React.createElement(components.columnList, { block: block, blockId: blockId }, children));
        }
        case "column": {
            return (React.createElement(components.column, { block: block, blockId: blockId }, children));
        }
        case "quote": {
            return React.createElement(components.quote, { block: block, blockId: blockId });
        }
        case "collection_view": {
            return React.createElement(components.collection, { block: block, blockId: blockId });
        }
        case "callout": {
            return (React.createElement(components.callout, { block: block, blockId: blockId }, children));
        }
        case "bookmark": {
            return React.createElement(components.bookmark, { block: block, blockId: blockId });
        }
        case "toggle": {
            return (React.createElement(components.toggle, { block: block, blockId: blockId }, children));
        }
        case "table_of_contents": {
            return React.createElement(components.tableOfContents, { block: block, blockId: blockId });
        }
        case "to_do": {
            return (React.createElement(components.todo, { block: block, blockId: blockId }, children));
        }
        case "transclusion_container": {
            return (React.createElement(components.syncContainer, { blockId: blockId }, children));
        }
        case "transclusion_reference": {
            return (React.createElement(components.syncPointerBlock, __assign({ block: block, level: level + 1 }, props)));
        }
        default: {
            if (process.env.NODE_ENV !== "production") {
                console.log("Unsupported type " + block.type, JSON.stringify(block, null, 2));
            }
            return React.createElement("div", null);
        }
    }
    return null;
};
//# sourceMappingURL=block.js.map
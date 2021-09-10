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
import { getTextContent } from "notion-utils";
import { useNotionContext } from "../context";
import { LazyImage } from "./lazy-image";
var isServer = typeof window === "undefined";
var types = [
    "video",
    "image",
    "embed",
    "figma",
    "typeform",
    "excalidraw",
    "maps",
    "tweet",
    "pdf",
    "gist",
    "codepen",
    "drive",
];
export var Asset = function (props) {
    var _a, _b, _c, _d, _e, _f, _g;
    var block = props.block;
    var _h = useNotionContext(), recordMap = _h.recordMap, mapImageUrl = _h.mapImageUrl, components = _h.components;
    if (!block || !types.includes(block.type)) {
        return null;
    }
    var style = {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignSelf: "center",
        width: "100%",
        maxWidth: "100%"
    };
    var assetStyle = {};
    // console.log('asset', block)
    if (block.format) {
        var _j = block.format, block_aspect_ratio = _j.block_aspect_ratio, block_height = _j.block_height, block_width = _j.block_width, block_full_width = _j.block_full_width, block_page_width = _j.block_page_width, block_preserve_scale = _j.block_preserve_scale;
        if (block_full_width || block_page_width) {
            if (block_full_width) {
                style.width = "100vw";
            }
            else {
                style.width = "100%";
            }
            if (block_aspect_ratio && block.type !== "image") {
                // console.log(block.type, block)
                style.paddingBottom = block_aspect_ratio * 100 + "%";
            }
            else if (block_height) {
                style.height = block_height;
            }
            else if (block_preserve_scale) {
                if (block.type === "image") {
                    style.height = "100%";
                }
                else {
                    // TODO: this is just a guess
                    style.paddingBottom = "75%";
                    style.minHeight = 100;
                }
            }
        }
        else {
            if (block_width) {
                style.width = block_width;
            }
            if (block_preserve_scale && block.type !== "image") {
                style.paddingBottom = "50%";
                style.minHeight = 100;
            }
            else {
                if (block_height && block.type !== "image") {
                    style.height = block_height;
                }
            }
        }
        if (block_preserve_scale || block.type === "image") {
            assetStyle.objectFit = "contain";
        }
    }
    var source = (_c = (_b = (_a = block.properties) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c[0];
    var content = null;
    if (block.type === "tweet") {
        var src = source;
        if (!src)
            return null;
        var id = src.split("?")[0].split("/").pop();
        if (!id)
            return null;
        content = (React.createElement("div", { style: __assign(__assign({}, assetStyle), { maxWidth: 420, width: "100%", marginLeft: "auto", marginRight: "auto" }) },
            React.createElement(components.tweet, { id: id })));
    }
    else if (block.type === "pdf") {
        style.overflow = "auto";
        style.padding = "8px 16px";
        style.background = "rgb(226, 226, 226)";
        if (!isServer) {
            var signedUrl = (_d = recordMap.signed_urls) === null || _d === void 0 ? void 0 : _d[block.id];
            if (!signedUrl)
                return null;
            console.log("pdf", block, signedUrl);
            content = React.createElement(components.pdf, { file: signedUrl });
        }
    }
    else if (block.type === "embed" ||
        block.type === "video" ||
        block.type === "figma" ||
        block.type === "typeform" ||
        block.type === "gist" ||
        block.type === "maps" ||
        block.type === "excalidraw" ||
        block.type === "codepen" ||
        block.type === "drive") {
        var signedUrl = recordMap.signed_urls[block.id];
        if (block.type === "video" &&
            signedUrl &&
            signedUrl.indexOf("youtube") < 0 &&
            signedUrl.indexOf("youtu.be") < 0 &&
            signedUrl.indexOf("vimeo") < 0 &&
            signedUrl.indexOf("wistia") < 0 &&
            signedUrl.indexOf("loom") < 0 &&
            signedUrl.indexOf("videoask") < 0 &&
            signedUrl.indexOf("getcloudapp") < 0) {
            content = (React.createElement("video", { playsInline: true, controls: true, preload: "metadata", style: assetStyle, src: signedUrl, title: block.type }));
        }
        else {
            var src = (_f = (_e = block.format) === null || _e === void 0 ? void 0 : _e.display_source) !== null && _f !== void 0 ? _f : source;
            if (src) {
                if (block.type === "gist" && !src.endsWith(".pibb")) {
                    src = src + ".pibb";
                }
                if (block.type === "gist") {
                    assetStyle.width = "100%";
                    style.paddingBottom = "50%";
                    // TODO: GitHub gists do not resize their height properly
                    content = (React.createElement("iframe", { style: assetStyle, className: "notion-asset-object-fit", src: src, title: "GitHub Gist", frameBorder: "0", 
                        // TODO: is this sandbox necessary?
                        // sandbox='allow-scripts allow-popups allow-top-navigation-by-user-activation allow-forms allow-same-origin'
                        // this is important for perf but react's TS definitions don't seem to like it
                        loading: "lazy", scrolling: "auto" }));
                }
                else {
                    content = (React.createElement("iframe", { className: "notion-asset-object-fit", style: assetStyle, src: src, title: "iframe " + block.type, frameBorder: "0", 
                        // TODO: is this sandbox necessary?
                        // sandbox='allow-scripts allow-popups allow-top-navigation-by-user-activation allow-forms allow-same-origin'
                        allowFullScreen: true, 
                        // this is important for perf but react's TS definitions don't seem to like it
                        loading: "lazy" }));
                }
            }
        }
    }
    else if (block.type === "image") {
        // console.log('image', block)
        var src = mapImageUrl(source, block);
        var caption = getTextContent((_g = block.properties) === null || _g === void 0 ? void 0 : _g.caption);
        var alt = caption || "notion image";
        content = (React.createElement(LazyImage, { src: src, alt: alt, style: assetStyle, zoomable: true, height: style.height }));
    }
    return React.createElement("div", { style: style }, content);
};
//# sourceMappingURL=asset.js.map
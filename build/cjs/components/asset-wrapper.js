"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.AssetWrapper = void 0;
var react_1 = __importDefault(require("react"));
var asset_1 = require("./asset");
var utils_1 = require("../utils");
var text_1 = require("./text");
var AssetWrapper = function (_a) {
    var _b, _c;
    var blockId = _a.blockId, block = _a.block;
    var value = block;
    return (react_1["default"].createElement("figure", { className: utils_1.cs('notion-asset-wrapper', "notion-asset-wrapper-" + block.type, ((_b = value.format) === null || _b === void 0 ? void 0 : _b.block_full_width) && 'notion-asset-wrapper-full', blockId) },
        react_1["default"].createElement(asset_1.Asset, { block: value }),
        ((_c = value === null || value === void 0 ? void 0 : value.properties) === null || _c === void 0 ? void 0 : _c.caption) && (react_1["default"].createElement("figcaption", { className: 'notion-asset-caption' },
            react_1["default"].createElement(text_1.Text, { value: block.properties.caption, block: block })))));
};
exports.AssetWrapper = AssetWrapper;
//# sourceMappingURL=asset-wrapper.js.map
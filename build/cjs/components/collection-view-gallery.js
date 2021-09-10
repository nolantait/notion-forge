"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.CollectionViewGallery = void 0;
var react_1 = __importDefault(require("react"));
var utils_1 = require("../utils");
var context_1 = require("../context");
var collection_card_1 = require("./collection-card");
var CollectionViewGallery = function (_a) {
    var collection = _a.collection, collectionView = _a.collectionView, collectionData = _a.collectionData;
    var recordMap = context_1.useNotionContext().recordMap;
    var _b = collectionView.format || {}, _c = _b.gallery_cover, gallery_cover = _c === void 0 ? { type: 'none' } : _c, _d = _b.gallery_cover_size, gallery_cover_size = _d === void 0 ? 'medium' : _d, _e = _b.gallery_cover_aspect, gallery_cover_aspect = _e === void 0 ? 'cover' : _e;
    // console.log('gallery', { collection, collectionView, collectionData })
    return (react_1["default"].createElement("div", { className: 'notion-gallery' },
        react_1["default"].createElement("div", { className: 'notion-gallery-view' },
            react_1["default"].createElement("div", { className: utils_1.cs('notion-gallery-grid', "notion-gallery-grid-size-" + gallery_cover_size) }, collectionData.blockIds.map(function (blockId) {
                var _a, _b;
                var block = (_a = recordMap.block[blockId]) === null || _a === void 0 ? void 0 : _a.value;
                if (!block)
                    return null;
                return (react_1["default"].createElement(collection_card_1.CollectionCard, { collection: collection, block: block, cover: gallery_cover, coverSize: gallery_cover_size, coverAspect: gallery_cover_aspect, properties: (_b = collectionView.format) === null || _b === void 0 ? void 0 : _b.gallery_properties, key: blockId }));
            })))));
};
exports.CollectionViewGallery = CollectionViewGallery;
//# sourceMappingURL=collection-view-gallery.js.map
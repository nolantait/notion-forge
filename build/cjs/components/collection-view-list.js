"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.CollectionViewList = void 0;
var react_1 = __importDefault(require("react"));
var property_1 = require("./property");
var context_1 = require("../context");
var CollectionViewList = function (_a) {
    var collection = _a.collection, collectionView = _a.collectionView, collectionData = _a.collectionData;
    var _b = context_1.useNotionContext(), components = _b.components, recordMap = _b.recordMap, mapPageUrl = _b.mapPageUrl;
    // console.log('list', { collection, collectionView, collectionData })
    return (react_1["default"].createElement("div", { className: 'notion-list-collection' },
        react_1["default"].createElement("div", { className: 'notion-list-view' },
            react_1["default"].createElement("div", { className: 'notion-list-body' }, collectionData.blockIds.map(function (blockId) {
                var _a, _b, _c, _d;
                var block = (_a = recordMap.block[blockId]) === null || _a === void 0 ? void 0 : _a.value;
                if (!block)
                    return null;
                var titleSchema = collection.schema.title;
                var titleData = (_b = block === null || block === void 0 ? void 0 : block.properties) === null || _b === void 0 ? void 0 : _b.title;
                return (react_1["default"].createElement(components.pageLink, { className: 'notion-list-item notion-page-link', href: mapPageUrl(block.id), key: blockId },
                    react_1["default"].createElement("div", { className: 'notion-list-item-title' },
                        react_1["default"].createElement(property_1.Property, { schema: titleSchema, data: titleData, block: block, collection: collection })),
                    react_1["default"].createElement("div", { className: 'notion-list-item-body' }, (_d = (_c = collectionView.format) === null || _c === void 0 ? void 0 : _c.list_properties) === null || _d === void 0 ? void 0 : _d.filter(function (p) { return p.visible; }).map(function (p) {
                        var _a;
                        var schema = collection.schema[p.property];
                        var data = block && ((_a = block.properties) === null || _a === void 0 ? void 0 : _a[p.property]);
                        // console.log('list item body', p, schema, data)
                        if (!schema) {
                            return null;
                        }
                        return (react_1["default"].createElement("div", { className: 'notion-list-item-property', key: p.property },
                            react_1["default"].createElement(property_1.Property, { schema: schema, data: data, block: block, collection: collection })));
                    }))));
            })))));
};
exports.CollectionViewList = CollectionViewList;
//# sourceMappingURL=collection-view-list.js.map
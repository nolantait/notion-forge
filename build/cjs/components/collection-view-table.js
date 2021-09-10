"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.CollectionViewTable = void 0;
var react_1 = __importDefault(require("react"));
var utils_1 = require("../utils");
var property_1 = require("./property");
var collection_column_title_1 = require("./collection-column-title");
var context_1 = require("../context");
var CollectionViewTable = function (_a) {
    var _b, _c;
    var collection = _a.collection, collectionView = _a.collectionView, collectionData = _a.collectionData, padding = _a.padding, width = _a.width;
    var recordMap = context_1.useNotionContext().recordMap;
    // console.log('table', { collection, collectionView, collectionData })
    var properties = [];
    if ((_b = collectionView.format) === null || _b === void 0 ? void 0 : _b.table_properties) {
        properties = (_c = collectionView.format) === null || _c === void 0 ? void 0 : _c.table_properties.filter(function (p) { return p.visible && collection.schema[p.property]; });
    }
    else {
        properties = [{ property: 'title' }].concat(Object.keys(collection.schema)
            .filter(function (p) { return p !== 'title'; })
            .map(function (property) { return ({ property: property }); }));
    }
    // const hasFullWidths = properties.every((p) => p.width >= 0)
    return (react_1["default"].createElement("div", { className: 'notion-table', style: {
            width: width,
            maxWidth: width
        } },
        react_1["default"].createElement("div", { className: 'notion-table-view', style: {
                paddingLeft: padding,
                paddingRight: padding
            } }, !!properties.length && (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("div", { className: 'notion-table-header' },
                react_1["default"].createElement("div", { className: 'notion-table-header-inner' }, properties.map(function (p) {
                    var _a;
                    var schema = (_a = collection.schema) === null || _a === void 0 ? void 0 : _a[p.property];
                    var isTitle = p.property === 'title';
                    var style = {};
                    if (p.width) {
                        style.width = p.width;
                    }
                    else if (isTitle) {
                        style.width = 280;
                    }
                    else {
                        style.width = 200;
                        // style.width = `${100.0 / properties.length}%`
                    }
                    return (react_1["default"].createElement("div", { className: 'notion-table-th', key: p.property },
                        react_1["default"].createElement("div", { className: 'notion-table-view-header-cell', style: style },
                            react_1["default"].createElement("div", { className: 'notion-table-view-header-cell-inner' },
                                react_1["default"].createElement(collection_column_title_1.CollectionColumnTitle, { schema: schema })))));
                }))),
            react_1["default"].createElement("div", { className: 'notion-table-header-placeholder' }),
            react_1["default"].createElement("div", { className: 'notion-table-body' }, collectionData.blockIds.map(function (blockId) { return (react_1["default"].createElement("div", { className: 'notion-table-row', key: blockId }, properties.map(function (p) {
                var _a, _b, _c;
                var schema = (_a = collection.schema) === null || _a === void 0 ? void 0 : _a[p.property];
                var block = (_b = recordMap.block[blockId]) === null || _b === void 0 ? void 0 : _b.value;
                var data = (_c = block === null || block === void 0 ? void 0 : block.properties) === null || _c === void 0 ? void 0 : _c[p.property];
                var isTitle = p.property === 'title';
                var style = {};
                if (p.width) {
                    style.width = p.width;
                }
                else if (isTitle) {
                    style.width = 280;
                }
                else {
                    style.width = 200;
                    // style.width = `${100.0 / properties.length}%`
                }
                return (react_1["default"].createElement("div", { key: p.property, className: utils_1.cs('notion-table-cell', "notion-table-cell-" + schema.type), style: style },
                    react_1["default"].createElement(property_1.Property, { schema: schema, data: data, block: block, collection: collection })));
            }))); })))))));
};
exports.CollectionViewTable = CollectionViewTable;
//# sourceMappingURL=collection-view-table.js.map
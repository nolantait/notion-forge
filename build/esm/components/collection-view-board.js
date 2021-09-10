import React from 'react';
import { cs } from '../utils';
import { CollectionCard } from './collection-card';
import { EmptyIcon } from '../icons/empty-icon';
import { Property } from './property';
import { useNotionContext } from '../context';
export var CollectionViewBoard = function (_a) {
    var collection = _a.collection, collectionView = _a.collectionView, collectionData = _a.collectionData, padding = _a.padding;
    var recordMap = useNotionContext().recordMap;
    var _b = collectionView.format || {}, _c = _b.board_cover, board_cover = _c === void 0 ? { type: 'none' } : _c, _d = _b.board_cover_size, board_cover_size = _d === void 0 ? 'medium' : _d, _e = _b.board_cover_aspect, board_cover_aspect = _e === void 0 ? 'cover' : _e;
    // console.log('board', { collection, collectionView, collectionData })
    var boardGroups = collectionView.format.board_groups2 || collectionView.format.board_columns;
    return (React.createElement("div", { className: 'notion-board' },
        React.createElement("div", { className: cs('notion-board-view', "notion-board-view-size-" + board_cover_size), style: {
                paddingLeft: padding
            } },
            React.createElement("div", { className: 'notion-board-header' },
                React.createElement("div", { className: 'notion-board-header-inner' }, boardGroups.map(function (p, index) {
                    var _a, _b;
                    if (!collectionData.groupResults) { //no groupResults in the data when collection is in a toggle
                        return null;
                    }
                    var group = collectionData.groupResults[index];
                    var schema = collection.schema[p.property];
                    if (!group || !schema || p.hidden) {
                        return null;
                    }
                    return (React.createElement("div", { className: 'notion-board-th', key: index },
                        React.createElement("div", { className: 'notion-board-th-body' },
                            ((_a = group.value) === null || _a === void 0 ? void 0 : _a.value) ? (React.createElement(Property, { schema: schema, data: [[(_b = group.value) === null || _b === void 0 ? void 0 : _b.value]], collection: collection })) : (React.createElement("span", null,
                                React.createElement(EmptyIcon, { className: 'notion-board-th-empty' }),
                                " No Select")),
                            React.createElement("span", { className: 'notion-board-th-count' }, group.total))));
                }))),
            React.createElement("div", { className: 'notion-board-header-placeholder' }),
            React.createElement("div", { className: 'notion-board-body' }, boardGroups.map(function (p, index) {
                if (!collectionData.groupResults) {
                    return null;
                }
                var group = collectionData.groupResults[index];
                var schema = collection.schema[p.property];
                if (!group || !schema || p.hidden) {
                    return null;
                }
                return (React.createElement("div", { className: 'notion-board-group', key: index }, group.blockIds.map(function (blockId) {
                    var _a, _b;
                    var block = (_a = recordMap.block[blockId]) === null || _a === void 0 ? void 0 : _a.value;
                    if (!block)
                        return null;
                    return (React.createElement(CollectionCard, { className: 'notion-board-group-card', collection: collection, block: block, cover: board_cover, coverSize: board_cover_size, coverAspect: board_cover_aspect, properties: (_b = collectionView.format) === null || _b === void 0 ? void 0 : _b.board_properties, key: blockId }));
                })));
            })))));
};
//# sourceMappingURL=collection-view-board.js.map
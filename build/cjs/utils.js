"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.isBrowser = exports.formatDate = exports.defaultMapPageUrl = exports.defaultMapImageUrl = exports.getListNumber = exports.isUrl = exports.cs = void 0;
var is_url_superb_1 = __importDefault(require("is-url-superb"));
exports.isUrl = is_url_superb_1["default"];
var cs = function () {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return classes.filter(function (a) { return !!a; }).join(' ');
};
exports.cs = cs;
var groupBlockContent = function (blockMap) {
    var output = [];
    var lastType = undefined;
    var index = -1;
    Object.keys(blockMap).forEach(function (id) {
        var _a, _b;
        var blockValue = (_a = blockMap[id]) === null || _a === void 0 ? void 0 : _a.value;
        if (blockValue) {
            (_b = blockValue.content) === null || _b === void 0 ? void 0 : _b.forEach(function (blockId) {
                var _a, _b;
                var blockType = (_b = (_a = blockMap[blockId]) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.type;
                if (blockType && blockType !== lastType) {
                    index++;
                    lastType = blockType;
                    output[index] = [];
                }
                if (index > -1) {
                    output[index].push(blockId);
                }
            });
        }
        lastType = undefined;
    });
    return output;
};
var getListNumber = function (blockId, blockMap) {
    var groups = groupBlockContent(blockMap);
    var group = groups.find(function (g) { return g.includes(blockId); });
    if (!group) {
        return;
    }
    return group.indexOf(blockId) + 1;
};
exports.getListNumber = getListNumber;
var defaultMapImageUrl = function (url, block) {
    if (!url) {
        return null;
    }
    if (url.startsWith('data:')) {
        return url;
    }
    if (url.startsWith('/images')) {
        url = "https://www.notion.so" + url;
    }
    // more recent versions of notion don't proxy unsplash images
    if (!url.startsWith('https://images.unsplash.com')) {
        url = "https://www.notion.so" + (url.startsWith('/image') ? url : "/image/" + encodeURIComponent(url));
        var notionImageUrlV2 = new URL(url);
        var table = block.parent_table === 'space' ? 'block' : block.parent_table;
        if (table === 'collection') {
            table = 'block';
        }
        notionImageUrlV2.searchParams.set('table', table);
        notionImageUrlV2.searchParams.set('id', block.id);
        notionImageUrlV2.searchParams.set('cache', 'v2');
        url = notionImageUrlV2.toString();
    }
    return url;
};
exports.defaultMapImageUrl = defaultMapImageUrl;
var defaultMapPageUrl = function (rootPageId) { return function (pageId) {
    pageId = (pageId || '').replace(/-/g, '');
    if (rootPageId && pageId === rootPageId) {
        return '/';
    }
    else {
        return "/" + pageId;
    }
}; };
exports.defaultMapPageUrl = defaultMapPageUrl;
var months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];
var formatDate = function (input) {
    var date = new Date(input);
    var month = date.getMonth();
    return months[month] + " " + date.getDate() + ", " + date.getFullYear();
};
exports.formatDate = formatDate;
exports.isBrowser = typeof window !== 'undefined';
//# sourceMappingURL=utils.js.map
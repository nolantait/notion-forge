"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Block = void 0;
var react_1 = __importDefault(require("react"));
var lodash_throttle_1 = __importDefault(require("lodash.throttle"));
var notion_utils_1 = require("notion-utils");
var checkbox_1 = require("./components/checkbox");
var page_icon_1 = require("./components/page-icon");
var page_title_1 = require("./components/page-title");
var link_icon_1 = require("./icons/link-icon");
var page_header_1 = require("./components/page-header");
var google_drive_1 = require("./components/google-drive");
var audio_1 = require("./components/audio");
var file_1 = require("./components/file");
var equation_1 = require("./components/equation");
var graceful_image_1 = require("./components/graceful-image");
var lazy_image_1 = require("./components/lazy-image");
var context_1 = require("./context");
var utils_1 = require("./utils");
var text_1 = require("./components/text");
var sync_pointer_block_1 = require("./components/sync-pointer-block");
var asset_wrapper_1 = require("./components/asset-wrapper");
var tocIndentLevelCache = {};
var Block = function (props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11;
    var _12 = context_1.useNotionContext(), components = _12.components, fullPage = _12.fullPage, darkMode = _12.darkMode, recordMap = _12.recordMap, mapPageUrl = _12.mapPageUrl, mapImageUrl = _12.mapImageUrl, showTableOfContents = _12.showTableOfContents, minTableOfContentsItems = _12.minTableOfContentsItems, defaultPageIcon = _12.defaultPageIcon, defaultPageCover = _12.defaultPageCover, defaultPageCoverPosition = _12.defaultPageCoverPosition;
    var block = props.block, children = props.children, level = props.level, className = props.className, bodyClassName = props.bodyClassName, footer = props.footer, pageHeader = props.pageHeader, pageFooter = props.pageFooter, pageAside = props.pageAside, pageCover = props.pageCover, hideBlockId = props.hideBlockId;
    if (!block) {
        return null;
    }
    // ugly hack to make viewing raw collection views work properly
    // e.g., 6d886ca87ab94c21a16e3b82b43a57fb
    if (level === 0 && block.type === 'collection_view') {
        ;
        block.type = 'collection_view_page';
    }
    var blockId = hideBlockId
        ? 'notion-block'
        : "notion-block-" + notion_utils_1.uuidToId(block.id);
    switch (block.type) {
        case 'collection_view_page':
        // fallthrough
        case 'page':
            if (level === 0) {
                var _13 = block.format || {}, _14 = _13.page_icon, page_icon = _14 === void 0 ? defaultPageIcon : _14, _15 = _13.page_cover, page_cover = _15 === void 0 ? defaultPageCover : _15, _16 = _13.page_cover_position, page_cover_position = _16 === void 0 ? defaultPageCoverPosition : _16, page_full_width = _13.page_full_width, page_small_text = _13.page_small_text;
                if (fullPage) {
                    var properties_1 = block.type === 'page'
                        ? block.properties
                        : {
                            title: (_b = (_a = recordMap.collection[block.collection_id]) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.name
                        };
                    var coverPosition = (1 - (page_cover_position || 0.5)) * 100;
                    var pageIcon = (_c = notion_utils_1.getBlockIcon(block, recordMap)) !== null && _c !== void 0 ? _c : defaultPageIcon;
                    var isPageIconUrl = pageIcon && utils_1.isUrl(pageIcon);
                    var toc = notion_utils_1.getPageTableOfContents(block, recordMap);
                    var hasToc = showTableOfContents && toc.length >= minTableOfContentsItems;
                    var hasAside = (hasToc || pageAside) && !page_full_width;
                    var _17 = react_1["default"].useState(null), activeSection_1 = _17[0], setActiveSection_1 = _17[1];
                    var throttleMs = 100;
                    // this scrollspy logic was originally based on
                    // https://github.com/Purii/react-use-scrollspy
                    var actionSectionScrollSpy_1 = lodash_throttle_1["default"](function () {
                        var sections = document.getElementsByClassName('notion-h');
                        var prevBBox = null;
                        var currentSectionId = activeSection_1;
                        for (var i = 0; i < sections.length; ++i) {
                            var section = sections[i];
                            if (!section || !(section instanceof Element))
                                continue;
                            if (!currentSectionId) {
                                currentSectionId = section.getAttribute('data-id');
                            }
                            var bbox = section.getBoundingClientRect();
                            var prevHeight = prevBBox ? bbox.top - prevBBox.bottom : 0;
                            var offset = Math.max(150, prevHeight / 4);
                            // GetBoundingClientRect returns values relative to viewport
                            if (bbox.top - offset < 0) {
                                currentSectionId = section.getAttribute('data-id');
                                prevBBox = bbox;
                                continue;
                            }
                            // No need to continue loop, if last element has been detected
                            break;
                        }
                        setActiveSection_1(currentSectionId);
                    }, throttleMs);
                    if (hasToc) {
                        react_1["default"].useEffect(function () {
                            window.addEventListener('scroll', actionSectionScrollSpy_1);
                            actionSectionScrollSpy_1();
                            return function () {
                                window.removeEventListener('scroll', actionSectionScrollSpy_1);
                            };
                        }, []);
                    }
                    var hasPageCover = pageCover || page_cover;
                    return (react_1["default"].createElement("div", { className: utils_1.cs('notion', 'notion-app', darkMode ? 'dark-mode' : 'light-mode', blockId, className) },
                        react_1["default"].createElement("div", { className: 'notion-viewport' }),
                        react_1["default"].createElement("div", { className: 'notion-frame' },
                            react_1["default"].createElement(page_header_1.PageHeader, null),
                            react_1["default"].createElement("div", { className: 'notion-page-scroller' },
                                hasPageCover ? (pageCover ? (pageCover) : (react_1["default"].createElement(lazy_image_1.LazyImage, { src: mapImageUrl(page_cover, block), alt: notion_utils_1.getTextContent(properties_1 === null || properties_1 === void 0 ? void 0 : properties_1.title), className: 'notion-page-cover', style: {
                                        objectPosition: "center " + coverPosition + "%"
                                    } }))) : null,
                                react_1["default"].createElement("main", { className: utils_1.cs('notion-page', hasPageCover
                                        ? 'notion-page-has-cover'
                                        : 'notion-page-no-cover', page_icon
                                        ? 'notion-page-has-icon'
                                        : 'notion-page-no-icon', isPageIconUrl
                                        ? 'notion-page-has-image-icon'
                                        : 'notion-page-has-text-icon', 'notion-full-page', page_full_width && 'notion-full-width', page_small_text && 'notion-small-text', bodyClassName) },
                                    page_icon && (react_1["default"].createElement("div", { className: 'notion-page-icon-wrapper' },
                                        react_1["default"].createElement(page_icon_1.PageIcon, { block: block, defaultIcon: defaultPageIcon }))),
                                    pageHeader,
                                    react_1["default"].createElement("h1", { className: 'notion-title' },
                                        react_1["default"].createElement(text_1.Text, { value: properties_1 === null || properties_1 === void 0 ? void 0 : properties_1.title, block: block })),
                                    block.type === 'page' &&
                                        block.parent_table === 'collection' && (react_1["default"].createElement(components.collectionRow, { block: block })),
                                    block.type === 'collection_view_page' && (react_1["default"].createElement(components.collection, { block: block })),
                                    react_1["default"].createElement("div", { className: utils_1.cs('notion-page-content', hasAside && 'notion-page-content-has-aside', hasToc && 'notion-page-content-has-toc') },
                                        react_1["default"].createElement("article", { className: 'notion-page-content-inner' }, children),
                                        hasAside && (react_1["default"].createElement("aside", { className: 'notion-aside' },
                                            hasToc && (react_1["default"].createElement("div", { className: 'notion-aside-table-of-contents' },
                                                react_1["default"].createElement("div", { className: 'notion-aside-table-of-contents-header' }, "Table of Contents"),
                                                react_1["default"].createElement("nav", { className: utils_1.cs('notion-table-of-contents', !darkMode && 'notion-gray') }, toc.map(function (tocItem) {
                                                    var id = notion_utils_1.uuidToId(tocItem.id);
                                                    return (react_1["default"].createElement("a", { key: id, href: "#" + id, className: utils_1.cs('notion-table-of-contents-item', "notion-table-of-contents-item-indent-level-" + tocItem.indentLevel, activeSection_1 === id &&
                                                            'notion-table-of-contents-active-item') },
                                                        react_1["default"].createElement("span", { className: 'notion-table-of-contents-item-body', style: {
                                                                display: 'inline-block',
                                                                marginLeft: tocItem.indentLevel * 16
                                                            } }, tocItem.text)));
                                                })))),
                                            pageAside))),
                                    pageFooter),
                                footer))));
                }
                else {
                    return (react_1["default"].createElement("main", { className: utils_1.cs('notion', darkMode ? 'dark-mode' : 'light-mode', 'notion-page', page_full_width && 'notion-full-width', page_small_text && 'notion-small-text', blockId, className, bodyClassName) },
                        react_1["default"].createElement("div", { className: 'notion-viewport' }),
                        pageHeader,
                        block.type === 'page' && block.parent_table === 'collection' && (react_1["default"].createElement(components.collectionRow, { block: block })),
                        block.type === 'collection_view_page' && (react_1["default"].createElement(components.collection, { block: block })),
                        children,
                        pageFooter));
                }
            }
            else {
                var blockColor_1 = (_d = block.format) === null || _d === void 0 ? void 0 : _d.block_color;
                return (react_1["default"].createElement(components.pageLink, { className: utils_1.cs('notion-page-link', blockColor_1 && "notion-" + blockColor_1, blockId), href: mapPageUrl(block.id) },
                    react_1["default"].createElement(page_title_1.PageTitle, { block: block })));
            }
        case 'header':
        // fallthrough
        case 'sub_header':
        // fallthrough
        case 'sub_sub_header': {
            if (!block.properties)
                return null;
            var blockColor_2 = (_e = block.format) === null || _e === void 0 ? void 0 : _e.block_color;
            var id = notion_utils_1.uuidToId(block.id);
            var title_1 = notion_utils_1.getTextContent(block.properties.title) || "Notion Header " + id;
            // we use a cache here because constructing the ToC is non-trivial
            var indentLevel = tocIndentLevelCache[block.id];
            var indentLevelClass = void 0;
            if (indentLevel === undefined) {
                var page = notion_utils_1.getBlockParentPage(block, recordMap);
                if (page) {
                    var toc = notion_utils_1.getPageTableOfContents(page, recordMap);
                    var tocItem = toc.find(function (tocItem) { return tocItem.id === block.id; });
                    if (tocItem) {
                        indentLevel = tocItem.indentLevel;
                        tocIndentLevelCache[block.id] = indentLevel;
                    }
                }
            }
            if (indentLevel !== undefined) {
                indentLevelClass = "notion-h-indent-" + indentLevel;
            }
            var isH1 = block.type === 'header';
            var isH2 = block.type === 'sub_header';
            var isH3 = block.type === 'sub_sub_header';
            var classNameStr = utils_1.cs(isH1 && 'notion-h notion-h1', isH2 && 'notion-h notion-h2', isH3 && 'notion-h notion-h3', blockColor_2 && "notion-" + blockColor_2, indentLevelClass, blockId);
            var innerHeader = (react_1["default"].createElement("span", null,
                react_1["default"].createElement("div", { id: id, className: 'notion-header-anchor' }),
                react_1["default"].createElement("a", { className: 'notion-hash-link', href: "#" + id, title: title_1 },
                    react_1["default"].createElement(link_icon_1.LinkIcon, null)),
                react_1["default"].createElement("span", { className: 'notion-h-title' },
                    react_1["default"].createElement(text_1.Text, { value: block.properties.title, block: block }))));
            //page title takes the h1 so all header blocks are greater
            if (isH1) {
                return (react_1["default"].createElement("h2", { className: classNameStr, "data-id": id }, innerHeader));
            }
            else if (isH2) {
                return (react_1["default"].createElement("h3", { className: classNameStr, "data-id": id }, innerHeader));
            }
            else {
                return (react_1["default"].createElement("h4", { className: classNameStr, "data-id": id }, innerHeader));
            }
        }
        case 'divider':
            return react_1["default"].createElement("hr", { className: utils_1.cs('notion-hr', blockId) });
        case 'text':
            if (!block.properties && !((_f = block.content) === null || _f === void 0 ? void 0 : _f.length)) {
                return react_1["default"].createElement("div", { className: utils_1.cs('notion-blank', blockId) }, "\u00A0");
            }
            var blockColor = (_g = block.format) === null || _g === void 0 ? void 0 : _g.block_color;
            return (react_1["default"].createElement("div", { className: utils_1.cs('notion-text', blockColor && "notion-" + blockColor, blockId) },
                ((_h = block.properties) === null || _h === void 0 ? void 0 : _h.title) && (react_1["default"].createElement(text_1.Text, { value: block.properties.title, block: block })),
                children && react_1["default"].createElement("div", { className: 'notion-text-children' }, children)));
        case 'bulleted_list':
        // fallthrough
        case 'numbered_list':
            var wrapList = function (content, start) {
                return block.type === 'bulleted_list' ? (react_1["default"].createElement("ul", { className: utils_1.cs('notion-list', 'notion-list-disc', blockId) }, content)) : (react_1["default"].createElement("ol", { start: start, className: utils_1.cs('notion-list', 'notion-list-numbered', blockId) }, content));
            };
            var output = null;
            if (block.content) {
                output = (react_1["default"].createElement(react_1["default"].Fragment, null,
                    block.properties && (react_1["default"].createElement("li", null,
                        react_1["default"].createElement(text_1.Text, { value: block.properties.title, block: block }))),
                    wrapList(children)));
            }
            else {
                output = block.properties ? (react_1["default"].createElement("li", null,
                    react_1["default"].createElement(text_1.Text, { value: block.properties.title, block: block }))) : null;
            }
            var isTopLevel = block.type !== ((_k = (_j = recordMap.block[block.parent_id]) === null || _j === void 0 ? void 0 : _j.value) === null || _k === void 0 ? void 0 : _k.type);
            var start = utils_1.getListNumber(block.id, recordMap.block);
            return isTopLevel ? wrapList(output, start) : output;
        case 'tweet':
        // fallthrough
        case 'maps':
        // fallthrough
        case 'pdf':
        // fallthrough
        case 'figma':
        // fallthrough
        case 'typeform':
        // fallthrough
        case 'codepen':
        // fallthrough
        case 'excalidraw':
        // fallthrough
        case 'image':
        // fallthrough
        case 'gist':
        // fallthrough
        case 'embed':
        // fallthrough
        case 'video':
            return react_1["default"].createElement(asset_wrapper_1.AssetWrapper, { blockId: blockId, block: block });
        case 'drive':
            var properties = (_l = block.format) === null || _l === void 0 ? void 0 : _l.drive_properties;
            if (!properties) {
                //check if this drive actually needs to be embeded ex. google sheets.
                if ((_m = block.format) === null || _m === void 0 ? void 0 : _m.display_source) {
                    return react_1["default"].createElement(asset_wrapper_1.AssetWrapper, { blockId: blockId, block: block });
                }
            }
            return (react_1["default"].createElement(google_drive_1.GoogleDrive, { block: block, className: blockId }));
        case 'audio':
            return react_1["default"].createElement(audio_1.Audio, { block: block, className: blockId });
        case 'file':
            return react_1["default"].createElement(file_1.File, { block: block, className: blockId });
        case 'equation':
            var math = block.properties.title[0][0];
            if (!math)
                return null;
            return react_1["default"].createElement(equation_1.Equation, { math: math, block: true, className: blockId });
        case 'code': {
            if (block.properties.title) {
                var content = block.properties.title[0][0];
                var language = block.properties.language
                    ? block.properties.language[0][0]
                    : '';
                var caption = block.properties.caption;
                // TODO: add className
                return (react_1["default"].createElement(react_1["default"].Fragment, null,
                    react_1["default"].createElement(components.code, { key: block.id, language: language || '', code: content }),
                    caption && (react_1["default"].createElement("figcaption", { className: 'notion-asset-caption' },
                        react_1["default"].createElement(text_1.Text, { value: caption, block: block })))));
            }
            break;
        }
        case 'column_list':
            return react_1["default"].createElement("div", { className: utils_1.cs('notion-row', blockId) }, children);
        case 'column':
            // note: notion uses 46px
            var spacerWidth = "min(32px, 4vw)";
            var ratio = ((_o = block.format) === null || _o === void 0 ? void 0 : _o.column_ratio) || 0.5;
            var parent_1 = (_p = recordMap.block[block.parent_id]) === null || _p === void 0 ? void 0 : _p.value;
            var columns = ((_q = parent_1 === null || parent_1 === void 0 ? void 0 : parent_1.content) === null || _q === void 0 ? void 0 : _q.length) || Math.max(2, Math.ceil(1.0 / ratio));
            var width = "calc((100% - (" + (columns - 1) + " * " + spacerWidth + ")) * " + ratio + ")";
            var style = { width: width };
            return (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement("div", { className: utils_1.cs('notion-column', blockId), style: style }, children),
                react_1["default"].createElement("div", { className: 'notion-spacer' })));
        case 'quote': {
            if (!block.properties)
                return null;
            var blockColor_3 = (_r = block.format) === null || _r === void 0 ? void 0 : _r.block_color;
            return (react_1["default"].createElement("blockquote", { className: utils_1.cs('notion-quote', blockColor_3 && "notion-" + blockColor_3, blockId) },
                react_1["default"].createElement(text_1.Text, { value: block.properties.title, block: block })));
        }
        case 'collection_view':
            return react_1["default"].createElement(components.collection, { block: block, className: blockId });
        case 'callout':
            return (react_1["default"].createElement("div", { className: utils_1.cs('notion-callout', ((_s = block.format) === null || _s === void 0 ? void 0 : _s.block_color) &&
                    "notion-" + ((_t = block.format) === null || _t === void 0 ? void 0 : _t.block_color) + "_co", blockId) },
                react_1["default"].createElement(page_icon_1.PageIcon, { block: block }),
                react_1["default"].createElement("div", { className: 'notion-callout-text' },
                    react_1["default"].createElement(text_1.Text, { value: (_u = block.properties) === null || _u === void 0 ? void 0 : _u.title, block: block }),
                    children)));
        case 'bookmark':
            if (!block.properties)
                return null;
            var title = notion_utils_1.getTextContent((_v = block.properties) === null || _v === void 0 ? void 0 : _v.title);
            if (!title) {
                title = notion_utils_1.getTextContent((_w = block.properties) === null || _w === void 0 ? void 0 : _w.link);
            }
            if (title) {
                if (title.startsWith('http')) {
                    try {
                        var url = new URL(title);
                        title = url.hostname;
                    }
                    catch (err) {
                        // ignore invalid links
                    }
                }
            }
            return (react_1["default"].createElement("div", { className: 'notion-row' },
                react_1["default"].createElement(components.link, { target: '_blank', rel: 'noopener noreferrer', className: utils_1.cs('notion-bookmark', ((_x = block.format) === null || _x === void 0 ? void 0 : _x.block_color) && "notion-" + block.format.block_color, blockId), href: block.properties.link[0][0] },
                    react_1["default"].createElement("div", null,
                        title && (react_1["default"].createElement("div", { className: 'notion-bookmark-title' },
                            react_1["default"].createElement(text_1.Text, { value: [[title]], block: block }))),
                        ((_y = block.properties) === null || _y === void 0 ? void 0 : _y.description) && (react_1["default"].createElement("div", { className: 'notion-bookmark-description' },
                            react_1["default"].createElement(text_1.Text, { value: (_z = block.properties) === null || _z === void 0 ? void 0 : _z.description, block: block }))),
                        react_1["default"].createElement("div", { className: 'notion-bookmark-link' },
                            ((_0 = block.format) === null || _0 === void 0 ? void 0 : _0.bookmark_icon) && (react_1["default"].createElement(graceful_image_1.GracefulImage, { src: (_1 = block.format) === null || _1 === void 0 ? void 0 : _1.bookmark_icon, alt: title, loading: 'lazy' })),
                            react_1["default"].createElement("div", null,
                                react_1["default"].createElement(text_1.Text, { value: (_2 = block.properties) === null || _2 === void 0 ? void 0 : _2.link, block: block })))),
                    ((_3 = block.format) === null || _3 === void 0 ? void 0 : _3.bookmark_cover) && (react_1["default"].createElement("div", { className: 'notion-bookmark-image' },
                        react_1["default"].createElement(graceful_image_1.GracefulImage, { src: (_4 = block.format) === null || _4 === void 0 ? void 0 : _4.bookmark_cover, alt: notion_utils_1.getTextContent((_5 = block.properties) === null || _5 === void 0 ? void 0 : _5.title), loading: 'lazy' }))))));
        case 'toggle':
            return (react_1["default"].createElement("details", { className: utils_1.cs('notion-toggle', blockId) },
                react_1["default"].createElement("summary", null,
                    react_1["default"].createElement(text_1.Text, { value: (_6 = block.properties) === null || _6 === void 0 ? void 0 : _6.title, block: block })),
                react_1["default"].createElement("div", null, children)));
        case 'table_of_contents': {
            var page = notion_utils_1.getBlockParentPage(block, recordMap);
            if (!page)
                return null;
            var toc = notion_utils_1.getPageTableOfContents(page, recordMap);
            var blockColor_4 = (_7 = block.format) === null || _7 === void 0 ? void 0 : _7.block_color;
            return (react_1["default"].createElement("div", { className: utils_1.cs('notion-table-of-contents', blockColor_4 && "notion-" + blockColor_4, blockId) }, toc.map(function (tocItem) { return (react_1["default"].createElement("a", { key: tocItem.id, href: "#" + notion_utils_1.uuidToId(tocItem.id), className: 'notion-table-of-contents-item' },
                react_1["default"].createElement("span", { className: 'notion-table-of-contents-item-body', style: {
                        display: 'inline-block',
                        marginLeft: tocItem.indentLevel * 24
                    } }, tocItem.text))); })));
        }
        case 'to_do':
            var isChecked = ((_10 = (_9 = (_8 = block.properties) === null || _8 === void 0 ? void 0 : _8.checked) === null || _9 === void 0 ? void 0 : _9[0]) === null || _10 === void 0 ? void 0 : _10[0]) === 'Yes';
            return (react_1["default"].createElement("div", { className: utils_1.cs('notion-to-do', blockId) },
                react_1["default"].createElement("div", { className: 'notion-to-do-item' },
                    react_1["default"].createElement(checkbox_1.Checkbox, { isChecked: isChecked }),
                    react_1["default"].createElement("div", { className: utils_1.cs('notion-to-do-body', isChecked && "notion-to-do-checked") },
                        react_1["default"].createElement(text_1.Text, { value: (_11 = block.properties) === null || _11 === void 0 ? void 0 : _11.title, block: block }))),
                react_1["default"].createElement("div", { className: 'notion-to-do-children' }, children)));
        case 'transclusion_container':
            return react_1["default"].createElement("div", { className: utils_1.cs('notion-sync-block', blockId) }, children);
        case 'transclusion_reference':
            return react_1["default"].createElement(sync_pointer_block_1.SyncPointerBlock, __assign({ block: block, level: level + 1 }, props));
        default:
            if (process.env.NODE_ENV !== 'production') {
                console.log('Unsupported type ' + block.type, JSON.stringify(block, null, 2));
            }
            return react_1["default"].createElement("div", null);
    }
    return null;
};
exports.Block = Block;
//# sourceMappingURL=block.js.map
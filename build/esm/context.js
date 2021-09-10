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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from "react";
import { defaultMapPageUrl, defaultMapImageUrl } from "./utils";
// All Supported Components
import { AssetWrapper as DefaultAssetWrapper } from "./components/asset-wrapper";
import { Asset as DefaultAsset } from "./components/asset";
import { Audio as DefaultAudio } from "./components/audio";
import { Bookmark as DefaultBookmark } from "./components/bookmark";
import { BulletedList as DefaultBulletedList } from "./components/bulleted-list";
import { Callout as DefaultCallout } from "./components/callout";
import { Checkbox as DefaultCheckbox } from "./components/checkbox";
import { Code as DefaultCode } from "./components/code";
import { CollectionCard as DefaultCollectionCard } from "./components/collection-card";
import { CollectionColumnTitle as DefaultCollectionColumnTitle } from "./components/collection-column-title";
import { CollectionRow as DefaultCollectionRow } from "./components/collection-row";
import { CollectionViewPage as DefaultCollectionViewPage } from "./components/collection-view-page";
import { CollectionViewBoard as DefaultCollectionViewBoard } from "./components/collection-view-board";
import { CollectionViewGallery as DefaultCollectionViewGallery } from "./components/collection-view-gallery";
import { CollectionViewList as DefaultCollectionViewList } from "./components/collection-view-list";
import { CollectionViewTable as DefaultCollectionViewTable } from "./components/collection-view-table";
import { CollectionView as DefaultCollectionView } from "./components/collection-view";
import { Collection as DefaultCollection } from "./components/collection";
import { ColumnList as DefaultColumnList } from "./components/column-list";
import { Column as DefaultColumn } from "./components/column";
import { Divider as DefaultDivider } from "./components/divider";
import { Equation as DefaultEquation } from "./components/equation";
import { File as DefaultFile } from "./components/file";
import { GoogleDrive as DefaultGoogleDrive } from "./components/google-drive";
import { Header as DefaultHeader } from "./components/header";
import { Link as DefaultLink } from "./components/link";
import { NumberedList as DefaultNumberedList } from "./components/numbered-list";
import { Page as DefaultPage } from "./components/page";
import { PageHeader as DefaultPageHeader } from "./components/page-header";
import { PageIcon as DefaultPageIcon } from "./components/page-icon";
import { PageLink as DefaultPageLink } from "./components/page-link";
import { PageTitle as DefaultPageTitle } from "./components/page-title";
import { Property as DefaultProperty } from "./components/property";
import { Quote as DefaultQuote } from "./components/quote";
import { SearchDialog as DefaultSearchDialog } from "./components/search-dialog";
import { SyncContainer as DefaultSyncContainer } from "./components/sync-container";
import { SyncPointerBlock as DefaultSyncPointerBlock } from "./components/sync-pointer-block";
import { TableOfContents as DefaultTableOfContents } from "./components/table-of-contents";
import { Text as DefaultText } from "./components/text";
import { Title as DefaultTitle } from "./components/title";
import { Todo as DefaultTodo } from "./components/to-do";
import { Toggle as DefaultToggle } from "./components/toggle";
import { WrappedText as DefaultWrappedText } from "./components/wrapped-text";
export var dummyLink = function (_a) {
    var href = _a.href, rel = _a.rel, target = _a.target, title = _a.title, rest = __rest(_a, ["href", "rel", "target", "title"]);
    return (React.createElement("span", __assign({}, rest)));
};
var dummyComponent = function (name) { return function () {
    console.warn("Error using empty component: " + name + "\nYou should override this in NotionRenderer.components");
    return null;
}; };
var defaultComponents = {
    assetWrapper: DefaultAssetWrapper,
    asset: DefaultAsset,
    audio: DefaultAudio,
    bookmark: DefaultBookmark,
    bulletedList: DefaultBulletedList,
    callout: DefaultCallout,
    checkbox: DefaultCheckbox,
    code: DefaultCode,
    collectionCard: DefaultCollectionCard,
    collectionColumnTitle: DefaultCollectionColumnTitle,
    collectionRow: DefaultCollectionRow,
    collectionViewPage: DefaultCollectionViewPage,
    collectionViewBoard: DefaultCollectionViewBoard,
    collectionViewGallery: DefaultCollectionViewGallery,
    collectionViewList: DefaultCollectionViewList,
    collectionViewTable: DefaultCollectionViewTable,
    collectionView: DefaultCollectionView,
    collection: DefaultCollection,
    columnList: DefaultColumnList,
    column: DefaultColumn,
    divider: DefaultDivider,
    equation: DefaultEquation,
    file: DefaultFile,
    googleDrive: DefaultGoogleDrive,
    header: DefaultHeader,
    link: DefaultLink,
    numberedList: DefaultNumberedList,
    page: DefaultPage,
    pageHeader: DefaultPageHeader,
    pageIcon: DefaultPageIcon,
    pageLink: DefaultPageLink,
    pageTitle: DefaultPageTitle,
    property: DefaultProperty,
    quote: DefaultQuote,
    searchDialog: DefaultSearchDialog,
    syncContainer: DefaultSyncContainer,
    syncPointerBlock: DefaultSyncPointerBlock,
    tableOfContents: DefaultTableOfContents,
    text: DefaultText,
    title: DefaultTitle,
    todo: DefaultTodo,
    toggle: DefaultToggle,
    wrappedText: DefaultWrappedText,
    pdf: dummyComponent("pdf"),
    tweet: dummyComponent("tweet"),
    modal: dummyComponent("modal")
};
var defaultNotionContext = {
    recordMap: {
        block: {},
        collection: {},
        collection_view: {},
        collection_query: {},
        notion_user: {},
        signed_urls: {}
    },
    components: defaultComponents,
    mapPageUrl: defaultMapPageUrl(),
    mapImageUrl: defaultMapImageUrl,
    searchNotion: null,
    fullPage: false,
    darkMode: false,
    previewImages: false,
    showCollectionViewDropdown: true,
    showTableOfContents: false,
    minTableOfContentsItems: 3,
    defaultPageIcon: null,
    defaultPageCover: null,
    defaultPageCoverPosition: 0.5,
    zoom: null
};
var ctx = React.createContext(defaultNotionContext);
export var NotionContextProvider = function (_a) {
    var _b = _a.components, themeComponents = _b === void 0 ? {} : _b, children = _a.children, mapPageUrl = _a.mapPageUrl, mapImageUrl = _a.mapImageUrl, rootPageId = _a.rootPageId, rest = __rest(_a, ["components", "children", "mapPageUrl", "mapImageUrl", "rootPageId"]);
    for (var _i = 0, _c = Object.keys(rest); _i < _c.length; _i++) {
        var key = _c[_i];
        if (rest[key] === undefined) {
            delete rest[key];
        }
    }
    return (React.createElement(ctx.Provider, { value: __assign(__assign(__assign({}, defaultNotionContext), rest), { rootPageId: rootPageId, mapPageUrl: mapPageUrl !== null && mapPageUrl !== void 0 ? mapPageUrl : defaultMapPageUrl(rootPageId), mapImageUrl: mapImageUrl !== null && mapImageUrl !== void 0 ? mapImageUrl : defaultMapImageUrl, components: __assign(__assign({}, defaultComponents), themeComponents) }) }, children));
};
export var NotionContextConsumer = ctx.Consumer;
export var useNotionContext = function () {
    return React.useContext(ctx);
};
//# sourceMappingURL=context.js.map
import * as types from "notion-types";
export declare type MapPageUrl = (pageId: string, recordMap?: types.ExtendedRecordMap | undefined) => string;
export declare type MapImageUrl = (url: string, block: types.Block) => string;
export declare type SearchNotion = (params: types.SearchParams) => Promise<types.SearchResults>;
export interface NotionComponents {
    assetWrapper: any;
    asset: any;
    audio: any;
    bookmark: any;
    bulletedList: any;
    callout: any;
    checkbox: any;
    code: any;
    collectionCard: any;
    collectionColumnTitle: any;
    collectionRow: any;
    collectionViewPage: any;
    collectionViewBoard: any;
    collectionViewGallery: any;
    collectionViewList: any;
    collectionViewTable: any;
    collectionView: any;
    collection: any;
    columnList: any;
    column: any;
    divider: any;
    equation: any;
    file: any;
    googleDrive: any;
    header: any;
    link: any;
    numberedList: any;
    page: any;
    pageHeader: any;
    pageIcon: any;
    pageLink: any;
    pageTitle: any;
    property: any;
    quote: any;
    searchDialog: any;
    syncContainer: any;
    syncPointerBlock: any;
    tableOfContents: any;
    text: any;
    title: any;
    todo: any;
    toggle: any;
    wrappedText: any;
    pdf: any;
    tweet: any;
    modal: any;
}
export interface CollectionViewProps {
    collection: types.Collection;
    collectionView: types.CollectionView;
    collectionData: types.CollectionQueryResult;
    padding: number;
    width: number;
}
export interface CollectionCardProps {
    collection: types.Collection;
    block: types.PageBlock;
    cover: types.CollectionCardCover;
    coverSize: types.CollectionCardCoverSize;
    coverAspect: types.CollectionCardCoverAspect;
    properties?: Array<{
        property: types.PropertyID;
        visible: boolean;
    }>;
    className?: string;
}

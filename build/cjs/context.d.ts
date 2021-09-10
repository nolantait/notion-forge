import React from 'react';
import { ExtendedRecordMap } from 'notion-types';
import { MapPageUrl, MapImageUrl, SearchNotion, NotionComponents } from './types';
export interface NotionContext {
    recordMap: ExtendedRecordMap;
    components: NotionComponents;
    mapPageUrl: MapPageUrl;
    mapImageUrl: MapImageUrl;
    searchNotion?: SearchNotion;
    rootPageId?: string;
    fullPage: boolean;
    darkMode: boolean;
    previewImages: boolean;
    showCollectionViewDropdown: boolean;
    showTableOfContents: boolean;
    minTableOfContentsItems: number;
    defaultPageIcon?: string;
    defaultPageCover?: string;
    defaultPageCoverPosition?: number;
    zoom: any;
}
export interface PartialNotionContext {
    recordMap?: ExtendedRecordMap;
    components?: Partial<NotionComponents>;
    mapPageUrl?: MapPageUrl;
    mapImageUrl?: MapImageUrl;
    searchNotion?: SearchNotion;
    rootPageId?: string;
    fullPage?: boolean;
    darkMode?: boolean;
    previewImages?: boolean;
    showCollectionViewDropdown?: boolean;
    showTableOfContents?: boolean;
    minTableOfContentsItems?: number;
    defaultPageIcon?: string;
    defaultPageCover?: string;
    defaultPageCoverPosition?: number;
    zoom?: any;
}
export declare const dummyLink: ({ href, rel, target, title, ...rest }: {
    [x: string]: any;
    href: any;
    rel: any;
    target: any;
    title: any;
}) => JSX.Element;
export declare const NotionContextProvider: React.SFC<PartialNotionContext>;
export declare const NotionContextConsumer: React.Consumer<NotionContext>;
export declare const useNotionContext: () => NotionContext;

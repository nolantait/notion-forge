import React from 'react';
import { ExtendedRecordMap } from 'notion-types';
import { MapPageUrl, MapImageUrl, SearchNotion, NotionComponents } from './types';
export interface NotionRendererProps {
    recordMap: ExtendedRecordMap;
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
    className?: string;
    bodyClassName?: string;
    footer?: React.ReactNode;
    pageHeader?: React.ReactNode;
    pageFooter?: React.ReactNode;
    pageAside?: React.ReactNode;
    pageCover?: React.ReactNode;
    blockId?: string;
    hideBlockId?: boolean;
}
interface NotionBlockRendererProps {
    className?: string;
    bodyClassName?: string;
    footer?: React.ReactNode;
    blockId?: string;
    hideBlockId?: boolean;
    level?: number;
    zoom?: any;
}
export declare const NotionRenderer: React.FC<NotionRendererProps>;
export declare const NotionBlockRenderer: React.FC<NotionBlockRendererProps>;
export {};

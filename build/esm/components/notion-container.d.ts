import React from "react";
import { PageBlock, CollectionViewPageBlock } from "notion-types";
interface NotionContainerProps {
    block: PageBlock | CollectionViewPageBlock;
    darkMode: boolean;
    blockId: string;
    className: string;
    bodyClassName: string;
    pageCover?: React.ReactNode | string;
    pageCoverPosition?: number;
    footer?: React.ReactNode;
    children: React.ReactNode;
}
export declare const NotionContainer: (props: NotionContainerProps) => JSX.Element;
export {};

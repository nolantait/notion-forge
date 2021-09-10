import React from "react";
import { CollectionViewPageBlock } from "notion-types";
interface CollectionViewPageProps {
    block: CollectionViewPageBlock;
    blockId: string;
    children: React.ReactNode;
    level: number;
    bodyClassName: string;
    footer: React.ReactNode;
    className?: string;
    pageHeader: React.ReactNode;
    pageFooter: React.ReactNode;
    pageAside: React.ReactNode;
    pageCover: React.ReactNode;
}
export declare const CollectionViewPage: (props: CollectionViewPageProps) => JSX.Element;
export {};

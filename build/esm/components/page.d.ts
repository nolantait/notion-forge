import React from "react";
import { PageBlock } from "notion-types";
interface PageProps {
    block: PageBlock;
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
export declare const Page: (props: PageProps) => JSX.Element;
export {};

import React from "react";
import * as types from "notion-types";
export interface BlockProps {
    block: types.Block;
    level: number;
    className?: string;
    bodyClassName?: string;
    footer?: React.ReactNode;
    pageHeader?: React.ReactNode;
    pageFooter?: React.ReactNode;
    pageAside?: React.ReactNode;
    pageCover?: React.ReactNode;
    hideBlockId?: boolean;
}
export declare const Block: React.FC<BlockProps>;

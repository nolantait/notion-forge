import React from "react";
import { ColumnBlock } from "notion-types";
interface ColumnProps {
    block: ColumnBlock;
    blockId: string;
    children?: React.ReactNode;
}
export declare const Column: (props: ColumnProps) => JSX.Element;
export {};

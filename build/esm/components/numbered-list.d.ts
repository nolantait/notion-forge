import React from "react";
import { NumberedListBlock } from "notion-types";
interface NumberedListProps {
    block: NumberedListBlock;
    blockId: string;
    children?: React.ReactNode;
}
export declare const NumberedList: (props: NumberedListProps) => JSX.Element;
export {};

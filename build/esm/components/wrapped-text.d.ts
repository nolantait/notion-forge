import React from "react";
import * as types from "notion-types";
interface WrappedTextProps {
    block: types.TextBlock;
    blockId: string;
    children: React.ReactNode;
}
export declare const WrappedText: (props: WrappedTextProps) => JSX.Element;
export {};

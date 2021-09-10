import React from "react";
import { CalloutBlock } from "notion-types";
interface CalloutProps {
    blockId: string;
    block: CalloutBlock;
    children?: React.ReactNode;
}
export declare const Callout: (props: CalloutProps) => JSX.Element;
export {};

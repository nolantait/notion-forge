import React from "react";
import { ToggleBlock } from "notion-types";
interface ToggleProps {
    blockId: string;
    block: ToggleBlock;
    children?: React.ReactNode;
}
export declare const Toggle: (props: ToggleProps) => JSX.Element;
export {};

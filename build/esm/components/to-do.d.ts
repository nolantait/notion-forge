import React from "react";
import { TodoBlock } from "notion-types";
interface TodoProps {
    block: TodoBlock;
    blockId: string;
    children?: React.ReactNode;
}
export declare const Todo: (props: TodoProps) => JSX.Element;
export {};

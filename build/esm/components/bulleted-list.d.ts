import React from "react";
import { BulletedListBlock } from "notion-types";
interface BulletedListProps {
    block: BulletedListBlock;
    blockId: string;
    children?: React.ReactNode;
}
export declare const BulletedList: (props: BulletedListProps) => JSX.Element;
export {};

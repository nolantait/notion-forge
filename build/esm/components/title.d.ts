import { PageBlock, CollectionViewPageBlock, Decoration } from "notion-types";
declare type TitleProps = {
    value: Decoration[];
    block: PageBlock | CollectionViewPageBlock;
};
export declare const Title: ({ value, block }: TitleProps) => JSX.Element;
export {};

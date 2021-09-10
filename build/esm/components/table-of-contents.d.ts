import { PageBlock } from "notion-types";
interface AsideTableOfContentsParams {
    block: PageBlock;
}
interface TableOfContentsParams {
    blockId: string;
    block: PageBlock;
}
export declare const TableOfContents: (props: TableOfContentsParams) => JSX.Element;
export declare const AsideTableOfContents: (props: AsideTableOfContentsParams) => JSX.Element;
export {};

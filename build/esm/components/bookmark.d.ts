import { BookmarkBlock } from "notion-types";
interface BookmarkProps {
    blockId: string;
    block: BookmarkBlock;
}
export declare const Bookmark: (props: BookmarkProps) => JSX.Element;
export {};

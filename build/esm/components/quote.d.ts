import { QuoteBlock } from "notion-types";
interface QuoteProps {
    blockId: string;
    block: QuoteBlock;
}
export declare const Quote: (props: QuoteProps) => JSX.Element;
export {};

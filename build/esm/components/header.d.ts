import * as types from "notion-types";
interface HeaderProps {
    block: types.HeaderBlock | types.SubHeaderBlock | types.SubSubHeaderBlock;
    blockId: string;
}
export declare const Header: (props: HeaderProps) => JSX.Element;
export {};

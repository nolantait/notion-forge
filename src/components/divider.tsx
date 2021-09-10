import React from "react";
import { cs } from "../utils";

interface DividerProps {
  blockId: string;
}

export const Divider = (props: DividerProps) => {
  const { blockId } = props;
  return <hr className={cs("notion-hr", blockId)} />;
};

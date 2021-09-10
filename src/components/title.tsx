import React from "react";
import { PageBlock, CollectionViewPageBlock, Decoration } from "notion-types";
import { useNotionContext } from "../context";

type TitleProps = {
  value: Decoration[];
  block: PageBlock | CollectionViewPageBlock;
};

export const Title = ({ value, block }: TitleProps) => {
  const { components } = useNotionContext();
  return (
    <h1 className="notion-title">
      <components.text value={value} block={block} />
    </h1>
  );
};

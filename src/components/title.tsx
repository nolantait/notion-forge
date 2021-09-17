import React from "react";
import { TitleProps } from "@types";
import { useNotionContext } from "@context";

export const Title = ({ value, block }: TitleProps): React.ReactElement => {
  const { components } = useNotionContext();
  return (
    <h1 className="notion-title">
      <components.text value={value} block={block} />
    </h1>
  );
};

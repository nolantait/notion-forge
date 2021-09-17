import React from "react";

import { TitlePresenter } from "@types";
import { useNotionContext } from "@context";

export const Title: TitlePresenter = ({ value, block }) => {
  const { components } = useNotionContext();

  return (
    <h1 className="notion-title">
      <components.text value={value} block={block} />
    </h1>
  );
};

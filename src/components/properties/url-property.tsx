import React from "react";

import { Components } from "@types";
import { useNotionContext } from "@context";
import { Props as PropertyProps } from "../property";
import { Decorated } from "@entities";

export type Props = Pick<PropertyProps, "data" | "inline" | "block">;

export const Property: Components.Presenter<Props> = ({
  data,
  inline,
  block,
}) => {
  const { components } = useNotionContext();
  let value = data.asString;

  if (inline) {
    try {
      const url = new URL(value);
      value = url.hostname.replace(/^www\./, "");
    } catch (err) {
      // ignore invalid urls
    }
  }

  return (
    <components.text
      value={new Decorated(value)}
      block={block}
      linkProps={{
        target: "_blank",
        rel: "noreferrer noopener",
      }}
    />
  );
};

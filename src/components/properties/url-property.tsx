import React from "react";

import { Notion, PropertyProps, Presenter } from "@types";
import { useNotionContext } from "@context";

interface UrlPropertyProps
  extends Pick<PropertyProps, "data" | "inline" | "block"> {}

export const UrlProperty: Presenter<UrlPropertyProps> = ({
  data,
  inline,
  block,
}) => {
  const { components } = useNotionContext();
  const decoration: Notion.Decoration[] = data ?? [];
  let dataText = decoration[0][0] ?? "";

  if (inline) {
    try {
      const url = new URL(dataText);
      dataText = url.hostname.replace(/^www\./, "");
    } catch (err) {
      // ignore invalid urls
    }
  }

  return (
    <components.text
      value={decoration}
      block={block}
      inline={inline}
      linkProps={{
        target: "_blank",
        rel: "noreferrer noopener",
      }}
    />
  );
};

import React from "react";

import { Domain, View } from "@types";
import { LinkIcon } from "@icons";
import { useNotionContext } from "@context";
import { Decorated } from "@entities";

export type Props = {
  block:
    | Domain.Blocks.Header.Entity
    | Domain.Blocks.SubHeader.Entity
    | Domain.Blocks.SubSubHeader.Entity;
};

export const Heading: View.Component<Props> = ({ block }) => {
  const { components } = useNotionContext();
  const id = block.uuid;
  const defaultTitle = Decorated.fromString(`Notion header ${id}`);
  const title = block.title.getOrElse(defaultTitle);

  return (
    <span>
      <div id={id} className="notion-header-anchor" />

      <a className="notion-hash-link" href={`#${id}`} title={title.asString}>
        <LinkIcon />
      </a>

      <span className="notion-h-title">
        <components.text value={title} block={block} />
      </span>
    </span>
  );
};

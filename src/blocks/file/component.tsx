import React from "react";

import { FileIcon } from "@icons";
import { useNotionContext } from "@context";
import { cs } from "@utils";
import { View } from "@types";
import { Decorated } from "@entities";
import { Entity as FileBlock } from "./";
import { Link } from "@components";

export type Props = {
  block: FileBlock;
  className?: string;
};

export const FileComponent: View.Component<Props> = ({ block, className }) => {
  const { components, recordMap } = useNotionContext();
  const signedUrl = recordMap.getSignedUrl(block.id).getOrElse(undefined) ?? {
    href: "#",
  };
  const size = block.size.getOrElse(Decorated.fromString("medium"));
  const title = block.title.getOrElse(Decorated.fromString("File"));
  const style = cs("notion-file", className);

  return (
    <div className={style}>
      <Link
        className="notion-file-link"
        href={signedUrl.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FileIcon className="notion-file-icon" />

        <div className="notion-file-info">
          <div className="notion-file-title">
            <components.text value={title} block={block} />
          </div>

          {size && (
            <div className="notion-file-size">
              <components.text value={size} block={block} />
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

import React from "react";

import { FileIcon } from "@icons";
import { useNotionContext } from "@context";
import { cs } from "@utils";
import { Components } from "@types";
import { FileBlock } from "@entities";

export type Props = {
  block: FileBlock;
  className?: string;
};

export const Component: Components.Presenter<Props> = ({
  block,
  className,
}) => {
  const { components, recordMap } = useNotionContext();
  const signedUrl = recordMap.signed_urls[block.id];
  const size = block.size;
  const title = block.title.isEmpty ? block.title.asDecoration : [["File"]];
  const style = cs("notion-file", className);

  return (
    <div className={style}>
      <components.link
        className="notion-file-link"
        href={signedUrl}
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
      </components.link>
    </div>
  );
};

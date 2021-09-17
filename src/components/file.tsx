import React from "react";

import { FileIcon } from "@icons";
import { useNotionContext } from "@context";
import { cs } from "@utils";
import { FilePresenter } from "@types";

export const File: FilePresenter = ({ block, className }) => {
  const { components, recordMap } = useNotionContext();
  const signedUrl = recordMap.signed_urls[block.id];
  const size = block.properties?.size;
  const title = block.properties?.title || [["File"]];

  return (
    <div className={cs("notion-file", className)}>
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

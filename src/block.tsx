import React from "react";
import { GoogleDriveBlock, AudioBlock, FileBlock } from "notion-types";
import { uuidToId } from "notion-utils";

import { useNotionContext } from "./context";

export interface BlockProps {
  block: any;
  level: number;

  className?: string;
  bodyClassName?: string;

  footer?: React.ReactNode;
  pageHeader?: React.ReactNode;
  pageFooter?: React.ReactNode;
  pageAside?: React.ReactNode;
  pageCover?: React.ReactNode;

  hideBlockId?: boolean;
}

export const Block: React.FC<BlockProps> = (props) => {
  const { components } = useNotionContext();
  const { block, children, level, hideBlockId } = props;
  const blockMissing = !block;

  if (blockMissing) {
    return null;
  }

  const blockId = hideBlockId
    ? "notion-block"
    : `notion-block notion-block-${uuidToId(block.id)}`;

  const pageProps = {
    ...props,
    blockId,
  };

  // ugly hack to make viewing raw collection views work properly
  // e.g., 6d886ca87ab94c21a16e3b82b43a57fb
  if (level === 0 && block.type === "collection_view") {
    (block as any).type = "collection_view_page";
  }

  switch (block.type) {
    case "collection_view_page":
      return <components.collectionViewPage {...pageProps} />;
    case "page":
      return <components.page {...pageProps} />;
    case "header":
    // Fallthrough
    case "sub_header":
    // Fallthrough
    case "sub_sub_header":
      return <components.header block={block} blockId={blockId} />;
    case "divider":
      return <components.divider />;
    case "text": {
      return (
        <components.wrappedText block={block} blockId={blockId}>
          {children}
        </components.wrappedText>
      );
    }
    case "bulleted_list": {
      return (
        <components.bulletedList block={block} blockId={blockId}>
          {children}
        </components.bulletedList>
      );
    }
    case "numbered_list": {
      return (
        <components.numberedList block={block} blockId={blockId}>
          {children}
        </components.numberedList>
      );
    }

    case "tweet":
    // fallthrough
    case "maps":
    // fallthrough
    case "pdf":
    // fallthrough
    case "figma":
    // fallthrough
    case "typeform":
    // fallthrough
    case "codepen":
    // fallthrough
    case "excalidraw":
    // fallthrough
    case "image":
    // fallthrough
    case "gist":
    // fallthrough
    case "embed":
    // fallthrough
    case "video":
      return <components.assetWrapper blockId={blockId} block={block} />;

    case "drive": {
      const properties = block.format?.drive_properties;
      if (!properties) {
        //check if this drive actually needs to be embeded ex. google sheets.
        if (block.format?.display_source) {
          return <components.assetWrapper blockId={blockId} block={block} />;
        }
      }

      return (
        <components.googleDrive
          block={block as GoogleDriveBlock}
          className={blockId}
        />
      );
    }

    case "audio": {
      return (
        <components.audio block={block as AudioBlock} className={blockId} />
      );
    }

    case "file": {
      return <components.file block={block as FileBlock} className={blockId} />;
    }

    case "equation": {
      const math = block.properties?.title[0][0];
      if (!math) return null;

      return <components.equation math={math} block className={blockId} />;
    }

    case "code": {
      if (block.properties.title) {
        const content = block.properties.title[0][0];
        const language = block.properties.language
          ? block.properties.language[0][0]
          : "";
        const caption = block.properties.caption;

        return (
          <>
            <components.code
              key={block.id}
              language={language || ""}
              code={content}
            />
            {caption && (
              <figcaption className="notion-asset-caption">
                <components.text value={caption} block={block} />
              </figcaption>
            )}
          </>
        );
      }
      break;
    }

    case "column_list": {
      return (
        <components.columnList block={block} blockId={blockId}>
          {children}
        </components.columnList>
      );
    }

    case "column": {
      return (
        <components.column block={block} blockId={blockId}>
          {children}
        </components.column>
      );
    }

    case "quote": {
      return <components.quote block={block} blockId={blockId} />;
    }

    case "collection_view": {
      return <components.collection block={block} blockId={blockId} />;
    }

    case "callout": {
      return (
        <components.callout block={block} blockId={blockId}>
          {children}
        </components.callout>
      );
    }

    case "bookmark": {
      return <components.bookmark block={block} blockId={blockId} />;
    }

    case "toggle": {
      return (
        <components.toggle block={block} blockId={blockId}>
          {children}
        </components.toggle>
      );
    }

    case "table_of_contents": {
      return <components.tableOfContents block={block} blockId={blockId} />;
    }

    case "to_do": {
      return (
        <components.todo block={block} blockId={blockId}>
          {children}
        </components.todo>
      );
    }

    case "transclusion_container": {
      return (
        <components.syncContainer block={block} blockId={blockId}>
          {children}
        </components.syncContainer>
      );
    }

    case "transclusion_reference": {
      return <components.syncPointerBlock {...props} level={level + 1} />;
    }

    case "alias": {
      return <components.alias {...props} level={level + 1} />;
    }

    default: {
      if (process.env.NODE_ENV !== "production") {
        console.log(
          "Unsupported type " + (block as any).type,
          JSON.stringify(block, null, 2)
        );
      }

      return <div />;
    }
  }

  return null;
};

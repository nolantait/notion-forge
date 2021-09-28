import React from "react";

import { Components } from "@types";
import { uuidToId } from "@utils";
import { useNotionContext } from "@context";
import { Block } from "@entities";
import { Component as WrapText } from "./components/wrapped-text";

export type Props = {
  block: Block<Blocks.Every>;
  level: number;
  hideBlockId: boolean;
  className?: string;
  children?: React.ReactNode;
};

export const Component: Components.Presenter<Props> = (props) => {
  const { components } = useNotionContext();
  const { block, children, level, hideBlockId } = props;
  const blockMissing = !block;

  if (blockMissing) {
    throw new Error(`Missing block ${block}`);
  }

  const isTopLevel = level === 0;
  const isCollectionView = block.type === "collection_view";
  const parentIsCollection = block.parentTable === "collection";

  const className = hideBlockId
    ? "notion-block"
    : `notion-block notion-block-${uuidToId(block.id)}`;

  // ugly hack to make viewing raw collection views work properly
  // e.g., 6d886ca87ab94c21a16e3b82b43a57fb
  if (isTopLevel && isCollectionView) {
    if (!block) return <></>;

    block.type = "collection_view_page";

    return <components.page {...props} block={block} />;
  }

  switch (block.type) {
    case "collection_view_page":
      return <components.page {...props} block={block} className={className} />;
    case "page":
      if (parentIsCollection) {
        return <components.collectionRow block={block} className={className} />;
      }

      return <components.page {...props} block={block} className={className} />;
    case "header":
    // Fallthrough
    case "sub_header":
    // Fallthrough
    case "sub_sub_header":
      return <components.header block={block} className={className} />;
    case "divider":
      return <components.divider className={className} />;
    case "text": {
      return (
        <WrapText block={block} className={className}>
          {children}
        </WrapText>
      );
    }
    case "bulleted_list": {
      return (
        <components.bulletedList block={block} className={className}>
          {children}
        </components.bulletedList>
      );
    }
    case "numbered_list": {
      return (
        <components.numberedList block={block} className={className}>
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
      return <components.assetWrapper className={className} block={block} />;

    case "drive": {
      const properties = block.format?.drive_properties;
      if (!properties)
        throw new Error(`Missing properties for google drive embed`);

      //check if this drive actually needs to be embeded ex. google sheets.
      if (block.format?.display_source) {
        return <components.assetWrapper className={className} block={block} />;
      }

      return <components.googleDrive block={block} className={className} />;
    }

    case "audio": {
      return <components.audio block={block} className={className} />;
    }

    case "file": {
      return <components.file block={block} className={className} />;
    }

    case "equation": {
      const math = block.properties?.title[0][0];
      if (!math) return <></>;

      return <components.equation math={math} block className={className} />;
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

      return <></>;
    }

    case "column_list": {
      return (
        <components.columnList className={className}>
          {children}
        </components.columnList>
      );
    }

    case "column": {
      return (
        <components.column block={block} className={className}>
          {children}
        </components.column>
      );
    }

    case "quote": {
      return <components.quote block={block} className={className} />;
    }

    case "collection_view": {
      return <components.collection block={block} className={className} />;
    }

    case "callout": {
      return (
        <components.callout block={block} className={className}>
          {children}
        </components.callout>
      );
    }

    case "bookmark": {
      return <components.bookmark block={block} className={className} />;
    }

    case "toggle": {
      return (
        <components.toggle block={block} className={className}>
          {children}
        </components.toggle>
      );
    }

    case "table_of_contents": {
      return <components.tableOfContents block={block} className={className} />;
    }

    case "to_do": {
      return (
        <components.todo block={block} className={className}>
          {children}
        </components.todo>
      );
    }

    case "transclusion_container": {
      return (
        <components.syncContainer block={block} className={className}>
          {children}
        </components.syncContainer>
      );
    }

    case "transclusion_reference": {
      return (
        <components.syncPointer {...props} block={block} level={level + 1} />
      );
    }

    case "alias": {
      return <components.alias block={block} level={level + 1} />;
    }

    default: {
      if (process.env.NODE_ENV !== "production") {
        throw new Error(`Unsupported type ${(block as any).type}`);
      }

      // Allow rendering blank div in production in case Notion updates
      return <div />;
    }
  }
};

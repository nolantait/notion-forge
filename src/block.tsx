import React from "react";

import { Notion, BlockPresenter } from "@types";
import { uuidToId } from "@utils";
import { useNotionContext } from "@context";

export const Block: BlockPresenter = (props) => {
  const { components } = useNotionContext();
  const { block, children, level, hideBlockId } = props;
  const blockMissing = !block;

  if (blockMissing) {
    throw new Error(`Missing block ${block}`);
  }

  const isTopLevel = level === 0;
  const isCollectionView = block.type === "collection_view";
  const parentIsCollection = block.parent_table === "collection";

  const blockId = hideBlockId
    ? "notion-block"
    : `notion-block notion-block-${uuidToId(block.id)}`;

  // ugly hack to make viewing raw collection views work properly
  // e.g., 6d886ca87ab94c21a16e3b82b43a57fb
  if (isTopLevel && isCollectionView) {
    if (!block) return <></>;

    // @ts-ignore
    block.type = "collection_view_page";

    return (
      <components.page
        {...props}
        block={block as unknown as Notion.CollectionViewPageBlock}
        blockId={blockId}
      />
    );
  }

  switch (block.type) {
    case "collection_view_page":
      return <components.page {...props} block={block} blockId={blockId} />;
    case "page":
      if (parentIsCollection) {
        return <components.collectionRow block={block} blockId={blockId} />;
      }

      return <components.page {...props} block={block} blockId={blockId} />;
    case "header":
    // Fallthrough
    case "sub_header":
    // Fallthrough
    case "sub_sub_header":
      return <components.header block={block} blockId={blockId} />;
    case "divider":
      return <components.divider blockId={blockId} />;
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
      if (!properties)
        throw new Error(`Missing properties for google drive embed`);

      //check if this drive actually needs to be embeded ex. google sheets.
      if (block.format?.display_source) {
        return <components.assetWrapper blockId={blockId} block={block} />;
      }

      return <components.googleDrive block={block} className={blockId} />;
    }

    case "audio": {
      return <components.audio block={block} className={blockId} />;
    }

    case "file": {
      return <components.file block={block} className={blockId} />;
    }

    case "equation": {
      const math = block.properties?.title[0][0];
      if (!math) return <></>;

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

      return <></>;
    }

    case "column_list": {
      return (
        <components.columnList blockId={blockId}>
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

import React from "react";
import mediumZoom from "medium-zoom";

import { Blocks, Components, Core } from "@types";
import {
  useNotionContext,
  ContextProvider as NotionContextProvider,
} from "@context";
import { Component as Block } from "./block";

export type Props = Core.NotionContext & {
  rootPageId?: string;
  hideBlockId?: boolean;
  className?: string;
  footer?: React.ReactNode;
  pageHeader?: React.ReactNode;
  pageFooter?: React.ReactNode;
  pageAside?: React.ReactNode;
  pageCover?: React.ReactNode;
};

export const Renderer: Components.Presenter<Props> = ({
  components,
  recordMap,
  mapPageUrl,
  mapImageUrl,
  fullPage,
  rootPageId,
  previewImages,
  showCollectionViewDropdown,
  defaultPageIcon,
  defaultPageCover,
  defaultPageCoverPosition,
  ...rest
}) => {
  const zoom =
    typeof window !== "undefined" &&
    mediumZoom({
      container: ".notion-frame",
      background: "rgba(0, 0, 0, 0.8)",
      margin: getMediumZoomMargin(),
    });

  return (
    <NotionContextProvider
      components={components}
      recordMap={recordMap}
      mapPageUrl={mapPageUrl}
      mapImageUrl={mapImageUrl}
      fullPage={fullPage}
      rootPageId={rootPageId}
      previewImages={previewImages}
      showCollectionViewDropdown={showCollectionViewDropdown}
      defaultPageIcon={defaultPageIcon}
      defaultPageCover={defaultPageCover}
      defaultPageCoverPosition={defaultPageCoverPosition}
      zoom={zoom}
    >
      <BlockRenderer level={0} {...rest} />
    </NotionContextProvider>
  );
};

export type BlockRendererProps = {
  level: number;
  blockId?: Blocks.ID;
  rest?: any[];
};

export const BlockRenderer: Components.Presenter<BlockRendererProps> = ({
  level = 0,
  blockId,
  ...rest
}) => {
  const { recordMap } = useNotionContext();
  const id = blockId || Object.keys(recordMap.block)[0];
  const block = recordMap.block[id]?.value;

  if (!block) {
    throw new Error(`Missing block ${id}`);
  }

  return (
    <Block key={id} level={level} block={block} {...rest}>
      {block?.content?.map((contentBlockId: Blocks.ID) => (
        <BlockRenderer
          key={contentBlockId}
          blockId={contentBlockId}
          level={level + 1}
          {...rest}
        />
      ))}
    </Block>
  );
};

function getMediumZoomMargin() {
  const width = window.innerWidth;

  if (width < 500) {
    return 8;
  } else if (width < 800) {
    return 20;
  } else if (width < 1280) {
    return 30;
  } else if (width < 1600) {
    return 40;
  } else if (width < 1920) {
    return 48;
  } else {
    return 72;
  }
}

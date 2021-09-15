import React from "react";
import { getTextContent } from "notion-utils";

import { useNotionContext } from "@context";
import { AssetBlock, AssetProps, BlockFormat } from "@types";

const isServer = typeof window === "undefined";

export const Asset = (props: AssetProps) => {
  const { block } = props;
  const { format, type } = block
  const { containerStyle, assetStyle } = getAssetStyle(format, type)

  return (
    <div style={containerStyle}>
      {RenderAssetByType(block, assetStyle)}
    </div>
  )
};

const RenderAssetByType = (block: AssetBlock, style: React.CSSProperties): React.ReactNode => {
  const { recordMap, mapImageUrl, components } = useNotionContext();
  const { type, properties = { source: undefined } } = block
  const source = properties.source?.[0]?.[0];
  const signedUrl = recordMap.signed_urls?.[block.id];

  switch (type) {
    case 'tweet': {
      if (!source) throw new Error(`Could not parse source for ${source}`);
      const id = source.split("?")[0].split("/").pop();

      return <components.tweet id={id} />
    }
    case 'pdf': {
      if (isServer) return null

      return <components.pdf file={signedUrl} />
    }
    case 'video': {
      if (!signedUrl) throw new Error(`Could not parse signed url for ${block.id}`)

      if (!isThirdPartyVideo) {
        return <video
          playsInline
          controls
          preload="metadata"
          style={style}
          src={signedUrl}
          title={type}
        />
      }

      return null
    }
    case 'gist': {
      let src = block.format?.display_source ?? source;

      if (!src) throw new Error(`Could not parse github gist src ${src}`)

      if (!src.endsWith(".pibb")) {
        src = `${src}.pibb`;
      }

      style.width = "100%";

      return <iframe
        style={style}
        className="notion-asset-object-fit"
        src={src}
        title="GitHub Gist"
        frameBorder="0"
        loading="lazy"
        scrolling="auto"
      />
    }
    case 'embed':
      // Fallthrough
    case 'figma':
    // Fallthrough
    case 'typeform':
    // Fallthrough
    case 'maps':
    // Fallthrough
    case 'excalidraw':
    // Fallthrough
    case 'codepen':
    // Fallthrough
    case 'drive': {
      if (!signedUrl) throw new Error(`Could not parse signed url for ${block.id}`)

      return <iframe
        className="notion-asset-object-fit"
        style={style}
        src={signedUrl}
        title={`iframe ${type}`}
        frameBorder="0"
        allowFullScreen
        loading="lazy"
      />
    }
    case 'image': {
      if (!source) throw new Error(`Could not load image from source ${source}`)

      const src = mapImageUrl(source, block);
      const caption = getTextContent(block.properties?.caption);
      const alt = caption || "notion image";

      return <components.lazyImage
        src={src}
        alt={alt}
        style={style}
        zoomable={true}
        height={style.height as number}
      />

    }
    default: {
      throw new Error(`Invalid block type ${type}`)
    }
  }
}

const getAssetStyle = (format: BlockFormat | undefined, type: string) => {
  const containerStyle: React.CSSProperties = {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    maxWidth: "100%",
  };

  const assetStyle: React.CSSProperties = {};

  if (!format) return { containerStyle, assetStyle }

  const {
    block_aspect_ratio: aspectRatio,
    block_height: height,
    block_width: width,
    block_full_width: fullWidth,
    block_page_width: pageWidth,
    block_preserve_scale: preserveScale,
  } = format;

  const classes = []

  const isImage = type !== "image"

  const hasContainerWidth = fullWidth || pageWidth

  if (fullWidth) classes.push('notion-asset--full-width');
  if (pageWidth) classes.push('notion-asset--page-width');
  if (preserveScale) classes.push('notion-asset--preserve-scale');

  if (hasContainerWidth && !isImage) {
    containerStyle.paddingBottom = `${aspectRatio * 100}`
  }

  if (hasContainerWidth && isImage) {
    containerStyle.height = height
  }

  if (hasContainerWidth && isImage && preserveScale) {
    containerStyle.height = '100%'
  }

  if (!hasContainerWidth) {
    containerStyle.width = width
  }

  if (!hasContainerWidth && !preserveScale && !isImage) {
    containerStyle.height = height
  }

  return { containerStyle, assetStyle }
}

const isThirdPartyVideo = (signedUrl: string): boolean => {
  const regExpressions = [
    /youtube/,
    /youtu.be/,
    /vimeo/,
    /wistia/,
    /loom/,
    /videoask/,
    /getcloudapp/
  ]

  return regExpressions.some((reg: RegExp) => {
    reg.test(signedUrl)
  })
}

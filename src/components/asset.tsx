import React from "react";

import { useNotionContext } from "@context";
import { Components } from "@types";
import { AnyAsset } from "@entities";

export type Props = {
  block: AnyAsset;
  className?: string;
};

export const Component: Components.Presenter<Props> = ({ block }) => {
  const { containerStyle, assetStyle } = getAssetStyle(block);

  return (
    <div style={containerStyle}>
      <PolymorphicAsset block={block} style={assetStyle} />
    </div>
  );
};

interface PolymorphicAssetProps extends Pick<Props, "block"> {
  style: React.CSSProperties;
}

const PolymorphicAsset: Components.Presenter<PolymorphicAssetProps> = ({
  block,
  style,
}) => {
  const { recordMap, mapImageUrl, components } = useNotionContext();
  const { type } = block;
  const signedUrl = recordMap.signed_urls?.[block.id];

  switch (type) {
    case "tweet": {
      //if (!sourceUrl) throw new Error(`Could not parse sourceUrl for ${sourceUrl}`);
      //const id = sourceUrl.split("?")[0].split("/").pop();

      //TODO: Add
      return <></>;
    }
    case "pdf": {
      //if (isServer) return <div />;

      //TODO: Add
      return <></>;
    }
    case "video": {
      if (!signedUrl)
        throw new Error(`Could not parse signed url for ${block.id}`);

      if (!isThirdPartyVideo) {
        return (
          <video
            playsInline
            controls
            preload="metadata"
            style={style}
            src={signedUrl}
            title={type}
          />
        );
      }

      return <div />;
    }
    case "gist": {
      let src = block.displaySource;

      if (!src.length)
        throw new Error(`Could not parse github gist src ${src}`);

      if (!src.endsWith(".pibb")) {
        src = `${src}.pibb`;
      }

      style.width = "100%";

      return (
        <iframe
          style={style}
          className="notion-asset-object-fit"
          src={src}
          title="GitHub Gist"
          frameBorder="0"
          loading="lazy"
          scrolling="auto"
        />
      );
    }
    case "embed":
    // Fallthrough
    case "figma":
    // Fallthrough
    case "typeform":
    // Fallthrough
    case "maps":
    // Fallthrough
    case "excalidraw":
    // Fallthrough
    case "codepen":
    // Fallthrough
    case "drive": {
      if (!signedUrl)
        throw new Error(`Could not parse signed url for ${block.id}`);

      return (
        <iframe
          className="notion-asset-object-fit"
          style={style}
          src={signedUrl}
          title={`iframe ${type}`}
          frameBorder="0"
          allowFullScreen
          loading="lazy"
        />
      );
    }
    case "image": {
      const src = mapImageUrl(block.source.asString, block);
      const caption = block.caption.asString;
      const alt = caption.length ? caption : "notion image";

      return (
        <components.lazyImage
          src={src}
          alt={alt}
          style={style}
          zoomable={true}
          height={style.height as number}
        />
      );
    }
    default: {
      throw new Error(`Invalid block type ${type}`);
    }
  }
};

const getAssetStyle = (block: AnyAsset) => {
  const containerStyle: React.CSSProperties = {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    maxWidth: "100%",
  };

  const assetStyle: React.CSSProperties = {};

  const classes = [];
  const isImage = block.type !== "image";
  const {
    blockFullWidth: fullWidth,
    blockPageWidth: pageWidth,
    blockPreserveScale: preserveScale,
    blockAspectRatio: aspectRatio,
    blockWidth: width,
    blockHeight: height,
  } = block;
  const hasContainerWidth = block.blockFullWidth || block.blockPageWidth;

  if (fullWidth) classes.push("notion-asset--full-width");
  if (pageWidth) classes.push("notion-asset--page-width");
  if (preserveScale) classes.push("notion-asset--preserve-scale");

  if (hasContainerWidth && !isImage) {
    containerStyle.paddingBottom = `${aspectRatio * 100}`;
  }

  if (hasContainerWidth && isImage) {
    containerStyle.height = height;
  }

  if (hasContainerWidth && isImage && preserveScale) {
    containerStyle.height = "100%";
  }

  if (!hasContainerWidth) {
    containerStyle.width = width;
  }

  if (!hasContainerWidth && !preserveScale && !isImage) {
    containerStyle.height = height;
  }

  return { containerStyle, assetStyle };
};

const isThirdPartyVideo = (signedUrl: string): boolean => {
  const regExpressions = [
    /youtube/,
    /youtu.be/,
    /vimeo/,
    /wistia/,
    /loom/,
    /videoask/,
    /getcloudapp/,
  ];

  return regExpressions.some((reg: RegExp) => {
    reg.test(signedUrl);
  });
};

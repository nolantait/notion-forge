import React from "react";

import { View, Domain } from "@types";
import { Entity as VideoBlock } from "./";

export type Props = {
  block: VideoBlock;
  style?: React.CSSProperties;
  signedUrl?: Domain.Url;
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

export const VideoComponent: View.Component<Props> = ({
  block,
  signedUrl,
  style,
}) => {
  if (!signedUrl) throw new Error(`Could not parse signed url for ${block.id}`);

  if (!isThirdPartyVideo) {
    return (
      <video
        playsInline
        controls
        preload="metadata"
        style={style}
        src={signedUrl}
        title={block.type}
      />
    );
  }

  return <div />;
};

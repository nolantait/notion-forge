import React from "react";
import { Img, ImgProps } from "react-image";

import { isBrowser } from "@utils";
import { View } from "@types";

export type Props = ImgProps & {
  className?: string;
  alt?: string;
  src: string;
};

export const ImageComponent: View.Component<Props> = (props) => {
  if (isBrowser) {
    return <Img {...props} />;
  } else {
    return <img {...props} />;
  }
};

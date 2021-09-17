import React from "react";
import { Img } from "react-image";

import { isBrowser } from "@utils";
import { ImagePresenter } from "@types";

export const GracefulImage: ImagePresenter = (props) => {
  if (isBrowser) {
    return <Img {...props} />;
  } else {
    // @ts-ignore (must use the appropriate subset of props for <img> if using SSR)
    return <img {...props} />;
  }
};

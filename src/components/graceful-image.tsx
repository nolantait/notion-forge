import React from "react";
import { Img } from "react-image";

import { isBrowser } from "@utils";
import { Components } from "@types";

export type Props = {
  className?: string;
  alt?: string;
  src: string;
};

export const Component: Components.Presenter<Props> = (props) => {
  if (isBrowser) {
    return <Img {...props} />;
  } else {
    return <img {...props} />;
  }
};

import React from "react";

import { LinkProps } from "@types";

export const Link = (props: LinkProps): JSX.Element => (
  <a target="_blank" rel="noopener noreferrer" {...props} />
);

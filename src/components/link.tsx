import React from "react";

import { LinkProps } from "@types";

export const Link = (props: LinkProps): React.ReactElement => (
  <a target="_blank" rel="noopener noreferrer" {...props} />
);

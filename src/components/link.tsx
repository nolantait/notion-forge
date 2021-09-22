import React from "react";

import { Components } from "@types";

export type Props = React.HTMLProps<HTMLAnchorElement>;

export const Component: Components.Presenter<Props> = (props) => (
  <a target="_blank" rel="noopener noreferrer" {...props} />
);

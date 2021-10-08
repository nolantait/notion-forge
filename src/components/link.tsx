import React from "react";

import { View } from "@types";

export type Props = React.HTMLProps<HTMLAnchorElement>;

export const Component: View.Component<Props> = (props) => (
  <a target="_blank" rel="noopener noreferrer" {...props} />
);

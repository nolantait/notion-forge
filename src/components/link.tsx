import React from "react";

import { LinkPresenter } from "@types";

export const Link: LinkPresenter = (props) => (
  <a target="_blank" rel="noopener noreferrer" {...props} />
);

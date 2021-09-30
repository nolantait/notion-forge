import React from "react";

import { Components } from "@types";
import { Layout } from "@components";
import { Link, Entity as PageBlock } from "./";

export type Props = {
  block: PageBlock;
  level: number;
  className?: string;
  pageHeader?: React.ReactNode;
  pageFooter?: React.ReactNode;
  pageAside?: React.ReactNode;
  children?: React.ReactNode;
};

export const PageComponent: Components.Presenter<Props> = (props) => {
  const { block, className, level, children } = props;

  // Render a page link instead of a page if this is a nested block
  const renderedChildren =
    level > 0 ? <Link block={block} className={className} /> : <>{children}</>;

  return <Layout.Component>{renderedChildren}</Layout.Component>;
};

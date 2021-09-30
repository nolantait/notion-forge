import React from "react";
import { cs } from "@utils";

import { Component as Container } from "./container";
import { useNotionContext } from "@context";
import { Components } from "@types";
import { PageBlock, CollectionViewPageBlock } from "@entities";

export type Props = {
  block: PageBlock | CollectionViewPageBlock;
  level: number;
  className?: string;
  pageHeader?: React.ReactNode;
  pageFooter?: React.ReactNode;
  pageAside?: React.ReactNode;
  children?: React.ReactNode;
};

export const Component: Components.Presenter<Props> = (props) => {
  const { fullPage } = useNotionContext();
  const { block, className, children } = props;
  const containerProps = { block, className, blockId: block.id };

  const PageRenderer = fullPage ? FullPage : LightPage;

  return (
    <Container {...containerProps}>
      <PageRenderer {...props}>{children}</PageRenderer>
    </Container>
  );
};

const FullPage: Components.Presenter<Props> = (props) => {
  const { block, className, pageAside, pageHeader, pageFooter, children } =
    props;
  const { components, defaultPageIcon } = useNotionContext();
  const { title, pageIcon, pageFullWidth } = block;

  const hasAside = (pageAside ?? false) && !pageFullWidth;

  const containerStyle = cs(
    "notion-page-content",
    className,
    hasAside && "notion-page-content-has-aside"
  );

  const icon = block.pageIcon.getOrElse(undefined);

  return (
    <>
      {icon && (
        <div className="notion-page-icon-wrapper">
          <atoms.icon block={block} defaultIcon={defaultPageIcon} />
        </div>
      )}

      {pageHeader}

      <components.title value={title} block={block} />

      <div className={containerStyle}>
        <article className="notion-page-content-inner">{children}</article>

        {hasAside && <aside className="notion-aside">{pageAside}</aside>}
      </div>

      {pageFooter}
    </>
  );
};

const LightPage: Components.Presenter<Props> = (props) => {
  const { children, pageHeader, pageFooter } = props;

  return (
    <>
      {pageHeader}
      {children}
      {pageFooter}
    </>
  );
};

const PageLink: Components.Presenter<Props> = ({ className, block }) => {
  const { components, mapPageUrl } = useNotionContext();
  const { blockColor } = block;
  const pageLinkStyle = cs(
    "notion-page-link",
    blockColor && `notion-${blockColor}`,
    className
  );

  return (
    <components.pageLink className={pageLinkStyle} href={mapPageUrl(block.id)}>
      <components.pageLinkTitle block={block} />
    </components.pageLink>
  );
};

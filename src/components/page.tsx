import React from "react";
import { cs } from "@utils";

import { Component as NotionContainer } from "./container";
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
  const { block, className, level } = props;

  // Render a page link instead of a page if this is a nested block
  const PageRenderer = fullPage ? FullPage : LightPage;
  const Content = level > 0 ? PageLink : PageRenderer;

  return (
    <NotionContainer {...{ block, className }}>
      <Content {...props} />
    </NotionContainer>
  );
};

const RenderContent: Components.Presenter<Props> = ({ block, className }) => {
  const { components } = useNotionContext();
  const isCollection = block.type === "collection_view_page";

  return (
    <>
      {isCollection && (
        <components.collection block={block} className={className} />
      )}
    </>
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

  return (
    <>
      {pageIcon && (
        <div className="notion-page-icon-wrapper">
          <components.pageIcon block={block} defaultIcon={defaultPageIcon} />
        </div>
      )}

      {pageHeader}

      <components.title value={title} block={block} />

      <div className={containerStyle}>
        <article className="notion-page-content-inner">
          <RenderContent {...props}>{children}</RenderContent>
        </article>

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
      <RenderContent {...props}>{children}</RenderContent>
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
      <components.pageTitle block={block} />
    </components.pageLink>
  );
};

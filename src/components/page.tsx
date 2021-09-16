import React from "react";
import { cs } from "@utils";

import { NotionContainer } from "./notion-container";
import { useNotionContext } from "@context";
import { PageProps } from "@types";

export const Page = (props: PageProps): JSX.Element => {
  const { fullPage } = useNotionContext();
  const { block, level, blockId } = props;

  // Render a page link instead of a page if this is a nested block
  const PageRenderer = fullPage ? FullPage : LightPage;
  const Content = level > 0 ? PageLink : PageRenderer;

  return (
    <NotionContainer {...{ block, blockId }}>
      <Content {...props} />
    </NotionContainer>
  );
};

const RenderContent = (props: PageProps): JSX.Element => {
  const { components } = useNotionContext();
  const { block, children } = props;
  const isCollection = block.type === "collection_view_page";

  return (
    <>
      {isCollection && <components.collection block={block} />}
      {children}
    </>
  );
};

const FullPage = (props: PageProps): JSX.Element => {
  const { components, defaultPageIcon } = useNotionContext();
  const { block, children, pageHeader, pageFooter, pageAside } = props;
  const { title } = block.properties ?? { title: "" };

  const {
    page_icon: pageIcon = defaultPageIcon,
    page_full_width: pageFullWidth = false,
  } = block.format;

  const hasAside = (pageAside ?? false) && !pageFullWidth;

  const containerStyle = cs(
    "notion-page-content",
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

const LightPage = (props: PageProps): JSX.Element => {
  const { children, pageHeader, pageFooter } = props;

  return (
    <>
      {pageHeader}
      <RenderContent {...props}>{children}</RenderContent>
      {pageFooter}
    </>
  );
};

const PageLink = (props: PageProps): JSX.Element => {
  const { components, mapPageUrl } = useNotionContext();
  const { block, blockId } = props;
  const blockColor = block.format?.block_color;
  const pageLinkStyle = cs(
    "notion-page-link",
    blockColor && `notion-${blockColor}`,
    blockId
  );

  return (
    <components.pageLink className={pageLinkStyle} href={mapPageUrl(block.id)}>
      <components.pageTitle block={block} />
    </components.pageLink>
  );
};

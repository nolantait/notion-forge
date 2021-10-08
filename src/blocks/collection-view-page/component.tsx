import React from "react";
import { cs } from "@utils";

import {
  Container as NotionContainer,
  CollectionRow as RowRenderer,
  PageIcon,
  Title,
  PageLink,
  PageLinkTitle,
} from "@components";
import { Decorated } from "@entities";
import { useNotionContext } from "@context";
import { View } from "@types";
import { Entity as CollectionViewPageBlock } from "./";
import { CollectionView } from "@blocks";

export type Props = {
  block: CollectionViewPageBlock;
  level: number;
  className?: string;
  pageHeader?: React.ReactNode;
  pageFooter?: React.ReactNode;
  pageAside?: React.ReactNode;
  children?: React.ReactNode;
};

export const CollectionViewPageComponent: View.Component<Props> = (props) => {
  const { fullPage } = useNotionContext();
  const { block, className, level } = props;
  const containerProps = { block, className, blockId: block.id };

  const shouldRenderAsRow =
    block.type !== "collection_view_page" && block.parentIs("collection");

  const PageRenderer = shouldRenderAsRow ? (
    <RowRenderer block={block} className={className} />
  ) : fullPage ? (
    <FullPage {...props} />
  ) : (
    <LightPage {...props} />
  );

  // Render a page link instead of a page if this is a nested block
  const Content = level > 0 ? LinkPage : PageRenderer;

  return <NotionContainer {...containerProps}>{Content}</NotionContainer>;
};

const RenderContent: View.Component<Props> = ({ block, className }) => {
  const isCollection = block.type === "collection_view_page";

  return (
    <>
      {isCollection && (
        <CollectionView.Component block={block} className={className} />
      )}
    </>
  );
};

const FullPage: View.Component<Props> = (props) => {
  const { block, className, pageAside, pageHeader, pageFooter, children } =
    props;
  const { defaultPageIcon } = useNotionContext();

  const pageIcon = block.pageIcon.getOrElse("");
  const pageFullWidth = block.pageFullWidth.getOrElse(false);
  const hasAside = (pageAside ?? false) && !pageFullWidth;
  const title = block.title.getOrElse(Decorated.empty());

  const containerStyle = cs(
    "notion-page-content",
    className,
    hasAside && "notion-page-content-has-aside"
  );

  return (
    <>
      {pageIcon && (
        <div className="notion-page-icon-wrapper">
          <PageIcon block={block} defaultIcon={defaultPageIcon} />
        </div>
      )}

      {pageHeader}

      <Title value={title} block={block} />

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

const LightPage: View.Component<Props> = (props) => {
  const { children, pageHeader, pageFooter } = props;

  return (
    <>
      {pageHeader}
      <RenderContent {...props}>{children}</RenderContent>
      {pageFooter}
    </>
  );
};

const LinkPage: View.Component<Props> = ({ className, block }) => {
  const { recordMap } = useNotionContext();
  const href = recordMap.mapPageUrl(block).href;
  const pageLinkStyle = cs("notion-page-link", className);

  return (
    <PageLink block={block} className={pageLinkStyle} href={href}>
      <PageLinkTitle block={block} />
    </PageLink>
  );
};

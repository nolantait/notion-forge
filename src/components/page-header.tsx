import React from "react";

import { cs, getBlockTitle, getBlockIcon, getBlockParentPage } from "@utils";
import { useNotionContext } from "@context";
import { Blocks } from "@types";

type PageLinkProps = React.ComponentProps<"a"> & React.ComponentProps<"div">;

type Breadcrumb = {
  block: Blocks.Page;
  active: boolean;
  pageId: string;
  title: string | null;
  icon: string | null;
};

type BreadcrumbProps = {
  breadcrumb: Breadcrumb;
  isMoreBreadcrumbs: boolean;
};

export const Component = (): React.ReactElement => {
  const { recordMap } = useNotionContext();

  const blockMap = recordMap.block;
  const blockIds = Object.keys(blockMap);
  const activePageId = blockIds[0];

  if (!activePageId) {
    return <></>;
  }

  const breadcrumbs: Breadcrumb[] = [];
  let currentPageId = activePageId;

  do {
    const block = blockMap[currentPageId]?.value as Blocks.Page;

    if (!block) break;

    const title = getBlockTitle(block as any, recordMap);
    const icon = getBlockIcon(block as any, recordMap);
    const hasValidTitle = title || icon;

    if (!hasValidTitle) break;

    const breadcrumb = {
      block,
      active: currentPageId === activePageId,
      pageId: currentPageId,
      title,
      icon,
    };

    breadcrumbs.push(breadcrumb);

    const parentBlock = getBlockParentPage(block, recordMap);
    const parentId = parentBlock?.id;

    if (!parentId) break;

    currentPageId = parentId as string;
  } while (true);

  breadcrumbs.reverse();

  return (
    <header className="notion-header">
      <div className="nav-header">
        <div className="breadcrumbs">
          {breadcrumbs.map((breadcrumb, index) => {
            const isMoreBreadcrumbs = index < breadcrumbs.length - 1;
            return (
              <Breadcrumb key={index} {...{ breadcrumb, isMoreBreadcrumbs }} />
            );
          })}
        </div>
      </div>
    </header>
  );
};

const Breadcrumb = ({
  breadcrumb,
  isMoreBreadcrumbs,
}: BreadcrumbProps): React.ReactElement => {
  const { components, mapPageUrl } = useNotionContext();

  const isActive = breadcrumb.active;
  const { pageId } = breadcrumb;
  const pageLinkProps: any = {};
  const overrides = {
    pageLink: isActive ? ActiveBreadcrumb : components.pageLink,
  };
  const linkStyle = cs("breadcrumb", isActive && "active");

  if (!isActive) {
    pageLinkProps.href = mapPageUrl(breadcrumb.pageId);
  }

  return (
    <React.Fragment key={pageId}>
      <overrides.pageLink className={linkStyle} {...pageLinkProps}>
        {breadcrumb.icon && (
          <components.pageIcon className="icon" block={breadcrumb.block} />
        )}

        {breadcrumb.title && <span className="title">{breadcrumb.title}</span>}
      </overrides.pageLink>

      {isMoreBreadcrumbs && <span className="spacer">/</span>}
    </React.Fragment>
  );
};

const ActiveBreadcrumb = (props: PageLinkProps): React.ReactElement => {
  return <div {...props} />;
};

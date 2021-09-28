import React from "react";

import { cs } from "@utils";
import { useNotionContext } from "@context";
import { Blocks } from "@types";
import { Some, None, Option } from "excoptional";
import { PageBlock } from "@entities";
import { Component as PageLink } from "@components/page-link";
import { Component as PageIcon } from "@components/page-icon";

type PageLinkProps = React.ComponentProps<"a"> & React.ComponentProps<"div">;

type BreadcrumbOptions = {
  active: boolean;
  pageId: Blocks.ID;
  title?: string;
  icon?: string;
};

class Breadcrumb {
  readonly block: PageBlock;
  private readonly _options: BreadcrumbOptions;

  constructor(block: PageBlock, options: BreadcrumbOptions) {
    this.block = block;
    this._options = options;
  }

  get title(): Option<string> {
    const value = this._options.title;
    if (!value) return None();
    return Some(value);
  }

  get icon(): Option<string> {
    const value = this._options.icon;
    if (!value) return None();
    return Some(value);
  }

  get active(): boolean {
    return this._options.active;
  }

  get pageId(): Blocks.ID {
    return this._options.pageId;
  }
}

type BreadcrumbProps = {
  breadcrumb: Breadcrumb;
  isMoreBreadcrumbs: boolean;
};

export const Component = (): React.ReactElement => {
  const { recordMap } = useNotionContext();

  const rootBlockId = recordMap.rootBlock.id;
  const breadcrumbs = recordMap.composition
    .ancestors(rootBlockId)
    .then((ancestors) => {
      return ancestors
        .filter((ancestor) => ancestor.type !== "page")
        .map((ancestor) => {
          const isActive = rootBlockId === ancestor.id;
          const options = { active: isActive, pageId: ancestor.id };
          return new Breadcrumb(ancestor as PageBlock, options);
        });
    })
    .getOrElse([])
    .reverse();

  return (
    <header className="notion-header">
      <div className="nav-header">
        <div className="breadcrumbs">
          {breadcrumbs.map((breadcrumb, index) => {
            const isMoreBreadcrumbs = index < breadcrumbs.length - 1;
            return <Crumb key={index} {...{ breadcrumb, isMoreBreadcrumbs }} />;
          })}
        </div>
      </div>
    </header>
  );
};

const Crumb = ({
  breadcrumb,
  isMoreBreadcrumbs,
}: BreadcrumbProps): React.ReactElement => {
  const { recordMap } = useNotionContext();

  const isActive = breadcrumb.active;
  const { pageId } = breadcrumb;
  const pageLinkProps: any = {};
  const overrides = {
    link: isActive ? ActiveBreadcrumb : PageLink,
  };
  const linkStyle = cs("breadcrumb", isActive && "active");

  if (!isActive) {
    pageLinkProps.href = recordMap.mapPageUrl(breadcrumb.pageId);
  }

  const icon = breadcrumb.icon.getOrElse(undefined);

  return (
    <React.Fragment key={pageId}>
      <overrides.link className={linkStyle} {...pageLinkProps}>
        {icon && <PageIcon className="icon" block={breadcrumb.block} />}

        {breadcrumb.title && <span className="title">{breadcrumb.title}</span>}
      </overrides.link>

      {isMoreBreadcrumbs && <span className="spacer">/</span>}
    </React.Fragment>
  );
};

const ActiveBreadcrumb = (props: PageLinkProps): React.ReactElement => {
  return <div {...props} />;
};

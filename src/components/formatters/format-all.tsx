import React from "react";
import { Block, SubDecoration } from "notion-types";
import { parsePageId } from "notion-utils";

import { useNotionContext } from "../../context";

import { FormatDate, FormatExternalPage, FormatPage, FormatUser } from "./";

export const FormatAll = (
  text: string,
  decorations: Array<SubDecoration>,
  index: number,
  block: Block,
  linkProps?: any,
  linkProtocol?: string
): React.ReactNode => {
  const { components, mapPageUrl } = useNotionContext();

  const formatted = decorations.reduce((element: any, decorator: any) => {
    switch (decorator[0]) {
      case "p":
        return FormatPage(decorator);
      case "‣":
        return FormatExternalPage(decorator, block, linkProps);

      case "h":
        return <span className={`notion-${decorator[1]}`}>{element}</span>;

      case "c":
        return <code className="notion-inline-code">{element}</code>;

      case "b":
        return <b>{element}</b>;

      case "i":
        return <em>{element}</em>;

      case "s":
        return <s>{element}</s>;

      case "_":
        return <span className="notion-inline-underscore">{element}</span>;

      case "e":
        return <components.equation math={decorator[1]} />;

      case "m":
        // comment / discussion
        return element; //still need to return the base element

      case "a": {
        const v = decorator[1];
        const pathname = v.substr(1);
        const id = parsePageId(pathname, { uuid: true });

        if (v[0] === "/" && id) {
          return (
            <components.pageLink
              className="notion-link"
              href={mapPageUrl(id)}
              {...linkProps}
            >
              {element}
            </components.pageLink>
          );
        } else {
          return (
            <components.link
              className="notion-link"
              href={
                linkProtocol ? `${linkProtocol}:${decorator[1]}` : decorator[1]
              }
              {...linkProps}
            >
              {element}
            </components.link>
          );
        }
      }

      case "d":
        return FormatDate(decorator);

      case "u":
        return FormatUser(decorator, block);

      default: {
        if (process.env.NODE_ENV !== "production") {
          console.log("unsupported text format", decorator);
        }

        return element;
      }
    }
  }, <>{text}</>);

  return <React.Fragment key={index}>{formatted}</React.Fragment>;
};

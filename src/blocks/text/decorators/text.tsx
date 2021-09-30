import React from "react";

import { Formats, Components } from "@types";
import { useNotionContext } from "@context";

import { DateDecorator as DecoratedDate } from "./date";
import { ExternalPageLinkDecorator as DecoratedExternalPageLink } from "./external-page-link";
import { PageLinkDecorator as DecoratedPageLink } from "./page-link";
import { UserDecorator as DecoratedUser } from "./user";
import { LinkDecorator as DecoratedLink } from "./link";

import { Props as TextProps } from "../";

export type Props = Pick<TextProps, "block" | "linkProps" | "linkProtocol"> & {
  linkProps: React.HTMLProps<HTMLAnchorElement>;
  decorations: Formats.SubDecoration[];
  text: string;
  index: number;
};

export const Decorator: Components.Presenter<Props> = ({
  decorations,
  text,
  index,
  block,
  linkProps = {},
  linkProtocol,
}) => {
  const initialElement = <>{text}</>;

  const decorated = decorations.reduce(
    (element, decoration) => (
      <DecoratedElement
        {...{ element, decoration, block, linkProps, linkProtocol }}
      />
    ),
    initialElement
  );

  return <React.Fragment key={index}>{decorated}</React.Fragment>;
};

export type ElementProps = Omit<Props, "decorations" | "text" | "index"> & {
  decoration: Formats.SubDecoration;
  element: React.ReactElement;
};

const DecoratedElement: Components.Presenter<ElementProps> = ({
  element,
  decoration,
  block,
  linkProps,
  linkProtocol,
}) => {
  const { components } = useNotionContext();
  const decorationSymbol = decoration[0];

  switch (decorationSymbol) {
    case "p":
      return <DecoratedPageLink decoration={decoration} />;
    case "‣":
      return (
        <DecoratedExternalPageLink {...{ decoration, block, linkProps }} />
      );

    case "h":
      return <span className={`notion-${decoration[1]}`}>{element}</span>;

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
      return <components.equation math={decoration[1]} />;

    case "m":
      // comment / discussion
      return element; //still need to return the base element

    case "a": {
      return (
        <DecoratedLink {...{ decoration, linkProps, linkProtocol, element }} />
      );
    }

    case "d":
      return <DecoratedDate decoration={decoration} />;

    case "u":
      if (!block) return <></>;
      return <DecoratedUser decoration={decoration} block={block} />;

    default: {
      throw new Error(`Unsupported text format ${decoration}`);
    }
  }
};

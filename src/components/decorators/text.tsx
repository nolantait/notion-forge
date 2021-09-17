import React from "react";

import { DecoratedTextProps, DecoratedElementProps } from "@types";
import { useNotionContext } from "@context";

import {
  DecoratedDate,
  DecoratedExternalPageLink,
  DecoratedPageLink,
  DecoratedUser,
  DecoratedLink,
} from "./";

export const DecoratedText = ({
  decorations,
  text,
  index,
  block,
  linkProps = {},
  linkProtocol,
}: DecoratedTextProps): React.ReactElement => {
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

const DecoratedElement = ({
  element,
  decoration,
  block,
  linkProps,
  linkProtocol,
}: DecoratedElementProps) => {
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

import React from "react";

import { Blocks, Components } from "@types";
import { TextDecorator } from "../decorators";
import { Block, Decorated } from "@entities";

/**
 * Renders a single piece of Notion text, including basic rich text formatting.
 *
 * These represent the innermost leaf nodes of a Notion subtree.
 *
 * TODO: I think this implementation would be more correct if the reduce just added
 * attributes to the final element's style.
 */

export type Props = {
  value: Decorated;
  block?: Block<Blocks.Any>;
  linkProps?: React.HTMLProps<HTMLAnchorElement>;
  linkProtocol?: "https" | "http" | "mailto" | "tel";
};

export const Component: Components.Presenter<Props> = ({
  value,
  block,
  linkProps = {},
  linkProtocol,
}) => {
  return (
    <React.Fragment>
      {value.asDecoration.map((decoration, index) => {
        const [text, decorations] = decoration;
        // TODO: sometimes notion shows a max of N items to prevent overflow
        // if (trim && index > 18) {
        //   return null
        // }

        const loneComma = text === ",";

        if (!decorations) {
          return loneComma ? (
            <span key={index} style={{ padding: "0.5em" }} />
          ) : (
            <React.Fragment key={index}>{text}</React.Fragment>
          );
        }

        return (
          <TextDecorator
            key={index}
            {...{ text, decorations, block, index, linkProps, linkProtocol }}
          />
        );
      })}
    </React.Fragment>
  );
};

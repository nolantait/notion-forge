import React from "react";
import { TextProps } from "@types";
import { DecoratedText } from "./decorators";

/**
 * Renders a single piece of Notion text, including basic rich text formatting.
 *
 * These represent the innermost leaf nodes of a Notion subtree.
 *
 * TODO: I think this implementation would be more correct if the reduce just added
 * attributes to the final element's style.
 */

export const Text = ({
  value,
  block,
  linkProps,
  linkProtocol,
}: TextProps): React.ReactElement => {
  return (
    <React.Fragment>
      {value.map((decoration, index) => {
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
          <DecoratedText
            {...{ text, decorations, block, index, linkProps, linkProtocol }}
          />
        );
      })}
    </React.Fragment>
  );
};

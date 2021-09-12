import React from "react";
import { Block, Decoration } from "notion-types";
import { FormatAll } from "./formatters/format-all";

/**
 * Renders a single piece of Notion text, including basic rich text formatting.
 *
 * These represent the innermost leaf nodes of a Notion subtree.
 *
 * TODO: I think this implementation would be more correct if the reduce just added
 * attributes to the final element's style.
 */
export const Text: React.FC<{
  value: Decoration[];
  block: Block;
  linkProps?: any;
  linkProtocol?: string;
  inline?: boolean; // TODO: currently unused
}> = ({ value, block, linkProps, linkProtocol }) => {
  return (
    <React.Fragment>
      {value?.map((decoration, index) => {
        const [text, decorations] = decoration;
        // TODO: sometimes notion shows a max of N items to prevent overflow
        // if (trim && index > 18) {
        //   return null
        // }

        if (!decorations) {
          if (text === ",") {
            return <span key={index} style={{ padding: "0.5em" }} />;
          } else {
            return <React.Fragment key={index}>{text}</React.Fragment>;
          }
        }

        return FormatAll(
          text,
          decorations,
          index,
          block,
          linkProps,
          linkProtocol
        );
      })}
    </React.Fragment>
  );
};

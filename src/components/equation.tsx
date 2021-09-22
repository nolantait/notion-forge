import React from "react";

import { cs } from "@utils";
import { useNotionContext } from "@context";
import { Components } from "@types";
import { EquationBlock } from "@entities";

const katexSettings = {
  throwOnError: true,
  strict: false,
};

export type Props = {
  block: EquationBlock;
  className?: string;
};

export const Component: Components.Presenter<Props> = ({
  className,
  block,
}) => {
  const { components } = useNotionContext();
  const math = block.title.asString;
  const style = cs("notion-equation", "notion-equation-block", className);

  return (
    <span role="button" tabIndex={0} className={style}>
      <components.equation math={math} settings={katexSettings} />
    </span>
  );
};

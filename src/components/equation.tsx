import React from "react";

import { cs } from "@utils";
import { useNotionContext } from "@context";
import { EquationProps } from "@types";

const katexSettings = {
  throwOnError: true,
  strict: false,
};

export const Equation = ({
  math,
  className,
  block,
  ...rest
}: EquationProps): JSX.Element => {
  const { components } = useNotionContext();

  return (
    <span
      role="button"
      tabIndex={0}
      className={cs(
        "notion-equation",
        block ? "notion-equation-block" : "notion-equation-inline",
        className
      )}
    >
      <components.equation math={math} settings={katexSettings} {...rest} />
    </span>
  );
};

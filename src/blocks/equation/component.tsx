import React from "react";

import { cs } from "@utils";
import { useNotionContext } from "@context";
import { View } from "@types";
import { Entity as EquationBlock } from "./";

const katexSettings = {
  throwOnError: true,
  strict: false,
};

export type Props = {
  math: string;
  block?: EquationBlock;
  className?: string;
  children?: React.ReactNode;
  settings?: typeof katexSettings;
};

export const EquationComponent: View.Component<Props> = ({
  className,
  block,
  math,
  ...rest
}) => {
  const { components } = useNotionContext();
  const style = cs(
    "notion-equation",
    block ? "notion-equation-block" : "notion-equation-inline",
    className
  );

  return (
    <span role="button" tabIndex={0} className={style}>
      <components.equation math={math} settings={katexSettings} {...rest} />
    </span>
  );
};

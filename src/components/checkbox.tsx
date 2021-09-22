import React from "react";

import CheckIcon from "../icons/check";
import { Components } from "@types";
import { cs } from "@utils";

export type Props = {
  isChecked: boolean;
  className?: string;
};

export const Component: Components.Presenter<Props> = ({
  isChecked,
  className,
}) => {
  const content = isChecked ? <CheckedCheckbox /> : <UncheckedCheckbox />;
  const checkboxStyle = cs(
    "notion-property notion-property-checkbox",
    className
  );

  return <span className={checkboxStyle}>{content}</span>;
};

const CheckedCheckbox = () => {
  return (
    <div className="notion-property-checkbox-checked">
      <CheckIcon />
    </div>
  );
};

const UncheckedCheckbox = () => {
  return <div className="notion-property-checkbox-unchecked" />;
};

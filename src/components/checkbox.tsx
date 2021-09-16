import React from "react";

import CheckIcon from "../icons/check";
import { CheckboxProps } from "@types";
import { cs } from "@utils";

export const Checkbox = ({
  isChecked,
  blockId,
}: CheckboxProps): JSX.Element => {
  const content = isChecked ? <CheckedCheckbox /> : <UncheckedCheckbox />;

  const checkboxStyle = cs("notion-property notion-property-checkbox", blockId);

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

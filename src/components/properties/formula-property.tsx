import React from "react";
import { format } from "date-fns";

import { evalFormula } from "@utils";
import { Formulas, Core, Components } from "@types";
import { Props as PropertyProps } from "../property";

export type Props = Pick<PropertyProps, "schema" | "collection"> & {
  properties: Core.PropertyMap;
};

export const Property: Components.Presenter<Props> = ({
  schema,
  properties,
  collection,
}) => {
  if (!schema) return <></>;

  const { schema: collectionSchema } = collection;
  const { formula } = schema;

  const formulaResult = evalFormula(formula as Formulas.Formula, {
    schema: collectionSchema as any,
    properties: properties as any,
  });

  return <>{parseResult(formulaResult)}</>;
};

const parseResult = (formulaResult: Formulas.Result): string => {
  switch (typeof formulaResult) {
    case "string":
      return formulaResult;
    case "number": {
      return formulaResult.toString();
    }
    case "boolean": {
      return formulaResult.toString();
    }
    case "object": {
      if (formulaResult instanceof Date) {
        return format(formulaResult, "MMM d, YYY hh:mm aa");
      } else {
        throw new Error(
          `Unknown object returned from evalFormula ${formulaResult}`
        );
      }
    }
    default: {
      throw new Error(
        `Unhandled formula result of type ${typeof formulaResult}`
      );
    }
  }
};

import React from "react";

import { evalFormula } from "@utils";
import { Notion, PropertyProps } from "@types";
import { format } from "date-fns";

interface FormulaPropertyProps
  extends Pick<PropertyProps, "schema" | "collection"> {
  properties: Notion.PropertyMap;
}

export const FormulaProperty = ({
  schema,
  properties,
  collection,
}: FormulaPropertyProps): React.ReactElement => {
  const { schema: collectionSchema } = collection;
  const { formula } = schema;

  const formulaResult = evalFormula(formula as Notion.Formula, {
    schema: collectionSchema,
    properties: properties,
  });

  return <>{parseResult(formulaResult)}</>;
};

const parseResult = (formulaResult: Notion.FormulaResult): string => {
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
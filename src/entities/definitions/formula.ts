import { Domain, Api } from "@types";
import { Definition, Property } from "@entities";

export class FormulaDefinition extends Definition<Api.Collections.Schema.Formula> {
  readonly type = "formula" as const;

  decorate(
    property: Property<Domain.Definitions.Formula>
  ): Api.Formulas.Result {
    return property.rawValue;
    // TODO:
    // return property.data.unwrap(evalFormula, property);
  }
}

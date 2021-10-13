import { Api } from "@types";
import { Definition, Decorated } from "@entities";

export class FormulaDefinition extends Definition<Api.Collections.Schema.Formula> {
  readonly type = "formula" as const;

  _format(decorated: Decorated): Api.Formulas.Result {
    return decorated.asString;
    // TODO:
    // return property.data.unwrap(evalFormula, property);
  }
}

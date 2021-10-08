import type { Core } from "./";

// @see https://www.notion.vip/formulas/

export type AnyType =
  | "constant"
  | "property"
  | "operator"
  | "function"
  | "symbol";

export type Any =
  | FunctionFormula
  | OperatorFormula
  | ConstantFormula
  | PropertyFormula
  | SymbolFormula;

export type Result = string | number | boolean | Date;

type ConstantType = "e" | "false" | "true" | "pi";
type ValueType = "string" | "number" | "boolean" | "date" | ConstantType;
type ResultType = "text" | "number" | "boolean" | "date" | "checkbox";

type OperatorType =
  // arithmetic
  | "-"
  | "*"
  | "%"
  | "/"
  | "+"

  // comparison
  | "!="
  | "<="
  | "=="
  | ">"
  | "<"
  | ">=";

type FunctionType =
  // logic
  | "and"
  | "empty"
  | "equal"
  | "if"
  | "larger"
  | "largerEq"
  | "not"
  | "or"
  | "smaller"
  | "smallerEq"
  | "unequal"

  // numeric
  | "abs"
  | "add"
  | "cbrt"
  | "ceil"
  | "divide"
  | "exp"
  | "floor"
  | "ln"
  | "log10"
  | "log2"
  | "max"
  | "min"
  | "mod"
  | "multiply"
  | "pow"
  | "round"
  | "sign"
  | "sqrt"
  | "subtract"
  | "toNumber"
  | "unaryMinus"
  | "unaryPlus"

  // text
  | "concat"
  | "contains"
  | "format"
  | "join"
  | "length"
  | "replace"
  | "replaceAll"
  | "slice"
  | "test"

  // date & time
  | "date"
  | "dateAdd"
  | "dateBetween"
  | "dateSubtract"
  | "day"
  | "end"
  | "formatDate"
  | "fromTimestamp"
  | "hour"
  | "minute"
  | "month"
  | "now"
  | "start"
  | "timestamp"
  | "year";

interface BaseFormula {
  type: AnyType;
  result_type: ResultType;
}

interface ConstantFormula extends BaseFormula {
  type: "constant";
  value: unknown;
  value_type: ValueType;
}

interface PropertyFormula extends BaseFormula {
  type: "property";
  id: Core.PropertyID;
  name: string;
}

interface SymbolFormula extends BaseFormula {
  type: "symbol";
  name: string;
}

interface FunctionFormula extends BaseFormula {
  type: "function";
  name: FunctionType;
  args: Any[];
}

interface OperatorFormula extends BaseFormula {
  type: "operator";
  operator: OperatorType;
  name: FunctionType;
  args: Any[];
}

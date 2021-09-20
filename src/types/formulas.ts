import type { Core } from "./";

// @see https://www.notion.vip/formulas/

export type FormulaType =
  | "constant"
  | "property"
  | "operator"
  | "function"
  | "symbol";

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

type FormulaWith<T, U> = U & {
  type: T;
  result_type: ResultType;
};

type ConstantFormula = FormulaWith<
  "constant",
  { value_type: ValueType; value: unknown }
>;

type PropertyFormula = FormulaWith<
  "property",
  {
    id: Core.PropertyID;
    name: string;
  }
>;

type SymbolFormula = FormulaWith<
  "symbol",
  {
    name: string;
  }
>;

type FunctionFormula = FormulaWith<
  "function",
  {
    name: FunctionType;
    args: Formula[];
  }
>;

type OperatorFormula = FormulaWith<
  "operator",
  {
    operator: OperatorType;
    name: FunctionType;
    args: Formula[];
  }
>;

export type Formula =
  | FunctionFormula
  | OperatorFormula
  | ConstantFormula
  | PropertyFormula
  | SymbolFormula;

export type Result = string | number | boolean | Date;

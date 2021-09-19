import { PropertyID } from "./";

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

interface BaseFormula {
  type: FormulaType;
  result_type: ResultType;
}

interface ConstantFormula extends BaseFormula {
  type: "constant";
  value: any; // TODO
  value_type: ValueType;
}

interface PropertyFormula extends BaseFormula {
  type: "property";
  id: PropertyID;
  name: string;
}

interface SymbolFormula extends BaseFormula {
  type: "symbol";
  name: string;
}

interface FunctionFormula extends BaseFormula {
  type: "function";
  name: FunctionType;
  args: Array<Formula>;
}

interface OperatorFormula extends BaseFormula {
  type: "operator";
  operator: OperatorType;
  name: FunctionType;
  args: Array<Formula>;
}

export type Formula =
  | FunctionFormula
  | OperatorFormula
  | ConstantFormula
  | PropertyFormula
  | SymbolFormula;

export type Result = string | number | boolean | Date;

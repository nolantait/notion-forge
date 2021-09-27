import { Typographic } from "../behaviour";
import { Blocks } from "@types";

export class EquationBlock
  extends Typographic<Blocks.Equation>
  implements Blocks.Template<Blocks.Equation> {}

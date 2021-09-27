import { Typographic } from "../behaviour";
import { Blocks } from "@types";

export class TodoBlock
  extends Typographic<Blocks.Todo>
  implements Blocks.Template<Blocks.Todo> {}

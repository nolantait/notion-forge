import { Blocks } from "@types";
import {
  Decorated,
  HeaderBlock,
  SubHeaderBlock,
  SubSubHeaderBlock,
} from "@entities";

type AnyHeader = HeaderBlock | SubHeaderBlock | SubSubHeaderBlock;
export class TableOfContentsEntry {
  block: AnyHeader;
  level: number;
  id: Blocks.ID;

  constructor(block: AnyHeader) {
    this.block = block;
    this.level = block.level;
    this.id = block.id;
  }

  get text(): string {
    return this.block.title.getOrElse(new Decorated()).asString;
  }
}

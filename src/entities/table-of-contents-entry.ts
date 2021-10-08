import { Domain } from "@types";
import { Decorated } from "@entities";

export type AnyHeader =
  | Domain.Blocks.Header.Entity
  | Domain.Blocks.SubHeader.Entity
  | Domain.Blocks.SubSubHeader.Entity;

export class TableOfContentsEntry {
  block: AnyHeader;
  level: number;
  id: Domain.Blocks.ID;
  uuid: string;
  text: string;

  constructor(block: AnyHeader, level = 0) {
    this.block = block;
    this.level = level;
    this.id = block.id;
    this.uuid = this.id.replace(/-/g, "");
    this.text = this.block.title.getOrElse(Decorated.empty()).asString;
  }
}

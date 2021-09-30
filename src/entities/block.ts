import { Option, Some, None } from "excoptional";
import { Core, Blocks } from "@types";

export abstract class Block<T extends Blocks.DTO> {
  readonly dto: T;
  type: T["type"];

  constructor(block: T) {
    this.dto = block;
    this.type = block.type;
  }

  convert(type: Blocks.BlockType) {
    this.type = type;
  }

  get format(): Option<T["format"]> {
    const value = this.dto.format;

    if (!value) return None();
    return Some(value);
  }

  get properties(): Option<T["properties"]> {
    const value = this.dto.properties;

    if (!value) return None();
    return Some(value);
  }

  get createdTime(): Date {
    return new Date(this.dto.created_time);
  }

  get lastEditedTime(): Date {
    return new Date(this.dto.last_edited_time);
  }

  get content(): Blocks.ID[] {
    return this.dto.content ?? [];
  }

  get id(): Blocks.ID {
    return this.dto.id;
  }

  get uuid(): string {
    return this.id.replace(/-/g, "");
  }

  parentIs(type: Core.ParentType): boolean {
    return this.parentTable === type;
  }

  get parentId(): Blocks.ID {
    return this.dto.parent_id;
  }

  get parentTable() {
    const value = this.dto.parent_table;
    if (typeof value === "string") {
      const validParents = ["space", "block", "table", "collection"];
      if (validParents.includes(value)) {
        return value as Core.ParentType;
      }
      throw new Error(`Invalid parent type ${value}`);
    }

    throw new Error(`Parent value invalid for block ${this.id}`);
  }
}

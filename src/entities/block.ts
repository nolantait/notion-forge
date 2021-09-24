import { Core, Blocks } from "@types";

export class Block<T extends Blocks.Any> {
  readonly dto: T;
  readonly format: T["format"];
  readonly properties: T["properties"];
  readonly type: T["type"];

  constructor(block: T) {
    this.dto = block;
    this.properties = block.properties;
    this.format = block.format;
    this.type = block.type;
  }

  get id() {
    return this.dto.id;
  }

  get parentId() {
    const value = this.dto.parent_id;
    if (typeof value === "string") {
      return value;
    }

    throw new Error(`Missing parent ID for block ${this.id}`);
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

  get content() {
    return this.dto.content ?? [];
  }
}

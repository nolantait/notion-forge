import { Core, Blocks } from "@types";

export class Block<T extends Blocks.BlockType> {
  readonly _dto: Blocks.Container[T];
  readonly type: T;

  constructor(block: Blocks.Container[T], type: T) {
    this._dto = block;
    this.type = type;
  }

  get id(): Blocks.ID {
    return this._dto.id;
  }

  get parentId(): Blocks.ID {
    const value = this._dto.parent_id;
    if (typeof value === "string") {
      return value;
    }

    throw new Error(`Missing parent ID for block ${this.id}`);
  }

  get parentTable(): Core.ParentType {
    const value = this._dto.parent_table;
    if (typeof value === "string") {
      const validParents = ["space", "block", "table", "collection"];
      if (validParents.includes(value)) {
        return value as Core.ParentType;
      }
      throw new Error(`Invalid parent type ${value}`);
    }

    throw new Error(`Parent value invalid for block ${this.id}`);
  }

  get content(): Blocks.ID[] {
    const value = this._dto.content ?? [];
    if (Array.isArray(value) && value.length && typeof value[0] === "string") {
      return value;
    }

    return [];
  }

  get _properties(): Blocks.Container[T]["properties"] {
    const value = this._dto.properties;
    if (value && typeof value === "object") {
      return value;
    }

    throw new Error(`Missing properties for ${this.id}`);
  }

  get _format(): Blocks.Container[T]["format"] {
    const value = this._dto.format;
    if (value && typeof value === "object") {
      return value;
    }

    throw new Error(`Missing format for ${this.id}`);
  }
}

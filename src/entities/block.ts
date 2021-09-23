import { Core, Utils, Blocks } from "@types";

type AnyProperty = Partial<Utils.UnionToIntersection<Blocks.Properties.Any>>;
type AnyFormat = Partial<Utils.UnionToIntersection<Blocks.Format.Any>>;

export class Block {
  readonly _dto: Blocks.Any;

  constructor(block: Blocks.Any) {
    this._dto = block;
  }

  get type(): Blocks.BlockType {
    return this._dto.type as Blocks.BlockType;
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

  get _properties(): AnyProperty {
    const value = this._dto.properties;
    if (value && typeof value === "object") {
      return value;
    }

    throw new Error(`Missing properties for ${this.id}`);
  }

  get _format(): AnyFormat {
    const value = this._dto.format;
    if (value && typeof value === "object") {
      return value;
    }

    throw new Error(`Missing format for ${this.id}`);
  }

  set _format(value: AnyFormat) {
    this._format = { ...this._format, ...value };
  }
}

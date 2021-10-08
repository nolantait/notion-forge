import { Option, Some, None } from "excoptional";
import { Domain, Api } from "@types";

export class Block<T extends Api.Blocks.DTO> {
  readonly id: string;
  readonly uuid: string;
  readonly parentId: Domain.ID;
  readonly parentType: Domain.ParentType;
  readonly dto: T;
  readonly type: T["type"];
  readonly properties: Option<T["properties"]>;
  readonly format: Option<T["format"]>;
  readonly copiedFromPointer: Option<Api.Blocks.Format.Pointer>;
  readonly content: Domain.Blocks.ID[];

  constructor(block: T) {
    this.id = block.id;
    this.uuid = this.id.replace(/-/g, "");
    this.parentId = block.parent_id;
    this.parentType = block.parent_table;
    this.dto = block;
    this.type = block.type;
    this.properties = block.properties ? Some(block.properties) : None();
    this.format = block.format ? Some(block.format) : None();
    this.content = (block as any).content ?? [];
    this.copiedFromPointer = this.format.then((format) => {
      if (!format?.hasOwnProperty("copied_from_pointer")) return None();
      const value = (format as any)
        ?.copied_from_pointer as Api.Blocks.Format.Pointer;
      if (!value) return None();
      return Some(value);
    });
  }

  get hasContent(): boolean {
    return this.content.length > 0;
  }

  get isRoot(): boolean {
    return this.parentIs("space");
  }

  get createdTime(): Option<Date> {
    const value = this.dto.created_time;
    if (!value) return None();
    const date = new Date(value);
    return Some(date);
  }

  get lastEditedTime(): Option<Date> {
    const value = this.dto.last_edited_time;
    if (!value) return None();
    const date = new Date(value);
    return Some(date);
  }

  parentIs(type: Api.Core.ParentType): boolean {
    return this.parentType === type;
  }
}

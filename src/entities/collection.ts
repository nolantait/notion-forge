import { Core, Blocks, Collections } from "@types";

export class Collection {
  public readonly type = "collection";
  public dto: Collections.Collection;

  constructor(dto: Collections.Collection) {
    this.dto = dto;
  }

  get id(): Blocks.ID {
    return this.dto.id;
  }

  get parentId(): Blocks.ID {
    return this.dto.parent_id;
  }

  get parentTable(): Core.ParentType {
    return this.dto.parent_table;
  }
}

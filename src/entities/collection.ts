import { Some, None, Option } from "excoptional";
import { Core, Blocks, Collections } from "@types";
import {
  CollectionSchemaMap,
  CollectionProperty,
  CollectionPageProperty,
} from "@entities";

export class Collection {
  readonly dto: Collections.Collection;
  readonly type = "collection";
  private readonly _schema: CollectionSchemaMap;

  constructor(dto: Collections.Collection) {
    this.dto = dto;
    this._schema = new CollectionSchemaMap(this.dto.schema);
  }

  get pageProperties(): Option<CollectionPageProperty[]> {
    const value = this.dto.format?.collection_page_properties;
    if (!value) return None();
    const props = value.map((val) => new CollectionPageProperty(val));
    return Some(props);
  }

  get properties(): CollectionProperty[] {
    const hiddenPropIds = Object.keys(
      this.dto.format?.property_visibility ?? {}
    );
    return this._schema.all.filter((property) =>
      hiddenPropIds.includes(property.id)
    );
  }

  get icon(): string {
    return this.dto.icon;
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

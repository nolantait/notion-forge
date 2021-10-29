import { Some, None, Option } from "excoptional";
import { Api, Domain } from "@types";
import { Schema, CollectionViewProperty } from "@entities";

export class Collection {
  readonly dto: Api.Collections.Collection;
  readonly icon: Option<string>;
  readonly id: Domain.ID;
  readonly parentId: Domain.ID;
  readonly parentType: Domain.ParentType;
  readonly type = "collection";
  readonly format: Option<Api.Collections.Format>;
  readonly pageProperties: Option<CollectionViewProperty[]>;
  readonly content: Domain.Blocks.ID[];
  private readonly _schema: Schema;

  constructor(dto: Api.Collections.Collection) {
    this.dto = dto;
    this.icon = dto.icon ? Some(dto.icon) : None();
    this.id = dto.id;
    this.parentId = dto.parent_id;
    this.parentType = dto.parent_table;
    this.format = dto.format ? Some(dto.format) : None();
    this.content = (dto as any).content ?? [];
    this.pageProperties = this.format.then((format) => {
      return (
        format?.collection_page_properties?.map(
          (item: Api.Collections.PageProperty) =>
            new CollectionViewProperty(item)
        ) ?? []
      );
    });
    this._schema = new Schema(this.dto.schema);
  }

  get properties(): Domain.AnyDefinition[] {
    const hiddenPropIds = Object.keys(
      this.dto.format?.property_visibility ?? {}
    );
    return this._schema.all.filter((property) =>
      hiddenPropIds.includes(property.id)
    );
  }
}

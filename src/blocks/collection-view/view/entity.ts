import { Option, Some, None } from "excoptional";
import { Api } from "@types";
import { CollectionViewProperty } from "@entities";

export abstract class View<T extends Api.CollectionViews.AnyView> {
  readonly dto: T;
  readonly type: T["type"];
  readonly id: Api.CollectionViews.ID;
  readonly format: Option<T["format"] & { [key: string]: any }>;
  readonly coverSize: Option<Api.Collections.Card.CoverSize>;
  readonly cover: Option<Api.Collections.Card.Cover>;
  readonly coverAspect: Option<Api.Collections.Card.CoverAspect>;
  readonly properties: Option<CollectionViewProperty[]>;
  readonly titleVisible: Option<boolean>;

  constructor(dto: T) {
    this.dto = dto;
    this.id = dto.id;
    this.type = dto.type;
    this.format = this.dto.format ? Some(this.dto.format) : None();

    const key = (property: string) => `${this.type}_${property}`;

    this.properties = this.format.then((format) => {
      const value = format[key("properties") as keyof typeof format];
      if (!value) return None();
      return Some(
        value.map(
          (property: Api.CollectionViews.ViewProperty) =>
            new CollectionViewProperty(property)
        )
      );
    });
    this.coverSize = this.format.then((format) => {
      const value = format[key("cover_size") as keyof typeof format];
      if (!value) return None();
      return Some(value);
    });
    this.cover = this.format.then((format) => {
      const value = format[key("cover") as keyof typeof format];
      if (!value) return None();
      return Some(value);
    });
    this.coverAspect = this.format.then((format) => {
      const value = format[key("cover_aspect") as keyof typeof format];
      if (!value) return None();
      return Some(value);
    });
    this.titleVisible = this.format.then((format) => {
      const value = format[key("title_visible") as keyof typeof format];
      if (!value) return None();
      return Some(value);
    });
  }
}

import { Core, Collections } from "@types";

export type AnyView =
  | TableView
  | BoardView
  | ListView
  | GalleryView
  | CalendarView;

abstract class View {
  public dto: Collections.AnyView;

  constructor(dto: Collections.AnyView) {
    this.dto = dto;
  }

  get id(): Collections.ViewID {
    return this.dto.id;
  }
}

export class BoardView extends View {
  public dto: Collections.BoardView;

  constructor(dto: Collections.BoardView) {
    super(dto);
    this.dto = dto;
  }

  get coverSize(): Collections.Card.CoverSize {
    return this.dto.format.board_cover_size;
  }

  get cover(): Collections.Card.Cover {
    return this.dto.format.board_cover;
  }

  get coverAspect(): Collections.Card.CoverAspect {
    return this.dto.format.board_cover_aspect;
  }

  get groups(): BoardGroup[] {
    const data = this.dto.format.board_groups2 ?? this.dto.format.board_columns;
    return data.map((group) => new BoardGroup(group));
  }
}

export class BoardGroup {
  readonly dto: Collections.BoardGroup;

  constructor(dto: Collections.BoardGroup) {
    this.dto = dto;
  }

  get value(): Collections.BoardGroupValue["value"] {
    return this.dto.value.value;
  }

  get propertyId(): Core.PropertyID {
    return this.dto.property;
  }

  get hidden(): boolean {
    return this.dto.hidden;
  }
}

export class GalleryView extends View {
  readonly type: Collections.ViewType = "gallery";
  public dto: Collections.GalleryView;

  constructor(dto: Collections.GalleryView) {
    super(dto);
    this.dto = dto;
  }

  get properties(): Collections.GalleryProperty[] {
    return this.dto.format.gallery_properties;
  }

  get coverSize(): Collections.Card.CoverSize {
    return this.dto.format.gallery_cover_size;
  }

  get cover(): Collections.Card.Cover {
    return this.dto.format.gallery_cover;
  }

  get coverAspect(): Collections.Card.CoverAspect {
    return this.dto.format.gallery_cover_aspect;
  }
}

export class TableView extends View {
  readonly type: Collections.ViewType = "table";
  public dto: Collections.TableView;

  constructor(dto: Collections.TableView) {
    super(dto);
    this.dto = dto;
  }

  get pageSort(): Blocks.ID[] {
    return this.dto.page_sort;
  }

  get tableWrap(): boolean {
    return this.dto.format.table_wrap;
  }

  get properties(): TableProperty[] {
    return this.dto.format.table_properties.map(
      (prop) => new TableProperty(prop)
    );
  }
}

export class TableProperty {
  readonly dto: Collections.TableProperty;
  readonly schema: Collections.PropertySchema;

  constructor(
    dto: Collections.TableProperty,
    schema: Collections.PropertySchema
  ) {
    this.dto = dto;
    this.schema = schema;
  }

  get id(): Core.ID {
    return this.dto.property;
  }

  get width(): number {
    return this.dto.width;
  }
}

export class ListView extends View {
  readonly type: Collections.ViewType = "list";
  public dto: Collections.ListView;

  constructor(dto: Collections.ListView) {
    super(dto);
    this.dto = dto;
  }

  get properties(): ListProperty[] {
    return this.dto.format.list_properties.map(
      (prop) => new ListProperty(prop)
    );
  }
}

class ListProperty {
  readonly dto: Collections.ListProperty;

  constructor(dto: Collections.ListProperty) {
    this.dto = dto;
  }
}

export class CalendarView extends View {
  readonly type: Collections.ViewType = "calendar";
  public dto: Collections.CalendarView;

  constructor(dto: Collections.CalendarView) {
    super(dto);
    this.dto = dto;
  }
}

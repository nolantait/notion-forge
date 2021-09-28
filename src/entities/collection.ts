import { Some, None, Option } from "excoptional";
import { API, Core, Blocks, Collections } from "@types";
import { Block, RecordMap } from "@entities";

type AnyView = TableView | BoardView | ListView | GalleryView | CalendarView;

type Sort = (
  schema: Collections.PropertySchemaMap,
  properties: Collections.PageProperty[]
) => Collections.PageProperty[];

const sortProperties: Sort = (schema, properties) => {
  return properties.sort((a, b) =>
    schema[a.property].name.localeCompare(schema[b.property].name)
  );
};

type Filter = (
  properties: Collections.PageProperty[]
) => Collections.PageProperty[];

const filterProperties: Filter = (properties) => {
  return properties.filter((prop) => prop.visible);
};

export class Collection {
  readonly dto: Collections.Collection;
  readonly type = "collection";
  readonly recordMap;
  private readonly _views: Collections.ViewMap;
  private readonly _currentView: AnyView;
  private readonly _data: API.CollectionQuery;
  private readonly _ordering: Sort;
  private readonly _filtering: Filter;

  constructor(
    recordMap: RecordMap,
    dto: Collections.Collection,
    views: Collections.ViewMap = {},
    data: API.CollectionQuery = {},
    ordering: Sort = sortProperties,
    filtering: Filter = filterProperties
  ) {
    this.recordMap = recordMap;
    this.dto = dto;
    this._data = data;
    this._views = views;
    this._currentView = this.views[0];
    this._ordering = ordering;
    this._filtering = filtering;
  }

  get data(): Query {
    return new Query(this._data, this.recordMap);
  }

  get properties(): Collections.PageProperty[] {
    const value = this.dto.format?.collection_page_properties;
    if (!value) return [];
    return this._ordering(this.schema, this._filtering(value));
  }

  get schema(): Collections.PropertySchemaMap {
    return this.dto.schema;
  }

  get visibility(): Option<Collections.PropertyVisibility[]> {
    const value = this.dto.format?.property_visibility;
    if (!value) return None();
    return Some(value);
  }

  get currentView(): AnyView {
    return this._currentView;
  }

  get views(): AnyView[] {
    return Object.keys(this._views).map((key) => {
      const value = this._views[key].value;
      switch (value.type) {
        case "table":
          return new TableView(value);
        case "board":
          return new BoardView(value);
        case "list":
          return new ListView(value);
        case "gallery":
          return new GalleryView(value);
        case "calendar":
          return new CalendarView(value);
        default:
          throw new Error(`Missing view entity for ${value}`);
      }
    });
  }

  get hasData(): boolean {
    return Object.keys(this._data).length > 0;
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

export class Query {
  readonly dto: API.CollectionQuery;
  private readonly recordMap: RecordMap;

  constructor(dto: API.CollectionQuery, recordMap: RecordMap) {
    this.dto = dto;
    this.recordMap = recordMap;
  }

  get blocks(): Option<Block<Blocks.Every>[]> {
    const values = Object.keys(this.dto.blockIds).map((id) =>
      this.recordMap.findBlock(id)
    );

    const mappedValues = values.map((value) => value.getOrElse(undefined));
    const filteredValues = mappedValues.filter(
      (block) => !!block
    ) as Block<Blocks.Every>[];

    if (filteredValues.length) {
      return Some(filteredValues);
    }

    return None();
  }
}

export class ViewQuery {
  public dto: Collections.Query.ViewQuery;

  constructor(dto: Collections.Query.ViewQuery) {
    this.dto = dto;
  }

  get blocks(): Block<Blocks.Every>[] {
    const value = this.dto.aggregate;
    if (!value) return [];
    return value;
  }
}

abstract class View {
  public dto: Collections.AnyView;

  constructor(dto: Collections.AnyView) {
    this.dto = dto;
  }

  get query(): ViewQuery {
    return new Query(this.dto.query2);
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

  constructor(dto: Collections.TableProperty) {
    this.dto = dto;
  }

  get propertyId(): Core.ID {
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

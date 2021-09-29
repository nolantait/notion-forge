import { Some, None, Option } from "excoptional";
import { Collections } from "@types";
import {
  TableView,
  BoardView,
  ListView,
  GalleryView,
  CalendarView,
  AnyView,
} from "@entities";

const BuildView = (dto: Collections.AnyView) => {
  switch (dto.type) {
    case "table":
      return new TableView(dto);
    case "board":
      return new BoardView(dto);
    case "list":
      return new ListView(dto);
    case "gallery":
      return new GalleryView(dto);
    case "calendar":
      return new CalendarView(dto);
    default:
      throw new Error(`Missing view entity for ${dto}`);
  }
};

export class CollectionViewMap {
  private readonly dto: Collections.ViewMap;

  constructor(dto: Collections.ViewMap) {
    this.dto = dto;
  }

  find(id: Collections.ViewID): Option<AnyView> {
    const value = this.dto[id]?.value;
    if (!value) return None();
    return Some(BuildView(value));
  }
}

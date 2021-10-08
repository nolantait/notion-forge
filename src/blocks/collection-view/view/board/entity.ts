import { Option, Some, None } from "excoptional";
import { Api } from "@types";
import { BoardGroup } from "./group";
import { View } from "../entity";

export class BoardView extends View<Api.CollectionViews.BoardView> {
  readonly groups: Option<BoardGroup[]>;

  constructor(dto: Api.CollectionViews.BoardView) {
    super(dto);
    this.groups = this.format.then((format) => {
      const value = format?.board_groups2;
      if (!value) return None();
      return Some(value.map((group) => new BoardGroup(group)));
    });
  }
}

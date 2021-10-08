import { Option, Some, None } from "excoptional";
import { Api } from "@types";
import { View } from "../entity";
import { BoardGroup } from "../board/group";

export class GalleryView extends View<Api.CollectionViews.GalleryView> {
  readonly groups: Option<BoardGroup[]>;

  constructor(dto: Api.CollectionViews.GalleryView) {
    super(dto);
    this.groups = this.format.then((format) => {
      const value = format?.board_groups2;
      if (!value) return None();
      return Some(
        value.map(
          (group: Api.CollectionViews.BoardGroup) => new BoardGroup(group)
        )
      );
    });
  }
}

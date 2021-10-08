import { Api } from "@types";
import * as Blocks from "@blocks";

export const ViewFactory = (dto: Api.CollectionViews.AnyView) => {
  switch (dto.type) {
    case "table":
      return new Blocks.CollectionView.Table.Entity(dto);
    case "board":
      return new Blocks.CollectionView.Board.Entity(dto);
    case "list":
      return new Blocks.CollectionView.List.Entity(dto);
    case "gallery":
      return new Blocks.CollectionView.Gallery.Entity(dto);
    case "calendar":
      return new Blocks.CollectionView.Calendar.Entity(dto);
    default:
      throw new Error(`Missing view entity for ${dto}`);
  }
};

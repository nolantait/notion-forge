import { Collections } from "@types";
import { BoardGroup } from "./group";
import { View } from "../entity";

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

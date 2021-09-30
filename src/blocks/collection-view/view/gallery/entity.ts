import { Collections } from "@types";
import { View } from "../entity";

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

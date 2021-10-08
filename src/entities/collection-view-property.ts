import { Option, Some, None } from "excoptional";
import { Domain, Api } from "@types";

export class CollectionViewProperty {
  private readonly dto: Api.CollectionViews.ViewProperty;
  readonly id: Domain.ID;
  readonly isVisible: boolean;
  readonly isHidden: boolean;
  readonly width: Option<number>;

  constructor(dto: Api.CollectionViews.ViewProperty) {
    this.dto = dto;
    this.id = dto.property;
    this.isVisible = this.dto.visible;
    this.isHidden = !this.isVisible;
    this.width = dto.width ? Some(dto.width) : None();
  }
}

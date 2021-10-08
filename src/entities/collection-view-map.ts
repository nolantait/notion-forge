import { Some, None, Option } from "excoptional";
import { Domain, Api } from "@types";
import { ViewFactory } from "@factories";

export class CollectionViewMap {
  private readonly dto: Api.Responses.ViewMap;

  constructor(dto: Api.Responses.ViewMap) {
    this.dto = dto;
  }

  find(
    id: Api.Collections.ViewID
  ): Option<Domain.Blocks.CollectionView.AnyView> {
    const value = this.dto[id]?.value;
    if (!value) return None();
    return Some(ViewFactory(value));
  }
}

import { Blocks, API } from "@types";

export class CollectionQueryResult {
  readonly dto: API.CollectionQueryResult;

  constructor(dto: API.CollectionQueryResult) {
    this.dto = dto;
  }

  get hasData(): boolean {
    return this.dto.aggregationResults.length > 0;
  }

  get total(): number {
    return this.dto.total;
  }

  get blockIds(): Blocks.ID[] {
    return this.dto.blockIds;
  }
}

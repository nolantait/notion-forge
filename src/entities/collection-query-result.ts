import { Domain, Api } from "@types";

export class CollectionQueryResult {
  readonly dto: Api.Responses.CollectionQueryResult;

  constructor(dto: Api.Responses.CollectionQueryResult) {
    this.dto = dto;
  }

  get hasData(): boolean {
    return this.dto.aggregationResults.length > 0;
  }

  get total(): number {
    return this.dto.total;
  }

  get blockIds(): Domain.Blocks.ID[] {
    return this.dto.blockIds;
  }
}

import { None, Some, Option } from "excoptional";

import { Domain, Api } from "@types";
import { SignedUrl } from "./signed-url";

export class SignedUrlMap {
  private readonly dto: Api.Responses.SignedUrlMap;

  constructor(dto: Api.Responses.SignedUrlMap) {
    this.dto = dto;
  }

  find(id: Domain.Blocks.ID): Option<SignedUrl> {
    const value = this.dto[id];
    if (!value) return None();
    return Some(new SignedUrl(value));
  }
}

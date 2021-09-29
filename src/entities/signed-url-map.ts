import { None, Some, Option } from "excoptional";

import { API, Blocks } from "@types";
import { SignedUrl } from "./signed-url";

export class SignedUrlMap {
  private readonly dto: API.SignedUrlMap;

  constructor(dto: API.SignedUrlMap) {
    this.dto = dto;
  }

  find(id: Blocks.ID): Option<SignedUrl> {
    const value = this.dto[id];
    if (!value) return None();
    return Some(new SignedUrl(value));
  }
}

import { API } from "@types";

type Remap = 
export class User implements Remap<API.User>{
  private readonly dto: API.User;

  constructor(dto: API.User) {
    this.dto = dto;
  }

  get name(): string {
    return [this.dto.given_name, this.dto.family_name]
      .filter(Boolean)
      .join(" ");
  }
}

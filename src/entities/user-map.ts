import { Some, None, Option } from "excoptional";
import { Domain, Api } from "@types";
import { User } from "./user";

export class UserMap {
  private readonly dto: Api.Responses.UserMap;

  constructor(dto: Api.Responses.UserMap) {
    this.dto = dto;
  }

  find(id: Domain.ID): Option<User> {
    const value = this.dto[id].value;
    if (!value) return None();
    return Some(new User(value));
  }
}

import { Some, None, Option } from "excoptional";
import { API } from "@types";
import { User } from "./user";

export class UserMap {
  private readonly dto: API.UserMap;

  constructor(dto: API.UserMap) {
    this.dto = dto;
  }

  find(id: API.UserID): Option<User> {
    const value = this.dto[id];
    if (!value) return None();
    return Some(new User(value));
  }
}

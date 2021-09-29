import { API } from "@types";

export class User {
  private readonly dto: API.User;

  constructor(dto: API.User) {
    this.dto = dto;
  }
}

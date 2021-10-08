import { Domain, Api } from "@types";

type Remap<T> = {
  [K in keyof T as Domain.Utils.CamelCase<K>]: T[K];
};

type UserProperties = Omit<
  Remap<Api.User>,
  "version" | "onboardingCompleted" | "mobileOnboardingCompleted"
>;

export class User implements UserProperties {
  private readonly dto: Api.User;
  readonly id: Domain.ID;
  readonly email: string;
  readonly givenName: string;
  readonly familyName: string;

  constructor(dto: Api.User) {
    this.dto = dto;
    this.id = dto.id;
    this.email = dto.email;
    this.givenName = dto.given_name;
    this.familyName = dto.family_name;
  }

  get profilePhoto(): Domain.Url {
    return this.dto.profile_photo;
  }

  get name(): string {
    return [this.dto.given_name, this.dto.family_name]
      .filter(Boolean)
      .join(" ");
  }
}

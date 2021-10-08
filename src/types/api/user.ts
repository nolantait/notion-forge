import { Core } from "./";

export type UserID = Core.ID;

export interface User {
  id: UserID;
  version: number;
  email: string;
  given_name: string;
  family_name: string;
  profile_photo: string;
  onboarding_completed: boolean;
  mobile_onboarding_completed: boolean;
}

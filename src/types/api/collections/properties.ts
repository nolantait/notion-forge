import { Core } from "../";

export type ID = Core.PropertyID;

export type Visible = {
  visible: boolean;
};

export type Visibility = {
  visibility: "show" | "hide";
};

export type Identity = {
  property: ID;
};

export type Width = {
  width?: number;
};

export type Hidden = {
  hidden: boolean;
};

import { Blocks } from "@types";
import { Block } from "@entities";

export * from "./pageable";
export * from "./iconable";
export * from "./titleable";
export * from "./colorable";
export * from "./lockable";
export * from "./shapeable";
export * from "./linkable";
export * from "./captionable";
export * from "./sourceable";

export type Traits = {
  pageable: { format: Blocks.Format.Page };
  iconable: { format: Blocks.Format.Icon };
  colorable: { format: Blocks.Format.Color };
  lockable: { format: Blocks.Format.Access };
  shapeable: { format: Blocks.Format.Block };
  titleable: { properties: Blocks.Properties.Title };
  linkable: { properties: Blocks.Properties.Link };
  captionable: { properties: Blocks.Properties.Caption };
  sourceable:
    | {
        format: Blocks.Format.Source;
      }
    | {
        properties: Blocks.Properties.Source;
      };
};

// type Test = BlocksWithTrait<"pageable">;

export type BlocksWithTrait<T extends keyof Traits> = Block<
  Blocks.WithTrait<Traits[T]>
>;

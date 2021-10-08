import type * as Api from "./api";
import type * as Blocks from "../blocks";
export * as Utils from "./api/utils";
import type { RecordMap } from "@entities";
import { View } from "@types";

export type ID = Api.Core.ID;
export type PropertyID = Api.Core.PropertyID;
export type PropertyType = Api.Collections.Schema.PropertyType;
export type ParentType = Api.Core.ParentType;
export type SelectOption = Api.Collections.Schema.SelectOption;
export type NumberFormat = Api.Collections.Schema.NumberFormat;
export type Color = Api.Core.Color;
export type Font = "serif" | "sans-serif" | "mono";
export type Pointer = Api.Blocks.Format.Pointer;
export type Url = string;

export type BlockWith<T> = Api.Blocks.DTO & T;

export { Block } from "@entities";
export { Blocks };

export interface NotionContext {
  recordMap: RecordMap;
  components: View.Any;
  rootPageId: string | undefined;
  fullPage: boolean;
  previewImages: boolean;
  showCollectionViewDropdown: boolean;
  defaultPageIcon: string | null;
  defaultPageCover: string | null;
  defaultPageCoverPosition: number;
  zoom: unknown;
}

export type MapPageUrl = (pageId: Blocks.ID, rootPageId?: Blocks.ID) => Url;
export type MapImageUrl = (url: string, block: Blocks.Any) => Url;

import * as Definitions from "../entities/definitions";

export { Definitions };

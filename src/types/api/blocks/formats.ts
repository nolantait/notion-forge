import { Core } from "../";

export type Any =
  | Page
  | Access
  | Color
  | Block
  | Source
  | Bookmark
  | Icon
  | Drive
  | Pointer
  | AliasPointer
  | TransclusionReferencePointer
  | CopiedFromPointer
  | CollectionPointer
  | ColumnRatio
  | AliasPointer;

type SectionVisibility = "section_hide" | "section_show";
export type PageSectionVisibility = {
  comments: SectionVisibility;
  backlinks: SectionVisibility;
};

export type Page = {
  page_full_width?: boolean;
  page_small_text?: boolean;
  page_cover_position?: number;
  page_cover?: string;
  page_font?: "serif" | "sans-serif" | "mono";
  page_section_visibility?: PageSectionVisibility;
};

export type Access = {
  block_locked?: boolean;
  block_locked_by?: string;
};

export type Color = {
  block_color?: Core.Color;
};

export type Block = {
  block_width?: number;
  block_height?: number;
  block_full_width?: boolean;
  block_page_width?: boolean;
  block_aspect_ratio?: number;
  block_preserve_scale?: boolean;
};

export type Source = {
  display_source?: string;
};

export type Bookmark = {
  bookmark_icon: string;
  bookmark_cover: string;
};

export type Icon = {
  page_icon?: string;
};

export type Drive = {
  drive_status: DriveStatus;
  drive_properties: DriveProperties;
};

export type DriveStatus = {
  authed: boolean;
  last_fetched: number;
};

export type DriveProperties = {
  url: string;
  icon: string;
  title: string;
  file_id: string;
  trashed: boolean;
  version: string;
  thumbnail: string;
  user_name: string;
  modified_time: number;
};

export type Pointer = {
  id: Core.PropertyID;
  spaceid: Core.PropertyID;
  table: Core.ParentType;
};

export type CopiedFromPointer = {
  copied_from_pointer?: Pointer;
};

export type CollectionPointer = {
  collection_pointer?: Pointer;
};

export type TransclusionReferencePointer = {
  transclusion_reference_pointer: Pointer;
};

export type ColumnRatio = {
  column_ratio: number;
};

export type AliasPointer = {
  alias_pointer: Pointer;
};

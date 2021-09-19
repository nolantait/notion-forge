import { ID } from "../core";
import * as Formats from "../formats";

export type Any =
  | Page
  | Access
  | Color
  | Block
  | Source
  | Bookmark
  | Icon
  | Drive
  | DriveStatus
  | DriveProperties
  | Pointer
  | AliasPointer
  | TransclusionReference
  | Column
  | Alias;

export type Page = {
  page_full_width?: boolean;
  page_small_text?: boolean;
  page_cover_position?: number;
  page_cover?: string;
  page_icon?: string;
};

export type Access = {
  block_locked?: boolean;
  block_locked_by?: string;
};

export type Color = {
  block_color: Formats.Color;
};

export type Block = {
  block_width: number;
  block_height: number;
  block_full_width: boolean;
  block_page_width: boolean;
  block_aspect_ratio: number;
  block_preserve_scale: boolean;
};

export type Source = {
  display_source: string;
};

export type Bookmark = {
  bookmark_icon: string;
  bookmark_cover: string;
};

export type Icon = {
  page_icon: string;
};

export type Drive = {
  drive_status: DriveStatus;
  drive_properties: DriveProperties;
  display_source: string;
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
  id: ID;
  spaceid: ID;
};

export type AliasPointer = Pointer & {
  table: string;
};

export type TransclusionReference = {
  copied_from_pointer: Pointer;
  transclusion_reference_pointer: Pointer;
};

export type Column = {
  column_ratio: number;
};

export type Alias = {
  alias_pointer: AliasPointer;
};

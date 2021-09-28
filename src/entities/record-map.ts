import { Option, Some, None } from "excoptional";
import { Core, Blocks, API, Collections } from "@types";
import { Collection, Block } from "@entities";
import { Composer } from "./composite";

export const MapPageUrl: Core.MapPageUrl = (
  pageId: Blocks.ID,
  rootPageId?: Blocks.ID
): Core.URL => {
  const mappedUrl = pageId.replace(/-/g, "");
  if (rootPageId === pageId) {
    return "/";
  } else {
    return `/${mappedUrl}`;
  }
};

const MapImageUrl: Core.MapImageUrl = (
  url: string,
  block: Block<Blocks.Every>
): Core.URL => {
  const prefixNotionUrl = (url: string) => `https://notion.so${url}`;

  if (url.startsWith("data")) return url;

  if (url.startsWith("/images")) {
    url = prefixNotionUrl(url);
  }

  if (!url.startsWith("https://images.unsplash.com")) {
    const shouldOverride =
      block.parentIs("space") || block.parentIs("collection");
    const parentType = shouldOverride ? "block" : block.parentTable;
    const imageUrl = url.startsWith("/image")
      ? url
      : `/image/${encodeURIComponent(url)}`;
    url = prefixNotionUrl(imageUrl);
    const notionImageUrl = new URL(url);
    notionImageUrl.searchParams.set("table", parentType);
    notionImageUrl.searchParams.set("id", block.id);
    notionImageUrl.searchParams.set("cache", "v2");

    url = notionImageUrl.toString();
  }

  return url;
};

type BlockOrCollection = {
  id: Blocks.ID;
  parentId: Blocks.ID;
  parentTable: Core.ParentType;
  type: Blocks.BlockType | "collection";
};

const defaultRecordMap = {
  block: {},
  collection: {},
  collection_view: {},
  collection_query: {},
  notion_user: {},
  signed_urls: {},
};

export class RecordMap {
  dto: API.ExtendedRecordMap;
  composition: Composer;
  mapImageUrl: Core.MapImageUrl;
  mapPageUrl: Core.MapPageUrl;

  constructor(
    dto: API.ExtendedRecordMap = defaultRecordMap,
    mapImageUrl: Core.MapImageUrl = MapImageUrl,
    mapPageUrl: Core.MapPageUrl = MapPageUrl
  ) {
    this.dto = dto;
    this.composition = new Composer(dto);
    this.mapImageUrl = mapImageUrl;
    this.mapPageUrl = mapPageUrl;
  }

  get rootBlock(): Block<Blocks.Any> {
    return this.composition.root.item;
  }

  findBlock(id: Blocks.ID): Option<Block<Blocks.Every>> {
    return this.composition.find(id);
  }

  findCollection(id: Collections.ID): Option<Collection> {
    const value = this.dto.collection[id]?.value;
    if (!value) return None();
    return Some(new Collection(this, value));
  }

  findUser(id: Core.ID): Option<Core.User> {
    const value = this.dto.notion_user[id]?.value;
    if (!value) return None();
    return Some(value);
  }

  getSignedUrl(id: Blocks.ID): Option<Core.URL> {
    const value = this.dto.signed_urls?.[id];
    if (!value) return None();
    return Some(value);
  }

  getParentBlock(
    block: Block<Blocks.Every>
  ): Option<Block<Blocks.Every> | Collection> {
    if (block.parentTable === "collection") {
      return this.findCollection(block.id);
    }

    return this.findBlock(block.id);
  }

  getParentPageBlock(block: BlockOrCollection): Option<Block<Blocks.Page>> {
    const page = this.composition
      .ancestors(block.id)
      .then((blocks) => blocks.filter((block) => block.type !== "page"))
      .getOrElse([])
      .pop();

    if (!page) return None();
    return Some(page as Block<Blocks.Page>);
  }
}

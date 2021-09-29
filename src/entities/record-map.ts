import { Option, Some, None } from "excoptional";
import { Entities, Core, Blocks, API, Collections } from "@types";
import {
  AnyView,
  Collection,
  Block,
  BlockMap,
  CollectionQueryResult,
  CollectionViewMap,
  CollectionMap,
  CollectionQueryMap,
  UserMap,
  User,
  SignedUrlMap,
  SignedUrl,
  TableOfContentsEntry,
} from "@entities";

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
  readonly dto: API.ExtendedRecordMap;
  readonly mapImageUrl: Core.MapImageUrl;
  readonly mapPageUrl: Core.MapPageUrl;

  private readonly _collections: CollectionMap;
  private readonly _views: CollectionViewMap;
  private readonly _queries: CollectionQueryMap;
  private readonly _blocks: BlockMap;
  private readonly _users: UserMap;
  private readonly _urls: SignedUrlMap;

  constructor(
    dto: API.ExtendedRecordMap = defaultRecordMap,
    mapImageUrl: Core.MapImageUrl = MapImageUrl,
    mapPageUrl: Core.MapPageUrl = MapPageUrl
  ) {
    this.dto = dto;
    this.mapImageUrl = mapImageUrl;
    this.mapPageUrl = mapPageUrl;

    this._blocks = new BlockMap(dto);
    this._collections = new CollectionMap(dto.collection);
    this._views = new CollectionViewMap(dto.collection_view);
    this._queries = new CollectionQueryMap(dto.collection_query);
    this._users = new UserMap(dto.notion_user);
    this._urls = new SignedUrlMap(dto.signed_urls);
  }

  get rootBlock(): Block<Blocks.Any> {
    return this._blocks.root.item;
  }

  findBlock(id: Blocks.ID): Option<Block<Blocks.Every>> {
    return this._blocks.find(id);
  }

  findCollection(id: Collections.ID): Option<Collection> {
    return this._collections.find(id);
  }

  findUser(id: API.UserID): Option<User> {
    return this._users.find(id);
  }

  findView(id: Collections.ViewID): Option<AnyView> {
    return this._views.find(id);
  }

  findQuery(
    collectionId: Collections.ID,
    viewId: Collections.ViewID
  ): Option<CollectionQueryResult> {
    return this._queries.find(collectionId, viewId);
  }

  getSignedUrl(id: Blocks.ID): Option<SignedUrl> {
    return this._urls.find(id);
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
    const page = this._blocks
      .ancestors(block.id)
      .then((blocks) => blocks.filter((block) => block.type !== "page"))
      .getOrElse([])
      .pop();

    if (!page) return None();
    return Some(page as Block<Blocks.Page>);
  }

  getTableOfContentsEntries(): TableOfContentsEntry[] {
    const headerBlocks = this._blocks.where((block) =>
      ["header", "sub_header", "sub_sub_header"].includes(block.type)
    );

    return headerBlocks.map(
      (block) => new TableOfContentsEntry(block as Entities.AnyHeader)
    );
  }
}

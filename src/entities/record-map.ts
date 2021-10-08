import * as Blocks from "@blocks";
import { Option, Some, None } from "excoptional";
import { Domain, Api } from "@types";
import {
  AnyHeader,
  Collection,
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

export const MapPageUrl: Domain.MapPageUrl = (
  pageId: Blocks.ID,
  rootPageId?: Blocks.ID
): Domain.Url => {
  const mappedUrl = pageId.replace(/-/g, "");
  if (rootPageId === pageId) {
    return "/";
  } else {
    return `/${mappedUrl}`;
  }
};

export const MapImageUrl: Domain.MapImageUrl = (
  url: string,
  block: Blocks.Any
): Domain.Url => {
  const prefixNotionUrl = (url: string) => `https://notion.so${url}`;

  if (url.startsWith("data")) return url;

  if (url.startsWith("/images")) {
    url = prefixNotionUrl(url);
  }

  if (!url.startsWith("https://images.unsplash.com")) {
    const shouldOverride =
      block.parentIs("space") || block.parentIs("collection");
    const parentType = shouldOverride ? "block" : block.parentType;
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
  parentType: Domain.ParentType;
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
  readonly dto: Api.Responses.ExtendedRecordMap;
  mapImageUrl: Domain.MapImageUrl;
  mapPageUrl: Domain.MapPageUrl;

  private readonly _collections: CollectionMap;
  private readonly _views: CollectionViewMap;
  private readonly _queries: CollectionQueryMap;
  private readonly _blocks: BlockMap;
  private readonly _users: UserMap;
  private readonly _urls: SignedUrlMap;

  constructor(
    dto: Api.Responses.ExtendedRecordMap = defaultRecordMap,
    mapImageUrl: Domain.MapImageUrl = MapImageUrl,
    mapPageUrl: Domain.MapPageUrl = MapPageUrl
  ) {
    this.dto = dto;
    this.mapImageUrl = mapImageUrl;
    this.mapPageUrl = mapPageUrl;

    this._blocks = new BlockMap(this);
    this._collections = new CollectionMap(dto.collection);
    this._views = new CollectionViewMap(dto.collection_view);
    this._queries = new CollectionQueryMap(dto.collection_query);
    this._users = new UserMap(dto.notion_user);
    this._urls = new SignedUrlMap(dto.signed_urls);
  }

  get rootBlock(): Blocks.Any {
    return this._blocks.root.block;
  }

  findBlock(id: Domain.ID): Option<Domain.Blocks.Any> {
    return this._blocks.find(id);
  }

  findCollection(id: Domain.ID): Option<Collection> {
    return this._collections.find(id);
  }

  findUser(id: Domain.ID): Option<User> {
    return this._users.find(id);
  }

  findView(
    id: Api.Collections.ViewID
  ): Option<Domain.Blocks.CollectionView.AnyView> {
    return this._views.find(id);
  }

  findQuery(
    viewId: Domain.ID,
    collectionId: Domain.ID
  ): Option<CollectionQueryResult> {
    return this._queries.find(collectionId, viewId);
  }

  getFirstImage(block: Domain.Blocks.Any): Option<Domain.Blocks.Image.Entity> {
    const blocks = this.getBlocks(block.content);
    const firstFoundImage = blocks.filter(
      (block): block is Domain.Blocks.Image.Entity => block.type === "image"
    )[0];

    return firstFoundImage ? Some(firstFoundImage) : None();
  }

  getViewBlocks(
    viewId: Domain.ID,
    collectionId: Domain.ID
  ): Option<Domain.Blocks.Any[]> {
    return this.findQuery(viewId, collectionId).then((query) => {
      return this.getBlocks(query.blockIds);
    });
  }

  getBlocks(blockIds: Blocks.ID[]): Blocks.Any[] {
    const blocks = blockIds
      .map((id) => this.findBlock(id))
      .reduce((acc, item) => {
        item.then((value) => acc.push(value));
        return acc;
      }, [] as Blocks.Any[]);

    return blocks;
  }

  getSignedUrl(id: Blocks.ID): Option<SignedUrl> {
    return this._urls.find(id);
  }

  getParentBlock(block: Blocks.Any): Option<Blocks.Any | Collection> {
    if (block.parentType === "collection") {
      return this.findCollection(block.id);
    }

    return this.findBlock(block.id);
  }

  getParentPageBlock(block: BlockOrCollection): Option<Blocks.Page.Entity> {
    const page = this._blocks
      .ancestors(block.id)
      .then((blocks) => blocks.filter((block) => block.type !== "page"))
      .getOrElse([])
      .pop();

    if (!page) return None();
    return Some(page as Blocks.Page.Entity);
  }

  getTableOfContentsEntries(): TableOfContentsEntry[] {
    const headerBlocks = this._blocks.where((block) =>
      ["header", "sub_header", "sub_sub_header"].includes(block.type)
    ) as AnyHeader[];

    return headerBlocks.map((block) => new TableOfContentsEntry(block));
  }
}

import { Collections, Blocks, API } from "@types";
import isUrl from "is-url-superb";

export * from "@lib";

export * from "notion-utils";

export const cs = (...classes: Array<string | undefined | false>) =>
  classes.filter((a) => !!a).join(" ");

export { isUrl };

export const defaultMapImageUrl = (url: string, block: Blocks.Any): string => {
  if (!url) {
    return "";
  }

  if (url.startsWith("data:")) {
    return url;
  }

  if (url.startsWith("/images")) {
    url = `https://www.notion.so${url}`;
  }

  // more recent versions of notion don't proxy unsplash images
  if (!url.startsWith("https://images.unsplash.com")) {
    url = `https://www.notion.so${
      url.startsWith("/image") ? url : `/image/${encodeURIComponent(url)}`
    }`;

    const notionImageUrlV2 = new URL(url);
    let table = block.parent_table === "space" ? "block" : block.parent_table;
    if (table === "collection") {
      table = "block";
    }
    notionImageUrlV2.searchParams.set("table", table as string);
    notionImageUrlV2.searchParams.set("id", block.id as string);
    notionImageUrlV2.searchParams.set("cache", "v2");

    url = notionImageUrlV2.toString();
  }

  return url;
};

export const defaultMapPageUrl = (rootPageId?: string) => (pageId: string) => {
  pageId = (pageId || "").replace(/-/g, "");

  if (rootPageId && pageId === rootPageId) {
    return "/";
  } else {
    return `/${pageId}`;
  }
};

export const isBrowser = typeof window !== "undefined";
export const isServer = typeof window === "undefined";

export const getBlockParentPage = (
  block: Blocks.Any,
  recordMap: API.ExtendedRecordMap
): Blocks.Any | null => {
  let currentRecord: Blocks.Any | Collections.Collection = block;

  while (currentRecord != null) {
    const { parent_id: parentId, parent_table: parentTable } =
      currentRecord as Record<string, string>;

    if (!parentId) {
      throw new Error(`Could not find parent for ${block.id}`);
    }

    if (parentTable === "collection") {
      currentRecord = recordMap.collection[parentId as string]?.value;
    } else {
      currentRecord = recordMap.block[parentId as string]?.value;

      if (currentRecord.type === "page") {
        return currentRecord;
      }
    }
  }

  return null;
};

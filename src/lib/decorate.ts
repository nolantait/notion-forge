import { Notion } from "@types";

export function decorate(value: string): Notion.Decoration[] {
  return [[value]];
}

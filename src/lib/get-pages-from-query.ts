import { useNotionContext } from "@context";
import { Notion } from "@types";

export const getPagesFromQuery = (
  query: Notion.CollectionQueryResult
): Notion.PageBlock[] => {
  const { recordMap } = useNotionContext();

  return query.blockIds.map(
    (id) => recordMap.block[id].value as Notion.PageBlock
  );
};

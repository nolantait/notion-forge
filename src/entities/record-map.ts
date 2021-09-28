import { Option, Some, None } from "excoptional";
import { Core, Blocks, API, Collections } from "@types";
import { Collection, Block } from "@entities";
import { Composer } from "./composite";

type BlockOrCollection = {
  id: Blocks.ID;
  parentId: Blocks.ID;
  parentTable: Core.ParentType;
  type: Blocks.BlockType | "collection";
};

export class RecordMap {
  dto: API.ExtendedRecordMap;
  composition: Composer;

  constructor(dto: API.ExtendedRecordMap) {
    this.dto = dto;
    this.composition = new Composer(dto);
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
    return Some(new Collection(value));
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

  getParentBlock(block: Block<Blocks.Every>): Option<BlockOrCollection> {
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

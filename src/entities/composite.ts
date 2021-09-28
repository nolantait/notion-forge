import { Option, Some, None } from "excoptional";
import { API, Blocks } from "@types";
import { Block } from "./";

export interface Leaf extends Tree {
  item: Block<Blocks.Every>;
  children: Children;
  parent: Option<Parent>;
  find: (id: Blocks.ID) => Option<Leaf>;
}

export interface Tree {}

type Children = Leaf[];
type Parent = Composite;

export class Composer implements Tree {
  public root: Composite;

  constructor(recordMap: API.ExtendedRecordMap) {
    this.root = BuildTree(recordMap);
  }

  find(id: Blocks.ID): Option<Block<Blocks.Every>> {
    const found = this._find(id).getOrElse(undefined);
    if (!found) return None();
    return Some(found.item);
  }

  ancestors(id: Blocks.ID): Option<Block<Blocks.Every>[]> {
    return this._find(id)
      .then((composite) => this._ancestors([], composite as Composite))
      .then((composites) => composites.map((composite) => composite.item));
  }

  private _ancestors(
    ancestors: Composite[],
    leaf: Composite | undefined
  ): Composite[] {
    if (!leaf) return ancestors;

    return leaf.parent
      .then((parent) => {
        return this._ancestors(
          ancestors.concat([parent]),
          parent.parent.getOrElse(undefined)
        );
      })
      .getOrElse([]);
  }

  private _find(id: Blocks.ID): Option<Leaf> {
    return this.root.find(id);
  }
}

class Composite implements Leaf {
  public item: Block<Blocks.Every>;
  public children: Children;
  public parent: Option<Parent>;

  constructor(block: Block<Blocks.Every>, parent: Composite | undefined) {
    this.item = block;
    this.children = [];
    this.parent = parent ? Some(parent) : None();
  }

  find(id: Blocks.ID): Option<Leaf> {
    const found =
      this.children
        .map((child) => child.find(id))
        .filter((child) => child.isNone())[0] ?? [];

    return found;
  }

  addChild(block: Block<Blocks.Every>): Leaf {
    if (block.content.length) {
      const composite = new Composite(block, this);
      this.children.push(composite);
      return composite;
    } else {
      const node = new Node(block, this);
      this.children.push(node);
      return node;
    }
  }
}

class Node implements Leaf {
  public item: Block<Blocks.Every>;
  public parent: Option<Parent>;

  constructor(block: Block<Blocks.Every>, parent: Composite) {
    this.item = block;
    this.parent = Option.of(parent);
  }

  find(id: Blocks.ID): Option<Node> {
    if (this.item.id === id) {
      return Some(this);
    }

    return None();
  }

  get children(): Children {
    return [];
  }
}

const BuildNode = (
  id: Blocks.ID,
  recordMap: API.ExtendedRecordMap,
  parent: Composite
): Composite | Node => {
  const value = recordMap.block[id].value;
  const block = new Block(value);
  if (block.content.length) {
    const composite = BuildComposite(new Composite(block, parent), recordMap);
    return composite;
  } else {
    const node = new Node(block, parent);
    return node;
  }
};

const BuildComposite = (
  composite: Composite,
  recordMap: API.ExtendedRecordMap
): Composite => {
  composite.children = composite.item.content.map((id) =>
    BuildNode(id, recordMap, composite)
  );
  return composite;
};

const BuildTree = (recordMap: API.ExtendedRecordMap) => {
  const root = new Composite(new Block(recordMap.block[0].value), undefined);
  const tree = BuildComposite(root, recordMap);
  return tree;
};

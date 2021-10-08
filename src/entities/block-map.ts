import { Option, Some, None } from "excoptional";
import { Domain } from "@types";
import { BlockFactory } from "@factories";
import { RecordMap } from "./";

interface LeafParams {
  block: Domain.Blocks.Any;
  parent?: Option<Parent>;
  children?: Children;
}

type Leaf = Node | Composite;
type Children = Leaf[];
type Parent = Composite;
type WhereClause = (block: Domain.Blocks.Any) => boolean;

// Build tree by adding children functionally to root nodes.
// This takes the flat structure Notion gives and converts it into a tree
// interface
const buildTree = (recordMap: RecordMap): Composite => {
  const blockMap = recordMap.dto.block;

  const blocks = Object.keys(blockMap).map((key): Domain.Blocks.Any => {
    const dto = blockMap[key].value;
    return BlockFactory(dto);
  });

  const rootBlock = blocks.find((block) => block.isRoot);
  if (!rootBlock) {
    throw new Error(`Could not find root block for ${blocks}`);
  }

  const root = new Composite({ block: rootBlock });

  const addChildren = (
    leaf: Leaf,
    parent: Parent | undefined = undefined
  ): Leaf => {
    if (parent) {
      leaf = leaf.setParent(parent);
    }

    return leaf.addChildren(
      blocks
        .filter((otherBlock) => otherBlock.parentId === leaf.id)
        .map((block) => new Node({ block }))
        .map((node) => addChildren(node, leaf))
    );
  };

  return addChildren(root);
};

export class BlockMap {
  public root: Composite;

  constructor(recordMap: RecordMap) {
    this.root = buildTree(recordMap);
  }

  where(condition: WhereClause): Domain.Blocks.Any[] {
    const found = this.root.where(condition).getOrElse([]);

    return found.map((leaf) => leaf.block);
  }

  find(id: Domain.Blocks.ID): Option<Domain.Blocks.Any> {
    const found = this._find(id).getOrElse(undefined);
    if (!found) return None();
    return Some(found.block);
  }

  ancestors(id: Domain.Blocks.ID): Option<Domain.Blocks.Any[]> {
    return this._find(id)
      .then((composite) => this._ancestors([], composite))
      .then((composites) => composites.map((composite) => composite.block));
  }

  private _ancestors(
    ancestors: Composite[],
    leaf: Leaf | undefined
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

  private _find(id: Domain.Blocks.ID): Option<Leaf> {
    return this.root.find(id);
  }
}

class Composite {
  readonly id: Domain.ID;
  readonly block: Domain.Blocks.Any;
  readonly children: Children;
  readonly parent: Option<Parent>;

  constructor({ block, parent, children }: LeafParams) {
    this.id = block.id;
    this.block = block;
    this.children = children ?? [];
    this.parent = parent ?? None();
  }

  where(condition: WhereClause): Option<Leaf[]> {
    const found = this.children
      .map((child) => child.where(condition).getOrElse([] as Leaf[]))
      .flat();

    if (!found.length) return None();
    return Some(found);
  }

  find(id: Domain.Blocks.ID): Option<Leaf> {
    const found =
      this.children
        .map((child) => child.find(id))
        .filter((child) => child.isNone())[0] ?? [];

    return found;
  }

  addChildren(leafs: Leaf[]): Composite {
    return new Composite({
      block: this.block,
      parent: this.parent,
      children: [...this.children, ...leafs],
    });
  }

  setParent(parent: Parent): Composite {
    return new Composite({
      block: this.block,
      parent: Some(parent),
      children: this.children,
    });
  }
}

class Node {
  readonly id: Domain.ID;
  readonly block: Domain.Blocks.Any;
  readonly children = [];
  readonly parent: Option<Parent>;

  constructor({ block, parent }: LeafParams) {
    this.id = block.id;
    this.block = block;
    this.parent = parent ?? None();
  }

  where(condition: WhereClause): Option<Node[]> {
    if (condition(this.block)) {
      return Some([this]);
    }

    return None();
  }

  find(id: Domain.Blocks.ID): Option<Leaf> {
    if (this.block.id === id) {
      return Some(this);
    }

    return None();
  }

  addChildren(leafs: Leaf[]): Composite {
    return new Composite({
      block: this.block,
      parent: this.parent,
      children: leafs,
    });
  }

  setParent(parent: Parent): Node {
    return new Node({
      block: this.block,
      parent: Some(parent),
    });
  }
}

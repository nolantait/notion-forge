import { Some, None, Option } from "excoptional";
import { Domain, Api, Mixins } from "@types";

export type HasLock = Mixins.Constructor<
  Domain.Block<Mixins.WithTrait<IsLockable>>
>;

export type IsLockable = { format?: Api.Blocks.Format.Access };

export type ILockable = {
  blockLocked: Option<boolean>;
  blockLockedBy: Option<string>;
};

export function Lockable<TBase extends HasLock>(
  Base: TBase
): Mixins.Constructor<ILockable> & TBase {
  return class Lockable extends Base implements ILockable {
    readonly blockLocked: Option<boolean>;
    readonly blockLockedBy: Option<string>;

    constructor(...args: any[]) {
      super(...args);
      this.blockLocked = this.format.then((format) => {
        const value = format?.block_locked;
        if (!value) return None();
        return Some(value);
      });
      this.blockLockedBy = this.format.then((format) => {
        const value = format?.block_locked_by;
        if (!value) return None();
        return Some(value);
      });
    }
  };
}

import { Option, Some, None } from "excoptional";
import { Blocks } from "@types";
import { Block } from "@entities";

export class TransclusionReferenceBlock
  extends Block<Blocks.TransclusionReference>
  implements Blocks.Template<Blocks.TransclusionReference>
{
  get copiedFromPointer(): Option<Blocks.Format.Pointer> {
    const value = this._format?.copied_from_pointer;
    if (!value) return None();
    return Some(value);
  }

  get transclusionReferencePointer(): Option<Blocks.Format.Pointer> {
    const value = this._format?.transclusion_reference_pointer;
    if (!value) return None();
    return Some(value);
  }
}

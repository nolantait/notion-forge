import { Option, Some, None } from "excoptional";
import { Domain, Api } from "@types";

export class TransclusionReferenceBlock
  extends Domain.Block<Api.Blocks.TransclusionReference>
  implements Domain.Blocks.Template<Api.Blocks.TransclusionReference>
{
  readonly transclusionReferencePointer: Option<Api.Blocks.Format.Pointer>;

  constructor(block: Api.Blocks.TransclusionReference) {
    super(block);
    this.transclusionReferencePointer = this.format.then((format) => {
      const value = format?.transclusion_reference_pointer;
      if (!value) return None();
      return Some(value);
    });
  }
}

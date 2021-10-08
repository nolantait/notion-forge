import { Domain, Api } from "@types";
import { Block } from "@entities";

export class TransclusionContainerBlock
  extends Block<Api.Blocks.TransclusionContainer>
  implements Domain.Blocks.Template<Api.Blocks.TransclusionContainer> {}

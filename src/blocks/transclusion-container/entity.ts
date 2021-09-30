import { Blocks } from "@types";
import { Block } from "@entities";

export class TransclusionContainerBlock
  extends Block<Blocks.TransclusionContainer>
  implements Blocks.Template<Blocks.TransclusionContainer> {}

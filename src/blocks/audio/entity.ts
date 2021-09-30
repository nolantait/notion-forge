//import {Ability} from "@mixins";
import { Blocks } from "@types";
import { Block } from "@entities";

export class AudioBlock
  extends Block<Blocks.Audio>
  implements Blocks.Template<Blocks.Audio> {}

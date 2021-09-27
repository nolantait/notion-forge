import { Embeddable } from "../behaviour";
import { Blocks } from "@types";

export class TweetBlock
  extends Embeddable<Blocks.Tweet>
  implements Blocks.Template<Blocks.Tweet> {}

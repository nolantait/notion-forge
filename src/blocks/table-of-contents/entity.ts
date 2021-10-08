import { Traits } from "@mixins";
import { Domain, Api } from "@types";

export class TableOfContentsBlock
  extends Traits.Colorable(Domain.Block)<Api.Blocks.TableOfContents>
  implements Domain.Blocks.Template<Api.Blocks.TableOfContents> {}

import { Domain, Api } from "@types";

export class DividerBlock
  extends Domain.Block<Api.Blocks.Divider>
  implements Domain.Blocks.Template<Api.Blocks.Divider> {}

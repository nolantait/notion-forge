import { Domain, Api } from "@types";

export class ColumnListBlock
  extends Domain.Block<Api.Blocks.ColumnList>
  implements Domain.Blocks.Template<Api.Blocks.ColumnList> {}

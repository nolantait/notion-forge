import * as Table from "./table";
import * as List from "./list";
import * as Gallery from "./gallery";
import * as Calendar from "./calendar";
import * as Board from "./board";

export type AnyView =
  | Table.Entity
  | Board.Entity
  | List.Entity
  | Gallery.Entity
  | Calendar.Entity;

export { Table, List, Gallery, Calendar, Board };

import { Option, Some, None } from "excoptional";
import { Embeddable } from "../behaviour";
import { Blocks } from "@types";

export class DriveBlock
  extends Embeddable<Blocks.Drive>
  implements Blocks.Template<Blocks.Drive>
{
  get driveStatus(): Option<Blocks.Format.DriveStatus> {
    const value = this._format?.drive_status;
    if (!value) return None();
    return Some(value);
  }

  get driveProperties(): Option<Blocks.Format.DriveProperties> {
    const value = this._format?.drive_properties;
    if (!value) return None();
    return Some(value);
  }
}

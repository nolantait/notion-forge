import { Option, Some, None } from "excoptional";
import { Ability } from "@mixins";
import { Domain, Api } from "@types";

export class DriveBlock
  extends Ability.Embeddable<Api.Blocks.Drive>(Domain.Block)
  implements Domain.Blocks.Template<Api.Blocks.Drive>
{
  driveStatus: Option<Api.Blocks.Format.DriveStatus>;
  driveProperties: Option<Api.Blocks.Format.DriveProperties>;

  constructor(...args: any[]) {
    super(...args);
    this.driveStatus = this.format.then((format) => {
      const value = format?.drive_status;
      if (!value) return None();
      return Some(value);
    });
    this.driveProperties = this.format.then((format) => {
      const value = format?.drive_properties;
      if (!value) return None();
      return Some(value);
    });
  }
}

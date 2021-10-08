import { Option, Some, None } from "excoptional";
import { Property, Definition } from "@entities";
import { Api, Domain } from "@types";
import formatNumber from "format-number";

export class NumberDefinition extends Definition<Api.Collections.Schema.Number> {
  readonly type = "number" as const;
  readonly numberFormat: Option<Domain.NumberFormat>;

  constructor(id: Domain.PropertyID, dto: Api.Collections.Schema.Number) {
    super(id, dto);
    this.numberFormat = dto.number_format ? Some(dto.number_format) : None();
  }

  decorate(property: Property<Domain.Definitions.Number>): string {
    return format(property.data.asNumber, this.numberFormat).getOrElse(
      property.rawValue
    );
  }
}

const format = (
  value: number,
  numberFormat: Option<Domain.NumberFormat>
): Option<string> => {
  return numberFormat.then((format) => {
    switch (format) {
      case "number_with_commas":
        return formatNumber()(value);
      case "percent":
        return formatNumber({ suffix: "%" })(value * 100);
      case "dollar":
        return formatNumber({ prefix: "$", round: 2, padRight: 2 })(value);
      case "euro":
        return formatNumber({ prefix: "€", round: 2, padRight: 2 })(value);
      case "pound":
        return formatNumber({ prefix: "£", round: 2, padRight: 2 })(value);
      case "yen":
        return formatNumber({ prefix: "¥", round: 0 })(value);
      case "rupee":
        return formatNumber({ prefix: "₹", round: 2, padRight: 2 })(value);
      case "won":
        return formatNumber({ prefix: "₩", round: 0 })(value);
      case "yuan":
        return formatNumber({ prefix: "CN¥", round: 2, padRight: 2 })(value);
      default:
        throw new Error(
          `No number formatting available for ${format} with value ${value}`
        );
    }
  });
};

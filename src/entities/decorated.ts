import { Formats } from "@types";

export class Decorated {
  _value: Formats.Decoration[];

  constructor(value?: Formats.Decoration[] | string) {
    if (typeof value === "string") {
      this._value = [[value]];
    } else {
      this._value = value ?? [[""]];
    }
  }

  get isEmpty(): boolean {
    return this.asString.length === 0;
  }

  get asString(): string {
    return this._value[0][0];
  }

  get asDecoration(): Formats.Decoration[] {
    return this._value;
  }
}

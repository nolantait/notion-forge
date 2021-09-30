import { Formats } from "@types";

export class Decorated {
  _value: Formats.Decoration[];

  static fromString(
    value: string,
    format?: Formats.SubDecoration[]
  ): Decorated {
    if (format) {
      const decoration: Formats.Decoration[] = [[value, format]];
      return new Decorated(decoration);
    }

    return new Decorated([[value]]);
  }

  constructor(value?: Formats.Decoration[]) {
    this._value = value ?? [[""]];
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

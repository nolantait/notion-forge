import { Api } from "@types";

export class Decorated {
  _value: Api.Formats.Decoration[];

  static empty() {
    return new Decorated();
  }

  static fromString(
    value: string,
    format?: Api.Formats.SubDecoration[]
  ): Decorated {
    if (format) {
      const decoration: Api.Formats.Decoration[] = [[value, format]];
      return new Decorated(decoration);
    }

    return new Decorated([[value]]);
  }

  constructor(value?: Api.Formats.Decoration[]) {
    this._value = value ?? [[""]];
  }

  unwrap<T>(
    func: (decoration: Api.Formats.Decoration[], ...args: any[]) => T,
    ...args: any[]
  ): T {
    return func(this.asDecoration, args);
  }

  get isEmpty(): boolean {
    return this.asString.length === 0;
  }

  get asString(): string {
    return this._value[0][0];
  }

  get asNumber(): number {
    return parseFloat(this.asString);
  }

  get asDecoration(): Api.Formats.Decoration[] {
    return this._value;
  }
}

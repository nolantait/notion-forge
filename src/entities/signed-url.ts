import { Domain } from "@types";

export class SignedUrl {
  private readonly _url: Domain.Url;

  constructor(url: Domain.Url) {
    this._url = url;
  }

  get url(): URL {
    return new URL(this._url);
  }

  get href(): string {
    return this.url.href;
  }
}

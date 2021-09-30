import { Core } from "@types";

export class SignedUrl {
  private readonly _url: Core.URL;

  constructor(url: Core.URL) {
    this._url = url;
  }

  get url(): URL {
    return new URL(this._url);
  }

  get href(): string {
    return this.url.href;
  }
}

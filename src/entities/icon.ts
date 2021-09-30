import { isUrl } from "@utils";

type IconType = "url" | "text" | "empty";

export class Icon {
  private readonly _path: string;

  constructor(path: string) {
    this._path = path;
  }

  get path(): string {
    return this._path.trim();
  }

  get type(): IconType {
    if (!this.path.length) return "empty";

    if (this._isUrl) {
      return "url";
    } else {
      return "text";
    }
  }

  get _isUrl(): boolean {
    return isUrl(this._path);
  }
}

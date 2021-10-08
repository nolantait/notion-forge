import { Some, None, Option } from "excoptional";
import { Domain, Api, Mixins } from "@types";

export type HasPage = Mixins.Constructor<
  Domain.Block<Mixins.WithTrait<IsPageable>>
>;

export type IsPageable = {
  format?: Api.Blocks.Format.Page;
};

export type IPageable = {
  pageFullWidth: Option<boolean>;
  pageSmallText: Option<boolean>;
  pageCoverPosition: Option<number>;
  pageCover: Option<string>;
  pageFont: Option<Domain.Font>;
  pageSectionVisibility: Option<Api.Blocks.Format.PageSectionVisibility>;
};

export function Pageable<TBase extends HasPage>(
  Base: TBase
): Mixins.Constructor<IPageable> & TBase {
  return class Pageable extends Base implements IPageable {
    readonly pageFullWidth: Option<boolean>;
    readonly pageSmallText: Option<boolean>;
    readonly pageCoverPosition: Option<number>;
    readonly pageCover: Option<string>;
    readonly pageFont: Option<Domain.Font>;
    readonly pageSectionVisibility: Option<Api.Blocks.Format.PageSectionVisibility>;

    constructor(...args: any[]) {
      super(...args);
      this.pageFullWidth = this.format.then((format) => {
        const value = format?.page_full_width;
        if (!value) return None();
        return Some(value);
      });
      this.pageSmallText = this.format.then((format) => {
        const value = format?.page_small_text;
        if (!value) return None();
        return Some(value);
      });
      this.pageCoverPosition = this.format.then((format) => {
        const value = format?.page_cover_position;
        if (!value) return None();
        return Some(value);
      });
      this.pageCover = this.format.then((format) => {
        const value = format?.page_cover;
        if (!value) return None();
        return Some(value);
      });
      this.pageFont = this.format.then((format) => {
        const value = format?.page_font;
        if (!value) return None();
        return Some(value);
      });
      this.pageSectionVisibility = this.format.then((format) => {
        const value = format?.page_section_visibility;
        if (!value) return None();
        return Some(value);
      });
    }
  };
}

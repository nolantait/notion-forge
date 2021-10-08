import { Domain, Api } from "@types";
import * as Blocks from "@blocks";

export const BlockFactory = (dto: Api.Blocks.Any): Domain.Blocks.Any => {
  switch (dto.type) {
    case "alias":
      return new Blocks.Alias.Entity(dto);
    case "audio":
      return new Blocks.Audio.Entity(dto);
    case "bookmark":
      return new Blocks.Bookmark.Entity(dto);
    case "bulleted_list":
      return new Blocks.BulletedList.Entity(dto);
    case "callout":
      return new Blocks.Callout.Entity(dto);
    case "code":
      return new Blocks.Code.Entity(dto);
    case "codepen":
      return new Blocks.Codepen.Entity(dto);
    case "collection_view_page":
      return new Blocks.CollectionViewPage.Entity(dto);
    case "collection_view":
      return new Blocks.CollectionView.Entity(dto);
    case "column_list":
      return new Blocks.ColumnList.Entity(dto);
    case "column":
      return new Blocks.Column.Entity(dto);
    case "divider":
      return new Blocks.Divider.Entity(dto);
    case "drive":
      return new Blocks.Drive.Entity(dto);
    case "embed":
      return new Blocks.Embed.Entity(dto);
    case "equation":
      return new Blocks.Equation.Entity(dto);
    case "excalidraw":
      return new Blocks.Excalidraw.Entity(dto);
    case "figma":
      return new Blocks.Figma.Entity(dto);
    case "file":
      return new Blocks.File.Entity(dto);
    case "gist":
      return new Blocks.Gist.Entity(dto);
    case "header":
      return new Blocks.Header.Entity(dto);
    case "image":
      return new Blocks.Image.Entity(dto);
    case "maps":
      return new Blocks.Maps.Entity(dto);
    case "numbered_list":
      return new Blocks.NumberedList.Entity(dto);
    case "page":
      return new Blocks.Page.Entity(dto);
    case "pdf":
      return new Blocks.Pdf.Entity(dto);
    case "quote":
      return new Blocks.Quote.Entity(dto);
    case "sub_header":
      return new Blocks.SubHeader.Entity(dto);
    case "sub_sub_header":
      return new Blocks.SubSubHeader.Entity(dto);
    case "table_of_contents":
      return new Blocks.TableOfContents.Entity(dto);
    case "text":
      return new Blocks.Text.Entity(dto);
    case "to_do":
      return new Blocks.Todo.Entity(dto);
    case "toggle":
      return new Blocks.Toggle.Entity(dto);
    case "transclusion_container":
      return new Blocks.TransclusionContainer.Entity(dto);
    case "transclusion_reference":
      return new Blocks.TransclusionReference.Entity(dto);
    case "tweet":
      return new Blocks.Tweet.Entity(dto);
    case "typeform":
      return new Blocks.Typeform.Entity(dto);
    case "video":
      return new Blocks.Video.Entity(dto);
    default:
      throw new Error(`Missing factory for block type ${dto as string}`);
  }
};

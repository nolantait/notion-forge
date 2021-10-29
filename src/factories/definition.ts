import { Domain, Api } from "@types";

export const DefinitionFactory = (
  id: string,
  dto: Api.Collections.Schema.AnyDefinition
): Domain.AnyDefinition => {
  switch (dto.type) {
    case "checkbox":
      return new Domain.Definitions.Checkbox(id, dto);
    case "created_time":
      return new Domain.Definitions.CreatedTime(id, dto);
    case "created_by":
      return new Domain.Definitions.CreatedBy(id, dto);
    case "date":
      return new Domain.Definitions.Date(id, dto);
    case "email":
      return new Domain.Definitions.Email(id, dto);
    case "file":
      return new Domain.Definitions.File(id, dto);
    case "formula":
      return new Domain.Definitions.Formula(id, dto);
    case "last_edited_time":
      return new Domain.Definitions.LastEditedTime(id, dto);
    case "last_edited_by":
      return new Domain.Definitions.LastEditedBy(id, dto);
    case "multi_select":
      return new Domain.Definitions.MultiSelect(id, dto);
    case "select":
      return new Domain.Definitions.Select(id, dto);
    case "number":
      return new Domain.Definitions.Number(id, dto);
    case "phone_number":
      return new Domain.Definitions.PhoneNumber(id, dto);
    case "person":
      return new Domain.Definitions.Person(id, dto);
    case "relation":
      return new Domain.Definitions.Relation(id, dto);
    case "title":
      return new Domain.Definitions.Title(id, dto);
    case "text":
      return new Domain.Definitions.Text(id, dto);
    default:
      throw new Error("Missing type for schema");
  }
};

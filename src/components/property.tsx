import React from "react";

import { Checkbox } from "@components";
import { useNotionContext } from "@context";
import { cs } from "@utils";
import { Notion, PropertyProps, NumberPropertySchema } from "@types";
import {
  DateProperty,
  NumberProperty,
  FileProperty,
  FormulaProperty,
  SelectTagProperty,
  UrlProperty,
} from "./properties";

/**
 * Renders a single value of structured Notion data according to its schema.
 *
 * This corresponds to rendering the content of a single cell in a table.
 * Property rendering is re-used across all the different types of collection views.
 */

interface PropertyContentProps
  extends Pick<PropertyProps, "block" | "schema" | "data" | "collection"> {
  inline: boolean;
}

export const Property = ({
  schema,
  data,
  block,
  collection,
  inline = false,
}: PropertyProps): React.ReactElement => {
  return (
    <span className={`notion-property notion-property-${schema.type}`}>
      <PropertyContent {...{ block, schema, data, inline, collection }} />
    </span>
  );
};

const PropertyContent = ({
  block,
  schema,
  inline,
  collection,
  data = [[""]],
}: PropertyContentProps): React.ReactElement => {
  const { components, mapPageUrl } = useNotionContext();
  const properties = block?.properties ?? {};

  if (!block) {
    return <components.text value={data} />;
  }

  switch (schema.type) {
    case "relation":
      return <components.text value={data} block={block} />;

    case "formula":
      return <FormulaProperty {...{ schema, collection, properties }} />;

    case "title": {
      return (
        <components.pageLink
          className={cs("notion-page-link")}
          href={mapPageUrl(block.id)}
        >
          <components.pageTitle block={block as Notion.PageBlock} />
        </components.pageLink>
      );
    }

    case "select":
    // intentional fallthrough
    case "multi_select":
      return <SelectTagProperty data={data} schema={schema} />;

    case "person":
      return <components.text value={data} block={block} />;

    case "file":
      return <FileProperty data={data} block={block} />;

    case "checkbox":
      const isChecked = data && data[0][0] === "Yes";

      return <Checkbox isChecked={isChecked ?? false} blockId={block.id} />;

    case "url":
      return <UrlProperty block={block} data={data} inline={inline} />;

    case "email":
      return (
        <components.text value={data} linkProtocol="mailto" block={block} />
      );

    case "phone_number":
      return <components.text value={data} linkProtocol="tel" block={block} />;

    case "number":
      // TODO: Retype property schemas to use type inference
      return (
        <NumberProperty
          schema={schema as NumberPropertySchema}
          block={block}
          data={data}
        />
      );

    case "created_time": {
      const createdAt = block.created_time ?? Date.now();
      return <DateProperty block={block} value={createdAt} />;
    }

    case "last_edited_time": {
      const lastEdited = block.last_edited_time ?? Date.now();
      return <DateProperty block={block} value={lastEdited} />;
    }

    case "created_by":
      // TODO: Add
      return <></>;

    case "last_edited_by":
      // TODO: Add
      return <></>;

    default:
      throw new Error(
        `Invalid property type ${schema.type} for block ${block.id}`
      );
  }
};

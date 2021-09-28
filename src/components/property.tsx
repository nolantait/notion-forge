import React from "react";

import { useNotionContext } from "@context";
import { cs } from "@utils";
import { Core, Collections, Blocks, Components } from "@types";
import {
  DateProperty,
  NumberProperty,
  FileProperty,
  FormulaProperty,
  SelectTagProperty,
  UrlProperty,
} from "./properties";
import { Block, Decorated, Collection, PageBlock } from "@entities";
import { Component as PageLink } from "@components/page-link";
import { Component as PageTitle } from "@components/page-title";
import { Component as Checkbox } from "@components/checkbox";

/**
 * Renders a single value of structured Notion data according to its schema.
 *
 * This corresponds to rendering the content of a single cell in a table.
 * Property rendering is re-used across all the different types of collection views.
 */

export type Props = {
  collection: Collection;
  data: Decorated;
  schema: Collections.PropertySchema;
  inline?: boolean;
  block?: Block<Blocks.Every>;
};

export const Component: Components.Presenter<Props> = ({
  data,
  schema,
  block,
  collection,
  inline = false,
}) => {
  const { type } = schema;
  const style = cs("notion-property", `notion-property-${type}`);

  return (
    <span className={style}>
      <PropertyContent {...{ block, schema, data, inline, collection }} />
    </span>
  );
};

type PropertyContentProps = Pick<
  Props,
  "block" | "data" | "collection" | "schema"
> & {
  inline: boolean;
};

const PropertyContent: Components.Presenter<PropertyContentProps> = ({
  block,
  inline,
  schema,
  collection,
  data = new Decorated(),
}) => {
  const { components, recordMap } = useNotionContext();

  if (!block || !schema) {
    return <components.text value={data} />;
  }

  const properties: Core.PropertyMap | undefined =
    block.properties.getOrElse(undefined);

  switch (schema.type) {
    case "relation":
      return <components.text value={data} block={block} />;

    case "formula":
      return (
        <FormulaProperty.Property {...{ schema, collection, properties }} />
      );

    case "title": {
      return (
        <PageLink
          className={cs("notion-page-link")}
          href={recordMap.mapPageUrl(block.id)}
        >
          <PageTitle block={block as PageBlock} />
        </PageLink>
      );
    }

    case "select":
    // intentional fallthrough
    case "multi_select":
      return <SelectTagProperty.Property data={data} schema={schema} />;

    case "person":
      return <components.text value={data} block={block} />;

    case "file":
      return <FileProperty.Property data={data} block={block} />;

    case "checkbox": {
      const isChecked = data.asString === "Yes";

      return <Checkbox isChecked={isChecked ?? false} />;
    }

    case "url":
      return <UrlProperty.Property block={block} data={data} inline={inline} />;

    case "email":
      return (
        <components.text value={data} linkProtocol="mailto" block={block} />
      );

    case "phone_number":
      return <components.text value={data} linkProtocol="tel" block={block} />;

    case "number":
      // TODO: Retype property schemas to use type inference
      return (
        <NumberProperty.Property schema={schema} block={block} data={data} />
      );

    case "created_time": {
      return (
        <DateProperty.Property
          block={block}
          value={block.createdTime.getTime()}
        />
      );
    }

    case "last_edited_time": {
      return (
        <DateProperty.Property
          block={block}
          value={block.lastEditedTime.getTime()}
        />
      );
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

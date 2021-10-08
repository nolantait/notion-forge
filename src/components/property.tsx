import React from "react";

import { useNotionContext } from "@context";
import { cs } from "@utils";
import { Domain, View } from "@types";
import {
  DateProperty,
  NumberProperty,
  FileProperty,
  FormulaProperty,
  SelectTagProperty,
  UrlProperty,
} from "./properties";
import { Block, Decorated, Property } from "@entities";
import { PageLink, PageLinkTitle, Checkbox } from "@components";

/**
 * Renders a single value of structured Notion data according to its schema.
 *
 * This corresponds to rendering the content of a single cell in a table.
 * Property rendering is re-used across all the different types of collection views.
 */

export type Props = {
  property: Property;
  block?: Domain.Blocks.Any;
};

export const Component: View.Component<Props> = ({ property, block }) => {
  const { type } = property;
  const style = cs("notion-property", `notion-property-${type}`);

  return (
    <span className={style}>
      <PropertyContent {...{ block, property }} />
    </span>
  );
};

type PropertyContentProps = Props;

const PropertyContent: View.Component<PropertyContentProps> = ({
  block,
  property,
}) => {
  const { components, recordMap } = useNotionContext();

  if (!block) {
    return <components.text value={property.data} />;
  }

  switch (property.type) {
    case "relation":
      return <components.text value={property.data} block={block} />;

    case "formula":
      return <FormulaProperty.Property {...{ property, block }} />;

    case "title": {
      return (
        <PageLink
          blockId={block.id}
          className={cs("notion-page-link")}
          href={recordMap.mapPageUrl(block.id)}
        >
          <PageLinkTitle block={block} />
        </PageLink>
      );
    }

    case "select":
    // intentional fallthrough
    case "multi_select":
      return <SelectTagProperty.Property data={property.data} />;

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

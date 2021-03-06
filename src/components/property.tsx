import React from "react";
import * as types from "notion-types";
import formatNumber from "format-number";
import { format } from "date-fns";

import { cs } from "../utils";
import { Checkbox } from "./checkbox";
import { useNotionContext } from "../context";
import { evalFormula } from "../eval-formula";

/**
 * Renders a single value of structured Notion data according to its schema.
 *
 * This corresponds to rendering the content of a single cell in a table.
 * Property rendering is re-used across all the different types of collection views.
 */
export const Property: React.FC<{
  schema?: types.CollectionPropertySchema;
  data?: types.Decoration[];
  block?: types.Block;
  collection?: types.Collection;
  inline?: boolean;
}> = ({ schema, data, block, collection, inline = false }) => {
  const { components, mapImageUrl, mapPageUrl } = useNotionContext();

  if (schema) {
    let content = null;

    if (
      data ||
      schema.type === "checkbox" ||
      schema.type === "title" ||
      schema.type === "formula" ||
      schema.type === "created_by" ||
      schema.type === "last_edited_by" ||
      schema.type === "created_time" ||
      schema.type === "last_edited_time"
    ) {
      switch (schema.type) {
        case "relation":
          content = <components.text value={data} block={block} />;
          break;

        case "formula":
          // TODO
          // console.log('formula', schema.formula, {
          //   schema: collection?.schema,
          //   properties: block?.properties
          // })

          try {
            content = evalFormula(schema.formula as types.Formula, {
              schema: collection?.schema,
              properties: block?.properties,
            });

            if (isNaN(content as number)) {
              console.log("NaN", schema.formula);
            }

            if (content instanceof Date) {
              content = format(content, "MMM d, YYY hh:mm aa");
            }
          } catch (err) {
            // console.log('error evaluating formula', schema.formula, err)
            content = null;
          }
          break;

        case "title":
          if (block) {
            content = (
              <components.pageLink
                className={cs("notion-page-link")}
                href={mapPageUrl(block.id)}
              >
                <components.pageTitle block={block} />
              </components.pageLink>
            );
          } else {
            content = <components.text value={data} block={block} />;
          }
          break;

        case "select":
        // intentional fallthrough
        case "multi_select":
          const values = (data?.[0][0] || "").split(",");

          content = values.map((value, index) => {
            const option = schema.options?.find(
              (option) => value === option.value
            );
            const color = option?.color;

            return (
              <div
                key={index}
                className={cs(
                  `notion-property-${schema.type}-item`,
                  color && `notion-item-${color}`
                )}
              >
                {value}
              </div>
            );
          });
          break;

        case "person":
          content = <components.text value={data} block={block} />;
          break;

        case "file":
          // TODO: assets should be previewable via image-zoom
          const files = data
            ?.filter((v) => v.length === 2)
            .map((f) => f.flat().flat());

          content =
            block &&
            files?.map((file, i) => (
              <components.link
                key={i}
                className="notion-property-file"
                href={mapImageUrl(file[2] as string, block)}
                target="_blank"
                rel="noreferrer noopener"
              >
                <components.image
                  alt={file[0] as string}
                  src={mapImageUrl(file[2] as string, block)}
                  loading="lazy"
                />
              </components.link>
            ));

          break;

        case "checkbox":
          const isChecked = data && data[0][0] === "Yes";

          return <Checkbox isChecked={isChecked ?? false} />;

        case "url":
          // TODO: refactor to less hackyh solution
          const d = JSON.parse(JSON.stringify(data));

          if (inline) {
            try {
              const url = new URL(d[0][0]);
              d[0][0] = url.hostname.replace(/^www\./, "");
            } catch (err) {
              // ignore invalid urls
            }
          }

          content = (
            <components.text
              value={d}
              block={block}
              inline={inline}
              linkProps={{
                target: "_blank",
                rel: "noreferrer noopener",
              }}
            />
          );
          break;

        case "email":
          content = (
            <components.text value={data} linkProtocol="mailto" block={block} />
          );
          break;

        case "phone_number":
          content = (
            <components.text value={data} linkProtocol="tel" block={block} />
          );
          break;

        case "number":
          const value = parseFloat(data?.[0][0] || "0");
          let breakEarly = false;
          let output = "";

          if (isNaN(value)) {
            content = <components.text value={data} block={block} />;
          } else {
            switch (schema.number_format) {
              case "number_with_commas":
                output = formatNumber()(value);
                break;
              case "percent":
                output = formatNumber({ suffix: "%" })(value * 100);
                break;
              case "dollar":
                output = formatNumber({ prefix: "$", round: 2, padRight: 2 })(
                  value
                );
                break;
              case "euro":
                output = formatNumber({ prefix: "???", round: 2, padRight: 2 })(
                  value
                );
                break;
              case "pound":
                output = formatNumber({ prefix: "??", round: 2, padRight: 2 })(
                  value
                );
                break;
              case "yen":
                output = formatNumber({ prefix: "??", round: 0 })(value);
                break;
              case "rupee":
                output = formatNumber({ prefix: "???", round: 2, padRight: 2 })(
                  value
                );
                break;
              case "won":
                output = formatNumber({ prefix: "???", round: 0 })(value);
                break;
              case "yuan":
                output = formatNumber({ prefix: "CN??", round: 2, padRight: 2 })(
                  value
                );
                break;
              default:
                content = <components.text value={data} block={block} />;
                breakEarly = true;
                break;
            }

            if (!breakEarly) {
              content = <components.text value={[[output]]} block={block} />;
            }
          }

          break;

        case "created_time":
          content = format(
            new Date(block?.created_time || ""),
            "MMM d, YYY hh:mm aa"
          );
          break;

        case "last_edited_time":
          content = format(
            new Date(block?.last_edited_time || ""),
            "MMM d, YYY hh:mm aa"
          );
          break;

        case "created_by":
          break;

        case "last_edited_by":
          break;

        default:
          content = <components.text value={data} block={block} />;
          break;
      }
    }

    return (
      <span className={`notion-property notion-property-${schema.type}`}>
        {content}
      </span>
    );
  }

  return null;
};

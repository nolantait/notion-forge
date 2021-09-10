import React from "react";
import formatNumber from "format-number";
import { format } from "date-fns";
import { cs } from "../utils";
import { Checkbox } from "./checkbox";
import { useNotionContext } from "../context";
import { evalFormula } from "../eval-formula";
import { GracefulImage } from "./graceful-image";
/**
 * Renders a single value of structured Notion data according to its schema.
 *
 * This corresponds to rendering the content of a single cell in a table.
 * Property rendering is re-used across all the different types of collection views.
 */
export var Property = function (_a) {
    var schema = _a.schema, data = _a.data, block = _a.block, collection = _a.collection, _b = _a.inline, inline = _b === void 0 ? false : _b;
    var _c = useNotionContext(), components = _c.components, mapImageUrl = _c.mapImageUrl, mapPageUrl = _c.mapPageUrl;
    if (schema) {
        var content = null;
        if (data ||
            schema.type === "checkbox" ||
            schema.type === "title" ||
            schema.type === "formula" ||
            schema.type === "created_by" ||
            schema.type === "last_edited_by" ||
            schema.type === "created_time" ||
            schema.type === "last_edited_time") {
            switch (schema.type) {
                case "relation":
                    // console.log('relation', schema, data)
                    content = React.createElement(components.text, { value: data, block: block });
                    break;
                case "formula":
                    // TODO
                    // console.log('formula', schema.formula, {
                    //   schema: collection?.schema,
                    //   properties: block?.properties
                    // })
                    try {
                        content = evalFormula(schema.formula, {
                            schema: collection === null || collection === void 0 ? void 0 : collection.schema,
                            properties: block === null || block === void 0 ? void 0 : block.properties
                        });
                        if (isNaN(content)) {
                            console.log("NaN", schema.formula);
                        }
                        if (content instanceof Date) {
                            content = format(content, "MMM d, YYY hh:mm aa");
                        }
                    }
                    catch (err) {
                        // console.log('error evaluating formula', schema.formula, err)
                        content = null;
                    }
                    break;
                case "title":
                    if (block) {
                        content = (React.createElement(components.pageLink, { className: cs("notion-page-link"), href: mapPageUrl(block.id) },
                            React.createElement(components.pageTitle, { block: block })));
                    }
                    else {
                        content = React.createElement(components.text, { value: data, block: block });
                    }
                    break;
                case "select":
                // intentional fallthrough
                case "multi_select":
                    var values = (data[0][0] || "").split(",");
                    content = values.map(function (value, index) {
                        var _a;
                        var option = (_a = schema.options) === null || _a === void 0 ? void 0 : _a.find(function (option) { return value === option.value; });
                        var color = option === null || option === void 0 ? void 0 : option.color;
                        return (React.createElement("div", { key: index, className: cs("notion-property-" + schema.type + "-item", color && "notion-item-" + color) }, value));
                    });
                    break;
                case "person":
                    // console.log('person', schema, data)
                    content = React.createElement(components.text, { value: data, block: block });
                    break;
                case "file":
                    // TODO: assets should be previewable via image-zoom
                    var files = data
                        .filter(function (v) { return v.length === 2; })
                        .map(function (f) { return f.flat().flat(); });
                    content = files.map(function (file, i) { return (React.createElement(components.link, { key: i, className: "notion-property-file", href: mapImageUrl(file[2], block), target: "_blank", rel: "noreferrer noopener" },
                        React.createElement(GracefulImage, { alt: file[0], src: mapImageUrl(file[2], block), loading: "lazy" }))); });
                    break;
                case "checkbox":
                    var isChecked = data && data[0][0] === "Yes";
                    return React.createElement(Checkbox, { isChecked: isChecked });
                case "url":
                    // TODO: refactor to less hackyh solution
                    var d = JSON.parse(JSON.stringify(data));
                    if (inline) {
                        try {
                            var url = new URL(d[0][0]);
                            d[0][0] = url.hostname.replace(/^www\./, "");
                        }
                        catch (err) {
                            // ignore invalid urls
                        }
                    }
                    content = (React.createElement(components.text, { value: d, block: block, inline: inline, linkProps: {
                            target: "_blank",
                            rel: "noreferrer noopener"
                        } }));
                    break;
                case "email":
                    content = (React.createElement(components.text, { value: data, linkProtocol: "mailto", block: block }));
                    break;
                case "phone_number":
                    content = (React.createElement(components.text, { value: data, linkProtocol: "tel", block: block }));
                    break;
                case "number":
                    var value = parseFloat(data[0][0] || "0");
                    var breakEarly = false;
                    var output = "";
                    if (isNaN(value)) {
                        content = React.createElement(components.text, { value: data, block: block });
                    }
                    else {
                        switch (schema.number_format) {
                            case "number_with_commas":
                                output = formatNumber()(value);
                                break;
                            case "percent":
                                output = formatNumber({ suffix: "%" })(value * 100);
                                break;
                            case "dollar":
                                output = formatNumber({ prefix: "$", round: 2, padRight: 2 })(value);
                                break;
                            case "euro":
                                output = formatNumber({ prefix: "€", round: 2, padRight: 2 })(value);
                                break;
                            case "pound":
                                output = formatNumber({ prefix: "£", round: 2, padRight: 2 })(value);
                                break;
                            case "yen":
                                output = formatNumber({ prefix: "¥", round: 0 })(value);
                                break;
                            case "rupee":
                                output = formatNumber({ prefix: "₹", round: 2, padRight: 2 })(value);
                                break;
                            case "won":
                                output = formatNumber({ prefix: "₩", round: 0 })(value);
                                break;
                            case "yuan":
                                output = formatNumber({ prefix: "CN¥", round: 2, padRight: 2 })(value);
                                break;
                            default:
                                content = React.createElement(components.text, { value: data, block: block });
                                breakEarly = true;
                                break;
                        }
                        if (!breakEarly) {
                            content = React.createElement(components.text, { value: [[output]], block: block });
                        }
                    }
                    break;
                case "created_time":
                    content = format(new Date(block.created_time), "MMM d, YYY hh:mm aa");
                    break;
                case "last_edited_time":
                    content = format(new Date(block.last_edited_time), "MMM d, YYY hh:mm aa");
                    break;
                case "created_by":
                    console.log("created_by", schema, data);
                    break;
                case "last_edited_by":
                    console.log("last_edited_by", schema, data);
                    break;
                default:
                    content = React.createElement(components.text, { value: data, block: block });
                    break;
            }
        }
        return (React.createElement("span", { className: "notion-property notion-property-" + schema.type }, content));
    }
    return null;
};
//# sourceMappingURL=property.js.map
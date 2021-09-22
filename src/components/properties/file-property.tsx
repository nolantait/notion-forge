import React from "react";

import { Components } from "@types";
import { Props as PropertyProps } from "../property";
import { useNotionContext } from "@context";

export type Props = Required<Pick<PropertyProps, "data" | "block">>;

export const Property: Components.Presenter<Props> = ({ data, block }) => {
  // TODO: assets should be previewable via image-zoom
  const { components, mapImageUrl } = useNotionContext();
  const files =
    data.asDecoration
      .filter((decoration) => decoration.length === 2)
      .map((filename) => filename.flat().flat()) ?? [];

  const fileLinks = files.map((file, i) => (
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

  return <>{fileLinks}</>;
};

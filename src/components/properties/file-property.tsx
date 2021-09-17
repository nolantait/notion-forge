import React from "react";

import { PropertyProps } from "@types";
import { useNotionContext } from "@context";

interface FilePropertyProps
  extends Required<Pick<PropertyProps, "data" | "block">> {}

export const FileProperty = ({
  data,
  block,
}: FilePropertyProps): React.ReactElement => {
  // TODO: assets should be previewable via image-zoom
  const { components, mapImageUrl } = useNotionContext();
  const files =
    data
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

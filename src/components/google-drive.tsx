import React from "react";
import { formatDistance } from "date-fns";

import { useNotionContext } from "@context";
import { cs } from "@utils";
import { GoogleDriveProps } from "@types";

export const GoogleDrive = ({
  block,
  className,
}: GoogleDriveProps): JSX.Element => {
  const { components, mapImageUrl } = useNotionContext();
  const properties = block.format?.drive_properties;

  if (!properties) throw new Error(`Missing drive_properties for ${block.id}`);

  const domain = getDriveUrl(properties);
  const { url, icon, title, user_name: userName } = properties;
  const timeAgo = formatDistance(
    new Date(properties.modified_time),
    new Date()
  );

  return (
    <div className={cs("notion-google-drive", className)}>
      <components.link
        className="notion-google-drive-link"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="notion-google-drive-preview">
          <components.image
            src={mapImageUrl(properties.thumbnail, block)}
            alt={properties.title || "Google Drive Document"}
            loading="lazy"
          />
        </div>

        <div className="notion-google-drive-body">
          {title && (
            <div className="notion-google-drive-body-title">{title}</div>
          )}

          {properties.modified_time && (
            <div className="notion-google-drive-body-modified-time">
              Last modified {userName ? `by ${userName} ` : ""}
              {timeAgo} ago
            </div>
          )}

          {icon && domain && (
            <div className="notion-google-drive-body-source">
              {properties.icon && (
                <div
                  className="notion-google-drive-body-source-icon"
                  style={{
                    backgroundImage: `url(${icon})`,
                  }}
                />
              )}

              {domain && (
                <div className="notion-google-drive-body-source-domain">
                  {domain}
                </div>
              )}
            </div>
          )}
        </div>
      </components.link>
    </div>
  );
};

const getDriveUrl = (properties: Record<"url", string>): string | null => {
  try {
    const url = new URL(properties.url);
    return url.hostname;
  } catch (err) {
    return null;
  }
};

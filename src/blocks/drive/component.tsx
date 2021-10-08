import React from "react";
import { formatDistance } from "date-fns";

import { useNotionContext } from "@context";
import { cs } from "@utils";
import { View } from "@types";
import { Entity as DriveBlock } from "./";
import { Link } from "@components";

export type Props = {
  block: DriveBlock;
  className?: string;
};

export const DriveComponent: View.Component<Props> = ({ block, className }) => {
  const { components, recordMap } = useNotionContext();
  const properties = block.driveProperties;

  if (!properties) throw new Error(`Missing drive_properties for ${block.id}`);

  const unwrapped = properties.getOrElse({
    url: "",
    icon: "",
    title: "",
    user_name: "",
    modified_time: Date.now(),
    thumbnail: "",
  });
  const domain = getDriveUrl(unwrapped);
  const { url, icon, title, user_name: userName } = unwrapped;
  const timeAgo = formatDistance(new Date(unwrapped.modified_time), new Date());
  const style = cs("notion-google-drive", className);
  const src = recordMap.mapImageUrl(unwrapped.thumbnail, block);
  const alt = unwrapped.title || "Google Drive Document";

  return (
    <div className={style}>
      <Link
        className="notion-google-drive-link"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="notion-google-drive-preview">
          <components.image src={src} alt={alt} loading="lazy" />
        </div>

        <div className="notion-google-drive-body">
          {title && (
            <div className="notion-google-drive-body-title">{title}</div>
          )}

          {unwrapped.modified_time && (
            <div className="notion-google-drive-body-modified-time">
              Last modified {userName ? `by ${userName} ` : ""}
              {timeAgo} ago
            </div>
          )}

          {icon && domain && (
            <div className="notion-google-drive-body-source">
              {unwrapped.icon && (
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
      </Link>
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

import React from "react";
import { UserFormat, Block } from "notion-types";
import { useNotionContext } from "../../context";

export const FormatUser = (
  decorator: UserFormat,
  block: Block
): React.ReactNode => {
  const { components, recordMap, mapImageUrl } = useNotionContext();
  const userId = decorator[1];
  const user = recordMap.notion_user[userId]?.value;

  if (!user) {
    console.log("missing user", userId);
    return null;
  }

  const name = [user.given_name, user.family_name].filter(Boolean).join(" ");

  return (
    <components.image
      className="notion-user"
      src={mapImageUrl(user.profile_photo, block)}
      alt={name}
    />
  );
};

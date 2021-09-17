import React from "react";

import { DecoratedUserProps } from "@types";
import { useNotionContext } from "@context";

// ['u', 'user-uuid']
export const DecoratedUser = ({
  decoration,
  block,
}: DecoratedUserProps): React.ReactElement => {
  const { components, recordMap, mapImageUrl } = useNotionContext();
  const userId = decoration[1];
  const user = recordMap.notion_user[userId]?.value;

  if (!user) {
    throw new Error(`Missing user id for user decoration with id ${userId}`);
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

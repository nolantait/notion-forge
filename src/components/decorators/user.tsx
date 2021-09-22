import React from "react";

import { Formats, Components } from "@types";
import { useNotionContext } from "@context";
import { Block } from "@entities";

export type Props = {
  decoration: Formats.UserFormat;
  block: Block;
};

// ['u', 'user-uuid']
export const Decorator: Components.Presenter<Props> = ({
  decoration,
  block,
}) => {
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

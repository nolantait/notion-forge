import React from "react";

import { Formats, Components } from "@types";
import { useNotionContext } from "@context";
import { Block } from "@entities";

export type Props = {
  decoration: Formats.UserFormat;
  block: Block;
};

// ['u', 'user-uuid']
export const UserDecorator: Components.Presenter<Props> = ({
  decoration,
  block,
}) => {
  const { components, recordMap } = useNotionContext();
  const userId = decoration[1];
  const user = recordMap.findUser(userId).getOrElse(undefined);

  if (!user) {
    throw new Error(`Missing user id for user decoration with id ${userId}`);
  }

  const { name } = user;
  const signedUrl = recordMap.getSignedUrl(user.profilePhoto);

  return (
    <components.image
      className="notion-user"
      src={mapImageUrl(user.profile_photo, block)}
      alt={name}
    />
  );
};

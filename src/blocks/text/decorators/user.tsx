import React from "react";

import { View, Api } from "@types";
import { useNotionContext } from "@context";

export type Props = {
  decoration: Api.Formats.UserFormat;
};

// ['u', 'user-uuid']
export const UserDecorator: View.Component<Props> = ({ decoration }) => {
  const { components, recordMap } = useNotionContext();
  const userId = decoration[1];
  const user = recordMap.findUser(userId).getOrElse(undefined);

  if (!user) {
    throw new Error(`Missing user id for user decoration with id ${userId}`);
  }

  const { name } = user;
  const signedUrl = recordMap
    .getSignedUrl(user.profilePhoto)
    .getOrElse({ href: "#" });

  return (
    <components.image className="notion-user" src={signedUrl.href} alt={name} />
  );
};

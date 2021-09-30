import React from "react";

import { cs } from "@utils";
import { DefaultPageIcon } from "@icons";
import { useNotionContext } from "@context";
import { Components } from "@types";
import { Icon, Decorated } from "@entities";
import { Page } from "@blocks";

export type Props = {
  block: Page.Entity;
  className?: string;
  defaultIcon?: string | null;
  hideDefaultIcon?: boolean;
};

export const Component: Components.Presenter<Props> = ({
  block,
  className,
  defaultIcon = null,
  hideDefaultIcon = false,
}) => {
  const altIcon = new Icon(defaultIcon ?? "");
  const icon = block.pageIcon.getOrElse(altIcon);

  if (hideDefaultIcon) return <EmptyIcon />;

  const iconStyle = cs(className, "notion-page-icon");
  const alt = block.title.getOrElse(Decorated.fromString("Page")).asString;

  switch (icon.type) {
    case "empty":
      return <EmptyIcon />;
    case "url":
      return (
        <ImageIcon
          {...{ block, iconUrl: icon.path, alt, iconStyle: className }}
        />
      );
    case "text":
      return <TextIcon icon={icon.path} className={iconStyle} />;
    default:
      return <DefaultPageIcon className={iconStyle} alt={alt} />;
  }
};

type ImageIconProps = Pick<Props, "block"> & {
  alt: string;
  iconUrl: string;
  className?: string;
};

const ImageIcon: Components.Presenter<ImageIconProps> = ({
  block,
  iconUrl,
  alt,
  className,
}) => {
  const { recordMap, components } = useNotionContext();
  const mappedUrl = recordMap.mapImageUrl(iconUrl, block.dto);

  return (
    <components.image
      className={className}
      src={mappedUrl}
      alt={alt}
      loading="lazy"
    />
  );
};

const EmptyIcon = (): React.ReactElement => {
  return <></>;
};

type TextIconProps = {
  icon: string;
  className?: string;
};

const TextIcon: Components.Presenter<TextIconProps> = ({ icon, className }) => {
  return (
    <span className={className} role="img" aria-label={icon}>
      {icon}
    </span>
  );
};

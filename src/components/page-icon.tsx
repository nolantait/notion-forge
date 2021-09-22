import React from "react";

import { cs, isUrl } from "@utils";
import { DefaultPageIcon } from "@icons";
import { useNotionContext } from "@context";
import { Components } from "@types";
import { Decorated, PageBlock } from "@entities";

export type Props = {
  block: PageBlock;
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
  if (hideDefaultIcon) return <EmptyIcon />;

  const icon = block.pageIcon.length ? block.pageIcon : defaultIcon;

  if (!icon) return <EmptyIcon />;

  const { title } = block;
  const iconStyle = cs(className, "notion-page-icon");

  if (isUrl(icon)) {
    return (
      <ImageIcon {...{ block, iconUrl: icon, title, iconStyle: className }} />
    );
  } else {
    const iconValue = icon.trim();

    if (!iconValue) {
      return (
        <DefaultPageIcon className={iconStyle} alt={title ? title : "Page"} />
      );
    }

    return <TextIcon icon={icon} className={iconStyle} />;
  }
};

type ImageIconProps = Pick<Props, "block"> & {
  title: Decorated;
  iconUrl: string;
  className?: string;
};

const ImageIcon: Components.Presenter<ImageIconProps> = ({
  block,
  iconUrl,
  title,
  className,
}) => {
  const { mapImageUrl, components } = useNotionContext();
  const mappedUrl = mapImageUrl(iconUrl, block);
  const altText = title ? title : "Icon";

  return (
    <components.image
      className={className}
      src={mappedUrl}
      alt={altText}
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

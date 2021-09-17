import React from "react";

import { cs, isUrl, getBlockIcon, getBlockTitle } from "@utils";
import { DefaultPageIcon } from "@icons";
import { useNotionContext } from "@context";
import { Presenter, PageIconProps, PageIconPresenter } from "@types";

interface ImageIconProps extends Pick<PageIconProps, "block"> {
  title: string | null;
  iconUrl: string;
  className?: string;
}

interface TextIconProps {
  icon: string;
  className?: string;
}

export const PageIcon: PageIconPresenter = ({
  block,
  className,
  defaultIcon = null,
  hideDefaultIcon = false,
}) => {
  if (hideDefaultIcon) return <EmptyIcon />;

  const { recordMap } = useNotionContext();
  const icon = getBlockIcon(block, recordMap) ?? defaultIcon;

  if (!icon) return <EmptyIcon />;

  const title = getBlockTitle(block, recordMap);
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

const ImageIcon: Presenter<ImageIconProps> = ({
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

const TextIcon: Presenter<TextIconProps> = ({ icon, className }) => {
  return (
    <span className={className} role="img" aria-label={icon}>
      {icon}
    </span>
  );
};

import React, { useCallback, SetStateAction, Dispatch } from "react";
import { getTextContent } from "notion-utils";
import { useLocalStorage } from "react-use";
import Dropdown from "rc-dropdown";
import Menu, { Item as MenuItem } from "rc-menu";

import { CollectionViewIcon } from "../icons/collection-view-icon";
import { ChevronDownIcon } from "../icons/chevron-down-icon";
import { useNotionContext } from "@context";
import { cs } from "@utils";

import { CollectionViewBlock, CollectionViewPageBlock, CollectionView } from "@types"

const triggers = ["click"];

type CollectionBlock = CollectionViewBlock | CollectionViewPageBlock

interface CollectionProps {
  block: CollectionViewBlock | CollectionViewPageBlock
  className?: string
}

export const Collection = ({ block, className }: CollectionProps) => {
  const { recordMap, components } =
    useNotionContext();
  const { collection_id: collectionId, view_ids: viewIds } = block;

  const [collectionState, setCollectionState] = useLocalStorage(block.id, {
    collectionViewId: viewIds[0],
  });

  const currentViewId =
    viewIds.find((id) => id === collectionState?.collectionViewId) ||
    viewIds[0];

  const collection = recordMap.collection[collectionId]?.value;
  const currentView = recordMap.collection_view[currentViewId]?.value;
  const currentViewData =
    recordMap.collection_query[collectionId]?.[currentViewId];

  const isValidCollection = collection && currentView && currentViewData

  if (!isValidCollection) {
    throw new Error(`Invalid collection ${collection}`)
  }

  const title = getTextContent(collection.name).trim();
  if (collection.icon) {
    block.format = {
      ...block.format,
      page_icon: collection.icon,
    };
  }

  const containerStyle = cs("notion-collection", className)

  return (
    <div className={containerStyle}>
      <CollectionHeader {...{title, block, viewIds, currentViewId, collectionState, setCollectionState}} />
      

      <components.collectionView
        collection={collection}
        collectionView={currentView}
        collectionData={currentViewData}
      />
    </div>
  );
};

interface CollectionHeaderProps {
  title?: string
  block: CollectionBlock
  viewIds: Array<string>
  collectionState: Record<string, any>
  setCollectionState: Dispatch<SetStateAction<Record<string, any>>>
  currentViewId: string
}

const CollectionHeader = (props: CollectionHeaderProps) => {
  const { components, showCollectionViewDropdown } = useNotionContext()
  const { title, block, viewIds, collectionState, setCollectionState, currentViewId } = props


  return (
    <div className="notion-collection-header">
      {title && (
        <div className="notion-collection-header-title">
          <>
            <components.pageIcon
              block={block}
              className="notion-page-title-icon"
              hideDefaultIcon
            />
            {title}
          </>
        </div>
      )}

      {viewIds.length > 1 && showCollectionViewDropdown && (
        <CollectionViewDropdown {...{onChangeView, viewIds, currentViewId}}/>
      )}
    </div>
  )
}

interface CollectionViewDropdown {
  onChangeView: () => void
  viewIds: Array<string>
  currentViewId: string
}

const CollectionViewDropdown = (props: CollectionViewDropdown) => {
  const { recordMap } = useNotionContext()
  const { onChangeView, viewIds, currentViewId } = props
  const collectionView = recordMap.collection_view[currentViewId]?.value;

  return(
    <Dropdown
      trigger={triggers}
      overlay={<CollectionViewMenu {...{onChangeView, viewIds}} />}
      animation="slide-up"
    >
      <CollectionViewColumnDesc
        className="notion-collection-view-dropdown"
        collectionView={collectionView}
      >
        <ChevronDownIcon className="notion-collection-view-dropdown-icon" />
      </CollectionViewColumnDesc>
    </Dropdown>
  )
}

interface CollectionViewMenuProps {
  onChangeView: () => void
  viewIds: Array<string>
}

const CollectionViewMenu = (props: CollectionViewMenuProps) => {
  const { recordMap } = useNotionContext()
  const { viewIds } = props

  // Changing the view from a collection dropdown
  const onChangeView = useCallback(
      ({ key: collectionViewId }: { key: string }) => {
      setCollectionState({
        ...collectionState,
        collectionViewId,
      });
    },
    [collectionState]
  );



  return(
    <Menu onSelect={onChangeView}>
      {viewIds.map((viewId: string) => (
        <MenuItem
          key={viewId}
          className="notion-collection-view-type-menu-item"
        >
          <CollectionViewColumnDesc
            collectionView={recordMap.collection_view[viewId]?.value}
          />
        </MenuItem>
      ))}
    </Menu>
  )
}

const CollectionViewColumnDesc: React.FC<{
  collectionView: CollectionView;
  className?: string;
  children?: React.ReactNode;
}> = ({ collectionView, className, children, ...rest }) => {
  const { type } = collectionView;
  const name =
    collectionView.name || `${type[0].toUpperCase()}${type.slice(1)} view`;

  return (
    <div className={cs("notion-collection-view-type", className)} {...rest}>
      <CollectionViewIcon
        className="notion-collection-view-type-icon"
        type={type}
      />

      <span className="notion-collection-view-type-title">{name}</span>

      {children}
    </div>
  );
};

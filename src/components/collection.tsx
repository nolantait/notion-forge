import React, {
  useCallback,
  SetStateAction,
  Dispatch,
  useContext,
  createContext,
} from "react";
import { useLocalStorage } from "react-use";
import Dropdown from "rc-dropdown";
import Menu, { Item as MenuItem } from "rc-menu";

import { CollectionViewIcon, ChevronDownIcon } from "@icons";
import { useNotionContext } from "@context";
import { cs, getTextContent } from "@utils";
import { CollectionPresenter } from "@types";

import { Notion } from "@types";

const triggers = ["click"];

type CollectionBlock =
  | Notion.CollectionViewBlock
  | Notion.CollectionViewPageBlock;

interface CollectionState {
  collectionViewId: string;
}

interface CollectionActions {
  collectionState?: CollectionState;
  setCollectionState?: Dispatch<SetStateAction<CollectionState | undefined>>;
}

interface CollectionViewDropdown {
  viewIds: Array<string>;
  currentViewId: string;
}

export const CollectionActionContext = createContext<CollectionActions>({});

export const Collection: CollectionPresenter = ({ block, className }) => {
  const { recordMap, components } = useNotionContext();
  const { collection_id: collectionId, view_ids: viewIds } = block;
  const defaultViewId: string | undefined = viewIds[0];

  const [collectionState, setCollectionState] = useLocalStorage(block.id, {
    collectionViewId: defaultViewId,
  });

  const currentViewId =
    viewIds.find(
      (id: string | undefined) => id === collectionState?.collectionViewId
    ) || viewIds[0];

  const collection = recordMap.collection[collectionId]?.value;
  const currentView = recordMap.collection_view[currentViewId]?.value;
  const currentViewData =
    recordMap.collection_query[collectionId]?.[currentViewId];

  const isValidCollection = collection && currentView && currentViewData;

  if (!isValidCollection) {
    throw new Error(`Invalid collection ${collection}`);
  }

  const title = getTextContent(collection.name).trim();
  if (collection.icon) {
    block.format = {
      ...block.format,
      page_icon: collection.icon,
    };
  }

  const containerStyle = cs("notion-collection", className);
  const collectionHeaderProps: CollectionHeaderProps = {
    title,
    block,
    viewIds,
    currentViewId,
  };

  return (
    <CollectionActionContext.Provider
      value={{ collectionState, setCollectionState }}
    >
      <div className={containerStyle}>
        <CollectionHeader {...collectionHeaderProps} />

        <components.collectionView
          collection={collection}
          collectionView={currentView}
          collectionData={currentViewData}
        />
      </div>
    </CollectionActionContext.Provider>
  );
};

interface CollectionHeaderProps {
  title?: string;
  block: CollectionBlock;
  viewIds: Array<string>;
  currentViewId: string;
}

const CollectionHeader = (props: CollectionHeaderProps) => {
  const { components, showCollectionViewDropdown } = useNotionContext();
  const { title, block, viewIds, currentViewId } = props;

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
        <CollectionViewDropdown {...{ viewIds, currentViewId }} />
      )}
    </div>
  );
};

const CollectionViewDropdown = (props: CollectionViewDropdown): JSX.Element => {
  const { recordMap } = useNotionContext();
  const { viewIds, currentViewId } = props;
  const collectionView = recordMap.collection_view[currentViewId]?.value;

  const collectionViewMenuProps = { viewIds };
  const collectionMenu = <CollectionViewMenu {...collectionViewMenuProps} />;

  return (
    <Dropdown trigger={triggers} overlay={collectionMenu} animation="slide-up">
      <CollectionViewColumnDesc
        className="notion-collection-view-dropdown"
        collectionView={collectionView}
      >
        <ChevronDownIcon className="notion-collection-view-dropdown-icon" />
      </CollectionViewColumnDesc>
    </Dropdown>
  );
};

interface CollectionViewMenuProps {
  viewIds: Array<string>;
}

const CollectionViewMenu = (props: CollectionViewMenuProps) => {
  const { collectionState, setCollectionState } = useContext(
    CollectionActionContext
  );
  const { recordMap } = useNotionContext();
  const { viewIds } = props;

  // Changing the view from a collection dropdown
  const onChangeView = useCallback(
    (event) => {
      const collectionViewId = event.key;

      if (!setCollectionState) return;

      setCollectionState({
        ...collectionState,
        collectionViewId,
      });
    },
    [collectionState]
  );

  return (
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
  );
};

const CollectionViewColumnDesc: React.FC<{
  collectionView: Notion.CollectionView;
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

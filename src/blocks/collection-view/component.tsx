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
import { cs } from "@utils";
import { Domain, View } from "@types";
import { Decorated } from "@entities";
import { ViewComponent } from "./view";

export type Props = {
  block:
    | Domain.Blocks.CollectionView.Entity
    | Domain.Blocks.CollectionViewPage.Entity;
  className?: string;
};

export const CollectionActionContext = createContext<CollectionActions>({});

export const CollectionViewComponent: View.Component<Props> = ({
  block,
  className,
}) => {
  const { recordMap } = useNotionContext();
  const { collectionId, viewIds } = block;
  const defaultViewId: string | undefined = viewIds[0];

  if (!defaultViewId) throw new Error(`Invalid view id for ${block.id}`);

  const [collectionState, setCollectionState] = useLocalStorage(block.id, {
    collectionViewId: defaultViewId,
  });

  const currentViewId =
    viewIds.find((id) => id === collectionState?.collectionViewId) ||
    defaultViewId;

  const collection = recordMap
    .findCollection(collectionId)
    .getOrElse(undefined);

  if (!collection) {
    throw new Error(`Missing collection ${recordMap}`);
  }

  const containerStyle = cs("notion-collection", className);
  const collectionHeaderProps: CollectionHeaderProps = {
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

        <ViewComponent block={block} viewId={currentViewId} />
      </div>
    </CollectionActionContext.Provider>
  );
};

interface CollectionState {
  collectionViewId: string;
}
interface CollectionActions {
  collectionState?: CollectionState;
  setCollectionState?: Dispatch<SetStateAction<CollectionState | undefined>>;
}

type CollectionHeaderProps = Pick<Props, "block"> & {
  viewIds: Domain.ID[];
  currentViewId: Domain.ID;
};

const CollectionHeader: View.Component<CollectionHeaderProps> = ({
  viewIds,
  currentViewId,
  block,
}) => {
  const { components, showCollectionViewDropdown } = useNotionContext();
  const title = block.title.getOrElse(Decorated.empty());

  return (
    <div className="notion-collection-header">
      {!title.length && (
        <div className="notion-collection-header-title">
          <>
            <components.pageIcon
              block={block}
              className="notion-page-title-icon"
              hideDefaultIcon
            />
            {title.asString}
          </>
        </div>
      )}

      {viewIds.length > 1 && showCollectionViewDropdown && (
        <CollectionViewDropdown {...{ block, viewIds, currentViewId }} />
      )}
    </div>
  );
};

const triggers = ["click"];

type CollectionViewDropdownProps = Omit<CollectionHeaderProps, "block">;

const CollectionViewDropdown: Components.Presenter<CollectionViewDropdownProps> =
  ({ viewIds, currentViewId }) => {
    const { recordMap } = useNotionContext();
    const collectionView = recordMap.collection_view[currentViewId]?.value;
    const collectionMenu = <CollectionViewMenu viewIds={viewIds} />;

    return (
      <Dropdown
        trigger={triggers}
        overlay={collectionMenu}
        animation="slide-up"
      >
        <CollectionViewColumnDesc
          className="notion-collection-view-dropdown"
          collectionView={collectionView}
        >
          <ChevronDownIcon className="notion-collection-view-dropdown-icon" />
        </CollectionViewColumnDesc>
      </Dropdown>
    );
  };

type CollectionViewMenuProps = Pick<CollectionHeaderProps, "viewIds">;

const CollectionViewMenu: Components.Presenter<CollectionViewMenuProps> = ({
  viewIds,
}) => {
  const { recordMap } = useNotionContext();
  const { collectionState, setCollectionState } = useContext(
    CollectionActionContext
  );

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
    [collectionState, setCollectionState]
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

type CollectionViewColumnDescProps = {
  collectionView: Collections.View;
  className?: string;
  children?: React.ReactNode;
  rest?: React.HTMLProps<HTMLDivElement>;
};

const CollectionViewColumnDesc: Components.Presenter<CollectionViewColumnDescProps> =
  ({ collectionView, className, children, rest }) => {
    const { type } = collectionView;
    const derrivedTitle = `${type[0].toUpperCase()}${type.slice(1)} view`;
    const name = collectionView.name || derrivedTitle;

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

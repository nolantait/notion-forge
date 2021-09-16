import { Notion, PropertyVisibility } from "@types";

export const filterHiddenProperties = (
  propertyIds: Notion.PropertyID[],
  visibilities: PropertyVisibility[]
): Notion.PropertyID[] => {
  return propertyIds.filter((id) => {
    findById(id, visibilities)?.visibility !== "hide";
  });
};

const findById = (
  id: string,
  visibilities: PropertyVisibility[]
): PropertyVisibility | undefined => {
  return visibilities.find(({ property }) => {
    return property === id;
  });
};

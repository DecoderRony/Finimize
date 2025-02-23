import { useLocation } from "react-router-dom";
import { sidePanelItems } from "../constants";

const getActiveItem = (urlPath: string) => {
  const itemDerivedFromPath = sidePanelItems.find((item) =>
    urlPath.substring(1).includes(item.id)
  );

  if (!itemDerivedFromPath) return sidePanelItems[0];

  return itemDerivedFromPath;
};

const useCurrentRoute = () => {
  const { pathname: urlPath } = useLocation();
  return getActiveItem(urlPath);
};

export default useCurrentRoute;

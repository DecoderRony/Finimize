import { IconType } from "react-icons";
import {
  BsCreditCard2Back,
  BsGearWideConnected,
  BsHouse,
  BsTelephone,
} from "react-icons/bs";

export interface PanelItem {
  displayName: string;
  id: string;
  icon: IconType;
  route: string;
}

export const sidePanelItems: PanelItem[] = [
  {
    displayName: "Dashboard",
    id: "dashboard",
    icon: BsHouse,
    route: "/dashboard",
  },
  {
    displayName: "Expenses",
    id: "expenses",
    icon: BsCreditCard2Back,
    route: "expenses",
  },
  {
    displayName: "Settings",
    id: "settings",
    icon: BsGearWideConnected,
    route: "settings",
  },
  {
    displayName: "Support",
    id: "support",
    icon: BsTelephone,
    route: "support",
  },
];

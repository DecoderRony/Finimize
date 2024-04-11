import { IconType } from "react-icons";
import {
  BsCreditCard2Back,
  BsGearWideConnected,
  BsHouse,
  BsTelephone,
} from "react-icons/bs";

export const DASHBOARD_ROUTE = "dashboard";
export const EXPENSES_ROUTE = "expenses";
export const SETTINGS_ROUTE = "settings";
export const SUPPORT_ROUTE = "support";
export const LOGIN_ROUTE = "login";
export const ADD_EXPENSE_ROUTE = "add-expense";

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
    route: "/",
  },
  {
    displayName: "Expenses",
    id: "expenses",
    icon: BsCreditCard2Back,
    route: EXPENSES_ROUTE,
  },
  {
    displayName: "Settings",
    id: "settings",
    icon: BsGearWideConnected,
    route: SETTINGS_ROUTE,
  },
  {
    displayName: "Support",
    id: "support",
    icon: BsTelephone,
    route: SUPPORT_ROUTE,
  },
];

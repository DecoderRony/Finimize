import { IconType } from "react-icons";
import {
  BsCreditCard2Back,
  BsGearWideConnected,
  BsHouse,
  BsTelephone,
} from "react-icons/bs";

export const DASHBOARD_ROUTE = "dashboard";
export const HOME_ROUTE = "home";
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
    displayName: "Home",
    id: "home",
    icon: BsHouse,
    route: HOME_ROUTE,
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

export const EXPENSE_CATEGORIES = [
  "Rent",
  "Travel",
  "Food",
  "Fuel",
  "Miscellaneous",
];

export const EXPENSE_ROW_HEADER = ["DETAILS", "AMOUNT", "CATEGORY"];

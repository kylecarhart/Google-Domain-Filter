import { daoFactory } from "../storageUtils";

export const OPTIONS_KEY = "options";
export const defaultValue = {
  filterListEnabled: true,
  preferenceListEnabled: true,
  filterMode: "default",
};

export default daoFactory(OPTIONS_KEY, defaultValue);

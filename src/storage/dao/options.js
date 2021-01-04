import { daoFactory } from "../storage";

export const OPTIONS_KEY = "options";
export const defaultValue = {
  filterListEnabled: true,
  preferenceListEnabled: true,
  filterMode: true,
};

export default daoFactory(OPTIONS_KEY, defaultValue);

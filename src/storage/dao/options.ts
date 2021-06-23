import { FilterMode, Options } from "../../types";
import daoFactory from "./daoFactory";

export const OPTIONS_KEY = "options";

export const defaultValue: Options = {
  filterListEnabled: true,
  preferenceListEnabled: true,
  filterMode: FilterMode.Default,
};

export default daoFactory(OPTIONS_KEY, defaultValue);

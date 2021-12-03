import { FilterMode, Options } from "../../types";
import daoFactory from "./daoFactory";

export const OPTIONS_KEY = "options";

export const defaultValue: Options = {
  filterListEnabled: true,
  preferenceListEnabled: true,
  filterMode: "default",
};

export default daoFactory(OPTIONS_KEY, defaultValue);

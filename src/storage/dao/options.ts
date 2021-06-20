import daoFactory from "./daoFactory";

export const OPTIONS_KEY = "options";

export type FilterMode = "default" | "experimental";

interface Options {
  filterListEnabled: boolean;
  preferenceListEnabled: boolean;
  filterMode: FilterMode;
}
export const defaultValue: Options = {
  filterListEnabled: true,
  preferenceListEnabled: true,
  filterMode: "default",
};

export default daoFactory(OPTIONS_KEY, defaultValue);

import { daoFactory } from "../storage";

export const FILTER_LIST_KEY = "filterList";
export const defaultValue = [];

export default daoFactory(FILTER_LIST_KEY, defaultValue);

import { DomainList } from "../../types";
import daoFactory from "./daoFactory";

export const PREFERENCE_LIST_KEY = "preferenceList";
export const defaultValue: DomainList = [];

export default daoFactory(PREFERENCE_LIST_KEY, defaultValue);

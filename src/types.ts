import { Storage } from "webextension-polyfill-ts";

/**
 * Domain
 */
export type DomainList = string[];

export type FilterMode = "default" | "experimental";

export interface Options {
  filterListEnabled: boolean;
  preferenceListEnabled: boolean;
  filterMode: FilterMode;
}

/**
 * Utility
 */

/**
 * Storage
 */
export type StorageCallback = (newValue: any, oldValue: any) => void;
export type StorageListenerOnChanged = (
  changes: {
    [s: string]: Storage.StorageChange;
  },
  areaName: string
) => void;

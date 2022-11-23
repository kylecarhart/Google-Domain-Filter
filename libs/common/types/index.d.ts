/**
 * Domain
 */
export type Domain = string;
export type DomainListType = "filterList" | "preferenceList";

export type FilterMode = "default" | "experimental";
export interface AppOptions {
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

/**
 * UI
 */

export interface DropdownOption {
  text: string;
  onClick: () => void;
}

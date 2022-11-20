/**
 * Domain
 */
export type Domain = string;

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

/**
 * UI
 */

export interface DropdownOption {
  text: string;
  onClick: () => void;
}

/**
 * Domain
 */
export type DomainList = string[];

export enum FilterMode {
  Default = "default",
  Experimental = "experimental",
}

export interface Options {
  filterListEnabled: boolean;
  preferenceListEnabled: boolean;
  filterMode: FilterMode;
}

/**
 * Utility
 */

import { Domain } from "@common/types";

/**
 * Converts an array of domain strings into a single exclusion domain query string.
 */
export function toExcludeQuery(domains: Domain[]) {
  return domains.map((domain) => `-site:${domain}`).join(" ");
}

/**
 * Converts an array of domain strings into a single inclusion domain query string.
 */
export function toIncludeQuery(domains: Domain[]) {
  return domains.map((domain) => `+site:${domain}`).join(" ");
}

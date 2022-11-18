import { DomainList } from "@globalTypes";

/**
 * Converts an array of domain strings into a single exclusion domain query string.
 */
export function toExcludeQuery(domains: DomainList) {
  return domains.map((domain) => `-site:${domain}`).join(" ");
}

/**
 * Converts an array of domain strings into a single inclusion domain query string.
 */
export function toIncludeQuery(domains: DomainList) {
  return domains.map((domain) => `+site:${domain}`).join(" ");
}

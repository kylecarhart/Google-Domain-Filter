export const EXCLUDE_QUERY = '-site';
export const INCLUDE_QUERY = '+site';

export function toExcludeQuery(domain) {
  return `${EXCLUDE_QUERY}:${domain}`;
}

export function toIncludeQuery(domain) {
  return `${INCLUDE_QUERY}:${domain}`;
}

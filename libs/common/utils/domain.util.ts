import { Domain } from "@common/types";
import validator from "validator";

// Make sure the domain is valid and isnt already in the list
export function isValidDomain(domains: Domain[], newDomain: Domain) {
  return validator.isFQDN(newDomain) && !domains.includes(newDomain);
}

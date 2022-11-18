import { DomainList, Options } from "@common/types";
import { storageFactory } from "@utils/storage.util";

// Storage keys and default values
const filterList = storageFactory("filterList", [] as DomainList);
const preferenceList = storageFactory("preferenceList", [] as DomainList);
const options = storageFactory("options", {
  filterListEnabled: true,
  preferenceListEnabled: true,
  filterMode: "default",
} as Options);

// Storage API
const storage = {
  filterList,
  preferenceList,
  options,
};

export { storage };

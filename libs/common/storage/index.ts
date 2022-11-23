import { Domain, AppOptions } from "@common/types";
import { storageFactory } from "@utils/storage.util";

// Storage keys and default values
const filterList = storageFactory("filterList", [] as Domain[]);
const preferenceList = storageFactory("preferenceList", [] as Domain[]);
const options = storageFactory("options", {
  filterListEnabled: true,
  preferenceListEnabled: true,
  filterMode: "default",
} as AppOptions);

// Storage API
const storage = {
  filterList,
  preferenceList,
  options,
};

export { storage };

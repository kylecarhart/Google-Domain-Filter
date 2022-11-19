import { Domain, Options } from "@common/types";
import { storageFactory } from "@utils/storage.util";

// Storage keys and default values
const filterList = storageFactory("filterList", [] as Domain[]);
const preferenceList = storageFactory("preferenceList", [] as Domain[]);
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

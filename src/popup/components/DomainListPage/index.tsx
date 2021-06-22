import ListPage from "./ListPage";
import storage from "../../../storage";
import { useStorage } from "../../hooks";

function FilterListPage() {
  const [domains, setDomains] = useStorage(
    storage.filterList.key,
    storage.filterList.defaultValue
  );
  return <ListPage domains={domains} setDomains={setDomains} />;
}

function PreferenceListPage() {
  const [domains, setDomains] = useStorage(
    storage.preferenceList.key,
    storage.preferenceList.defaultValue
  );
  return <ListPage domains={domains} setDomains={setDomains} />;
}

export { FilterListPage, PreferenceListPage };

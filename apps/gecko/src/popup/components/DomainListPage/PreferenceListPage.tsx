import { storage } from "libs/common/storage";
import { useStorage } from "@ui/hooks";
import ListPage from "./ListPage";

export default function PreferenceListPage() {
  const [domains, setDomains] = useStorage(
    storage.preferenceList.key,
    storage.preferenceList.defaultValue
  );
  return <ListPage domains={domains} setDomains={setDomains} />;
}

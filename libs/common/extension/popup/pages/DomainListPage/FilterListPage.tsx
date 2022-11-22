import { storage } from "@common/storage";
import { useStorage } from "@ui/hooks";
import ListPage from "./ListPage";

export default function FilterListPage() {
  const [domains, setDomains] = useStorage(
    storage.filterList.key,
    storage.filterList.defaultValue
  );
  return <ListPage domains={domains} setDomains={setDomains} />;
}

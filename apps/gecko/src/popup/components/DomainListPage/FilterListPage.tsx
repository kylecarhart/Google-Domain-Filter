import { storage } from "@/libs/common/storage";
import { useStorage } from "../../hooks";
import ListPage from "./ListPage";

export default function FilterListPage() {
  const [domains, setDomains] = useStorage(
    storage.filterList.key,
    storage.filterList.defaultValue
  );
  return <ListPage domains={domains} setDomains={setDomains} />;
}

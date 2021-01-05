import React from "react";
import ListPage from "./ListPage";
import storage from "../../../storage";

function FilterListPage() {
  const [domains, setDomains] = storage.filterList.useHook();
  return <ListPage domains={domains} setDomains={setDomains} />;
}

function PreferenceListPage() {
  const [domains, setDomains] = storage.preferenceList.useHook();
  return <ListPage domains={domains} setDomains={setDomains} />;
}

export { FilterListPage, PreferenceListPage };

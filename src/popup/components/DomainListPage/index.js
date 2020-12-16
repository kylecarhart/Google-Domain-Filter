import React from "react";
import ListPage from "./ListPage";

function FilterListPage() {
  return <ListPage storageKey="filterList" />;
}

function PreferenceListPage() {
  return <ListPage storageKey="preferenceList" />;
}

export { FilterListPage, PreferenceListPage };

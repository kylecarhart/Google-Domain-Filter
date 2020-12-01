import React from "react";
import ListPage from "./ListPage";

function FilterListPage() {
  return <ListPage storageKey="filterList" isListAutoSorted={true} />;
}

function PreferenceListPage() {
  return <ListPage storageKey="preferenceList" isListAutoSorted={false} />;
}

export { FilterListPage, PreferenceListPage };

import React from "react";
import ListPage from "./ListPage";

function FilterListPage() {
  return <ListPage storageKey="filterList" isListAutoSorted={true} />;
}

FilterListPage.propTypes = {};

export default FilterListPage;

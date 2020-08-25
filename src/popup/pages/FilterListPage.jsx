import React from 'react';
import ListPage from './ListPage';

function FilterListPage() {
  return <ListPage storageKey="filterList" isDragDisabled={true} />;
}

FilterListPage.propTypes = {};

export default FilterListPage;

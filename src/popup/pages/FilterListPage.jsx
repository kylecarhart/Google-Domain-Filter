import React from 'react';
import ListPage from './ListPage';

function FilterListPage() {
  return <ListPage storageKey="filterList" isDragEnabled={false} />;
}

FilterListPage.propTypes = {};

export default FilterListPage;

import React from 'react';
import ListPage from './ListPage';

function PreferenceListPage() {
  return <ListPage storageKey="preferenceList" isDragEnabled={true} />;
}

PreferenceListPage.propTypes = {};

export default PreferenceListPage;

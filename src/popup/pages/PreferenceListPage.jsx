import React from 'react';
import ListPage from './ListPage';

function PreferenceListPage() {
  return <ListPage storageKey="preferenceList" isDragDisabled={false} />;
}

PreferenceListPage.propTypes = {};

export default PreferenceListPage;

import React from 'react';
import ListPage from './ListPage';

function PreferenceListPage() {
  return <ListPage storageKey="preferenceList" isListAutoSorted={false} />;
}

PreferenceListPage.propTypes = {};

export default PreferenceListPage;

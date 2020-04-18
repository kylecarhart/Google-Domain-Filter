import React, { useState } from 'react';
import DomainsPage from './pages/DomainsPage';
import InfoPage from './pages/InfoPage';

export default function App() {
  const [page, setPage] = useState('DomainsPage');

  switch (page) {
    case 'DomainsPage':
      return <DomainsPage setPage={setPage} />;
    case 'InfoPage':
      return <InfoPage setPage={setPage} />;
    default:
      return <div>Default Page</div>;
  }
}

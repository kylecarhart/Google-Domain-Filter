import React from 'react';
import PropTypes from 'prop-types';
import { useStorage } from '../hooks';
import validator from 'validator';
import { DomainInputBar } from '../components/input';
import { List } from '../components/list';
import styled from 'styled-components';

function ListPage({ storageKey, isDragEnabled }) {
  const [filterList, setFilterList] = useStorage(storageKey, []);

  const domainIsValid = (domain) => {
    if (!filterList.includes(domain) && validator.isFQDN(domain)) {
      return true;
    } else {
      return false;
    }
  };

  const addDomain = (domain) => {
    if (domainIsValid(domain)) {
      return setFilterList((filterList) => {
        return [...filterList, domain];
      });
    }
  };

  const deleteDomain = (domain) => {
    setFilterList(filterList.filter((_domain) => _domain !== domain));
  };

  const editDomain = (fromDomain, toDomain) => {
    if (fromDomain === toDomain) {
      return true;
    } else if (domainIsValid(toDomain)) {
      setFilterList((filterList) => {
        return filterList.map((domain) => {
          if (domain === fromDomain) {
            return toDomain;
          } else {
            return domain;
          }
        });
      });
      return true;
    } else {
      return false;
    }
  };

  const sortDomains = () => {
    setFilterList((list) => {
      return [...list].sort(function (a, b) {
        const domainA = a.toUpperCase(); // ignore upper and lowercase
        const domainB = b.toUpperCase(); // ignore upper and lowercase
        if (domainA < domainB) {
          return -1;
        }
        if (domainA > domainB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
    });
  };

  const reorderDomains = (domain, source, destination) => {
    setFilterList((oldList) => {
      const tempList = Array.from(oldList);
      tempList.splice(source.index, 1);
      tempList.splice(destination.index, 0, domain);
      return tempList;
    });
  };

  return (
    <Page>
      <DomainInputBar addDomain={addDomain} sortDomains={sortDomains} />
      <List
        domains={filterList}
        deleteDomain={deleteDomain}
        editDomain={editDomain}
        reorderDomains={reorderDomains}
        isDragEnabled={isDragEnabled}
      />
    </Page>
  );
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

ListPage.propTypes = {
  storageKey: PropTypes.string.isRequired,
  isDragEnabled: PropTypes.bool.isRequired,
};

export default ListPage;

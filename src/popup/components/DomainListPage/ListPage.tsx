import DomainInputBar from "./DomainInputBar";
import DomainList from "./DomainList";
import styled from "styled-components";
import validator from "validator";
import { replaceStringInArray } from "../../../utils";
import { DraggableLocation } from "react-beautiful-dnd";

interface Props {
  domains: string[];
  setDomains: (value: string[] | ((val: string[]) => string[])) => void;
}

function ListPage({ domains, setDomains }: Props) {
  // Make sure the domain is valid and isnt already in the list
  function isValidDomain(domain: string) {
    return validator.isFQDN(domain) && !domains.includes(domain);
  }

  // Add domain to the top of the list if it is valid
  function addDomain(domain: string) {
    if (!isValidDomain(domain)) {
      return false;
    }

    setDomains((oldDomains) => {
      return [domain, ...oldDomains];
    });

    return true;
  }

  function deleteDomain(domain: string) {
    setDomains((oldDomains) => {
      return oldDomains.filter((_domain) => _domain !== domain);
    });
  }

  function editDomain(fromDomain: string, toDomain: string) {
    if (fromDomain === toDomain) {
      return true;
    } else if (!isValidDomain(toDomain)) {
      return false;
    }

    setDomains((domainList) => {
      const editedList = replaceStringInArray(domainList, fromDomain, toDomain);
      return editedList;
    });

    return true;
  }

  const reorderDomains = (
    domain: string,
    source: DraggableLocation,
    destination: DraggableLocation
  ) => {
    setDomains((oldList: string[]) => {
      const tempList = Array.from(oldList);
      tempList.splice(source.index, 1);
      tempList.splice(destination.index, 0, domain);
      return tempList;
    });
  };

  return (
    <Page>
      <DomainInputBar domains={domains} addDomain={addDomain} />
      <DomainList
        domains={domains}
        deleteDomain={deleteDomain}
        editDomain={editDomain}
        reorderDomains={reorderDomains}
      />
    </Page>
  );
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export default ListPage;

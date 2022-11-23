import { Domain, DomainListType } from "@common/types";
import { createContext } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../../redux/store";
import { DomainInputBar } from "./DomainInputBar";
import { DomainList } from "./DomainList";

export const DomainListContext = createContext<{
  listType: DomainListType;
  list: Domain[];
}>(null);

interface Props {
  listType: DomainListType;
}

function ListPage({ listType }: Props) {
  const domainLists = useSelector((state: RootState) => state.domainLists);
  const list = domainLists[listType];

  return (
    <Page>
      <DomainListContext.Provider value={{ listType, list }}>
        <DomainInputBar />
        <DomainList />
      </DomainListContext.Provider>
    </Page>
  );
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export default ListPage;

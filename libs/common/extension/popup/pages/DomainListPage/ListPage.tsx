import styled from "styled-components";
import { DomainInputBar } from "./DomainInputBar";
import { DomainList } from "./DomainList";

interface Props {}

function ListPage({}: Props) {
  return (
    <Page>
      <DomainInputBar />
      <DomainList />
    </Page>
  );
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export default ListPage;

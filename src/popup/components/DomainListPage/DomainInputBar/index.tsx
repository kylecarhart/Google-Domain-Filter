import DomainInput from "./DomainInput";
import styled from "styled-components";
import InputSettingsDropdown from "./InputSettingsDropdown";

interface Props {
  domains: string[];
  addDomain: (domain: string) => boolean;
}

function DomainInputBar({ domains, addDomain, ...props }: Props) {
  return (
    <StyledDomainInputBar {...props}>
      <StyledDomainInput domains={domains} addDomain={addDomain} />
      {/* <InputSettingsDropdown /> */}
    </StyledDomainInputBar>
  );
}

const StyledDomainInputBar = styled.div`
  display: flex;
`;

const StyledDomainInput = styled(DomainInput)`
  flex: 1;
`;

export default DomainInputBar;

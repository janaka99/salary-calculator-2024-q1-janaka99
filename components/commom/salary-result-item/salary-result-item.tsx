import { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
};

const SalaryResultItem = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

export default SalaryResultItem;

const Container = styled.div`
  margin-bottom: 24px;
`;

"use client";

import styled from "styled-components";

type Props = {
  leftTitle: string;
  rightTitle?: string;
};

const SalaryResultItemTitle = ({ leftTitle, rightTitle = "" }: Props) => {
  return (
    <Container>
      <Text>{leftTitle}</Text>

      <Text>{rightTitle}</Text>
    </Container>
  );
};

export default SalaryResultItemTitle;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const Text = styled.p`
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  color: #757575;
`;

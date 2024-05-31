import React from "react";
import styled from "styled-components";

type Props = {
  text: string;
  description?: string | null;
};

const InputTitle = ({ text, description = null }: Props) => {
  return (
    <Container>
      <Text>{text}</Text>
      {description && <Description>{description}</Description>}
    </Container>
  );
};

export default InputTitle;

const Container = styled.div`
  margin-bottom: 8px;
`;

const Text = styled.p`
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 4px;
`;

const Description = styled.p`
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  color: #757575;
`;

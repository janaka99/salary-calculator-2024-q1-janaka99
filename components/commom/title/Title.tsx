import styled from "styled-components";

type Props = {
  text: string;
};

const H4 = styled.h4`
  font-size: 20px;
  font-weight: 700;
  line-height: 32px;
`;

const Title = ({ text }: Props) => {
  return <H4>{text}</H4>;
};

export default Title;

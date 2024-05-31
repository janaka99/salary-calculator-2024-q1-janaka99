"use client";
import Image from "next/image";
import styled from "styled-components";

type Props = {
  onClickFunction: () => void;
  icon: string;
};

const Button = ({ onClickFunction, icon }: Props) => {
  return (
    <CloseIcon onClick={onClickFunction}>
      <Image src={icon} width={32} height={32} alt="" />
    </CloseIcon>
  );
};

export default Button;

const CloseIcon = styled.button`
  width: 32px;
  aspect-ratio: 1;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  margin-right: 16px;
`;

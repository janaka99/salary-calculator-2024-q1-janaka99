"use client";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

type Props = {
  text: string;
  onClickFunction: () => void;
  icon: string;
};

const Link = ({ text, icon, onClickFunction }: Props) => {
  return (
    <LinkBtn onClick={onClickFunction}>
      <BtnImage src={icon} width={14} height={14} alt="" />
      {text}
    </LinkBtn>
  );
};

export default Link;

const LinkBtn = styled.button`
  width: fit-content;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: #0052ea;
  padding-block: 8px;
  cursor: pointer;
`;

const BtnImage = styled(Image)`
  margin: 8px;
`;

"use client";

import styled from "styled-components";

type Props = {
  title: string;
  value: number;
  type?: "default" | "highlight";
  isNegative?: boolean;
};

const SalaryResultItemContent = ({
  title,
  value,
  type = "default",
  isNegative = false,
}: Props) => {
  function formatNumber(value: number): string {
    if (isNaN(value) || value === null || value === undefined) {
      return "0.00";
    }

    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  return (
    <Container $type={type}>
      <Text>{title}</Text>
      <Text>
        {isNegative
          ? value
            ? `- ${formatNumber(value)}`
            : `0.00`
          : formatNumber(value)}
      </Text>
    </Container>
  );
};

export default SalaryResultItemContent;

interface IContainerProps {
  $type: "default" | "highlight";
}

const Container = styled.div<IContainerProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  font-weight: 400;
  color: #000000;
  ${(props) =>
    props.$type == "highlight" &&
    `
    width: 100%;
    border-radius: 4px;
    padding:8px;
    margin-left: -8px;
    border: 0.78px solid #E0E0E0;
    box-sizing: content-box !important;
    font-weight: 600 !important;
  `}
`;

const Text = styled.p`
  font-size: 16px;
  line-height: 24px;
`;

"use client";

import styled from "styled-components";

type Props = {
  type: "number" | "text";
  name: string;
  value: number | string;
  placeholder: string;
  onChange: (name: string, value: string | number | null) => void;
  textalign?: "right" | "left";
  size: "large" | "medium" | "small";
};

const Input = ({
  type,
  value,
  name,
  placeholder,
  onChange,
  textalign = "left",
  size,
}: Props) => {
  const getWidth = () => {
    switch (size) {
      case "large":
        return "356px";
      case "medium":
        return "212px";
      case "small":
        return "136px";
      default:
        return "212px";
    }
  };

  function formatNumber(value: number | string): string | number {
    if (
      typeof value === "string" ||
      isNaN(value) ||
      value === null ||
      value === undefined
    ) {
      return value;
    }

    return new Intl.NumberFormat("en-US").format(value);
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue: string | number = value;

    if (type === "number") {
      const parsedValue = newValue.replace(/[^\d.]/g, "");
      newValue = parseFloat(parsedValue);
    }

    onChange(name, newValue);
  };

  return (
    <InputField
      value={type === "number" ? formatNumber(value) : value}
      type="text"
      name={name}
      onChange={handleInput}
      placeholder={placeholder}
      $textalign={textalign}
      $width={getWidth()}
    />
  );
};

export default Input;

interface InputFieldProps {
  $textalign: "right" | "left";
  $width: string;
}
const InputField = styled.input<InputFieldProps>`
  padding: 12px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  outline: none;
  max-width: ${(props) => props.$width};
  width: 100%;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: ${(props) => props.$textalign};
  margin-right: 8px;
`;

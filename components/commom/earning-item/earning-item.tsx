"use client";
import { useState } from "react";
import styled from "styled-components";
import Input from "../input/Input";
import Button from "../Button/Button";
import useSalaryContext from "@/context/salary-context/useSalaryContext";

type Props = {
  earningItem: IEarningItem;
};

const EarningItem = ({ earningItem }: Props) => {
  const { manageEarnings } = useSalaryContext();
  const [item, setItem] = useState<IEarningItem>(earningItem);

  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked } = e.target;

    let newValue;

    if (type === "checkbox") {
      newValue = checked;
    }

    const updatedItem = {
      ...item,
      [name]: newValue,
    };

    setItem(updatedItem);
    manageEarnings(updatedItem, "update");
  };

  const handleInputChange = (name: string, value: string | number | null) => {
    const updatedItem = {
      ...item,
      [name]: value,
    };
    setItem(updatedItem);
    manageEarnings(updatedItem, "update");
  };

  const handleRemove = () => {
    manageEarnings(item, "remove");
  };

  return (
    <Container>
      <Input
        type="text"
        value={item.name ? item.name : ""}
        onChange={handleInputChange}
        placeholder="Pay Details (Title)"
        name="name"
        size="medium"
      />
      <Input
        type="number"
        value={item.amount ? item.amount : ""}
        onChange={handleInputChange}
        placeholder="Amount"
        name="amount"
        size="small"
      />

      <CheckBox
        type="checkbox"
        id=""
        checked={item.EpfEtf}
        name="EpfEtf"
        onChange={handleCheckBox}
      />
      <Button icon="/close-icon.png" onClickFunction={handleRemove} />
      <CheckBoxTitle>EPF/ETF</CheckBoxTitle>
    </Container>
  );
};

export default EarningItem;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const CheckBox = styled.input`
  width: 16px;
  height: 16px;
  background-color: red;
  margin-right: 8px;
  &:checked {
    accent-color: #0052ea;
    border-color: #0052ea;
  }
`;

const CheckBoxTitle = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;

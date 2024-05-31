"use client";
import {
  IDeductionItem,
  SalaryContext,
} from "@/context/salary-context/salary-context";
import React, { useContext, useState } from "react";
import Input from "../input/Input";
import styled from "styled-components";
import Button from "../Button/Button";
import useSalaryContext from "@/context/salary-context/useSalaryContext";

type Props = {
  deductionItem: IDeductionItem;
};

const DeductionItem = ({ deductionItem }: Props) => {
  const { manageDeductions } = useSalaryContext();

  const [item, setItem] = useState<IDeductionItem>(deductionItem);

  const handleInputChange = (name: string, value: string | number | null) => {
    const updatedItem = {
      ...item,
      [name]: value,
    };
    setItem(updatedItem);
    manageDeductions(updatedItem, "update");
  };

  const handleRemove = () => {
    manageDeductions(item, "remove");
  };

  return (
    <Container>
      <Input
        type="text"
        value={item.name ? item.name : ""}
        onChange={handleInputChange}
        placeholder="Deductions (Title)"
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
      <Button icon="/close-icon.png" onClickFunction={handleRemove} />
    </Container>
  );
};

export default DeductionItem;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

"use client";
import EarningItem from "@/components/commom/earning-item/earning-item";
import InputTitle from "@/components/commom/input-title/input-title";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "../../../commom/Link/Link";
import useSalaryContext from "@/context/salary-context/useSalaryContext";

const Earnings = () => {
  const { earnings, addNewEarning } = useSalaryContext();
  const [earningsList, setEarningsList] = useState<IEarningItem[]>([]);

  useEffect(() => {
    setEarningsList(earnings);
  }, [earnings]);

  return (
    <div>
      <InputTitle
        text="Earnings"
        description="Allowance, Fixed Allowance, Bonus and etc."
      />

      {earningsList?.map((earningItem: IEarningItem) => (
        <EarningItem key={earningItem.id} earningItem={earningItem} />
      ))}

      <Link
        text="Add New Allowance"
        icon="/add-icon.png"
        onClickFunction={addNewEarning}
      />
      <Hr />
    </div>
  );
};

export default Earnings;

const Hr = styled.hr`
  width: 100%;
  border: 0;
  height: 1px;
  margin-top: 8px;
  background-color: #e0e0e0;
`;

"use client";

import Link from "@/components/commom/Link/Link";
import DeductionItem from "@/components/commom/deduction-item/deduction-item";
import InputTitle from "@/components/commom/input-title/input-title";
import useSalaryContext from "@/context/salary-context/useSalaryContext";
import { useEffect, useState } from "react";

const Deductions = () => {
  const { deductions, addNewDeduction } = useSalaryContext();
  const [deductionsList, setDeductionsList] = useState<IDeductionItem[]>([]);

  useEffect(() => {
    setDeductionsList(deductions);
  }, [deductions]);

  return (
    <div>
      <InputTitle
        text="Deductions"
        description="Salary Advances, Loan Deductions and all"
      />
      {deductionsList?.map((deductionItem: IDeductionItem) => (
        <DeductionItem key={deductionItem.id} deductionItem={deductionItem} />
      ))}

      <Link
        text="Add New Deduction"
        icon="/add-icon.png"
        onClickFunction={addNewDeduction}
      />
    </div>
  );
};

export default Deductions;

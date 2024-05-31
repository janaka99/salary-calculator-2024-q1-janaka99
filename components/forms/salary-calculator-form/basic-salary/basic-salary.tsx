"use client";
import InputTitle from "@/components/commom/input-title/input-title";
import Input from "@/components/commom/input/Input";
import { SalaryContext } from "@/context/salary-context/salary-context";
import useSalaryContext from "@/context/salary-context/useSalaryContext";
import { useContext } from "react";

type Props = {};

const BasicSalary = (props: Props) => {
  const { basicSalary, setBaseSalary } = useSalaryContext();

  const handleBasicSalaryChange = (
    name: string,
    value: string | number | null
  ) => {
    if (typeof value == "number") {
      setBaseSalary(value);
    }
  };

  return (
    <div>
      <InputTitle text="Basic Salary" />
      <Input
        type="number"
        value={basicSalary ? basicSalary : ""}
        onChange={handleBasicSalaryChange}
        placeholder="Basic Salary"
        name="basic_salary"
        size="large"
      />
    </div>
  );
};

export default BasicSalary;

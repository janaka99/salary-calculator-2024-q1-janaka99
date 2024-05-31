"use client";
import InputTitle from "@/components/commom/input-title/input-title";
import Input from "@/components/commom/input/Input";
import useSalaryContext from "@/context/salary-context/useSalaryContext";

const BasicSalary = () => {
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

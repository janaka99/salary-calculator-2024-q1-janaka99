"use client";
import styled from "styled-components";
import BasicSalary from "./basic-salary/basic-salary";
import Earnings from "./earnings/earnings";
import Deductions from "./deductions/deductions";
import Title from "@/components/commom/title/Title";
import Link from "@/components/commom/Link/Link";
import useSalaryContext from "@/context/salary-context/useSalaryContext";

const SalaryCalculatorForm = () => {
  const { resetForm } = useSalaryContext();

  return (
    <Component>
      <TitleSection>
        <Title text="Calculate Your Salary" />
        <Link text="Reset" icon="/reset-icon.png" onClickFunction={resetForm} />
      </TitleSection>
      <BasicSalary />
      <Earnings />
      <Deductions />
    </Component>
  );
};

export default SalaryCalculatorForm;

const Component = styled.div`
  max-width: 680px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  background-color: #fafafa;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

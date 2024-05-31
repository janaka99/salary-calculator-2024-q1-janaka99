"use client";

import SalaryCalculatorForm from "@/components/forms/salary-calculator-form/salary-calculator-form";
import SalaryResult from "@/components/forms/salary-result/salary-result";
import styled from "styled-components";

export default function Home() {
  return (
    <Main>
      <Grid>
        <SalaryCalculatorForm />
        <SalaryResult />
      </Grid>
    </Main>
  );
}

const Main = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  @media (max-width: 768px) {
    padding: 5px;
  }
`;
const Grid = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 24px;
  gap: 24px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
    gap: 16px;
  }
`;

"use client";

import SalaryResultItemContent from "@/components/commom/salary-result-item-content/salary-result-item-content";
import SalaryResultItemTitle from "@/components/commom/salary-result-item-title/salary-result-item-title";
import SalaryResultItem from "@/components/commom/salary-result-item/salary-result-item";
import Title from "@/components/commom/title/Title";
import useSalaryContext from "@/context/salary-context/useSalaryContext";
import styled from "styled-components";

type Props = {};

const SalaryResult = (props: Props) => {
  const { salaryResult } = useSalaryContext();

  return (
    <Component>
      <SalaryResultItem>
        <Title text="Your Salary" />
      </SalaryResultItem>
      <SalaryResultItem>
        <SalaryResultItemTitle leftTitle="Items" rightTitle="Amount" />
        <SalaryResultItemContent
          title="Basic salary"
          value={salaryResult.basic_salary}
        />
        <SalaryResultItemContent
          title="Gross Earnings"
          value={salaryResult.gross_earnings}
        />
        <SalaryResultItemContent
          title="Gross Deduction"
          value={salaryResult.gross_deductions}
          isNegative
        />
        <SalaryResultItemContent
          title="Employee EPF (8%)"
          value={salaryResult.emp_epf_8}
          isNegative
        />
        <SalaryResultItemContent
          title="APIT"
          value={salaryResult.APIT}
          isNegative
        />
      </SalaryResultItem>
      <SalaryResultItem>
        <SalaryResultItemContent
          title="Net Salary (Take Home)"
          value={salaryResult.take_home_salary}
          type="highlight"
        />
      </SalaryResultItem>
      <SalaryResultItem>
        <SalaryResultItemTitle leftTitle="Contribution from the Employer" />

        <SalaryResultItemContent
          title="Employeer EPF (12%)"
          value={salaryResult.emp_epf_12}
        />

        <SalaryResultItemContent
          title="Employeer ETF (3%)"
          value={salaryResult.emp_etf_3}
        />
      </SalaryResultItem>

      <SalaryResultItemContent
        title="CTC (Cost to Company)"
        value={salaryResult.ctc}
      />
    </Component>
  );
};

export default SalaryResult;

const Component = styled.div`
  max-width: 480px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  padding: 24px;
  @media (max-width: 1024px) {
    max-width: 680px;
  }
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

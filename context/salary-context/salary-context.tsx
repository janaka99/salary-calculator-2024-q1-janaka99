"use client";

import React, { ReactNode, createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  calAPIT,
  calCostToCompany,
  calGrossDeductions,
  calGrossEarnings,
  calGrossSalaryForEPF,
  calTotalEarnings,
  calculateEPFandETF,
  totalEarningForEPF,
  getLocalStorageItem,
  setLocalStorageItem,
  removeLocalStorageItem,
  netSalary,
} from "./salary-cal-helper";
import { BASIC_SALARY_KEY, DEDUCTIONS_KEY, EARNINGS_KEY } from "./constants";

type Props = {
  children: ReactNode;
};

export const SalaryContext = createContext<SalaryContextType | undefined>(
  undefined
);

const SalaryState = (props: Props) => {
  const [basicSalary, setBasicSalary] = useState<number | null>(() => {
    const value = getLocalStorageItem(BASIC_SALARY_KEY, null);
    return value;
  });

  const [salaryResult, setSalaryResult] = useState<ISalaryResult>({
    basic_salary: 0,
    gross_earnings: 0,
    gross_deductions: 0,
    emp_epf_8: 0,
    APIT: 0,
    take_home_salary: 0,
    emp_epf_12: 0,
    emp_etf_3: 0,
    ctc: 0,
  });

  const [earnings, setEarnings] = useState<IEarningItem[]>(() => {
    const value = getLocalStorageItem(EARNINGS_KEY, [
      {
        name: null,
        amount: null,
        EpfEtf: false,
        id: uuidv4(),
      },
    ]);
    return value;
  });

  const [deductions, setDeductions] = useState<IDeductionItem[]>(() => {
    const value = getLocalStorageItem(DEDUCTIONS_KEY, [
      {
        id: uuidv4(),
        name: null,
        amount: null,
      },
    ]);
    return value;
  });

  /**
   * Reset the current form
   */
  const resetForm = (): void => {
    setBasicSalary(null);
    setSalaryResult({
      basic_salary: 0,
      gross_earnings: 0,
      gross_deductions: 0,
      emp_epf_8: 0,
      APIT: 0,
      take_home_salary: 0,
      emp_epf_12: 0,
      emp_etf_3: 0,
      ctc: 0,
    });
    setEarnings([
      {
        name: null,
        amount: null,
        EpfEtf: false,
        id: uuidv4(),
      },
    ]);

    setDeductions([
      {
        name: null,
        amount: null,
        id: uuidv4(),
      },
    ]);
    removeLocalStorageItem(BASIC_SALARY_KEY);
    removeLocalStorageItem(EARNINGS_KEY);
    removeLocalStorageItem(DEDUCTIONS_KEY);
  };

  const setBaseSalary = (salary: number | null) => {
    setBasicSalary(salary);
  };

  /**
   * Update and remove avaiable earnings
   * @param {IEarningItem} earning - Earning item
   * @param {string} action - Action to be take
   */
  const manageEarnings = (
    earning: IEarningItem,
    action: "update" | "remove"
  ) => {
    setEarnings((prevEarnings) => {
      switch (action) {
        case "update":
          return prevEarnings.map((item) =>
            item.id === earning.id ? earning : item
          );
        case "remove":
          return prevEarnings.filter((item) => item.id !== earning.id);
        default:
          return prevEarnings;
      }
    });
  };

  /**
   * Add new earning to the earnings
   */
  const addNewEarning = (): void => {
    const newEarning: IEarningItem = {
      id: uuidv4(),
      name: "",
      amount: 0,
      EpfEtf: false,
    };
    setEarnings((prevEarnings) => {
      return [...prevEarnings, newEarning];
    });
  };

  /**
   * Update and remove deductions earnings
   * @param {IDeductionItem} deduction - Deduction item
   * @param {string} action - Action to be take
   */
  const manageDeductions = (
    deduction: IDeductionItem,
    action: "update" | "remove"
  ) => {
    setDeductions((prevEarnings) => {
      switch (action) {
        case "update":
          return prevEarnings.map((item) =>
            item.id === deduction.id ? deduction : item
          );
        case "remove":
          return prevEarnings.filter((item) => item.id !== deduction.id);
        default:
          return prevEarnings;
      }
    });
  };

  /**
   * Add new deduction to the earnings
   */
  const addNewDeduction = (): void => {
    const newDeduction: IDeductionItem = {
      id: uuidv4(),
      name: "",
      amount: 0,
    };
    setDeductions((prevEarnings) => {
      return [...prevEarnings, newDeduction];
    });
  };

  /**
   * Calculate the results - `Basic Salary` , `Gross Earnings` , `Gross Deduction` , `Employee EPF` , `Cost to Company` and `Net Salary`
   */
  const calculateResult = () => {
    //  Get the basic salary
    let basic_salary = basicSalary ? basicSalary : 0;

    // get total earnings
    let total_earnings = calTotalEarnings(basic_salary, earnings);

    // Total  earnings that suitable for EPF
    const total_earnings_for_epf = totalEarningForEPF(basic_salary, earnings);

    // get gross reduction
    let gross_deduction = calGrossDeductions(deductions);

    // gross earnings
    let gross_earnings = calGrossEarnings(total_earnings, gross_deduction);

    // calculate gross salary for EPF
    const gross_salary_for_epf = calGrossSalaryForEPF(
      total_earnings_for_epf,
      gross_deduction
    );

    const emp_epf_8 = calculateEPFandETF(gross_salary_for_epf, 0.08);
    const emp_epf_12 = calculateEPFandETF(gross_salary_for_epf, 0.12);
    const emp_etf_3 = calculateEPFandETF(gross_salary_for_epf, 0.03);

    const APIT = calAPIT(gross_earnings);

    const take_home_salary = netSalary(gross_earnings, emp_epf_8, APIT);

    const ctc = calCostToCompany(gross_earnings, emp_epf_12, emp_etf_3);

    setSalaryResult({
      basic_salary: basic_salary,
      gross_earnings: gross_earnings,
      gross_deductions: gross_deduction,
      emp_epf_8: emp_epf_8,
      APIT: APIT,
      take_home_salary: take_home_salary,
      emp_epf_12: emp_epf_12,
      emp_etf_3: emp_etf_3,
      ctc: ctc,
    });
  };

  useEffect(() => {
    calculateResult();

    setLocalStorageItem(BASIC_SALARY_KEY, basicSalary);
    setLocalStorageItem(EARNINGS_KEY, earnings);
    setLocalStorageItem(DEDUCTIONS_KEY, deductions);
  }, [basicSalary, earnings, deductions]);

  return (
    <SalaryContext.Provider
      value={{
        basicSalary,
        setBaseSalary,
        earnings,
        manageEarnings,
        addNewEarning,
        deductions,
        manageDeductions,
        addNewDeduction,
        salaryResult,
        resetForm,
      }}
    >
      {props.children}
    </SalaryContext.Provider>
  );
};

export default SalaryState;

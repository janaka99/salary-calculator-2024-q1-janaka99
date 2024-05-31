import { TAX_BRACKETS } from "./constants";

//  Calculate Total Earnings using basic salary and valid earnings
export const calTotalEarnings = (
  basic_salary: number,
  earningsItems: IEarningItem[]
): number => {
  let total = 0;

  total = total + basic_salary;

  earningsItems.forEach((item) => {
    if (
      item.amount !== undefined &&
      item.amount !== null &&
      !isNaN(Number(item.amount))
    ) {
      total = total + item.amount;
    }
  });

  return total;
};

// calculate  GROSS DEDUCTION
export const calGrossDeductions = (
  deductionItems: IDeductionItem[]
): number => {
  let total = 0;

  deductionItems.forEach((item) => {
    if (
      item.amount !== undefined &&
      item.amount !== null &&
      !isNaN(Number(item.amount))
    ) {
      total = total + item.amount;
    }
  });

  return total;
};

// Calculate total gross Earnings
export const calGrossEarnings = (
  totalearning: number,
  grosDeduction: number
): number => {
  let total = totalearning - grosDeduction;
  return total;
};

//  Total Earnings for EPF
export const totalEarningForEPF = (
  basic_salary: number,
  earningsItems: IEarningItem[]
): number => {
  let total = 0;

  total = total + basic_salary;
  earningsItems.forEach((item) => {
    if (
      item.amount !== undefined &&
      item.amount !== null &&
      !isNaN(Number(item.amount)) &&
      item.EpfEtf === true
    ) {
      total = total + item.amount;
    }
  });

  return total;
};

// calculate EPF and ETF
export const calculateEPFandETF = (
  totalEarningForEPF: number,
  percentage: number
): number => {
  const result = totalEarningForEPF * percentage;
  return result;
};

// Gross Salary for EPF
export const calGrossSalaryForEPF = (
  total_earnings_for_epf: number,
  gross_deduction: number
): number => {
  const total = total_earnings_for_epf - gross_deduction;

  return total;
};

export const calAPIT = (grossEarning: number) => {
  if (grossEarning < 100000) {
    return 0;
  } else {
    let applicableBracket: ITaxBracket | undefined = undefined;

    // Use forEach to find the appropriate tax bracket
    applicableBracket = TAX_BRACKETS.find((bracket: ITaxBracket) => {
      if (
        grossEarning >= bracket.minIncome &&
        grossEarning < bracket.maxIncome
      ) {
        return bracket;
      }
    });

    if (!applicableBracket) {
      return 0;
    }

    return calculateTaxAmount(
      grossEarning,
      applicableBracket.rate,
      applicableBracket.baseTax
    );
  }
};

export const calculateTaxAmount = (
  grossAmount: number,
  rate: number,
  constant: number
): number => {
  let taxAmount = grossAmount * rate - constant;
  return taxAmount;
};

export const netSalary = (
  grossEarnings: number,
  emp_epf: number,
  APIT: number
): number => {
  let total = grossEarnings - emp_epf - APIT;
  return total;
};

export const calCostToCompany = (
  grossEarnings: number,
  emp_epf_12: number,
  emp_etf_3: number
): number => {
  let total = grossEarnings + emp_epf_12 + emp_etf_3;
  return total;
};

export const calTakeHomeSalary = (
  gross_earnings: number,
  gross_deduction: number,
  emp_epf: number,
  APIT: number
): number => {
  const total = gross_earnings - (gross_deduction + emp_epf + APIT);
  return total;
};

export const getLocalStorageItem = (key: string, defaultValue: any) => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key);
    if (saved !== null) {
      let data = JSON.parse(saved);
      console.log("earnings data ", data);
      return data;
    }
    return defaultValue;
  }
  return defaultValue;
};

export const setLocalStorageItem = (key: string, value: any) => {
  if (value == null) {
    removeLocalStorageItem(key);
    return;
  }
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorageItem = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

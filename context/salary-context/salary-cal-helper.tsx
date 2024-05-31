import { TAX_BRACKETS } from "./constants";

/**
 * Calculates total earning of a user
 * @param {number} basic_salary - Basic Salary of the user
 * @param {IEarningItem[]} earningItems - Array of earnings of a user
 * @returns {number} total earnings of a user
 */
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

/**
 * Calculates gross deductions
 * @param {IDeductionItem[]} deductionItems - Array of deductions of a user
 * @returns {number} Total deductions of a user
 */
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

/**
 * Calculates gross earnings of a user by substracting the gross deduction from total earnings
 * @param {number} totalearning - Total earnings of the user
 * @param {number} grosDeduction - Total gross deductions of the user
 * @returns {number} Total gross earnings
 */
export const calGrossEarnings = (
  totalearning: number,
  grosDeduction: number
): number => {
  let total = totalearning - grosDeduction;
  return total;
};

/**
 * Calculates total earnings for EPF by summing the basic salary and earnings that are allowed for EPF
 * @param {number} basic_salary - Basic Salary of the user
 * @param {IEarningItem[]} earningsItems - Total earnings of the user
 * @returns {number} Total earnings for EPF
 */
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

/**
 * Calculates gross salary for EPF and ETF
 * @param {number} total_earnings_for_epf - Total earnings allowed for EPF
 * @param {number} gross_deduction - Gross deduction
 * @returns {number} Gross salary for EPF and ETF
 */
export const calGrossSalaryForEPF = (
  total_earnings_for_epf: number,
  gross_deduction: number
): number => {
  const total = total_earnings_for_epf - gross_deduction;

  return total;
};

/**
 * Calculates EPF and ETF -  This function used to calculate EPF and ETF by accepting percentage and gross earnings for EPF
 * @param {number} gross_earnings_for_epf - Gross earnings for EPF
 * @param {number} percentage - EPF or ETF Percentage accordingly
 * @returns {number} Total EPF or ETF Amount
 */
export const calculateEPFandETF = (
  gross_earnings_for_epf: number,
  percentage: number
): number => {
  const result = gross_earnings_for_epf * percentage;
  return result;
};

/**
 * Calculates APIT - Tax Amount paid by the user
 * @param {number} grossEarning - Gross earnings
 * @returns {number} Tax amount
 */
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

/**
 * Calculates Tax amount paying by the user- this function is a helper function for `calAPIT` function
 * @param {number} grossEarning - Gross earnings
 * @param {number} rate - Tax rate
 * @param {number} constant - This value is provided by the tax authorities
 * @returns {number} Tax amount
 */
export const calculateTaxAmount = (
  grossEarning: number,
  rate: number,
  constant: number
): number => {
  let taxAmount = grossEarning * rate - constant;
  return taxAmount;
};

/**
 * Calculates net salary after all the deductions, EPF/ETF and Tax
 * @param {number} grossEarning - Gross earnings
 * @param {number} emp_epf - user EPF
 * @param {number} APIT - Tax
 * @returns {number} Total salary
 */
export const netSalary = (
  grossEarning: number,
  emp_epf: number,
  APIT: number
): number => {
  let total = grossEarning - emp_epf - APIT;
  return total;
};

/**
 * Calculates cost to the company
 * @param {number} grossEarning - Gross earnings
 * @param {number} emp_epf_12 - Employee EPF fr 12%
 * @param {number} emp_etf_3 - Employee ETF for 3%
 * @returns {number} Total salary
 */
export const calCostToCompany = (
  grossEarning: number,
  emp_epf_12: number,
  emp_etf_3: number
): number => {
  let total = grossEarning + emp_epf_12 + emp_etf_3;
  return total;
};

// /**
//  * Calculates take home salary
//  * @param {number} grossEarning - Gross earnings
//  * @param {number} emp_epf_12 - Employee EPF fr 12%
//  * @param {number} emp_etf_3 - Employee ETF for 3%
//  * @param {number} emp_etf_3 - Employee ETF for 3%
//  * @returns {number} Total salary
//  */
// export const calTakeHomeSalary = (
//   gross_earning: number,
//   gross_deduction: number,
//   emp_epf: number,
//   APIT: number
// ): number => {
//   const total = gross_earning - (gross_deduction + emp_epf + APIT);
//   return total;
// };

/**
 * Getting the relevant information from the localstorage
 * @param {string} key - Key for the relavant item in the localstorage
 * @param {string | IEarningItem[] | IDeductionItem[]} defaultValue - Defualt value to use if item not in the localstorage
 * @returns {string | IEarningItem[] | IDeductionItem[]} relavant value
 */
export const getLocalStorageItem = (key: string, defaultValue: any) => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key);
    if (saved !== null) {
      let data = JSON.parse(saved);
      return data;
    }
    return defaultValue;
  }
  return defaultValue;
};

/**
 * Storing the relevant information in the localstorage
 * @param {string} key - Key for the item in the localstorage
 * @param {string | IEarningItem[] | IDeductionItem[]} value - Value to be saved
 */
export const setLocalStorageItem = (key: string, value: any) => {
  if (value == null) {
    removeLocalStorageItem(key);
    return;
  }
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

/**
 * Removing item from the localstorage
 * @param {string} key - Key for the item to deleted in the localstorage
 */
export const removeLocalStorageItem = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

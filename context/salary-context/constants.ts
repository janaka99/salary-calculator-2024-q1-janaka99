export const TAX_BRACKETS: ITaxBracket[] = [
  { minIncome: 100000, maxIncome: 141667, rate: 0.06, baseTax: 6000 },
  { minIncome: 141667, maxIncome: 183333, rate: 0.12, baseTax: 14500 },
  { minIncome: 183333, maxIncome: 225000, rate: 0.18, baseTax: 25500 },
  { minIncome: 225000, maxIncome: 266667, rate: 0.24, baseTax: 39000 },
  { minIncome: 266667, maxIncome: 308333, rate: 0.3, baseTax: 55000 },
  { minIncome: 308333, maxIncome: Infinity, rate: 0.36, baseTax: 73500 },
];

export const BASIC_SALARY_KEY = "janaka_99_salary_cal_basicSalary";
export const EARNINGS_KEY = "janaka_99_salary_cal_earnings";
export const DEDUCTIONS_KEY = "janaka_99_salary_cal_deductions";

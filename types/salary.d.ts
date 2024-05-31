interface ITaxBracket {
  minIncome: number;
  maxIncome: number;
  rate: number;
  baseTax: number;
}
interface IEarningItem {
  name: string | null;
  amount: number | null;
  EpfEtf: boolean;
  id: string;
}

interface IDeductionItem {
  name: string | null;
  amount: number | null;
  id: string;
}

interface ISalaryResult {
  basic_salary: number;
  gross_earnings: number;
  gross_deductions: number;
  emp_epf_8: number;
  APIT: number;
  take_home_salary: number;
  emp_epf_12: number;
  emp_etf_3: number;
  ctc: number;
}

interface SalaryContextType {
  basicSalary: number | null;
  setBaseSalary: (salary: number | null) => void;
  earnings: IEarningItem[];
  manageEarnings: (earning: IEarningItem, action: "update" | "remove") => void;
  addNewEarning: () => void;
  deductions: IDeductionItem[];
  manageDeductions: (
    deduction: IDeductionItem,
    action: "update" | "remove"
  ) => void;
  addNewDeduction: () => void;
  salaryResult: ISalaryResult;
  resetForm: () => void;
}

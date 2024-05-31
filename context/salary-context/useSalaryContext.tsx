import { useContext } from "react";
import { SalaryContext } from "@/context/salary-context/salary-context";

// Custom hook for accessing salary context
const useSalaryContext = (): SalaryContextType => {
  const context = useContext(SalaryContext);

  if (!context) {
    throw new Error(
      "useSalaryContext must be used within a SalaryContextProvider"
    );
  }

  return context;
};

export default useSalaryContext;

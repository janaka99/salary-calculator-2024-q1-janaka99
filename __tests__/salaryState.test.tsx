import { describe, expect, test } from "@jest/globals";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SalaryState from "@/context/salary-context/salary-context";
import useSalaryContext from "@/context/salary-context/useSalaryContext";

const InitialStateComponent = () => {
  const { basicSalary, earnings, deductions, salaryResult } =
    useSalaryContext();

  return (
    <div className="">
      <p data-testid="basic-salary">{basicSalary}</p>
      <p data-testid="earnings-count">{earnings.length}</p>
      <p data-testid="deductions-count">{deductions.length}</p>
      <p data-testid="salary-result">{JSON.stringify(salaryResult)}</p>
    </div>
  );
};

const TestStateUpdated = () => {
  const {
    setBaseSalary,
    addNewEarning,
    addNewDeduction,
    resetForm,
    earnings,
    deductions,
    manageEarnings,
    manageDeductions,
  } = useSalaryContext();
  return (
    <div className="">
      <button
        data-testid="set-basic-salary"
        onClick={() => setBaseSalary(50000)}
      >
        Set Basic Salary
      </button>
      <button data-testid="add-new-earning" onClick={addNewEarning}>
        Add New Earning
      </button>
      <button data-testid="add-new-deduction" onClick={addNewDeduction}>
        Add New Deduction
      </button>
      <button data-testid="reset-form" onClick={resetForm}>
        Reset Form
      </button>
      <ul>
        {earnings.map((earning: IEarningItem, i: number) => (
          <li key={earning.id} data-testid={`view-earning-${i}`}>
            <p data-testid={`view-earning-name-${i}`}>{earning.name}</p>

            <button
              data-testid={`delete-earning-${i}`}
              onClick={() => manageEarnings(earning, "remove")}
            >
              Delete
            </button>
            <button
              data-testid={`update-earning-${i}`}
              onClick={() =>
                manageEarnings(
                  {
                    name: "Updated Earning",
                    amount: 100,
                    id: earning.id,
                    EpfEtf: false,
                  },
                  "update"
                )
              }
            >
              Add Earning
            </button>
          </li>
        ))}
      </ul>
      <ul>
        {deductions.map((deduction: IDeductionItem, i: number) => (
          <li key={deduction.id} data-testid={`view-deduction-${i}`}>
            <p data-testid={`view-deduction-name-${i}`}>{deduction.name}</p>
            <button
              data-testid={`delete-deduction-${i}`}
              onClick={() => manageDeductions(deduction, "remove")}
            >
              Delete
            </button>
            <button
              data-testid={`update-deduction-${i}`}
              onClick={() =>
                manageDeductions(
                  {
                    name: "Updated deduction",
                    amount: 100,
                    id: deduction.id,
                  },
                  "update"
                )
              }
            >
              Add Deduction
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const renderTestState = () => {
  render(
    <SalaryState>
      <InitialStateComponent />
      <TestStateUpdated />
    </SalaryState>
  );
};

describe("Salary State Component", () => {
  it("renders initial salary state", () => {
    renderTestState();
    expect(screen.getByTestId("basic-salary")).toHaveTextContent("");
    expect(screen.getByTestId("earnings-count")).toHaveTextContent("1");
    expect(screen.getByTestId("deductions-count")).toHaveTextContent("1");
    expect(screen.getByTestId("salary-result")).toHaveTextContent(
      JSON.stringify({
        basic_salary: 0,
        gross_earnings: 0,
        gross_deductions: 0,
        emp_epf_8: 0,
        APIT: 0,
        take_home_salary: 0,
        emp_epf_12: 0,
        emp_etf_3: 0,
        ctc: 0,
      })
    );
  });

  it("Check state after evoke some functions", () => {
    renderTestState();
    fireEvent.click(screen.getByTestId("set-basic-salary"));
    fireEvent.click(screen.getByTestId("add-new-earning"));
    fireEvent.click(screen.getByTestId("add-new-deduction"));
    fireEvent.click(screen.getByTestId("reset-form"));
    expect(screen.getByTestId("basic-salary")).toHaveTextContent("");
    expect(screen.getByTestId("earnings-count")).toHaveTextContent("1");
    expect(screen.getByTestId("deductions-count")).toHaveTextContent("1");
    expect(screen.getByTestId("salary-result")).toHaveTextContent(
      JSON.stringify({
        basic_salary: 0,
        gross_earnings: 0,
        gross_deductions: 0,
        emp_epf_8: 0,
        APIT: 0,
        take_home_salary: 0,
        emp_epf_12: 0,
        emp_etf_3: 0,
        ctc: 0,
      })
    );
  });

  it("Update and Remove Exisitng Earning", async () => {
    renderTestState();
    expect(screen.getByTestId("earnings-count")).toHaveTextContent("1");
    // update earning
    fireEvent.click(screen.getByTestId("update-earning-0"));
    await waitFor(() => {
      expect(screen.getByTestId("view-earning-name-0")).toHaveTextContent(
        "Updated Earning"
      );
    });

    fireEvent.click(screen.getByTestId("delete-earning-0"));
    await waitFor(() => {
      expect(screen.queryByText("Updated Earning")).not.toBeInTheDocument();
    });
  });

  it("Update and Remove Exisitng Deduction", async () => {
    renderTestState();
    expect(screen.getByTestId("deductions-count")).toHaveTextContent("1");
    // update earning
    fireEvent.click(screen.getByTestId("update-deduction-0"));
    await waitFor(() => {
      expect(screen.getByTestId("view-deduction-name-0")).toHaveTextContent(
        "Updated deduction"
      );
    });

    fireEvent.click(screen.getByTestId("delete-deduction-0"));
    await waitFor(() => {
      expect(screen.queryByText("Updated deduction")).not.toBeInTheDocument();
    });
  });
});

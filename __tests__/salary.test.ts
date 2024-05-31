import { describe, expect, test } from "@jest/globals";
import {
  calTotalEarnings,
  calGrossDeductions,
  calGrossEarnings,
  totalEarningForEPF,
  calculateEPFandETF,
  calGrossSalaryForEPF,
  calAPIT,
  netSalary,
  calCostToCompany,
  calTakeHomeSalary,
} from "./../context/salary-context/salary-cal-helper";

describe("Salary Calculation Functions", () => {
  // calTotalEarnings tests
  test("calculates total earnings with basic salary and earnings", () => {
    const basicSalary = 10000;
    const earnings = [
      { name: "OT", amount: 500, EpfEtf: false, id: "1" },
      { name: "Internet Allowcation", amount: 200, EpfEtf: true, id: "2" },
    ];
    const expectedTotal = basicSalary + 200 + 500;
    expect(calTotalEarnings(basicSalary, earnings)).toBe(expectedTotal);
  });

  test("handles invalid or missing earnings amounts", () => {
    const basicSalary = 10000;
    const earnings = [
      { name: "OT", amount: null, EpfEtf: false, id: "1" },
      { name: "Internet Allowcation", amount: null, EpfEtf: true, id: "2" },
    ];
    const expectedTotal = basicSalary;
    expect(calTotalEarnings(basicSalary, earnings)).toBe(expectedTotal);
  });

  // calGrossEarnings tests
  test("calculates gross earnings by subtracting deductions from total earnings", () => {
    const totalEarnings = 15000;
    const grossDeduction = 1000;
    const expectedGrossEarnings = totalEarnings - grossDeduction;
    expect(calGrossEarnings(totalEarnings, grossDeduction)).toBe(
      expectedGrossEarnings
    );
  });

  // totalEarningForEPF tests
  test("calculates total earnings for EPF considering only contributing items", () => {
    const basicSalary = 10000;
    const earnings = [
      { name: "OT", amount: 500, EpfEtf: false, id: "1" },
      { name: "Internet Allowcation", amount: 200, EpfEtf: true, id: "2" },
      { name: "Internet Allowcation", amount: null, EpfEtf: true, id: "2" },
    ];
    const expectedTotal = basicSalary + 200;
    expect(totalEarningForEPF(basicSalary, earnings)).toBe(expectedTotal);
  });

  // calculateEPFandETF tests
  test("calculates EPF and ETF amount based on total earning and percentage - 10%", () => {
    const totalEarningForEPF = 12000;
    const percentage = 0.1; // 10%
    const expectedAmount = totalEarningForEPF * percentage;
    expect(calculateEPFandETF(totalEarningForEPF, percentage)).toBe(
      expectedAmount
    );
  });

  test("calculates EPF and ETF amount based on total earning and percentage - 0%", () => {
    const totalEarningForEPF = 12000;
    const percentage = 0; // 10%
    const expectedAmount = totalEarningForEPF;
    expect(calculateEPFandETF(totalEarningForEPF, percentage)).toBe(0);
  });

  // calGrossSalaryForEPF tests
  test("calculates gross salary after EPF by subtracting deductions from total earnings valid for EPF", () => {
    const totalEarningForEPF = 15000;
    const grossDeduction = 1000;
    const expectedGrossSalary = totalEarningForEPF - grossDeduction;
    expect(calGrossSalaryForEPF(totalEarningForEPF, grossDeduction)).toBe(
      expectedGrossSalary
    );
  });

  describe("Calculate Income Tax", () => {
    test("calculates APIT (income tax) based on - 80000", () => {
      const grossEarning = 80000;
      expect(calAPIT(grossEarning)).toBe(0);
    });
    test("calculates APIT (income tax) based on - 120000", () => {
      const grossEarning = 120000;
      expect(calAPIT(grossEarning)).toBe(1200);
    });
    test("calculates APIT (income tax) based on - 160000", () => {
      const grossEarning = 160000;
      expect(calAPIT(grossEarning)).toBe(4700);
    });
    test("calculates APIT (income tax) based on - 200000", () => {
      const grossEarning = 200000;
      expect(calAPIT(grossEarning)).toBe(10500);
    });
    test("calculates APIT (income tax) based on - 240000", () => {
      const grossEarning = 240000;
      expect(calAPIT(grossEarning)).toBe(18600);
    });
    test("calculates APIT (income tax) based on - 280000", () => {
      const grossEarning = 280000;
      expect(calAPIT(grossEarning)).toBe(29000);
    });
    test("calculates APIT (income tax) based on - 400000", () => {
      const grossEarning = 400000;
      expect(calAPIT(grossEarning)).toBe(70500);
    });
    test("calculates APIT (income tax) based on - (-2000)", () => {
      expect(calAPIT(-2000)).toBe(0);
    });
  });

  // net salary
  test("calculates net salary by subtracting EPF and APIT from gross earnings", () => {
    const grossEarnings = 50000;
    const emp_epf = 2000;
    const APIT = 1000;
    const expectedNetSalary = grossEarnings - emp_epf - APIT;
    expect(netSalary(grossEarnings, emp_epf, APIT)).toBe(expectedNetSalary);
  });

  // calCostToCompany tests
  test("calculates cost to company by adding gross earnings, EPF (12%), and ETF (3%)", () => {
    const grossEarnings = 40000;
    const emp_epf_12 = grossEarnings * 0.12; // 12% of gross earnings
    const emp_etf_3 = grossEarnings * 0.03; // 3% of gross earnings
    const expectedCost = grossEarnings + emp_epf_12 + emp_etf_3;
    expect(calCostToCompany(grossEarnings, emp_epf_12, emp_etf_3)).toBe(
      expectedCost
    );
  });

  // calTakeHomeSalary tests
  test("calculates take-home salary by subtracting deductions from gross earnings", () => {
    const gross_earnings = 60000;
    const gross_deduction = 5000;
    const emp_epf = 3000;
    const APIT = 1500;
    const expectedTakeHome =
      gross_earnings - (gross_deduction + emp_epf + APIT);
    expect(
      calTakeHomeSalary(gross_earnings, gross_deduction, emp_epf, APIT)
    ).toBe(expectedTakeHome);
  });
});

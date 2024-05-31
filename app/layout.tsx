import type { Metadata } from "next";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/registry";
import SalaryState from "@/context/salary-context/salary-context";

export const metadata: Metadata = {
  title: "Janaka99 Salary Calculator",
  description: "Salary Calculator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <SalaryState>{children}</SalaryState>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

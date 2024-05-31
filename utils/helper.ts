export function formatNumberInput(input: number | string): string {
  if (typeof input === "number") {
    return input.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return input;
}

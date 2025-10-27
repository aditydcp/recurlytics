export function generateIndices(
  length: number,
  indexType: "number" | "text" | "ordinal",
  indexUnit: string
): string[] {
  const getOrdinal = (n: number) => {
    const suffix = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return `${n}${suffix[(v - 20) % 10] || suffix[v] || suffix[0]}`;
  };

  switch (indexType) {
    case "number":
      return Array.from({ length }, (_, i) => `${i + 1}`);

    case "text":
      return Array.from({ length }, (_, i) =>
        i === 0
          ? `Previous ${indexUnit}`
          : `${getOrdinal(i + 1)} Last ${indexUnit}`
      );

    case "ordinal":
      return Array.from({ length }, (_, i) => getOrdinal(i + 1));

    default:
      return [];
  }
}
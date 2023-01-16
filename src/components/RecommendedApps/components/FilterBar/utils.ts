export const createOptions = (arr: string[]) => arr.map(
  (itemName) => ({ value: itemName, label: itemName, })
);

export const createNumberOptions = (length: number) => 
  Array.from({ length }, (_, i) => ({ value: i + 1, label: i + 1 }));
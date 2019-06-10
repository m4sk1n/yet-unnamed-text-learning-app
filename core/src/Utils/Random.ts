export function generateRandomNumbers(
  amount: number,
  ceil: number,
): number[] {
  const numbers: number[] = [];
  for (let i = 0; i < amount; i++) {
    numbers.push(Math.floor(Math.random() * ceil));
  }
  return numbers;
}

export function generateUniqueRandomNumbers(
  amount: number,
  ceil: number,
): number[] {
  if (ceil + 1 < amount) {
    amount = ceil;
  }
  const numbers: number[] = [];
  for (let i = 0; i < amount; i++) {
    while (true) {
      const num = Math.floor(Math.random() * ceil);
      if (!numbers.some((x) => x === num)) {
        numbers.push(num);
        break;
      }
    }
  }
  return numbers;
}
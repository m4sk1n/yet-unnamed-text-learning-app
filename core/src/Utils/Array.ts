export function get2DArrayElement(arr: any[][], id: number) {
  if (id < 0) {
      return;
  }
  let i = 0;
  for (const j in arr) {
    if (id >= i && id < i + arr[j].length) {
        return arr[j][id - i];
    }
    i += arr[j].length;
  }
}

export function get2DArrayLength(arr: any[][]) {
  let length = 0;
  for (const subarr of arr) {
    length += subarr.length;
  }
  return length;
}

export function set2DArrayElement(arr: any[][], id: number, el: any) {
  if (id < 0) {
      return;
  }
  let i = 0;
  for (const j in arr) {
    if (id >= i && id < i + arr[j].length) {
        return arr[j][id - i] = el;
    }
    i += arr[j].length;
  }
}

/**
 * Swaps two elements in array
 * @param arr Array to perform the swap operation
 * @param i Index of the first element to be swapped
 * @param j Index of the second element to be swapped
 */
export function swap(arr: any[], i: number, j: number): void {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

/**
 * Returns a shuffled copy of given array
 * @param arr Array to be shuffled
 */
export function shuffle(arr: any[]): any[] {
  const shuffled = [...arr]
  for (let i = 0; i < shuffled.length; i++) {
    swap(shuffled, i, Math.floor(Math.random() * shuffled.length));
  }
  return shuffled;
}
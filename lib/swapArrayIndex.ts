export default function swapArrayIndex<T>(array: T[], index1: number, index2: number): T[] {
  const newArray = [ ...array ];
  [newArray[index1], newArray[index2]] = [newArray[index2], newArray[index1]];
  return newArray;
}
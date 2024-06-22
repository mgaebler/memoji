/**
 * Shuffle an array
 *
 * The implementation of the randomArrayShuffle function is based on the Fisher-Yates shuffle algorithm,
 * which randomly permutes the elements of an array. The function iterates over the array and swaps each
 * element with a random element from the remaining unshuffled portion of the array. This process
 * continues until all elements have been shuffled.
 */
export function randomArrayShuffle<ArrayType>(array: ArrayType[]) {
  let currentIndex: number = array.length;
  let temporaryValue;
  let randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
}

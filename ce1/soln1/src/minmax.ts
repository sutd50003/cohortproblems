  /**
   * @param {string[]} l - An array of strings to be parsed into numbers.
   * @returns {number[]} An array of numbers parsed from the input strings, excluding any invalid entries.
   * 
   * This function takes an array of strings as input and attempts to parse each string into an integer using `parseInt`. If the parsing is successful and does not result in `NaN`, the number is added to the output array. The function returns an array of valid numbers, effectively filtering out any non-numeric or invalid entries from the input.
   */
export function numbers(l: string[]): number[] {
  const o: number[] = [];
  for (const s of l) {
    const n = parseInt(s, 10);
    if (!Number.isNaN(n)) {
      o.push(n);
    }
  }
  return o;
}


/**
 * @param {number[]} a - An array of numbers.
 * @returns {{ min: number; max: number }} An object containing the minimum and maximum values from the input array.
 * 
 * This function takes an array of numbers as input and calculates the minimum and maximum values using `Math.min` and `Math.max`. It returns an object with `min` and `max` properties representing the smallest and largest numbers in the array, respectively.
 */
export function min_max(a: number[]): { min: number; max: number } {

  const min = Math.min(...a);
  const max = Math.max(...a);
  return { min: min, max: max };
}


/**
 * This function is an event handler for a button click. It retrieves the value from a text box, splits it into an array of strings, and then processes that array to find the minimum and maximum numbers. The results are then displayed in specified HTML elements.
 * The function first gets references to the text box and the elements where the minimum and maximum values will be displayed. It then splits the input from the text box into an array of strings, converts those strings to numbers using the `numbers` function, and finds the minimum and maximum values using the `min_max` function. Finally, it updates the inner HTML of the respective elements to show the results.
 */
export function handleButton1Click() {
  const textBox1 = document.getElementById("textbox1") as HTMLInputElement;
  const min = document.getElementById("min") as HTMLSpanElement;
  const max = document.getElementById("max") as HTMLSpanElement;
  const items = textBox1.value.split(",") as string[];
  const obj = min_max(numbers(items));
  min.innerHTML = obj["min"].toString();
  max.innerHTML = obj["max"].toString();
}

/**
 * This function sets up an event listener for a button click. It retrieves the button element by its ID and attaches a click event listener that triggers the `handleButton1Click` function when the button is clicked. This allows the application to respond to user interactions with the button, enabling the functionality defined in the `handleButton1Click` function to execute when the user clicks the button.
 */
export function run() {
  const button1 = document.getElementById("button1") as HTMLButtonElement;
  button1.addEventListener("click", handleButton1Click);
}

/**
 * This conditional checks if the document object is available (i.e., if the code is running in a browser environment) and adds an event listener to run the `run` function once the DOM content is fully loaded. This ensures that the event listeners for the button are set up correctly after the HTML elements are available in the DOM.
 * The main purpose is to prevent conflicts between test testing with vitest and browser execution. When running tests, the document object may not be defined, so this check ensures that the code only runs in a browser environment where the document object is available.
 */
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", run);
}
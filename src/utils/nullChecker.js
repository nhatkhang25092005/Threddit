/**
 * Checks an object for any keys with null, undefined, or empty string values.
 *
 * @param {object} data - The object to validate.
 * @returns {boolean | string[]} 
 * - `false` if the input is null or not an object.  
 * - An array of keys that have null/undefined/empty string values, if any exist.  
 * - `true` if all keys contain valid (non-null, non-empty) values.  
 *
 * @example
 * nullChecker({ name: "John", age: null });
 * // => ["age"]
 *
 * @example
 * nullChecker({ name: "John", age: 25 });
 * // => true
 *
 * @example
 * nullChecker(null);
 * // => false
 */

export default function nullChecker(data) {
  if (!data) {
    console.error("Data can not be null in Null Checker");
    return false;
  }

  if (typeof data !== "object") {
    console.error("Data in Null checker must be an Object");
    return false;
  }

  const nullArray = []

  for (const key in data) {
    if (data[key] === null || data[key] === undefined || data[key] === "") {
        nullArray.push(key)
    }
  }

  if(nullArray.length > 0 ){
    console.error("Null elements:",nullArray)
    return nullArray
  }

  return true;
}

import { useState } from "react"
/**
 * Custom React hook for handling form input state.
 *
 * @param {Object<string, any>} fields - Initial values for the input fields.
 * Each key should match the `name` attribute of an input element.
 *
 * @returns {[Object<string, any>, function]} 
 * Returns an array:
 * - input: The current input state object.
 * - onChange: Event handler to update input state based on `event.target.name` and `event.target.value`.
 *
 * @example
 * const [form, handleChange] = useInput({ email: "", password: "" });
 *
 * <input name="email" value={form.email} onChange={handleChange} />
 * <input name="password" value={form.password} onChange={handleChange} />
 */
export function useInput(fields){
  const [input, setInput] = useState(fields)
  const onChange = (e) => {
    const {value, name} = e.target
    setInput(prev=>({
      ...prev,
      [name]:value
    }))
  }
  return[
    input,
    onChange
  ]
}
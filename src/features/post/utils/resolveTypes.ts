import { Reaction } from "../types/reaction.type"

/**
 * Finds and returns a value of type string from the params
 *
 * Trade-off:
 * Guarantees safe display data on the UI (never 'undefined'),
 * but makes it harder to differentiate between an empty string and undefined.
 **/
export const resolveString = (...values:unknown[]):string=> (
  values.find((value): value is string => typeof value === "string" && value.trim().length>0) || ""
)

/**
 * Returns a numeric value from the given parameter,
 * or 0 if the input cannot be parsed as a finite number.
 *
 * Trade-off:
 * Ensures the return type is always a number,
 * but non-numeric inputs will be coerced to 0, which may mask invalid data.
 */
export const resolveNumber = (value:unknown): number => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

/**
 * Validates the input and returns a boolean value.
 * If the parameter is not of type boolean, logs a warning
 * and returns false.
 *
 * Trade-off:
 * Guarantees the return type is always boolean,
 * but non-boolean inputs are coerced to false, which can mask
 * invalid data and make it harder to distinguish between
 * an actual false value and an invalid input.
 */
export const resolveBoolean = (value: unknown): boolean => {
  if(typeof value !== 'boolean'){
    console.warn("Invalid boolean:", value)
    return false
  }
  return value
}

export const resolveArray = <T>(value:unknown, isValid: (item:unknown) => item is T) : T[] => {
  if(!Array.isArray(value)){
    console.warn('Expected array but got:',value)
    return []
  }
  return value.filter(isValid)
}

export const resolveId = (value:unknown): number | null => {
  if(value == null) return null

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null
  }

  if (typeof value === "string") {
    const id = value.trim()
    if (!id) return null

    const parsed = Number(id)
    return Number.isFinite(parsed) ? parsed : null
  }

  return null
}

const REACTION_VALUES:Reaction[] = ['HAHA', 'LOVE', 'SAD', 'ANGRY', 'LIKE', 'WOW']
export const resolveReaction = (value:unknown): Reaction | null => {
  if(typeof value !== 'string') return null
  const reaction = value.trim().toUpperCase()
  return REACTION_VALUES.includes(reaction as Reaction)
    ? (reaction as Reaction)
    : null
}

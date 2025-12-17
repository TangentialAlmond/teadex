/**
 * Safely accesses nested properties using a dot-notation string.
 * Works for 'altitudeMeters' as well as 'coordinates.latitude'
 */
export const getNestedValue = (obj, path) => {
  if (!path || !obj) return undefined

  // Split the path and 'reduce' the object to find the target value
  return path.split('.').reduce((acc, part) => {
    // If the accumulator exists, look for the next part, otherwise stay undefined
    return (acc && acc[part] !== undefined) ? acc[part] : undefined
  }, obj)
}
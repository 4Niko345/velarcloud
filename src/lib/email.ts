/**
 * One plain address (no lists, display names or line breaks), so a value typed in a
 * form can't add recipients. Shared by the form in the browser and the server check.
 */
export const isEmail = (value: string) =>
  /^[^\s@<>()[\]",;:]+@[^\s@<>()[\]",;:]+\.[^\s@<>()[\]",;:]{2,}$/.test(value)

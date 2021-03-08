export const requiredField = (label, fieldValue) => {
  return fieldValue.length > 0 ? '' : `${label} is required`;
};

export const minLength = (label, value) => {
  return value.length >= 6 ? '' : `Minimal length is 6`;
};

// export const passwordsMatch = (value, allValues) => {
//   return value === allValues.password ? undefined : 'Passwords do not match';
// };
// export const required = (value) => {
//   return value ? undefined : 'Field is required';
// };
//
// export const maxLength = (maxLength) => (value) => {
//   return value.length <= maxLength ? undefined : `Maximal length is ${maxLength}`;
// };

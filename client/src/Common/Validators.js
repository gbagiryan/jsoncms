export const requiredField = (fieldName, fieldValue) => {
  return fieldValue.length > 0 ? '' : `${fieldName} is required`;
};

export const required = (value) => {
  return value ? undefined : 'Field is required';
};

export const minLength = (minLength) => (value) => {
  return value.length >= minLength ? undefined : `Minimal length is ${minLength}`;
};

export const maxLength = (maxLength) => (value) => {
  return value.length <= maxLength ? undefined : `Maximal length is ${maxLength}`;
};

export const passwordsMatch = (value, allValues) => {
  return value === allValues.password ? undefined : 'Passwords do not match';
};

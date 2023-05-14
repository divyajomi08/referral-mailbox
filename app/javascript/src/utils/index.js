export const formatRailsErrors = (errors) => {
  const errorMessages = [];
  for (const key in errors) {
    if (Array.isArray(errors[key])) {
      errors[key].forEach((message) => {
        errorMessages.push(`${key} ${message}`);
      });
    }
  }
  return errorMessages.join(", ");
};

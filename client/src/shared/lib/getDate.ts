export const getDate = (date: Date | undefined) => {
  return date ? new Date(date) : undefined;
};

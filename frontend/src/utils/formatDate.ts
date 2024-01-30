export const formatDate = (time: Date) => {
  const date = new Date(time);
  const formattedDate = `${
    date.getMonth() + 1
  }-${date.getDate()}-${date.getFullYear()}`;
  return formattedDate;
};

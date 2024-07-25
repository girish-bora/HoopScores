export const unixToIST = (unix) => {
  const unixIST = unix + 19800;
  const date = new Date(unixIST * 1000);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();

  return {
    month,
    day,
    hour: hour === 0 ? `12` : hour > 12 ? `${hour % 12}` : `${hour}`,
    period: hour >= 12 ? `PM` : `AM`,
    min: min < 10 ? `0${min}` : `${min}`,
  };
};

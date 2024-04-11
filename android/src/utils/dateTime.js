export const getTime = (date) => {
  const hour = date.getHours();
  const minute = date.getMinutes();
  let res = "";
  if (hour < 10) {
    res = res + "0" + hour.toString() + " : ";
  } else {
    res += hour.toString() + " : ";
  }
  if (minute < 10) {
    res = res + "0" + minute.toString();
  } else {
    res += minute.toString();
  }
  return res;
};

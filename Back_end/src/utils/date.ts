export const getCurrentTime = () => {
  const currentTime = new Date();
  return currentTime.getHours() + ':' + currentTime.getMinutes() + ':' + currentTime.getSeconds();
};

export const getTimeOfDate = (date: Date) => {
  const currentTime = date;
  return currentTime.getHours() + ':' + currentTime.getMinutes() + ':' + currentTime.getSeconds();
};

export const getCurrentDate = () => {
  return new Date().toLocaleDateString('en-GB', {timeZone: 'Asia/Ho_Chi_Minh'});
};

export const getDateOfDate = (date: Date) => {
  return date.toLocaleDateString('en-GB', {timeZone: 'Asia/Ho_Chi_Minh'});
};

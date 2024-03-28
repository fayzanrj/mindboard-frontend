const getLastEditedTime = (date: Date): string => {
  const currentDate = new Date();

  // Convert provided date to local time zone
  const localDate = new Date(date.toLocaleString());

  const timeDifference = currentDate.getTime() - localDate.getTime();
  const secondsDifference = Math.floor(timeDifference / 1000);

  if (secondsDifference < 60) {
    return `, around ${secondsDifference} seconds ago`;
  } else if (secondsDifference < 3600) {
    const minutesDifference = Math.floor(secondsDifference / 60);
    return `, around ${minutesDifference} minute${
      minutesDifference > 1 ? "s" : ""
    } ago`;
  } else if (secondsDifference < 86400) {
    const hoursDifference = Math.floor(secondsDifference / 3600);
    return `, around ${hoursDifference} hour${
      hoursDifference > 1 ? "s" : ""
    } ago`;
  } else if (secondsDifference < 2592000) {
    const daysDifference = Math.floor(secondsDifference / 86400);
    return `, around ${daysDifference} day${daysDifference > 1 ? "s" : ""} ago`;
  } else {
    const monthsDifference = Math.floor(secondsDifference / 2592000);
    return `, around ${monthsDifference} month${
      monthsDifference > 1 ? "s" : ""
    } ago`;
  }
};

export default getLastEditedTime;

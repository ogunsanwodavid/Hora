export function convertTo12HourFormat(time) {
  if (!time) return null;
  const [hour, minute] = time.split(":");
  const ampm = hour >= 12 ? "pm" : "am";
  const convertedHour = hour % 12 || 12; // Convert hour to 12-hour format
  return `${String(convertedHour).padStart(2, "0")}:${minute}${ampm}`;
}

export function convertTo24HourFormat(time) {
  if (!time) return null;
  let [hourMinute, period] = time.split(/(am|pm)/i); // Split by am or pm (case-insensitive)
  let [hour, minute] = hourMinute.split(":");

  if (period.toLowerCase() === "pm" && hour !== "12") {
    hour = String(+hour + 12); // Convert PM hours except for 12 PM
  }
  if (period.toLowerCase() === "am" && hour === "12") {
    hour = "00"; // Handle midnight case
  }

  return `${hour.padStart(2, "0")}:${minute}`;
}

export function formatDateToYYYYMMDD(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so we add 1
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function parseDateFromYYYYMMDD(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day); // Subtract 1 from month because months are 0-based
}

export function getMonthName(monthNumber) {
  const monthNames = [
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
  return monthNames[monthNumber];
}

export const isDateToday = (parsedDate) => {
  const today = new Date();
  return (
    parsedDate.getFullYear() === today.getFullYear() &&
    parsedDate.getMonth() === today.getMonth() &&
    parsedDate.getDate() === today.getDate()
  );
};

export const isDatePrevious = (parsedDate) => {
  const today = new Date();

  // Set today's date to midnight to compare only the date part
  today.setHours(0, 0, 0, 0);

  // Set the parsed date's time to midnight to compare the date part
  const givenDate = new Date(parsedDate);
  givenDate.setHours(0, 0, 0, 0);

  // Return true if the parsed date is before today
  return givenDate < today;
};

export function formatTimeTo24Hour(date) {
  const hours = date.getHours().toString().padStart(2, "0"); // Get hours and pad with 0 if needed
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Get minutes and pad with 0 if needed
  return `${hours}:${minutes}`; // Return in hh:mm format
}

export function isAfterCurrentTime(currentTime, compareTime) {
  const [currentHours, currentMinutes] = currentTime.split(":").map(Number);
  const [compareHours, compareMinutes] = compareTime.split(":").map(Number);

  // Calculate total minutes for comparison
  const currentTotalMinutes = currentHours * 60 + currentMinutes;
  const compareTotalMinutes = compareHours * 60 + compareMinutes;

  return compareTotalMinutes > currentTotalMinutes; // Compare if compared time is after current time
}

export const capitalizeWords = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

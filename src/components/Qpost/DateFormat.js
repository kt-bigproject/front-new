export default function DateFormat(date) {
  const now = new Date();
  const inputDate = new Date(date);

  const isToday =
    now.getDate() === inputDate.getDate() &&
    now.getMonth() === inputDate.getMonth() &&
    now.getFullYear() === inputDate.getFullYear();

  if (isToday) {
    const hours = String(inputDate.getHours()).padStart(2, '0');
    const minutes = String(inputDate.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  } else {
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  }
}
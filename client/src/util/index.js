// DATE UTILS
//haripallikare93@gmail.com
//28391839
const isValidDate = (date) => {
  return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);
}

const convDateToDateStr = (date) => {
  if (isValidDate) {
    let dateStr = date.toISOString();
    return dateStr.split('T')[0];
  }
  return false;
}

const removeTimeFromDate = (date) => {
  if (isValidDate) {
    return new Date(date.toDateString())
  }
  return false;
}

const convDateStrToDate = (dateStr) => {
  let newDateStr = dateStr.split('_').join(' ');
  return new Date(newDateStr);
}

const arrangeDate = (date) => {
  let newDate = date.split('-').reverse().join('/ ');
  return newDate;
}


export const util = {
  baseURL: "http://localhost:8000/api/v1",

  ValidateEmail: (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    alert("You have entered an invalid email address!")
    return (false)
  }
  ,
  isValidDate,
  removeTimeFromDate,
  convDateStrToDate,
  convDateToDateStr,
  arrangeDate
}
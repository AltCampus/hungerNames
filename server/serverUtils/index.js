
// DATE UTILS
const isValidDate = (date) => {
  return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);
}

const convDateToDateStr = (date) => {
  if (isValidDate) {
    return date.toDateString();
  }
  return false;
}

const removeTimeFromDate = (date) => {
  if(isValidDate){
    return new Date(date.toDateString())
  }
  return false;
}

const convDateStrToDate = (dateStr) => {
   return new Date(dateStr);
}


module.export ={
  isValidDate,
  removeTimeFromDate,
  convDateStrToDate,
  convDateToDateStr
}
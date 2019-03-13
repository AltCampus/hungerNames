
// DATE UTILS
const isValidDate = (date) => {
  return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);
}

const convDateToDateStr = (date) => {
  if (isValidDate) {
    let dateStr = date.toDateString();
    return dateStr.split(' ').join('_')
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
  let newDateStr = dateStr.split('_').join(' ');
   return new Date(newDateStr);
}


module.export ={
  isValidDate,
  removeTimeFromDate,
  convDateStrToDate,
  convDateToDateStr
}

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
  if (isValidDate) {
    return new Date(date.toDateString())
  }
  return false;
}

const convDateStrToDate = (dateStr) => {
  let newDateStr = dateStr.split('_').join(' ');
  return new Date(newDateStr);
}

const cleanUser = (user) => {
  const { _id, name, email, isAdmin, isKitchenStaff } = user
  return {
    _id,
    name,
    email,
    isAdmin,
    isKitchenStaff
  }
}
const getUserFromToken = (token) => {
  jwt.verify(token, 'secret', (err, decode) => {
    if (err) return false
    return decode.body;
  })
}

const dateManupulater = (days) =>{
  //provide no of days to add in current date
  let today = new Date();
  return today.setDate(today.getDate() + days);
}


module.exports = {
  isValidDate,
  removeTimeFromDate,
  convDateStrToDate,
  convDateToDateStr,
  cleanUser,
  getUserFromToken
}
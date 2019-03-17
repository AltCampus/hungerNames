const jwt = require('jsonwebtoken')
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
  console.log(date)
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
//dont use this
const getUserFromToken = async (token) => {
  let user = null;
  await jwt.verify(token, 'secret', (err, decode) => {
    console.log(err, decode, "util")
    if (err) return false
    user = decode.user;
  })
  console.log(user);
  return user;
}

const dateManupulater = (days) => {
  //provide no of days to add in current date
  let today = new Date();
  today = removeTimeFromDate(today);
  return today.setDate(today.getDate() + days);
}


module.exports = {
  isValidDate,
  removeTimeFromDate,
  convDateStrToDate,
  convDateToDateStr,
  cleanUser,
  getUserFromToken,
  dateManupulater
}
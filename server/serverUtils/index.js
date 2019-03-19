const jwt = require('jsonwebtoken');

// DATE UTILS
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



const convDateStrToDate = (dateStr) => {
  return new Date(dateStr);
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
    if (err) return false
    user = decode.user;
  })
  return user;
}

const dateManupulater = (days) => {
  //provide no of days to add in current date
  let today = new Date();
  today.setDate(today.getDate() + days);
  return today;
}




module.exports = {
  isValidDate,
  convDateStrToDate,
  convDateToDateStr,
  cleanUser,
  getUserFromToken,
  dateManupulater
}
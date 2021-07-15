function emailTest(email,success=(data)=>{},error=(data)=>{}) {
  let emailReg = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/;

  if (emailReg.test(email)) {
    success(email)
    return 1
  }
  error(email)
  return 0;
}

function phoneNumberTest(phoneNumber,success=(data)=>{},error=(data)=>{}) {
  let phoneReg = /^[0-9]{9,14}$/;

  if (phoneReg.test(phoneNumber)) {
    success(phoneNumber)
    return 1
  }
  error(phoneNumber)
  return 0;
}

function passwordTest(password,success=(data)=>{},error=(data)=>{}) {
  let passReg = /^[a-zA-Z0-9_.-]{6,20}$/;

  if (passReg.test(password)) {
    success(password)
    return 1;
  }
  error(password)
  return 0
}

module.exports = {
  emailTest,
  phoneNumberTest,
  passwordTest,
}
function boxAlert(mes, it, callback=()=>{}, confirmButtonText='确定') {
  it.$alert(mes, {
    confirmButtonText,
    callback,
  });
}

module.exports = {
  boxAlert,
}
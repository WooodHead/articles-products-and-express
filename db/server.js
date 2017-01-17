function setHeaderVersion(request) {
  request.headers.version = "1.0";
}

function checkHeaderVersion(header) {
  if(header.hasOwnProperty('version')){
    if(header.version === "1.0"){
      return true;
    } else {
        return false;
      }
  } else {
    return false;
  }
}


module.exports = {
  setHeaderVersion: setHeaderVersion,
  checkHeaderVersion: checkHeaderVersion
};
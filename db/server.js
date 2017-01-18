function setHeaderVersion(request) {
  request.headers.version = "1.0";
}

function checkHeaderVersion(header) {
  if(header.hasOwnProperty('version') && header.version === "1.0"){
      return true;
  } else if(header.hasOwnProperty('version') === false){
    return true;
  } else {
    return false;
  }
}



module.exports = {
  setHeaderVersion: setHeaderVersion,
  checkHeaderVersion: checkHeaderVersion
};
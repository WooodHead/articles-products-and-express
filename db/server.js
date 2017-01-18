const fs = require('fs');

let week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function checkHeaderVersion(header) {
  if(header.hasOwnProperty('version') && header.version === "1.0"){
      return true;
  } else if(header.hasOwnProperty('version') === false){
    return true;
  } else {
    return false;
  }
}

function createLogByDate(req) {
  let date = new Date();
  let index = date.getDay();
  let currentDay = week[index];
  fs.writeFile(`./logs/${currentDay}/${date}.log`, `[${req.method}] [${req.url}] [${date}]`, (err) => {
    if (err) throw err;
    console.log(`new log ${date}`);
  });
}

module.exports = {
  checkHeaderVersion: checkHeaderVersion,
  createLogByDate: createLogByDate
};
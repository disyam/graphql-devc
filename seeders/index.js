const seed = require("./seed");

seed()
  .then(() => {
    process.exit(); // eslint-disable-line no-process-exit
  })
  .catch(error => console.log(error));

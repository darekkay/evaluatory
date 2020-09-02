const del = require("del");

/* Clean the destination folder */
module.exports = ({ paths }) => {
  const cleanTask = () => del([paths.destination]);
  cleanTask.displayName = "clean";
  return cleanTask;
};

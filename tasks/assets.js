const { src, dest } = require("gulp");

/* Passthrough assets */
module.exports = ({ paths }) => {
  const assetsTask = () => {
    return src(`${paths.assets.source}/**/*`).pipe(
      dest(paths.assets.destination)
    );
  };
  assetsTask.displayName = "assets";
  return assetsTask;
};

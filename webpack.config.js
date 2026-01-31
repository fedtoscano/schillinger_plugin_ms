const path = require("path");

module.exports = {
  entry: "./src/core/adapter/api.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "schillinger.bundle.js",
    library: {
      name: "SchillingerCore",
      type: "var",
    },
  },
  mode: "development",
  target: "es5",
};

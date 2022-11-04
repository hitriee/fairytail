const { override, addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = override(
  addWebpackAlias({
    "@": path.resolve(__dirname, "src"),
    "@components": path.resolve(__dirname, "src", "components"),
    "@apis": path.resolve(__dirname, "src", "apis"),
    "@assets": path.resolve(__dirname, "src", "assets"),
    "@bgms": path.resolve(__dirname, "src", "assets", "bgms"),
    "@emojis": path.resolve(__dirname, "src", "assets", "emojis"),
    "@images": path.resolve(__dirname, "src", "assets", "images"),
    "@components": path.resolve(__dirname, "src", "components"),
    "@common": path.resolve(__dirname, "src", "components", "common"),
    "@globe": path.resolve(__dirname, "src", "components", "globe"),
    "@intro": path.resolve(__dirname, "src", "components", "intro"),
    "@loading": path.resolve(__dirname, "src", "components", "loading"),
    "@main": path.resolve(__dirname, "src", "components", "main"),
    "@map": path.resolve(__dirname, "src", "components", "map"),
    "@messageCreate": path.resolve(
      __dirname,
      "src",
      "components",
      "messageCreate"
    ),
    "@messageDetail": path.resolve(
      __dirname,
      "src",
      "components",
      "messageDetail"
    ),
    "@messageList": path.resolve(__dirname, "src", "components", "messageList"),
    "@individual": path.resolve(__dirname, "src", "components", "individual"),
    "@screens": path.resolve(__dirname, "src", "screens"),
    "@styles": path.resolve(__dirname, "src", "styles"),
    "@fonts": path.resolve(__dirname, "src", "styles", "fonts"),
  })
);

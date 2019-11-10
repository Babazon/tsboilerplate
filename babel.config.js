
module.exports = {
  presets: [
    "module:metro-react-native-babel-preset"
  ],
  sourceMaps: "inline",
  plugins: [
    [
      "module-resolver", {
        "root": ["./"],
        "extensions": [".js", ".ts", ".tsx", ".ios.js", ".android.js"]
      }
    ],
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true
      }
    ],
    [
      "@babel/plugin-transform-runtime",
      {
        helpers: true,
        regenerator: false
      }
    ],
    "@babel/proposal-object-rest-spread"
  ]
};


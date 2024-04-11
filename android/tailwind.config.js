module.exports = {
  content: [
    "./src/**.{js,jsx}",
    "./src/components/**.{js,jsx}",
    "./src/screens/**.{js,jsx}",
    "./src/components/DeviceItem/**.{js,jsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [require("lightningcss")],
  corePlugins: require("tailwind-rn/unsupported-core-plugins"),
};

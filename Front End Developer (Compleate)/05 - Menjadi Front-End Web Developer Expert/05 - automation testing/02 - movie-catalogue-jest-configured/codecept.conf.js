const { setHeadlessWhen, setCommonPlugins } = require("@codeceptjs/configure");
const { firefox } = require("playwright");
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: "e2e/**/*.test.js",
  output: "e2e/output",
  helpers: {
    Playwright: {
      browser: "chromium",
      // browser: "firefox",
      url: "http://localhost:9010",
      show: true,
    },
  },
  include: {
    I: "./steps_file.js",
  },
  name: "02 - movie-catalogue-jest-configured",
};

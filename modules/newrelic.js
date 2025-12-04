// Source - https://stackoverflow.com/a
// Posted by Daniel von Mirbach
// Retrieved 2025-12-04, License - CC BY-SA 4.0

module.exports = function () {
    this.nuxt.hook("listen", () => {
      require("newrelic");
    });
  };
  
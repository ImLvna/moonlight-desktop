const fs = require("fs");
const { join } = require("path");
/**
 * @param {import("electron-builder").BuildResult} result
 */
module.exports.default = function afterAllArtifactBuild(result) {
  fs.readdirSync(result.outDir).forEach((path) => {
    path = join(result.outDir, path);
    if (!fs.statSync(path).isDirectory()) return;
    if (!path.endsWith("-unpacked")) return;
    path = join(path, "resources");
    fs.renameSync(join(path, "app.asar"), join(path, "_app.asar"));
    fs.mkdirSync(join(path, "app"));
    fs.writeFileSync(
      join(path, "app", "package.json"),
      JSON.stringify({
        name: "moonlightDesktop",
        main: "./injector.js",
        private: true,
      })
    );
    fs.writeFileSync(
      join(path, "app", "injector.js"),
      `require("/home/luna/code/moonlight/moonlight/dist/injector").inject(
      require("path").join(__dirname, "../_app.asar")
    );`
    );

    fs.writeFileSync(
      join(path, "build_info.json"),
      JSON.stringify({
        releaseChannel: "desktop",
      })
    );
  });
};

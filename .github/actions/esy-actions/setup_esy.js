const child_process = require('child_process');
const path = require('path');
const tc = require('@actions/tool-cache');
const homedir = require('os').homedir();

console.log("Install my dependencies");
/*child_process.execSync("npm install", {
  cwd: __dirname
});*/
if (process.platform != "win32")
  child_process.execSync("ls -lAR");
else
  child_process.execSync("tree");


console.log("Install esy globbaly");
child_process.execSync("npm install -g esy");

var Core = require("@actions/core");
var sandbox = Core.getInput("sandbox");
function execSync(command) {
  console.log(`Run "${command}"`);
  child_process.execSync(command);
}
execSync(`esy ${sandbox ? `"@${sandbox}" ` : ""}install`);
execSync(`esy ${sandbox ? `"@${sandbox}" ` : ""}build-dependencies`);
//require(path.join(__dirname, "lib", "js", "src", "setup_esy.bs.js"));
if (process.platform == "win32")
  child_process.execSync("where esy", {
    cwd: __dirname
  });
else
  child_process.execSync("which esy", {
    cwd: __dirname
  });

(async () => {
  const cachedPath = await tc.cacheDir(path.join(homedir, ".esy"), 'esy', '0.5.8');
  core.addPath(cachedPath);
})();

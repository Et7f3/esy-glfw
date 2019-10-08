const child_process = require('child_process');
const path = require('path');

console.log("Install my dependencies");
child_process.execSync("npm install", {
  cwd: __dirname
});

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
[%%bs.raw {|const tool_cache = require("@actions/tool-cache");
const core = require("@actions/core");
const io = require("@actions/io");
const github = require("@actions/github");|}]
module Exec = struct
  external exec: string -> ?arg:string array -> unit -> unit = "exec" [@@bs.module ("@actions/exec", "exec")]
end

module Core = struct
  external getInput: string -> <required: bool> Js.t -> string = "getInput" [@@bs.module ("@actions/core", "core")]

  let getInput env ?(required=false) = getInput env [%bs.obj {
      required
    }]
end

let () = Exec.exec "npm install -g esy" ()
(*
{ HTTPError: [Function: HTTPError],
  downloadTool: [Function: downloadTool],
  extract7z: [Function: extract7z],
  extractTar: [Function: extractTar],
  extractZip: [Function: extractZip],
  cacheDir: [Function: cacheDir],
  cacheFile: [Function: cacheFile],
  find: [Function: find],
  findAllVersions: [Function: findAllVersions] }
package
{ ExitCode: { '0': 'Success', '1': 'Failure', Success: 0, Failure: 1 },
  exportVariable: [Function: exportVariable],
  exportSecret: [Function: exportSecret],
  addPath: [Function: addPath],
  getInput: [Function: getInput],
  setOutput: [Function: setOutput],
  setFailed: [Function: setFailed],
  debug: [Function: debug],
  error: [Function: error],
  warning: [Function: warning] }
package
{ cp: [Function: cp],
  mv: [Function: mv],
  rmRF: [Function: rmRF],
  mkdirP: [Function: mkdirP],
  which: [Function: which] }
package
{ exec: [Function: exec] }
package
{ context:
   Context {
     payload: {},
     eventName: undefined,
     sha: undefined,
     ref: undefined,
     workflow: undefined,
     action: undefined,
     actor: undefined },
  GitHub: [Function: GitHub] }
*)
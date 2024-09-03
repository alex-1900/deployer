const { sync } = require("./sync");

/**
 * 通用的 sync 任务
 * @returns (cb: any) => void
 */
exports.syncTaskCreator = function syncTaskCreator(profile) {
  return (cb) => {
    sync(profile).execute(function (error, code, cmd) {
      if (error) {
        console.error(error)
      }
      cb()
    }, data => {
      console.log(data.toString());
    }, error => {
      console.error(error.toString());
    });
  }
}

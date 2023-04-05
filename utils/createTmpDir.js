const fse = require("fs-extra");

exports.createTmpDir = async (tmpDir) => {
  await fse.ensureDir(tmpDir);
};

require("dotenv").config();

const multer = require("multer");
const path = require("path");
const fse = require("fs-extra");
const Jimp = require("jimp");

const { avatarFileSize } = require("../constants/uploadLimits");
const { NotImageError } = require("../utils/errors");
const { avatarSettings } = require("../constants/avatarSettings");

const tmpDir = path.join(process.cwd(), process.env.TMP_PATH);
const avatarDir = path.join(
  process.cwd(),
  process.env.PUBLIC_PATH,
  process.env.AVATARS_PATH
);

// images API
class ImagesAPI {
  static uploadOne(fieldName) {
    const avatarsStorage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, tmpDir);
      },

      filename: function (req, file, cb) {
        const [origFileName, ext] = file.originalname.split(".");

        const avatarFileName = `${origFileName}.${ext}`;
        cb(null, avatarFileName);

        req.avatarPath = avatarDir + avatarFileName;
      },
    });

    const avatarFileFilter = (req, file, cb) => {
      if (!file.mimetype.startsWith("image/")) {
        cb(new NotImageError("Upload images only!"), false);
        return;
      }
      cb(null, true);
    };

    return multer({
      storage: avatarsStorage,
      fileFilter: avatarFileFilter,
      limits: { fileSize: avatarFileSize },
    }).single(fieldName);
  }

  static async saveAvatar(id, file) {
    await fse.ensureDir(avatarDir);

    // temp file
    const tempAvatarFilePath = path.join(tmpDir, file);
    const tempAvatarFile = await Jimp.read(tempAvatarFilePath);

    // avatar file creation
    const avatarFileName = `${id}.${tempAvatarFile.getExtension()}`;
    const avatarFilePath = path.join(avatarDir, avatarFileName);

    tempAvatarFile
      .cover(avatarSettings.SIZE, avatarSettings.SIZE)
      .write(avatarFilePath);

    // temp file remove
    await fse.remove(tempAvatarFilePath);

    return avatarFileName;
  }
}

module.exports = ImagesAPI;

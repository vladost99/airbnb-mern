const isValidHttpsUrl = require("../utils/validationHTTPSUrl");
const commonErrors = require("../exceptions/common.exceptions");
const path = require("path");
const fs = require("fs");
const imageDownloader = require("image-downloader");
const asyncHandler = require("../utils/async-handler.utils");
const PlaceModel = require("../models/place.model");

const uploadByLink = asyncHandler(async (link) => {
  const fileName = "photo" + Date.now() + ".jpg";

  if (!isValidHttpsUrl(link)) {
    throw commonErrors.InvalidURL();
  }

  const filePath = path.resolve(
    path.join("", `${process.env.FOLDER_IMAGES}/${fileName}`)
  );

  try {
    await imageDownloader.image({
      url: link,
      dest: filePath,
    });
    return fileName;
  } catch (err) {
    throw commonErrors.BadRequest("Сannot be downloaded");
  }
});

const uploadFiles = (files) => {
  const uploads = [];
  for (let i = 0; i < files.length; i++) {
    const { originalname, filename } = files[i];
    const [fileName, ext] = originalname.split(".");
    const newFileName = `${filename}.${ext}`;

    fs.renameSync(
      path.resolve(path.join("", `${process.env.FOLDER_IMAGES}/${filename}`)),
      path.resolve(path.join("", `${process.env.FOLDER_IMAGES}/${newFileName}`))
    );
    uploads.push(newFileName);
  }

  return uploads;
};

const create = asyncHandler(async (userId, body) => {
  return await PlaceModel.create({
    ...body,
    owner: userId,
  });
});

const update = asyncHandler(async (id, userId, body) => {
  let place = await PlaceModel.findById(id);
  if (place.owner.toString() !== userId.toString()) {
    throw commonErrors.BadRequest("Bad Request");
  }

  place.set({ ...place, ...body });
  return await place.save();
});

const getList = asyncHandler(async (findObj = {}) => {
  const list = await PlaceModel.find(findObj);
  return list;
});

const getById = asyncHandler(async (id) => {
  return await PlaceModel.findById(id);
});

module.exports = {
  uploadByLink,
  uploadFiles,
  create,
  update,
  getList,
  getById,
};

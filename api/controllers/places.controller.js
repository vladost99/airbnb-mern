const commonErrors = require("../exceptions/common.exceptions");
const placesService = require("../services/places.service");

const uploadByLink = async (req, res) => {
  const { link } = req.body;
  const filename = await placesService.uploadByLink(link);

  res.json({ filename });
};

const upload = (req, res) => {
  const uploadFiles = placesService.uploadFiles(req.files);
  res.json({ filenames: uploadFiles });
};

const create = async (req, res) => {
  await placesService.create(req.user._id, req.body);
  res.json({ success: true });
};

const update = async (req, res) => {
  await placesService.update(req.params.id, req.user._id, req.body);
  res.json({ success: true });
};

const getMyList = async (req, res) => {
  const list = await placesService.getList({ owner: req.user._id });
  res.json({ list });
};

const getPlaces = async (req, res) => {
  const list = await placesService.getList({});
  res.json({ list });
};

const getPlaceById = async (req, res) => {
  try {
    const place = await placesService.getById(req.params.id);
    res.json(place);
  } catch (err) {
    throw commonErrors.BadRequest();
  }
};

module.exports = {
  uploadByLink,
  upload,
  create,
  getMyList,
  getPlaceById,
  getPlaces,
  update,
};

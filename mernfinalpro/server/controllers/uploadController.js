const { cloudinary } = require("../utils/cloudinaryConfig");
require("dotenv").config();

module.exports.uploadDocument = async (file, documentType) => {
  if (!file) {
    return;
  }
  const result = await cloudinary.uploader.upload(file, {
    upload_preset: process.env.UPLOAD_PRESET,
    resource_type: "auto",
  });

  const uploadFile = {
    documentLink: result.secure_url,
    fileSize: result.bytes,
    documentType: documentType ?? "",
    fileType: result.format,
  };

  return uploadFile;
};

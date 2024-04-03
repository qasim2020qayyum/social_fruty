const { v4: uuidv4 } = require("uuid");
const path = require("path");
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});
const s3 = new AWS.S3();
const processFile = async (file, uploadFolderPath) => {
  const extension = file?.mimetype.split("/")[1];
  const fileName = `${uuidv4()}.${extension}`;
  const bucketName = process.env.AWS_BUCKET_NAME; 
  const fileKey = `uploads/${fileName}`;
  const params = {
    Bucket: bucketName,
    Key: fileKey,
    ContentDisposition: "inline",
    ContentType: file.mimetype,
    Body: file.data,
    ACL: "public-read",
  };
  await s3.upload(params).promise();
  const url = `https://${bucketName}.s3.amazonaws.com/${fileKey}`;
  return {
    name: fileName,
    mimetype: file?.mimetype,
  };
};

const deleteFile = async (fileName) => {
  const bucketName = process.env.AWS_BUCKET_NAME;
  const fileKey = `uploads/${fileName}`;

  const params = {
    Bucket: bucketName,
    Key: fileKey,
  };
  const response = await s3.deleteObject(params).promise();
};
module.exports = { processFile, deleteFile };

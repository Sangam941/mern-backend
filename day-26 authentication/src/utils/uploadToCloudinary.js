import cloudinary from "../config/cloudinary.config.js";
import streamifier from "streamifier";

export const uploadTOCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "Products",
      },
      (error, result) => {
        if (error) return reject("Error while uploading "+error.message);
        
        resolve({
          secure_url: result?.secure_url,
          public_id: result?.public_id
        });
      },
    );

    // convert the buffer file into the readable stream/formate
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// function create
// promise create
// stream = make a uplaod stream to the cloudinary
// convert the buffer into the readable formte and send to the cloudinary

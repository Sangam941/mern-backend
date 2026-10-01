import multer from 'multer'

const storage = multer.memoryStorage()
export const upload = multer({ storage: storage })

// fronted send file
// req.file
// multer capture that frontedn files and helps use to get buffer of that file
// send the buffer file to the cloudinary for image uplaod using cloudinary config.
// coudinary gives us secure_url and pulic_id
// store that link and id in database
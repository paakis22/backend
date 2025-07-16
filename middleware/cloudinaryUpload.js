
// export { storage };

// // cloudinaryUpload.js
// import multer from 'multer';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import { v2 as cloudinary } from 'cloudinary';
// import dotenv from 'dotenv';
// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'classes',
//     resource_type: 'auto',
//   },
       
  

// });

// const upload = multer({ storage });

// export default upload; 



// middleware/cloudinaryUpload.js

export { storage };


import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// 🌩️ Cloudinary config from .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  // Ensure these env vars exist
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 📦 Storage settings for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'classes',   // Optional: folder name in your Cloudinary
    resource_type: 'auto',
    public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,  // Unique filename
  }),
});

// 🎯 Multer instance using Cloudinary storage
const upload = multer({ storage });

export default upload;

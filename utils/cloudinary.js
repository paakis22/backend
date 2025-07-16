// middleware/cloudinaryConfig.js
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'teacher_profiles',
      resource_type: 'auto',
      public_id: `${Date.now()}-${file.originalname}`,
    };
     },

     params: {
    folder: 'modules',
    resource_type: 'raw', // ⬅️ for PDFs
    allowed_formats: ['pdf']
  }

 
});



export { cloudinary, storage };

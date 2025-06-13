import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Ensure 'uploads' folder exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer config
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Upload route
router.post('/', upload.single('image'), (req, res) => {
  res.status(200).json({ imageUrl: `/uploads/${req.file.filename}` });
});

export default router;

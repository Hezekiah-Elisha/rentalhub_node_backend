import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// get uploaded image
router.get('/:filename', (req, res) => {
  const filename = req.params.filename;
  const dir = path.join(__dirname, '../uploads'); // adjust the path as necessary
  res.sendFile(path.join(dir, filename));
});

// // get uploaded image
// router.get('/:filename', (req, res) => {
//   const filePath = 'your/file/path'; // replace with your actual file path
//   res.sendFile(filePath);
// });

export default router;
// uploads\property-1712503363130.png
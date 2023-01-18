var express = require('express');
var router = express.Router();
const userController = require('../controller/userController');
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `files/${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage })

router.get('/', userController.index);
router.get('/details/:id', userController.details);
router.get('/add', userController.add);
router.get('/view', userController.view);
router.get('/editBlog/:id', userController.editBlog)
router.delete('/deleteBlog', userController.deleteBlog);
router.post('/addBlog', upload.single('image'), userController.addBlog)
router.put('/updateBlog', upload.single('image'), userController.updateBlog)
module.exports = router;

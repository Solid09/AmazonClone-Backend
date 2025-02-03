const router = require("express").Router();
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
   destination: function(req, file, cb){
      cb(null, 'uploads/');
   },
   filename: function(req, file, cb){
      cb(null, file.originalname);
   }
});
const upload = multer({ storage: storage });

router.post('/upload/image', upload.single('pfImage'),async (req, res) => {
   try{
      console.log("Request made to upload image!");

      if(!req.file){
         return res.status(400).json({ success: false, message: "No image data!" });
      }

      const imageUrl = `http://localhost:5000/${req.file.filename}`;
      

      return res.status(200).json({ success: true, message: "Image uploaded!", imageUrl: imageUrl });
   }
   catch(err){
      return res.status(500).json({
         message: "Something went wrong, please try again later",
         error: err.message,
      });
   }
});

router.delete('/delete/image',async (req, res) => {
   try{
      console.log("Request made to delete image!");

      fs.unlinkSync(`uploads/${req.body.imageName}`);

      return res.status(200).json({ success: true, message: "Image deleted!" });
   }
   catch(err){
      return res.status(500).json({
         message: "Something went wrong, please try again later",
         error: err.message,
      });
   }
});

module.exports = router;
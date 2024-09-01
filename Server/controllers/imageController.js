const ImageModel = require('../models/imageModel')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
filename:function(req,file,cb){
    const uniqueSuffix = Date.now()+'-'+Math.round(Math.random()*1E9)
    cb(null,uniqueSuffix+file.originalname)
 }
})
const upload = multer({ storage: storage }).single('image')
exports.uploadImage = async(req,res)=>{
    upload(req,res,async(err)=>{
        if(err){
            return res.status(400).json({message:err.message})
        }
        try {
            const {path,filename} = req.file
            const image = new ImageModel({path,filename})
            await image.save()
            res.status(201).json({message:'Image uploaded successfully',image})
        } catch (error) {
            console.error('Error uploading image:', error);
      res.status(500).json({ message: 'Failed to upload image', error }); 
        }
    }
       
    )
}


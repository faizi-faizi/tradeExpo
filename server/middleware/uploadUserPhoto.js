const multer = require("multer")
const path = require("path")
const fs = require("fs")

const uploadDir = path.join(__dirname, "../public/userPhotos");
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, {recursive: true});
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename:(req,file,cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `user-${uniqueName}${ext}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) =>{
        const allowed = ["image/jpeg", "image/png"];
        if(!allowed.includes(file.mimetype)){
            cb(new Error("Only JPG and PNG allowed"), false);
        }else cb(null,true);
    }
});

module.exports = upload;
const multer = require("multer");

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,`uploads`);
    },
    filename : function(req,file,cb){
        const extension = file.originalname.split(".")[1];
        const name = file.originalname.split(".")[0];
        cb(null,name + Date.now() + "." + extension );
    }
});

const imageFilter = (req,file,cb)=>{
    if(!file.originalname.match(/\.(jpg|JPG|png|PNG|jpeg|JPEG)$/)){
        cb(null,false);
    }
    else{
        cb(null,true);
    }
}

const upload = multer({storage : storage , fileFilter : imageFilter});

module.exports = upload;
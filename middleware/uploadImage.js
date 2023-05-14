const multer = require('multer');

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        if( file.mimetype === 'image/jpg'||
            file.mimetype === 'image/png'||
            file.mimetype === 'image/jpeg') {
                cb(null, 'public/images');
        } else{
            cb(new Error('not image', false))
        }
    },
    filename : (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
})

module.exports = multer({ storage: storage }).single('image')
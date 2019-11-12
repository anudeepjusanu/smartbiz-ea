const cloudinary = require('cloudinary');
cloudinary.config({
cloud_name: 'aprythurajyam',
api_key: '146542843283495',
api_secret: 'AYDnLnVgVAHw9kNkld8_qG-rPsg'
});
exports.uploads = (file) =>{
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) =>{
        resolve({url: result.url, id: result.public_id})
        }, {resource_type: "auto"})
    });
}
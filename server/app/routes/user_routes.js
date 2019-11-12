var express = require('express');
const router = express.Router();
var userController = require('../controllers/v1/users_controller');
var upload = require('../../multerConfig');


router.route('/')
    .get(userController.GetUsers);
router.route('/current')
    .get(userController.GetCurrentUser);
router.route('/farmers')
    .get(userController.GetAllFarmers);
router.route('/executives')
    .get(userController.GetAllExecutives);
router.route('/executives')
    .post(userController.CreateExecutives);
router.route('/')
    .put(userController.UpdateUser);
router.route('/')
    .delete(userController.DeleteUser);
router.route('/uploadImage')
    .post(upload.any(), userController.UploadImages);
module.exports = router;


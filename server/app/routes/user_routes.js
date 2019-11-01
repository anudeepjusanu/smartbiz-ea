var express = require('express');
const router = express.Router();
var userController = require('../controllers/v1/users_controller');

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
module.exports = router;


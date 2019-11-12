var service = require('../../services');
var userController = {};
userController.GetUsers = GetUsers;
userController.UpdateUser = UpdateUser;
userController.DeleteUser = DeleteUser;
userController.GetCurrentUser = GetCurrentUser;
userController.GetAllFarmers = GetAllFarmers;
userController.GetAllExecutives = GetAllExecutives;
userController.CreateExecutives = CreateExecutives;
userController.UploadImages = UploadImages;
module.exports = userController;


function GetUsers(req, res) {
    if (req.query.id) {
        GetUserById(req, res);
    } else if (req.query.mobile) {
        GetUserByMobile(req, res);
    } else if (req.query.executiveId) {
        GetUserByExecutiveId(req, res);
    } else {
        service.user_service.GetFarmers().then(result => {
            res.json(result);
        }, error => {
            res.json(error);
        });
    }
}

function GetUserById(req, res) {
    service.user_service.GetUserById(req.query.id).then(result => {
        res.json(result);
    }, error => {
        res.json(error);
    });
}

function GetUserByMobile(req, res) {
    service.user_service.GetUserByMobile(req.query.mobile).then(result => {
        res.json(result);
    }, error => {
        res.json(error);
    });
}

function GetUserByExecutiveId(req, res) {
    service.user_service.GetUserByExecutiveId(req.query.executiveId).then(result => {
        res.json(result);
    }, error => {
        res.json(error);
    });
}


function UpdateUser(req, res) {
    service.user_service.UpdateUser(req.query.id, req.body).then(result => {
        res.json(result);
    }, error => {
        res.json(error);
    })
}

function DeleteUser(req, res) {
    service.user_service.DeleteUser(req.query.id).then(result => {
        res.json(result);
    }, error => {
        res.json(error);
    });
}

function GetCurrentUser(req, res) {
    service.user_service.GetUserById(req.user.sub)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function GetAllFarmers(req, res) {
    if (req.query.id) {
        GetUserById(req, res);
    } else {
        service.user_service.GetFarmers().then(result => {
            res.json(result);
        }, error => {
            res.json(error);
        });
    }
}

function GetAllExecutives(req, res) {
    if (req.query.id) {
        GetUserById(req, res);
    } else {
        service.user_service.GetExecutives().then(result => {
            res.json(result);
        }, error => {
            res.json(error);
        });
    }
}

function CreateExecutives(req, res) {
    req.body.password = "samplePassword";
    req.body.role = "EXECUTIVE";
    service.user_service.CreateUser(req.body).then(result => {
        res.json(result);
    }, error => {
        res.json(error);
    });
}

function UploadImages(req, res) {
    console.log(req.files);
    console.log("ANUDEEP");
    service.user_service.uploadImage(req.query.id, req.files[0].path, req.body.type).then(result => {
        res.json(result);
    }, error => {
        res.json(error);
    });
}




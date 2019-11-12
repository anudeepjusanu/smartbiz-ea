
var model = require('../models');
var _ = require('underscore');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var { secret } = require('../../../config');
var cloud = require('../../../cloudinaryConfig');


var service = {};
service.Authenticate = Authenticate;
service.GetUsers = GetUsers;
service.GetFarmers = GetFarmers;
service.GetExecutives = GetExecutives;
service.GetAdmins = GetAdmins;
service.GetUserById = GetUserById;
service.GetUserByMobile = GetUserByMobile;
service.GetUserByExecutiveId = GetUserByExecutiveId;
service.CreateUser = CreateUser;
service.UpdateUser = UpdateUser;
service.DeleteUser = DeleteUser;
service.uploadImage = uploadImage;
module.exports = service;


function Authenticate(mobile, password) {
    return new Promise((resolve, reject) => {
        model.Users.findOne({ mobile: mobile, "active": true }, function (err, user) {
            if (err) reject(err.name + ': ' + err.message);

            if (user && user.hash && password && bcrypt.compareSync(password, user.hash)) {
                // authentication successful
                resolve({ "token": jwt.sign({ sub: user._id }, secret) });
            } else {
                // authentication failed
                resolve();
            }
        });
    });
}

function GetUsers() {
    return new Promise((resolve, reject) => {
        model.Users.find((err, docs) => {
            err ? reject(err) : resolve(docs);
        });
    });
}

function GetFarmers() {
    return new Promise((resolve, reject) => {
        model.Users.find({ 'role': 'FARMER' }, (err, docs) => {
            err ? reject(err) : resolve(docs);
        });
    });
}

function GetExecutives() {
    return new Promise((resolve, reject) => {
        model.Users.find({ 'role': 'EXECUTIVE' }, (err, docs) => {
            err ? reject(err) : resolve(docs);
        });
    });
}

function GetAdmins() {
    return new Promise((resolve, reject) => {
        model.Users.find({ 'role': 'admin' }, (err, docs) => {
            err ? reject(err) : resolve(docs);
        });
    });
}

function GetUserById(id) {
    return new Promise((resolve, reject) => {
        model.Users.findById(id, (err, docs) => {
            if (err) {
                reject(err)
            } else {
                delete docs.hash;
                resolve(docs);
            }
        });
    });
}

function GetUserByMobile(mobile) {
    return new Promise((resolve, reject) => {
        model.Users.find({ 'mobile': mobile }, (err, docs) => {
            if (err) {
                reject(err)
            } else {
                delete docs.hash;
                resolve(docs[0]);
            }
        });
    });
}

function GetUserByExecutiveId(executiveId) {
    return new Promise((resolve, reject) => {
        model.Users.find({ 'executiveId': executiveId }, (err, docs) => {
            if (err) {
                reject(err)
            } else {
                delete docs.hash;
                resolve(docs);
            }
        });
    });
}

function CreateUser(user) {
    var set = {
        ...user
    };
    set.hash = bcrypt.hashSync(user.password, 10);
    delete set.password;
    return new Promise((resolve, reject) => {
        model.Users.create(set, function (err, info) {
            err ? reject(err) : resolve(info);
        });
    })
}

function UpdateUser(id, user) {
    var set = {
        ...user
    };
    if (user.password) {
        set.hash = bcrypt.hashSync(user.password, 10);
        delete set.password;
    }
    return new Promise((resolve, reject) => {
        model.Users.findOneAndUpdate({ _id: id }, { $set: user }, { new: true }, (err, doc) => {
            err ? reject(err) : resolve(doc);
        });
    })
}

function DeleteUser(id) {
    return new Promise((resolve, reject) => {
        model.Users.findOneAndUpdate({ _id: id }, { $set: { "active": false } }, { new: true }, (err, doc) => {
            err ? reject(err) : resolve(doc);
        });
    });
}

function uploadImage(userId, file, type){
    return new Promise((resolve, reject) =>{
        cloud.uploads(file).then((result) => {
            var imageDetails = {};
            imageDetails[type] = result.url;
            imageDetails[type+"Id"] = result.id;
            model.Users.findOneAndUpdate({ _id: userId }, { $set: imageDetails }, { new: true }, (err, doc) => {
                err ? reject(err) : resolve(doc);
            });
        });
    })
}


const express = require("express")
const userController = require("../controllers/usersCtrl");
const isAuth = require("../middlewares/isAuth");

const userRouter = express.Router();
//!Register
userRouter.post('/api/v1/users/register', userController.register);
//!Login
userRouter.post('/api/v1/users/login', userController.login);
//!Profile
userRouter.get('/api/v1/users/profilee', isAuth, userController.profile);
//!change password
userRouter.post('/api/v1/users/change-password', isAuth, userController.changeUserPassword);
//!update profile
userRouter.put('/api/v1/users/update-profile', isAuth, userController.updateUserPofile);
module.exports = userRouter;


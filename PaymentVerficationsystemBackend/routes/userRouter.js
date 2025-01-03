const express = require('express');
const app = express();
const router = express.Router();

const userController = require('./../Controllers/userController');
const authoController = require('../Controllers/authoController');

app.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});


router.post('/login',authoController.login);
router.get('/logout',authoController.logout);

router.post('/forgetPassword', authoController.forgetPassword);
router.patch('/resetPassword',authoController.resetPassword);

// Protect all routes after this middleware
router.use(authoController.authenticationJwt);

router.post('/signup', authoController.uploadUserImage,authoController.signup);
router.patch('/updatePassword',authoController.updatePassword);
router.patch('/updateMe',authoController.uploadUserImage,userController.updateMe);
  
//router.use(authoController.requiredRole('admin'));

router.patch('/resetPasswordByAdmin',authoController.resetPasswordByAdmin);

router.route('/')
      .get(userController.getAllUsers)
      .delete(userController.deleteUsers)
router.route('/:id')
  .get(userController.getUser)
  .patch(authoController.uploadUserImage,userController.updateUser)
  .delete(userController.deleteUser);

router.route('/active-deactive/:userId').put(userController.activateDeactiveUser);
router.route('/sendEmails').post(userController.sendEmailMessages)

router.post('/importUsers',userController.uploadUserFile,userController.importUsers);
router.get('/exportUsers',userController.exportUsers);

module.exports = router;

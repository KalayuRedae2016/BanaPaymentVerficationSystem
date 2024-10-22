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
//router.use(authoController.authenticationJwt);
router.post('/signup', authoController.uploadUserImage,authoController.signup);// Route to upload user images
router.post('/login',authoController.login);
//router.get('/logout',autoController.logout);

router.post('/forgetPassword', authoController.forgetPassword);
router.patch('/resetPassword',authoController.resetPassword);
router.patch('/resetPasswordByAdmin',authoController.resetPasswordByAdmin);

// Protect all routes after this middleware
//router.use(authoController.authenticationJwt);

router.patch('/updatePassword',authoController.updatePassword);
//router.get('/me', userController.getMe, userController.getUser);
//router.route('/updateMe').patch(authoController.uploadUserImage,authoController.resizeUserPhoto,userController.updateMe)
    
//router.use(authoController.requiredRole('admin'));

router.post('/importUsers',userController.uploadUserFile,userController.importUsers);
router.get('/exportUsers',userController.exportUsers);

router.route('/').get(userController.getAllUsers);
router.route('/:id')
  .get(userController.getUser)
  .patch(authoController.uploadUserImage,userController.updateUser)

router.route('/active-deactive').put(userController.activateDeactiveUser);
router.route('/sendEmails').post(userController.sendEmailMessages)



module.exports = router;

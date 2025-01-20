const User = require('../Models/userModel');
const bcrypt = require('bcrypt');
const { sendEmail } = require('./email');
const catchAsync = require('./catchAsync');
const AppError = require('./appError');

const createDefaultAdminUser = catchAsync(async () => {
    const existingAdmin = await User.findOne({ role: 'SuperAdmin' });
    if(existingAdmin){
      return null
    }
    const hashedPassword = await bcrypt.hash('super1234', 12);
      const defaultAdmin = await User.create({
        userCode: 'BM0001',
        password: hashedPassword, // Static password for the initial login
        firstName:"SuperAdmin",
        lastName:"User",
        role: 'SuperAdmin',
        phoneNumber:"+251943662611",    
        email: 'tadiosgb26@gmail.com',
        changePassword:true
      });
      
      const hashedPassword1 = await bcrypt.hash('admin1234', 12);
      await User.create({
        userCode: 'BM0002',
        password: hashedPassword1, // Static password for the initial login
        firstName:"Admin",
        lastName:"Default Admin",
        role: 'Admin',
        phoneNumber:"+251943662612",   
        email: 'kalayuredae2016@gmail.com',
        changePassword:true
      
      });

      // console.log('Default Admin User Created:', defaultAdmin.userCode);
      const subject = 'Welcome to the system';
      const message = `A default admin user has been created for you.\nUserCode: admin\nPassword: admin1234\nPlease change your password after your first login.`;
      await sendEmail({ email: defaultAdmin.email, subject, message });
      return defaultAdmin;
});

const changePasswordFlag = catchAsync(async (user, passwordChanger) => {
  let changePassword = false;

  // Validate user object
  if (!user || typeof user !== 'object') {
    throw new Error('User object is missing or invalid');
  }

  // Destructure necessary properties from user
  const { isFirstLogin, _id, passwordChangedBy } = user;

  // If passwordChanger is not provided, we only check first login
  if (!passwordChanger) {
    if (isFirstLogin) {
      changePassword = true; // User needs to change password on first login
    }
    return changePassword;
  }

  // Destructure the role from passwordChanger and check for missing role
  const { role } = passwordChanger;

  if (!role) {
    throw new Error('Password changer is missing the role field');
  }

  // Check if password was changed by someone else (Admin or SuperAdmin)
  if (passwordChangedBy && !_id.equals(passwordChangedBy) && (role === 'Admin' || role === 'SuperAdmin')) {
    changePassword = true; // Password changed by Admin or SuperAdmin
  }

  return changePassword;
});


module.exports = {createDefaultAdminUser,changePasswordFlag};

const User = require('../Models/userModel');
const bcrypt = require('bcrypt');
const { sendEmail } = require('./email');
const catchAsync = require('./catchAsync');

const createDefaultAdminUser = catchAsync(async () => {
    const existingAdmin = await User.findOne({ role: 'Admin' });
    if(existingAdmin){
      return null
    }
    const hashedPassword = await bcrypt.hash('admin1234', 12);
      const defaultAdmin = await User.create({
        userCode: 'BM0001',
        password: hashedPassword, // Static password for the initial login
        firstName:"Admin",
        lastName:"User",
        role: 'Admin',
        phoneNumber:"0909090909",
        email: 'kalayuredae2016@gmail.com',
      });
      // console.log('Default Admin User Created:', defaultAdmin.userCode);
      const subject = 'Welcome to the system';
      const message = `A default admin user has been created for you.\nUserCode: admin\nPassword: admin1234\nPlease change your password after your first login.`;
      await sendEmail({ email: defaultAdmin.email, subject, message });
      return defaultAdmin;
});

module.exports = createDefaultAdminUser;

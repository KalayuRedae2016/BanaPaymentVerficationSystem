const User = require('../Models/userModel');
const bcrypt = require('bcrypt');
const { sendEmail } = require('./email');
const catchAsync = require('./catchAsync');

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
        phoneNumber:"09090909091",    
        email: 'tadiosgb26@gmail.com',  
      });
      
      const hashedPassword1 = await bcrypt.hash('admin1234', 12);
      await User.create({
        userCode: 'BM0002',
        password: hashedPassword1, // Static password for the initial login
        firstName:"Defaul tAdmin",
        lastName:"Default Admin",
        role: 'Admin',
        phoneNumber:"09090909091",
        email: 'kalayuredae2016@gmail.com', 
      
      });

      // console.log('Default Admin User Created:', defaultAdmin.userCode);
      const subject = 'Welcome to the system';
      const message = `A default admin user has been created for you.\nUserCode: admin\nPassword: admin1234\nPlease change your password after your first login.`;
      await sendEmail({ email: defaultAdmin.email, subject, message });
      return defaultAdmin;
});

module.exports = createDefaultAdminUser;

const app = require("./index");
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const createDefaultAdminUser = require('./utils/setupDefaultUser'); // Import the function

dotenv.config();
connectDB();

// Create an async function to initialize the server
async function initializeServer() {
  try {
    // Ensure the default admin user is created before starting the server
    await createDefaultAdminUser();
    console.log('Default admin user created successfully');

    // Start the server after ensuring the default user is created
    const PORT = process.env.PORT || 8081;
    const server = app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
      console.log(`Error: ${err.message}`);
      console.log('Shutting down the server due to Unhandled Promise Rejection');
      server.close(() => {
        process.exit(1);
      });
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (err) => {
      console.log(`Error: ${err.message}`);
      console.log('Shutting down the server due to Uncaught Exception');
      server.close(() => {
        process.exit(1);
      });
    });
  } catch (err) {
    console.error('Error initializing the server:', err);
    process.exit(1);
  }
}

// Start the initialization process
initializeServer();

app.get('/', (req, res) => {
  res.send('Welcome to the Payment Verification System API');
});



// Push an existing folder

// cd existing_folder
// git init --initial-branch=main
// git remote add gitlab https://gitlab.com/Kalayuredae/payment-verfication-system-backend.git
          //or(consider the gitlab and origin)
//git remote add origin https://github.com/KalayuRedae2016/payment-verfication-system-backend.git
// git add .
// git commit -m "Initial commit"
// git push --set-upstream origin main

//rm .git/index.lock    -> to remove locked file

//git status
//git branch
//git fetch
//git log

//git branch branchName-> create branch
//git checkout -b branchName-> create and switch branch
//git merge branchName

//push to both remotes at once for the above remote url
// git push origin main
// git push gitlab main


//Verify the Remotes that are configured correctly
// git remote -v

// Remove the Existing Remote
// git remote remove github
// git remote remove gitlab

//git pull origin main -> pull the changes
//git pull gitlab main -> 
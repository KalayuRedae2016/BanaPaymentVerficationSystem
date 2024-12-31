const https = require("https");
const http = require("http");
const fs = require("fs");
const dotenv = require("dotenv");
const app = require("./index");
const connectDB = require("./config/db");
const createDefaultAdminUser = require("./utils/setupDefaultUser"); // Import the function

// Load environment variables based on the NODE_ENV
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
dotenv.config({ path: envFile });
connectDB();

const initializeServer = async () => {
  try {
    // Ensure the default admin user is created before starting the server
    await createDefaultAdminUser();
    console.log("Default admin user created successfully");

    const PORT = process.env.PORT || 8081;
    const SSL = process.env.SSL

    if (SSL==="true") {
      // Load SSL credentials from the environment variables
      const SSL_KEY_PATH = process.env.SSL_KEY_PATH || "/etc/letsencrypt/live/banapvs.com/privkey.pem";
      const SSL_CERT_PATH = process.env.SSL_CERT_PATH || "/etc/letsencrypt/live/banapvs.com/fullchain.pem";

      // Ensure the paths are valid and the files exist
      const key = fs.readFileSync(SSL_KEY_PATH, "utf8");
      const cert = fs.readFileSync(SSL_CERT_PATH, "utf8");

      // Start HTTPS server
      https.createServer({ key, cert }, app).listen(PORT, () => {
        console.log(`HTTPS Server is running on https://localhost:${PORT}`);
      });
    } else {
      // Start HTTP server
      http.createServer(app).listen(PORT, () => {
        console.log(`HTTP Server is running on http://localhost:${PORT}`);
      });
    }

    // Handle unhandled promise rejections
    process.on("unhandledRejection", (err) => {
      console.log(`Error: ${err.message}`);
      console.log("Shutting down the server due to Unhandled Promise Rejection");
      process.exit(1);
    });

    // Handle uncaught exceptions
    process.on("uncaughtException", (err) => {
      console.log(`Error: ${err.message}`);
      console.log("Shutting down the server due to Uncaught Exception");
      process.exit(1);
    });
  } catch (err) {
    console.error("Error initializing the server:", err);
    process.exit(1);
  }
};

// Start the initialization process
initializeServer();

app.get("/", (req, res) => {
  res.send("Welcome to the Payment Verification System API");
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
const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(bankName) {
  if (!bankName) {
    throw new Error('Bank name is required');
  }
  const SECRET_KEYS={
    "LIB":"LIB123456789",
    "WEGAGEB":"WEGAGEn123456789",
    "CBE":"CBE123456789"
    }

  // Parse the JSON string stored in process.env.SECRET_KEYS
  // const secretKeys = JSON.parse(SECRET_KEYS);
  // console.log(secretKeys)

  const payload = { bankName };
  const secretKey = SECRET_KEYS[bankName.toUpperCase()];
  if (!secretKey) {
    throw new Error(`No secret key found for bankName: ${bankName}`);
  }

  const token = jwt.sign(payload, secretKey, { algorithm: 'HS256' });
  return token;
}

// Generate a token for LIB
const LIB_Token = generateToken("LIB");
//console.log("LIB_Token:", LIB_Token);

const fs = require("fs");
process.loadEnvFile();

const { getToken } = require("sf-jwt-token");

//const privateKey = fs.readFileSync("certs/private.pem").toString("utf8");
const privateKey = Buffer.from(process.env.PRIVATE_KEY, "base64").toString("utf8");

// Function to generate a JWT token
async function generateToken() {
  try {
    const token = await getToken({
      iss: process.env.CONSUMER_ID,
      sub: process.env.SALESFORCE_USERNAME,
      aud: process.env.LOGIN_URL,
      privateKey: privateKey,
    });
    //console.log("Generated token:", token);
    //console.log("Generated token:", token.access_token);
    return { instanceUrl: token.instance_url, accessToken: token.access_token };
  } catch (error) {console.error("Error generating token:", error.message);
    throw error; 
    }
}

module.exports = { generateToken };

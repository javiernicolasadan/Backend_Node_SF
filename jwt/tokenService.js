const fs = require('fs');
process.loadEnvFile() 

const { getToken } = require('sf-jwt-token')
const privateKey = fs.readFileSync('private.pem').toString('utf8')

// Function to generate a JWT token
async function generateToken () {
    const token = await getToken({
      iss: process.env.CONSUMER_ID,
      sub: process.env.SALESFORCE_USERNAME,
      aud: process.env.LOGIN_URL,
      privateKey: privateKey
    })
   
    console.log(token)
  }
  
  module.exports = { generateToken };
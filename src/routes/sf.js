const express = require("express");
const router = express.Router();
const jsforce = require("jsforce");
const {generateToken} = require("../../jwt/tokenService");

router.get("/", async (req, res) => {
  try {
    const result = await conn.query("SELECT Id, Name FROM Account LIMIT 1");
    //console.log("Success. Results:", result.records);
    res.json({
      message: "Conexión con Salesforce exitosa",
      records: result.records,
    });
  } catch (err) {
    console.error("Error executing consult:", err);

    res.status(500).json({
      message: "Error connecting to Salesforce",
      error: err.message,
    });
  }
});
router.post("/commuting", async (req, res) => {
  
  //console.log("Datos recibidos (POST):", req.body);
  const { name, company, startDate, endDate, distance } = req.body;

  try {
    const { instanceUrl, accessToken } = await generateToken();

    const conn = new jsforce.Connection({
      instanceUrl: instanceUrl,
      accessToken: accessToken,
    });

    //console.log("Token obteined:", accessToken, instanceUrl);

    const result = await conn.sobject("Ground_Travel_Energy_Use__c").create({
      Name: name, 
      Company__c: company, 
      StartDate__c: startDate, 
      EndDate__c: endDate, 
      Distance__c: distance, 
    });
    //console.log("Register obteined. Success.:", result);

    if (result.success) {
      console.log("Register obtained. Success.:", result.id);
      res.json({
        message: "Register inserted. Success.",
        id: result.id,
      });
    } else {
      console.error("Error inserting register:", result.errors);
      res.status(500).json({
        message: "Error inserting register",
        errors: result.errors,
      });
    }
  } catch (err) {
    console.error("Error inserting in Salesforce:", err);
    res.status(500).json({
      message: "Internal error inserting in Salesforce",
      error: err.message,
    });
  }
});

module.exports = router;

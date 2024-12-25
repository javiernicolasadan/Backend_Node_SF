const express = require("express");
const router = express.Router();
const jsforce = require("jsforce");
const {generateToken} = require("../../jwt/tokenService");

// const conn = new jsforce.Connection({
//     instanceUrl : process.env.INSTANCE_URL,
//     accessToken : process.env.ACCESS_TOKEN
//   });

router.get("/", async (req, res) => {
  try {
    const result = await conn.query("SELECT Id, Name FROM Account LIMIT 1");
    console.log("Consulta exitosa. Resultados:", result.records);
    res.json({
      message: "Conexión con Salesforce exitosa",
      records: result.records,
    });
  } catch (err) {
    console.error("Error al ejecutar la consulta:", err);

    res.status(500).json({
      message: "Error al conectar con Salesforce",
      error: err.message,
    });
  }
});
router.post("/commuting", async (req, res) => {
  //res.json({ message: "Datos recibidos correctamente", data: req.body });
  console.log("Datos recibidos (POST):", req.body);
  const { name, company, startDate, endDate, distance } = req.body;

  try {
    const { instanceUrl, accessToken } = await generateToken();

    const conn = new jsforce.Connection({
      instanceUrl: instanceUrl,
      accessToken: accessToken,
    });

    console.log("Token obtenido:", accessToken, instanceUrl);

    const result = await conn.sobject("Ground_Travel_Energy_Use__c").create({
      Name: name, // Campo estándar "Name"
      Company__c: company, // Campo personalizado "Company__c"
      StartDate__c: startDate, // Campo personalizado "StartDate__c"
      EndDate__c: endDate, // Campo personalizado "EndDate__c"
      Distance__c: distance, // Campo personalizado "Distance__c"
    });
    console.log("Registro insertado con éxito:", result);

    if (result.success) {
      console.log("Registro insertado con éxito:", result.id);
      res.json({
        message: "Registro insertado con éxito",
        id: result.id,
      });
    } else {
      console.error("Error al insertar el registro:", result.errors);
      res.status(500).json({
        message: "Error al insertar el registro",
        errors: result.errors,
      });
    }
  } catch (err) {
    console.error("Error al insertar en Salesforce:", err);
    res.status(500).json({
      message: "Error interno al insertar en Salesforce",
      error: err.message,
    });
  }
});

module.exports = router;

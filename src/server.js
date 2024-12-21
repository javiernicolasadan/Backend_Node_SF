const express = require('express'); 
const app = express(); 
const cors = require("cors"); 
const bodyParser = require("body-parser");
app.use(cors()); 
app.use(bodyParser.json()); 

const indexRoutes = require('./routes/index');
const tokenRoutes = require('./routes/token');
const salesforceRoutes = require('./routes/sf');


// Load environment variables from .env file
process.loadEnvFile() 
const port = process.env.port || 3000;

app.use('/', indexRoutes);
app.use('/token', tokenRoutes);
app.use('/sf', salesforceRoutes);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log('Routes:');
  console.log(app._router.stack.filter(r => r.route).map(r => r.route.path));
});

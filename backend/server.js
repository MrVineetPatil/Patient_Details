let express = require('express'),
   path = require('path'),
   mongoose = require('mongoose'),
   cors = require('cors'),
 //  http = require('http'),
   bodyParser = require('body-parser'),
   dbConfig = require('./database/db'); //added

// Connecting with mongo db
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
   useCreateIndex: true,useNewUrlParser: true
}).then(() => {
      console.log('Database sucessfully connected')
   },
   error => {
      console.log('Database could not connected: ' + error)
   }
)

// Setting up port with express js
const patientRoute = require('./routes/patient.route');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: false
}));
//app.use(express.static(__dirname + '/dist/angular-app'));//added
app.use(cors()); 
app.use(express.static(path.join(__dirname, '/dist/angular-app')));
app.use('/', express.static(path.join(__dirname, '/dist/angular-app')));
app.use('/api', patientRoute)
app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));//added

// Create port
const HOST = '0.0.0.0'
const PORT = process.env.PORT || 4000;
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
//const server = http.createServer(app);//added

// Find 404 and hand over to error handler
app.use((req, res, next) => {
   next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; 
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});
//work here

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const history = require('connect-history-api-fallback');

const dentalClinicRoute = require('./routes/dentalClinics')
const timeSlotsController = require('./controllers/timeSlots')
const dateController = require('./controllers/dates');
const passCodeController = require('./controllers/passcode');

require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// Connection to MongoDB Atlas database
const uri = process.env.URI
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
const connection = mongoose.connection
connection.once('open', () => {
  console.log('MongoDB database connection established successfully 🥳')
})

app.use(morgan('dev'));
// Enable cross-origin resource sharing for frontend must be registered before api
app.options('*', cors());
app.use(cors());

// Router middleware
app.use('/api/dentalClinics', dentalClinicRoute)
app.use(timeSlotsController)
app.use(dateController)
app.use(passCodeController)

// Catch all non-error handler for api (i.e., 404 Not Found)
app.use('/api/*', function (req, res) {
  res.status(404).json({ 'message': 'Not Found' });
});

app.use(history());

var root = path.normalize(__dirname + '/..');
var client = path.join(root, 'client', 'dist');
app.use(express.static(client));


var env = app.get('env');
// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next) {
    console.error(err.stack);
    var err_res = {
        'message': err.message,
        'error': {}
    };
    if (env === 'development') {
        err_res['error'] = err;
    }
    res.status(err.status || 500);
    res.json(err_res);
});


const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})

server.on('upgrade', (request, socket, head) => {
  wsS.handleUpgrade(request, socket, head, socket => {
    wsS.emit('connection', socket, request)
  })
})

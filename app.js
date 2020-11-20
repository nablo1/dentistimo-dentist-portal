const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI;
const port = process.env.PORT;
const host = process.env.HOST

//const dentistsControllers = require('./routes/dentists');

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
});

const app = express();
app.use(bodyParser.json());

//app.use('/api/dentists',dentistsControllers);

// Middleware to recognize the incoming Request Object as a JSON Object
// HTTP request logger
app.use(morgan('dev'));
// Enable CORS
app.options('*', cors());
app.use(cors());

app.listen(port, function(err) {
    if (err) throw err;
    console.log(`App listening at http://localhost:${port}`)
});

module.exports = app;




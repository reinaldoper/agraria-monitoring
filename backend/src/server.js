const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('../src/routes/auth');
const deviceRoutes = require('../src/routes/devices');
const commandRoutes = require('../src/routes/commands');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/', authRoutes);
app.use('/devices', deviceRoutes);
app.use('/commands', commandRoutes);

module.exports = app;

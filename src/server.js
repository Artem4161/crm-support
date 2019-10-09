const express = require('express');
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const { port, host, swagger } = require('./config');
const { LoggerComponent } = require('./components');
const { connectDatabase } = require('./db');
const routes = require('./routes');

const { NODE_ENV, PORT, HOST } = process.env;

global.Logger = LoggerComponent;

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
if (NODE_ENV === 'development') {
  app.use('/api/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerJSDoc(swagger));
  });
  app.use('/api-doc', express.static(`${__dirname}/static/api-doc`)); // documentation
}
app.use(routes);

app.listen(PORT || port, HOST || host, () => {
  Logger.server(`Server has been started on ${host}:${port}`);
});

connectDatabase();

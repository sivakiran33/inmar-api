const express = require('express');
const config = require('./configs');
const routes = require('./routes');

const app = express();
const router = express.Router();

routes.loadAPIs(router);

const base = config.SERVER.BASE_URL + '/' + config.SERVER.VERSION;
app.use(base, router);

app.listen(config.SERVER.PORT, () => {
    console.log('Inmar server started listening on port: ' + config.SERVER.PORT);
});
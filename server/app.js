
import express from 'express';
import bodyParser from 'body-parser'
import compression from 'compression';

import sampleController from './sampleController';


const app = express();

app.use(compression());

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/sample/:id', sampleController.getId);

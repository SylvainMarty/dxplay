import * as express from 'express';
import * as bodyParser from 'body-parser';
import { display } from './matrixled';

const app = express();

app.use(bodyParser.json())

app.get('', (req, res) => {
    res.send('Hello express!');
});

app.post('', (req, res) => {
    console.log('postText', req.body);
    if (!req.body || !req.body.text) {
        res.status(400).send('No text given.');
        return;
    }
    display(req.body.text);
    res.send('Ok');
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});

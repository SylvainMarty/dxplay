import * as express from 'express';
import { display } from './matrixled';

const app = express();

app.get('', (req, res) => {
    res.send('Hello express!');
});

app.post('', (req, res) => {
    console.log('postText', req.body);
    display(req.body);
    res.send('Ok');
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});

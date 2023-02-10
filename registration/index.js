const app = require('express')();

app.get('/registration', (req, res) => res.send('lymr Registration, API!'));

app.listen(3000, () => console.log(`Registration API listening on port 3000!`));
const app = require('express')();

app.get('/auth', (req, res) => res.send('lymr authentication, API!'));

app.listen(3000, () => console.log(`Authentication API listening on port 3000!`));
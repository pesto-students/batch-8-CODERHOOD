const express = require('express');
const port = 3000;
const app = express();
app.get('/', (req, res) => res.send('Hello from Slack Clone'));
app.listen(port, () => console.log(`SlackClone Server listening on port ${port}!`));
module.exports = app;

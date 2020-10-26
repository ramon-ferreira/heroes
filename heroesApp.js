
const express = require('express');
const app = express();
const path = require('path')
const buildFolder = path.join(__dirname+'/build');

app.use(express.static(buildFolder));

app.get('/', (req, res) => {
  res.sendFile(`${buildFolder}/index.html`);
});

if (module === require.main) {
  const server = app.listen(process.env.PORT, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
}

module.exports = app;

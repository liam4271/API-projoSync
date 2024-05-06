const express = require("express");
const bodyParser = require('body-parser');

const app = express();
const ProjetRoute = require("./routes/projets")

app.use("/", ProjetRoute )

app.use(bodyParser.json());

app.listen(process.env.PORT || 3001, function() {
    console.log('Example app listening on port !')
  })
  



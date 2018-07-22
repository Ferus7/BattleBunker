var express = require('express'),
    bodyParser = require('body-parser');

app = express();

app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({ extended: true , limit: '5mb'}));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

routes = require("./routes.js")(app);
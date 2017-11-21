const express = require("express");
const bodyParser = require("body-parser");

module.exports = () => {
    let app = express();

    app.use(bodyParser.json());

    require("../routes")(app);

    return app;
}
const express = require(`express`);
const app = express();
const http = require(`http`).createServer(app);

module.exports = () => {

    require(`./routes/routes`)(app, express, __dirname);

    app.listen(8080, () => {
        console.log(`server run on 8080`);
    });
}
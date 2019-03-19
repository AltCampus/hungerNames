const express = require("express");
const session = require("express-session");
const app = express();
const passport = require('passport');
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require("cors");
const path = require("path");
const port = 8000;
const socket = require('socket.io');


mongoose.connect(
  "mongodb://adminalt01:adminalt01@ds137740.mlab.com:37740/hungernames",
  { useNewUrlParser: true },
  function (err, connection) {
    if (err) throw err;
    else console.log("connected to mongodb");
  }
)

require('dotenv').config()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(morgan('dev'));
app.set("views", path.join(__dirname, "./server/views"));
app.set("view engine", "ejs");

if (process.env.NODE_ENV === "development") {
  var webpack = require("webpack");
  var webpackConfig = require("./webpack.config");
  var compiler = webpack(webpackConfig);

  app.use(
    require("webpack-dev-middleware")(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    })
  );

  app.use(require("webpack-hot-middleware")(compiler));
}

app.use(cors());
//bootstrap
// require('./server/bootstrap/bootstrap')

// importing user model
require('./server/model/Student');

// importing passport config
require('./server/config/passport')(passport);

const server = app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});

const io = socket(server);

module.exports = {io};

app.use("/api/v1", require("./server/routes/api"));
app.use(require("./server/routes/index"));

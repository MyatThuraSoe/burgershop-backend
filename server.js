const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
var ejs = require("ejs");
const session = require('express-session');
var cors = require('cors');
const path = require('path');
const connectDB = require('./server/dbconnection');



const app = express();

dotenv.config({ path: 'config.env' })
const PORT = process.env.PORT || 8080;

// for REST api

// log requests
app.use(morgan('tiny'));



// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.json())

// set view engine
app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "views/ejs"))


app.use(session(
    {
        secret: "secret for the protfo web",
        expires: new Date(Date.now() + (60 * 1000)), // 15 mins
        saveUninitialized: true,
        resave: false,
        cookie: {
            expires: 60000,
            sameSite: true
        }
    }));
app.set('trust proxy', 1);
// load routers
app.use(cors({ credentials: true, origin: true, optionSuccessStatus:200, }));
app.use('/', require('./server/router'))

app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`) });
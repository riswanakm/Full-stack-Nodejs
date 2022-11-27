const express = require("express");
const app = express();

const path = require('path');
const ejs = require('ejs');
global.checkUser = null;
global.usertype = null;

var message = "";
const fileUpload = require('express-fileupload');
const expressSession = require('express-session')
const flash = require('connect-flash')


app.use(expressSession({
    secret: 'group4',
    resave: true,
    saveUninitialized: true
}))

//Controllers
const userCntl = require("./controller/userController");
const appointmentCntl = require("./controller/appointmentController");
const examinerCntl = require("./controller/examinerController");

//Middleware
const authMiddleware = require('./middleware/userAuthentication');
const doNotReAuthMiddleware = require('./middleware/checkReAuthenticate');
const adminAuthentication = require('./middleware/adminAuthentication');
const driverAuthentication = require('./middleware/driverAuthentication');
const examinerAuthentication = require('./middleware/examinerAuthentication');


const bodyParser = require("body-parser");
const res = require("express/lib/response");
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(fileUpload());
app.use(flash());

//DB Connection
require('./model/db')

//App
app.set('view engine', 'ejs');
app.listen(3000, function () {
    console.log("Server is running on port 3000.");
});

//Routes
app.use('*', (req, res, next) => {
    checkUser = req.session.userId;
    usertype = req.session.user_type;

    next()
});

app.get('/', userCntl.getAllUserData);
app.get('/signup', userCntl.signup);
app.post('/signup', userCntl.signupUser);

app.get('/g', driverAuthentication, userCntl.gPage);
app.get('/g2', driverAuthentication, userCntl.g2Page);
app.post('/g', driverAuthentication, userCntl.findUser);
app.post('/g/update', driverAuthentication, userCntl.update);
app.post('/g2', driverAuthentication, userCntl.update);

app.get('/login', doNotReAuthMiddleware, userCntl.login);
app.get('/logout', userCntl.logout);
app.post('/login', doNotReAuthMiddleware, userCntl.proessLogin);

app.get('/appointment', adminAuthentication, appointmentCntl.goAppointment);
app.post('/appointment', adminAuthentication, appointmentCntl.creatAppointment);
app.post('/save_appointment', userCntl.bookAppointment);

app.get('/examiner', examinerAuthentication, examinerCntl.goExaminer);
app.get('/candidates', adminAuthentication, userCntl.getCandidates);
app.get('/candidate', examinerAuthentication, userCntl.getCandidate);
app.post('/review', examinerAuthentication, userCntl.updateResult);

app.use((req, res) => res.render('404'));
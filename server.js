require('dotenv').config();

const express = require("express")
const path_dir = require('path');
const app = express()
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const usedTokens = new Set();
app.set('view engine','ejs')
app.use(logger);
app.use(express.static(path_dir.join(__dirname, 'public')));

const path = '/api/v1';
const { bearerTokenRequest,validateToken} = require('./auth');


app.get('/', (req,res)=>{
    
   
    res.render('index',{ data: data });
})
app.get('/jpsd-api', (req,res)=>{
    
    const data = {
        apiKey: "",
        authDomain: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: "",
        measurementId: ""
      };
    res.render('index-api',{ data: data });
})

// TOKEN REQUEST
const firebaseLoginRouter = require('./routes/firebaseLogin')
app.use(path+'/firebase-auth',jsonParser,firebaseLoginRouter)
// TOKEN REQUEST

// TOKEN REQUEST
app.post(path+'/auth/token',jsonParser,bearerTokenRequest)
// TOKEN REQUEST

// START : CAREER HISTORY ROUTE
const careerHistoryRouter = require('./routes/careerHistory')
app.use(path+'/users/careerhistory',validateToken, careerHistoryRouter)
// END : CAREER HISTORY ROUTE

// START : USERS BIO ROUTE
const usersBioRouter = require('./routes/usersBio')
app.use(path+'/users/usersbio',validateToken, usersBioRouter)
// END : USERS BIO ROUTE

// START : SKILL APPLICATION ROUTE
const skillApplicationRouter = require('./routes/skills_application')
app.use(path+'/users/skills_application',validateToken, skillApplicationRouter)
// END : SKILL APPLICATION ROUTE

// START : USERS BIO ROUTE
const usersEducationRouter = require('./routes/usersEducation')
app.use(path+'/users/userseducation',validateToken, usersEducationRouter)
// END : USERS BIO ROUTE

// START : USERS BIO ROUTE
const usersPortfolioRouter = require('./routes/usersPortfolio')
app.use(path+'/users/usersportfolio',validateToken, usersPortfolioRouter)
// END : USERS BIO ROUTE

// START : USERS ROUTE
// const userRouter = require('./routes/users')
// app.use(path+'/users',validateToken, userRouter)
const userRouter = require('./routes/users')
app.use(path+'/users', userRouter)
// END : USERS ROUTE

const email_notification = require('./routes/notification')
app.use(path+'/notification',jsonParser, email_notification)

function logger(req, res, next){
    console.log(req.originalUrl);
    next();
}

app.use((req,res)=> {
    res.status(404).json({
        status:'404',
        message: 'Invalid Request'
    });
})

app.listen(process.env.APP_PORT, () => {
    console.log("Server started on port: ",process.env.APP_PORT);
});
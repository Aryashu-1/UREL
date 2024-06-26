
const express = require('express')
const {URELRouter,HOMERouter} = require('./routes/UREL')
const {userRouter} = require('./routes/user')
const {handleGetRequest} = require('./controllers/UREL')
const {handleLoggedUsers} = require('./middleware/auth')
const path = require('path');
const {connectToDataBase} = require('./connection.js');
const { homedir } = require('os');
const cookieParser = require('cookie-parser');
require('dotenv').config()
const PORT = process.env.PORT || 8000
const app = express()

//Connecting to Database
connectToDataBase(process.env.MONGO_URL).then(()=>{console.log("Connected to Database")}).catch((err)=>{console.log("There Was an error",err)})
// views
app.set('view engine', 'ejs');
app.set('views',path.resolve('./views'));
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares
app.use(express.urlencoded({extended : true}))
app.use(cookieParser());

app.use('/',HOMERouter);
app.use('/url',handleLoggedUsers,URELRouter)
app.use('/user',userRouter)
app.use('/:name',handleGetRequest)





app.listen(PORT,()=>console.log(`Listening on ${PORT}`))




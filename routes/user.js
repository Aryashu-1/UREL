const express = require('express')
const {handlePostUserSignup,handleGetOnUserSignup,handleGetOnUserSignin,handlePostOnUserSignin} = require('../controllers/user')

const userRouter = express.Router()


userRouter.route('/signin')
.get(handleGetOnUserSignin)
.post(handlePostOnUserSignin)

userRouter.route('/signup')
.get(handleGetOnUserSignup)
.post(handlePostUserSignup)


module.exports = {
    userRouter
}
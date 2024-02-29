const {v4: uuid4} = require('uuid')
const {users} = require('../models/user')
const {setUser,getUser} = require('../services/auth')

async function handlePostUserSignup(req,res){

    const new_user = await users.create({
        name: req.body.name,
        email:req.body.email,
        password:req.body.password
    })

    return res.status(201).redirect('/user/signin')
}

async function handleGetOnUserSignup(req,res){

    return res.status(200).render('signup')
}

async function handleGetOnUserSignin(req,res){

    return res.status(200).render('signin')
}

async function handlePostOnUserSignin(req,res){

    const my_user = await users.findOne({email:req.body.email})

    if(!my_user) return res.status(400).render('signin')


    const payload = {
        email:req.body.email,
        _id: my_user._id
    }

    const jwtToken = setUser(payload)
    req.user = my_user 
    res.cookie('JWT_TOKEN', jwtToken)


    res.status(200).redirect('/url')

}



module.exports ={
    handlePostUserSignup,
    handleGetOnUserSignup,
    handleGetOnUserSignin,
    handlePostOnUserSignin
}
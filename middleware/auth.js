
const {setUser,getUser} = require('../services/auth')

function handleLoggedUsers(req,res,next){

    if(!req.cookies.JWT_TOKEN) return res.redirect('/user/signin')

    const user = getUser(req.cookies.JWT_TOKEN);


    if(user === undefined){
        return res.status(400).redirect('/user/signin')
    }
    else{
        //console.log(user)
        req.user = user
        next()
    }
}

module.exports = {
    handleLoggedUsers
}
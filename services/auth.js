

const jwt = require("jsonwebtoken")
const SECRET_KEY = 'bash143'

function setUser(payload){
    const jwtToken = jwt.sign(payload,SECRET_KEY)
    return jwtToken
}

function getUser(key){
    const payload = jwt.verify(key,SECRET_KEY)

    return payload

}

module.exports = {
    setUser,
    getUser,
}

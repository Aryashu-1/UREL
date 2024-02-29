
const express = require('express')

const {handlePostRequest,handleAnalyticsGetRequest,handleAllGetRequest,handlePatchRequest,handleDeleteRequest} = require('../controllers/UREL')

const URELRouter = express.Router()
const HOMERouter = express.Router()



// /home Router
HOMERouter.route('/')
.get(handleAllGetRequest)


// Url Router
URELRouter.route('/')
.post(handlePostRequest)
.get(handleAllGetRequest)
.patch(handlePatchRequest)
.delete(handleDeleteRequest)

URELRouter.route('/analytics/:name')
.get(handleAnalyticsGetRequest)

module.exports = {
    URELRouter,
    HOMERouter,
}









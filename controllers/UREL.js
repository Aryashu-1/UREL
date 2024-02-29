
const {UREL} = require('../models/UREL')

async function handleDeleteRequest(req,res){
    UREL.deleteOne({name:req.body.name})
    .then(ress=>{}).catch(err=>{console.log(err)})
    return res.status(200).json({message:"OK"})
}


async function handlePatchRequest(req,res){
    const u_link = await UREL.findOneAndUpdate({name:req.body.name},{ 
        $set: { 
            longURL :req.body.longURL,
        }}
    )
    return res.status(201).json({
        status:'OK'
    })
}


async function handleAllGetRequest(req,res){

    if(!req.user) return res.redirect('/user/signin')

    const all = await UREL.find({createdBy : req.user._id});
    
    return res.status(200).render('index',{
        allurls: all,
        createdURL:{shortURL:undefined}
    })
}


async function handleAnalyticsGetRequest(req,res){
    const tempLink = await UREL.findOne({name:req.params.name})

    return res.status(200).json({
        clicks:tempLink.history.length,
        longURL:tempLink.longURL,
        createDate:tempLink.createdAt
    })
}


async function handleGetRequest(req,res){


    if( req.params.name === ''){
        return res.status(200).redirect('/home')
    } 

    const tempLink = await UREL.findOneAndUpdate({name:req.params.name},
        {
            $push:{
                history: {
                    timestamp: Date.now(),
                },
            }   
    })
    

    if(!tempLink) return res.status(400).json({message:"Something Went wrong, Try Refresh"});

    res.setHeader('Location', `${tempLink.longURL}`);

    return res.status(301).send()

}

async function handlePostRequest(req,res){

    if(!req.body.name || !req.body.longURL) return res.status(400).send({message:"OOPS Something Went wrong"});

    const urls = await UREL.find({})
    const createURL = await UREL.create({
        name:req.body.name,
        longURL:req.body.longURL,
        shortURL:`${req.hostname}`+"/"+`${req.body.name}`,
        createdBy : req.user._id,
        history:[]
    }).catch((err)=>{
        console.log("Error Occured")
    })

    return res.status(201).redirect('/url');

}


module.exports ={
    handleGetRequest,
    handlePostRequest,
    handleAnalyticsGetRequest,
    handleAllGetRequest,
    handlePatchRequest,
    handleDeleteRequest,
}





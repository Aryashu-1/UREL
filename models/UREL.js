
const mongoose = require('mongoose')


const URELSchema = mongoose.Schema({
    name:{
        type: String,
        unique: true,
        required: true,
    },
    longURL:{
        type:String,
        required:true,
    },
    shortURL:{
        type:String
    },
    history: [
        { 
            timestamp: { 
                type: Number 
            } 
        }
    ],
    createdBy: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
},{timestamps:true})

const UREL = mongoose.model('UREL',URELSchema)

module.exports = {
    UREL
}
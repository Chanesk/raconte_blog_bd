const mongoose = require('mongoose');

const raconteSchema = mongoose.Schema({
    title:{type: String, required:true},
    image:{type: String, required: true},
    content:{type:String, required: true},
    user:{
        name:{type:String, required:true},
        imgUrl:{type:String, required: true},
        description:{type:String, required:true}
    },
    createdDate:{type: Date, required: true},
    category:{
        name:{type:String, required: true}
    }
})

module.exports = mongoose.model('Raconte', raconteSchema);
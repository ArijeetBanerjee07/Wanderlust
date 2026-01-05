let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const Review = require("./review.js");
const { StringDecoder } = require("node:string_decoder");
const listSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength: [5, "Hotel name must be at least 5 characters"],
    },
    description:{
        type:String,
        required:true,
        maxLength:500,
        minlength: [10, "Description must be at least 10 characters"]
    },
    image:{
        url:String,
        filename:String
    },
    price:{
        type:Number,
        required:true,
        min: [1, "Price must be greater than 0"]
    },
    location:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    filter:{
        type:String,
        required:true,
         enum: [
            "trending",
            "lakefront",
            "tinyhome",
            "treehouse",
            "countryside",
            "historical",
            "beachfront",
            "tropical",
            "lux",
            "vineyards"
        ]
    }
})
listSchema.post("findOneAndDelete",async(list)=>{
    if(list){
        await Review.deleteMany({_id: {$in:list.reviews}});
    }
})

const list = mongoose.model("list",listSchema);

module.exports = list;
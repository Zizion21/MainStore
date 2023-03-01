const { Mongoose, default: mongoose } = require("mongoose");

const Schema= new Mongoose.Schema({
    title: {type:String},
    text: {type:String},
    image: {type:String},
    type: {type:String, default: "main"}
});
module.exports={
    SliderModel: mongoose.model("slider", Schema)
}
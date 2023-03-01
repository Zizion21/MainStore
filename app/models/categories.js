const { Mongoose, default: mongoose } = require("mongoose");

const Schema= new Mongoose.Schema({
    title: {type: String, required: true}
});
module.exports={
    CategoryModel: mongoose.model("category", Schema)
}
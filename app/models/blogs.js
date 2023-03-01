const { Mongoose, default: mongoose } = require("mongoose");

const Schema= new Mongoose.Schema({
    author: {type: mongoose.Types.ObjectId, required: true},
    title: {type: String, required: true},
    text: {type: String},
    image: {type: String},
    tags: {type: [String], default: []},
    category: {type: mongoose.Types.ObjectId},
    comments: {type: [], default: []},
    like: {type: [mongoose.Types.ObjectId], default: []},
    disLike: {type: [mongoose.Types.ObjectId], default: []},
    bookmark: {type: [mongoose.Types.ObjectId], default: []}

});
module.exports={
    BlogModel: mongoose.model("blog", Schema)
}
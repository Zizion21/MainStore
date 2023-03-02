const {default: mongoose } = require("mongoose");

const Schema= new mongoose.Schema({
    title:{type: String, required: true},
    short_desc:{type: String},
    total_desc:{type: String},
    images:{type: [String], default: []},
    tags:{type: [String]},
    categorie:{type: mongoose.Types.ObjectId},
    comments:{type: [], default: []},
    like:{type: [mongoose.Types.ObjectId], default: []},
    dislike:{type: [mongoose.Types.ObjectId], default: []},
    bookmark:{type: [mongoose.Types.ObjectId], default: []},
    price:{type: Number, default: 0},
    discount:{type: String, default: 0},
    count:{type: String},
    type:{type: String},
    time:{type: String},
    format:{type: String},
    teacher:{type: mongoose.Types.ObjectId},
    feature:{type: Object, default:{
        length: "",
        height: "",
        width: "",
        weight: "",
        colors: [],
        model:[],
        madein:""

    }}

});
module.exports={
    ProductModel: mongoose.model("product", Schema)
}
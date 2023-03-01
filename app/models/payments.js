const { Mongoose, default: mongoose } = require("mongoose");

const Schema= new Mongoose.Schema({

});
module.exports={
    PaymentModel: mongoose.model("payment", Schema)
}
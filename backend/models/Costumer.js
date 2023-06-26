const mongoose = require("mongoose");

const { Schema } = mongoose;

const costumerSchema =  new Schema ({
    costumerWallet:{
        type: String,
        required: true,
    },
    costumerPublicKey:{
        type: String,
        required: true,
    },







},
{timestamps: true}
);


const Costumer = mongoose.model("Costumer", costumerSchema);

module.exports = {
    Costumer,costumerSchema
};
const mongoose = require("mongoose");

const { Schema } = mongoose;

const customerSchema =  new Schema ({
    customerWallet:{
        type: String,
        required: true,
    },
    customerPublicKey:{
        type: String,
        required: true,
    },







},
{timestamps: true}
);


const Customer = mongoose.model("Customer", customerSchema);

module.exports = {
    Customer,customerSchema
};
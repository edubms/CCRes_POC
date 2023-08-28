const mongoose = require("mongoose");

const { Schema } = mongoose;

const resourcesSchema = new Schema({
    sellerWallet:{
        type: String,
        required: true, 
    },
    resourceIpAddress:{
        type: String,
        required: true, 
    },
    resoureUser:{
        type: String,
        required: true, 
    },
    resourcePassword:{
        type: String,
        required: true, 
    },
    resourceSpace:{
        type: Number,
        required: true, 
    },
    resourceValue:{
        type: Number,
        required: true, 
    },
    resourceSold:{
        type: Boolean,
        default: false, 
    },
},{ timestamps: true }
);

const Resources = mongoose.model("Resource", resourcesSchema);

module.exports = {
    Resources,resourcesSchema
};
const mongoose = require('mongoose')

async function main() {
    try {

        mongoose.set("strictQuery", true);
        await mongoose.connect("mongodb+srv://edubms:i2h52XK4690szVeE@cluster0.19vm0do.mongodb.net/?retryWrites=true&w=majority");
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.log(`Error: ${error}`)
    }

}


module.exports = main
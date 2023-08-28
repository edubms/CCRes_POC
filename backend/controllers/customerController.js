const {Customer: CustomerModel} = require("../models/Customer");

const customerController = {
    create: async(req,res) => {
        try {
            const customer = {
                customerWallet: req.body.customerWallet,
                customerPublicKey: req.body.customerPublicKey
            };

            const response = await CustomerModel.create(customer);

            res.status(201).json({response,msg: "Customer created successfully."});
    }catch(error) {
        console.log(error);
    }
},
    delete: async(req,res) => {
        try {

        const id = req.params.id
        const customer = await CustomerModel.findById(id);

            if(!customer) {
                res.status(404).json({msg:"Customer not found."});
                return;
            }
        const deletedCustomer = await CustomerModel.findByIdAndDelete(id);
        res
            .status(200)
            .json({deletedCustomer, msg:"Customer deleted successfully."});
        }
        catch(error) {
            console.log(error);
        }
    },
}

module.exports = customerController;
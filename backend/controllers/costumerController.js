const {Costumer: CostumerModel} = require("../models/Costumer");

const costumerController = {
    create: async(req,res) => {
        try {
            const costumer = {
                costumerWallet: req.body.costumerWallet,
                costumerPublicKey: req.body.costumerPublicKey
            };

            const response = await CostumerModel.create(costumer);

            res.status(201).json({response,msg: "Costumer created successfully."});
    }catch(error) {
        console.log(error);
    }
},
    delete: async(req,res) => {
        try {

        const id = req.params.id
        const costumer = await CostumerModel.findById(id);

            if(!costumer) {
                res.status(404).json({msg:"Costumer not found."});
                return;
            }
        const deletedCostumer = await CostumerModel.findByIdAndDelete(id);
        res
            .status(200)
            .json({deletedCostumer, msg:"Costumer deleted successfully."});
        }
        catch(error) {
            console.log(error);
        }
    },
}

module.exports = costumerController;
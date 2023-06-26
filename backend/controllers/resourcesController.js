const {Resources: ResourcesModel} = require("../models/Resources");

const resourcesController = {
    create: async(req, res) => {
        try {
            const resource = {
                sellerWallet: req.body.sellerWallet,
                resourceIpAddress: req.body.resourceIpAddress,
                resoureUser: req.body.resoureUser,
                resourcePassword:req.body.resourcePassword,
                resourceSpace:req.body.resourceSpace,
                resourceValue:req.body.resourceValue,
            }

            const response = await ResourcesModel.create(resource);

            res.status(201).json({response, msg: "Resource added successfully."});
        }catch(error){
            console.log(error);
        }
    }, 
    getAll: async (req, res) => {
        try {
            const resource = await ResourcesModel.find();

            res.json(resource);
        }catch(error){


            console.log(error);
        }

    },
    get: async (req, res) => {
        try {
            const id = req.params.id;
            const resource = await ResourcesModel.findById(id);

        if(!resource) {
            res.status(404).json({msg:"Resource not found."});
            return;
        }

            res.json(resource);
        }catch(error){
            console.log(error)
        }
    },
    delete: async (req,res) => {
        try {
            const id = req.params.id;
            const resource = await ResourcesModel.findById(id);

            if(!resource) {
                res
                .status(404)
                .json({msg:"Resource not found."});
                return;
            }

            const deletedResource = await ResourcesModel.findByIdAndDelete(id);
            res
                .status(200)
                .json({deletedResource, msg:"Resource Deleted successfully."});

        }
        catch(error){
            console.log(error);
        }
    },
    update: async (req, res) => {
        const id = req.params.id;

        const resource = {
            sellerWallet: req.body.sellerWallet,
            resourceIpAddress: req.body.resourceIpAddress,
            resoureUser: req.body.resoureUser,
            resourcePassword:req.body.resourcePassword,
            resourceSpace:req.body.resourceSpace,
            resourceValue:req.body.resourceValue,
        };

        const updatedResource = await ResourcesModel.findByIdAndUpdate(id, resource);

        if (!updatedResource){
            res
                .status(404)
                .json({ msg:"Resource not found."});
            return;
        }

        res
            .status(200)
            .json({resource,msg:"Service updated successfully."});
},


};

module.exports = resourcesController;
const Web3 = require('web3');
const web3 = new Web3('http://127.0.0.1:7545')
web3.eth.getAccounts().then(console.log("Connected to Web3"))
abi_string  =  [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "minerWallet",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "costumerWallet",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "resourceID",
				"type": "string"
			}
		],
		"name": "addVenda",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "resourceID",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "minerWallet",
				"type": "address"
			}
		],
		"name": "consolidBuy",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_resourceID",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_minerWallet",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "createResource",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Received",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_vendaId",
				"type": "uint256"
			}
		],
		"name": "salvaVenda",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transferTo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "venda",
		"outputs": [
			{
				"internalType": "address",
				"name": "minerWallet",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "costumerWallet",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "resourceID",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "vendaCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

contract_address = "0x1dd886B5C74BAA796929DB262992e24C2307161C"
let contract = new web3.eth.Contract(abi_string, contract_address)

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
    buy: async (req, res) => {
        const id = req.body.resourceID;
        

        const resource = await ResourcesModel.findOne({_id:id});
        buyValue = resource.resourceValue
        deposit = contract.methods.deposit(buyValue)
        console.log(deposit);

 
        res
            .status(200)
            .json({msg:"Service updated successfully."});
},


};

module.exports = resourcesController;
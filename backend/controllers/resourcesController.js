const Web3 = require('web3');
const web3 = new Web3('http://127.0.0.1:7545')	
web3.eth.getAccounts().then(console.log("Connected to Web3"))
abi_string  =   [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "saleId",
				"type": "uint256"
			}
		],
		"name": "buyResource",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "resourceId",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "registerResource",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "initialTax",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
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
				"indexed": false,
				"internalType": "string",
				"name": "resourceId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "ResourceRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "resourceId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "ResourceSold",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "resourceId",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "sellResource",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newTax",
				"type": "uint256"
			}
		],
		"name": "setTax",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "resourceId",
				"type": "string"
			}
		],
		"name": "getResource",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "id",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "value",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "exists",
						"type": "bool"
					}
				],
				"internalType": "struct ResourceMarket.Resource",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "myBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "saleCount",
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

contract_address = "0xd9145CCE52D386f254917e481eB44e9943F39138"
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
		buyerWallet = req.body.wallet;
        buyValue = resource.resourceValue
		// contract.methods.myBalance()
        // deposit = contract.methods.deposit(buyValue,buyerWallet)
		mybalance = contract.methods.myBalance(buyerWallet)
        // console.log(deposit);
		console.log(mybalance);

 
        res
            .status(200)
            .json({msg:"Service updated successfully."});
},


};

module.exports = resourcesController;
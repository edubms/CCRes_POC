// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ResourceMarket {
    struct Resource {
        string id;
        address owner;
        uint256 value;
        bool exists;
    }

    struct Sale {
        string resourceId;
        address seller;
        address buyer;
        uint256 value;
        bool exists;
    }

    address admin;
    uint256 tax;

    mapping(address => uint256) balances;
    mapping(address => uint) resourcesSold;
    mapping(string => Resource) resources;
    mapping(uint => Sale) sales;
    uint256 public saleCount;

    constructor(uint256 initialTax) {
        admin = msg.sender;
        tax = initialTax;
    }

    event Received(address indexed from, uint256 value);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event ResourceRegistered(string resourceId, address owner, uint256 value);
    event ResourceSold(string resourceId, address seller, address buyer, uint256 value);

    function deposit() external payable {
        balances[msg.sender] += msg.value;
        emit Received(msg.sender, msg.value);
    }

    receive() external payable {
    }

    function myBalance() external view returns (uint256) {
        return balances[msg.sender];
    }

    function balanceOf(address _owner) external view returns (uint256) {
        return balances[_owner];
    }

    function registerResource(string memory resourceId, uint256 value) external {
        require(!resources[resourceId].exists, "Resource already registered");
        require(value > 0, "Resource value must be greater than 0");

        resources[resourceId] = Resource({
            id: resourceId,
            owner: msg.sender,
            value: value,
            exists: true
        });

        emit ResourceRegistered(resourceId, msg.sender, value);
    }

    function getResource(string memory resourceId) external view returns (Resource memory) {
        return resources[resourceId];
    }

    function sellResource(string memory resourceId, uint256 value) external {
        require(resources[resourceId].exists, "Resource not registered");
        require(value > 0, "Value must be greater than 0");

        sales[saleCount] = Sale({
            resourceId: resourceId,
            seller: msg.sender,
            buyer: address(0), // Initialize with address(0), indicating it's not sold yet
            value: value,
            exists: true
        });

        saleCount++;

        emit ResourceSold(resourceId, msg.sender, address(0), value);
    }

    function buyResource(string memory resourceId) external payable {
        require(sales[saleCount].buyer == address(0), "Resource is already sold");
        require(balances[msg.sender] >= resources[resourceId].value, "Insufficient payment");

        address seller = sales[saleCount].seller;
        address buyer = msg.sender;
        uint256 value = sales[saleCount].value;

        // Verifique se o comprador possui saldo suficiente
        require(balances[buyer] >= resources[resourceId].value, "Insufficient balance");

        // Transferir o pagamento para o vendedor
        balances[buyer] -= resources[resourceId].value;
        balances[resources[resourceId].owner] += resources[resourceId].value;

        // Transferir a propriedade do recurso
        resources[resourceId].owner = buyer;

        // Atualizar o registro de venda para indicar que foi vendido
        sales[saleCount].buyer = buyer;
        saleCount++;

        emit Transfer(buyer, seller, value);
        emit ResourceSold(resourceId, seller, buyer, value);
    }

    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit Transfer(address(this), msg.sender, amount);
    }

    function setTax(uint256 newTax) external onlyAdmin {
        tax = newTax;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this operation");
        _;
    }
}
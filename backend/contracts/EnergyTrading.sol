// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract EnergyTrading is Ownable {
    struct EnergyOffer {
        uint256 id;
        address seller;
        uint256 amount;
        uint256 price;
        bool isAvailable;
    }

    mapping(uint256 => EnergyOffer) public offers;
    uint256 public nextOfferId;

    event EnergyListed(uint256 id, address seller, uint256 amount, uint256 price);
    event EnergyPurchased(uint256 id, address buyer, uint256 amount);

    constructor() Ownable(msg.sender) {}

    function listEnergy(uint256 amount, uint256 price) external {
        require(amount > 0, "Amount must be greater than zero");
        require(price > 0, "Price must be greater than zero");

        offers[nextOfferId] = EnergyOffer({
            id: nextOfferId,
            seller: msg.sender,
            amount: amount,
            price: price,
            isAvailable: true
        });

        emit EnergyListed(nextOfferId, msg.sender, amount, price);
        nextOfferId++;
    }

    function buyEnergy(uint256 offerId) external payable {
        EnergyOffer storage offer = offers[offerId];
        require(offer.isAvailable, "Offer is not available");
        require(msg.value >= offer.price, "Insufficient funds sent");

        payable(offer.seller).transfer(offer.price);
        offer.isAvailable = false;

        emit EnergyPurchased(offerId, msg.sender, offer.amount);
    }

    function getOffer(uint256 offerId) external view returns (EnergyOffer memory) {
        return offers[offerId];
    }
}

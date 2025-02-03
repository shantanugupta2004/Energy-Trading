// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract EnergyTrading {
    using Counters for Counters.Counter;
    Counters.Counter private _offerIds;

    struct Offer {
        uint256 id;
        address seller;
        uint256 amount;
        uint256 price;
        bool active;
    }

    mapping(uint256 => Offer) public offers;
    address public admin;
    IERC20 public token;

    event OfferCreated(uint256 indexed id, address seller, uint256 amount, uint256 price);
    event OfferBought(uint256 indexed id, address buyer, uint256 amount, uint256 price);

    constructor(address _token) {
        admin = msg.sender;
        token = IERC20(_token);
    }

    function createOffer(uint256 amount, uint256 price) external {
        _offerIds.increment();
        uint256 newOfferId = _offerIds.current();

        offers[newOfferId] = Offer(newOfferId, msg.sender, amount, price, true);

        emit OfferCreated(newOfferId, msg.sender, amount, price);
    }

    function buyOffer(uint256 id) external payable {
        Offer storage offer = offers[id];
        require(offer.active, "Offer not available");
        require(msg.value >= offer.price, "Insufficient ETH");

        payable(offer.seller).transfer(offer.price);
        token.transfer(msg.sender, offer.amount);
        offer.active = false;

        emit OfferBought(id, msg.sender, offer.amount, offer.price);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

error PriceMustNotZero();
error PayListingFees();
error PriceNotMet();
error NotSeller();
error NotListed();
error NotOwner();

contract MyPlace is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter public _itemIds;
    Counters.Counter public _itemSold;

    // State Variables
    struct Item {
        uint256 itemId; // Id for listed item on marketplace
        address nftContract;
        uint256 tokenId; // Token id of the NFT
        string category;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }
    // Owner of the contract who makes some commission on listing
    address payable owner;
    // Listing commsion
    uint256 listingPrice = 0.025 ether;
    //Mapping to keep track of the NFT with its TokenId
    mapping(uint256 => Item) public s_allListings;

    event ItemListed();
    event ItemCanceled();
    event ItemBought();
    event Received(address, uint);

    constructor() {
        // Owner of the contract is the one who deploys it.
        owner = payable(msg.sender);
    }

    // Modifiers
    modifier isSeller(uint256 itemId) {
        if (s_allListings[itemId].seller != msg.sender) {
            revert NotSeller();
        }
        _;
    }

    modifier notListed(uint256 itemId) {
        if (s_allListings[itemId].price <= 0) {
            revert NotListed();
        }
        _;
    }

    // Functions
    /// @notice List the item on the marketplace by paying listing fees
    /// @param _nftContract - The contract address of the nft
    /// @param _price - Price on which to sell the NFT
    /// @param _itemCategory - Type of NFT. For ex. Music, Art, Illustration, etc.
    function listNFT(
        address _nftContract,
        uint256 _tokenId,
        uint256 _price,
        string memory _itemCategory
    ) external payable nonReentrant {
        if (_price < 0) {
            revert PriceMustNotZero();
        }
        if (msg.value != listingPrice) {
            revert PayListingFees();
        }
        _itemIds.increment();
        uint256 currentId = _itemIds.current();
        s_allListings[currentId] = Item(
            currentId,
            _nftContract,
            _tokenId,
            _itemCategory,
            payable(msg.sender),
            payable(address(0)),
            _price,
            false
        );
        IERC721(_nftContract).transferFrom(msg.sender, address(this), _tokenId);
        (bool paid, ) = payable(address(this)).call{value: listingPrice}("");
        require(paid, "Fees not paid");
        emit ItemListed();
    }

    /// @notice Buy the Item
    /// @param itemId - The token id of the Item to buy
    function buyNFT(
        uint256 itemId,
        address nftContract
    ) external payable notListed(itemId) nonReentrant {
        uint256 price = s_allListings[itemId].price;
        if (msg.value != price) {
            revert PriceNotMet();
        }
        s_allListings[itemId].owner = payable(msg.sender);
        s_allListings[itemId].sold = true;
        _itemSold.increment();
        IERC721(nftContract).transferFrom(
            address(this),
            msg.sender,
            s_allListings[itemId].tokenId
        );
        (bool sent, ) = payable(s_allListings[itemId].seller).call{
            value: s_allListings[itemId].price
        }("");
        require(sent, "Call failed");
        s_allListings[itemId].seller = payable(address(0));
        emit ItemBought();
    }

    // Getter functions

    function getListing(uint256 itemId) external view returns (Item memory) {
        return s_allListings[itemId];
    }

    function getitemId() external view returns (uint256) {
        return _itemIds.current();
    }

    function getItemSold() external view returns (uint256) {
        return _itemSold.current();
    }

    function getListingPrice() external view returns (uint256) {
        return listingPrice;
    }

    function getContractOwner() external view returns (address) {
        return owner;
    }

    function getEarnings() external view returns (uint256) {
        return address(this).balance;
    }

    function withdrawCommisson() external payable {
        require(owner == msg.sender, "Not owner");
        (bool sent, ) = payable(owner).call{value: address(this).balance}("");
        require(sent, "Call failed");
    }

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }
}

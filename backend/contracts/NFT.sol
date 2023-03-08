// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address public marketplaceAddress;

    constructor(address _marketplaceAddress) ERC721("MyPlace", "MP") {
        marketplaceAddress = _marketplaceAddress;
    }

    function createNFT(string memory tokenURI) external returns (uint256) {
        _tokenIds.increment();
        uint256 currentId = _tokenIds.current();
        _mint(msg.sender, currentId);
        _setTokenURI(currentId, tokenURI);
        setApprovalForAll(marketplaceAddress, true);
        return currentId;
    }
}

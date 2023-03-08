// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Token {
    // My Variables - State variables
    string public s_name;
    string public s_symbol;
    uint256 public s_decimals;
    uint256 public s_totalSupply;

    // Keep track balances and allowances approved
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    // Events - fire events on state changes etc
    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed value
    );
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 indexed value
    );

    constructor(
        string memory _name,
        string memory _symbol,
        uint _decimals,
        uint _totalSupply
    ) {
        s_name = _name;
        s_symbol = _symbol;
        s_decimals = _decimals;
        s_totalSupply = _totalSupply;
        // The person who deploys the contract owns all the tokens initially
        // This can be used then as liquidity pool and people can buy that toekn
        balanceOf[msg.sender] = s_totalSupply;
    }

    /// @notice transfer amount of tokens to an address
    /// @param _to receiver of token
    /// @param _value amount value of token to send
    /// @return success as true, for transfer
    function transfer(
        address _to,
        uint256 _value
    ) external returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        _transfer(msg.sender, _to, _value);
        return true;
    }

    /// @dev internal helper transfer function with required safety checks
    /// @param _from, where funds coming the sender
    /// @param _to receiver of token
    /// @param _value amount value of token to send
    // Internal function transfer can only be called by this contract
    //  Emit Transfer Event event
    function _transfer(address _from, address _to, uint256 _value) internal {
        // Ensure sending is to valid address! 0x0 address cane be used to burn()
        require(_to != address(0));
        balanceOf[_from] = balanceOf[_from] - (_value);
        balanceOf[_to] = balanceOf[_to] + (_value);
        emit Transfer(_from, _to, _value);
    }

    /// @notice Approve other to spend on your behalf eg an exchange
    /// @param _spender allowed to spend and a max amount allowed to spend
    /// @param _value amount value of token to send
    /// @return true, success once address approved
    //  Emit the Approval event
    // Allow _spender to spend up to _value on your behalf - Like Uniswap
    function approve(address _spender, uint256 _value) external returns (bool) {
        require(_spender != address(0));
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    /// @notice transfer by approved person from original address of an amount within approved limit
    /// @param _from, address sending to and the amount to send
    /// @param _to receiver of token
    /// @param _value amount value of token to send
    /// @dev internal helper transfer function with required safety checks
    /// @return true, success once transfered from original account
    // Allow _spender to spend up to _value on your behalf
    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) external returns (bool) {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);
        allowance[_from][msg.sender] = allowance[_from][msg.sender] - (_value);
        _transfer(_from, _to, _value);
        return true;
    }
}


# Plugin Pricing Index Pair Npm Package

Package which brings pricing index pair using Plugin Decentralized Oracle

## 1 Installation

Install plugin-pricing-index-pair with npm

```bash
  npm install plugin-pricing-index-pair
```

## 2 PRE-REQUISITE

- Go to https://feeds.goplugin.co explore the data feeds, you want to access
- Deposit 1 PLI for the specific data feed, you want to access
- copy the contract-address to override below in Step 3
- create .env file and add PRIVATE_KEY (from which you deposited PLI)


## 3 Implementation Example

```
var { custom_pair,default_pair,show } = require("plugin-pricing-index-pair");

var ProviderOptions={
    CONTRACT_ADDR:"0xB5B54e202ae923381DBc3859196d88004d85f361",
    RPC_URL:"https://erpc.xinfin.network",
    FSymbol:"PLI",
    TSymbol:"USDT"
}

async function main() {
    //to Apply custom index-pairs
    <!-- const returnCodeA = await custom_pair(ProviderOptions);
    if(returnCodeA){
        const result = await show(ProviderOptions);
        console.log("log::::result::::",result/10000)
    } -->
    // //to get default index-pair for the provided contract_address
    const returncodeB = await default_pair(ProviderOptions);

    if(returncodeB){
         const result = await show(ProviderOptions);
         console.log("log::::result::::",result/10000)
    }
}
main()

```

## Function & Parameters
| Functions             | Descriptions                                                                |
| ----------------- | ------------------------------------------------------------------ |
| custom_pair| it enables you to override index-pairs and retrieve price pair|
| default_pair| It gets you the default index-pair that contract is configured for|
| show| will get you the latestAnswer for the given index-pair |
| CONTRACT_ADDR|0xB5B54e202ae923381DBc3859196d88004d85f361 (Default contract address if you want to override custom symbols)|
| RPC_URL|https://erpc.xinfin.network|
| FSymbol | PLI |
| TSymbol| USDT |

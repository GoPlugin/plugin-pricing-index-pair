var { custom_pair,default_pair,show } = require("plugin-pricing-index-pair");

var ProviderOptions={
    CONTRACT_ADDR:"0xB5B54e202ae923381DBc3859196d88004d85f361",
    RPC_URL:"https://erpc.xinfin.network",
    FSymbol:"PLI",
    TSymbol:"USDT"
}

async function main() {
    //to Apply custom index-pairs
    const returnCodeA = await custom_pair(ProviderOptions);
    if(returnCodeA){
        const result = await show(ProviderOptions);
        console.log("log::::result::::",result/10000)
    }
    // //to get default index-pair for the provided contract_address
    // const returncodeB = await default_pair(ProviderOptions);

    // if(returncodeB){
    //     const result = await show(ProviderOptions);
    //     console.log("result value is",result/10000)
    // }
}
main()
const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
        manifestUrl: 'https://bmasshd.clikc/tonconnect-manifest.json',
        buttonRootId: 'ton-connect'
    });





    async function connectToWallet() {
        const connectedWallet = await tonConnectUI.connectWallet();
        // Do something with connectedWallet if needed
        console.log(connectedWallet);
    }

    // Call the function
    connectToWallet().catch(error => {
        console.error("Error connecting to wallet:", error);
    });

await tonConnectUI.disconnect();

tonConnectUI.uiOptions = {
      twaReturnUrl: 'https://t.me/bmassk3_bot'
  };


import TonConnectUI from '@tonconnect/ui';

const tonConnectUI = new TonConnectUI({ //connect application
    manifestUrl: 'https://bmasshd.click/tonconnect-manifest.json',
    buttonRootId: 'ton-connect'
});

const transaction = {
    messages: [
        {
            address: "UQDu8vyZSZbAYvRRQ_jW4_0EiBGibAGq72wSZjYWRmNAGhRD", // destination address
            amount: "20000000" //Toncoin in nanotons
        }
    ]
}

const result = await tonConnectUI.sendTransaction(transaction)

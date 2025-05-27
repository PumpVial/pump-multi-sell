# 🧪 Pump Multi Sell 🧪

Pump Multi Sell allows you to sell a pump.fun token with up to 20 wallets a single transaction. Optionally set up fees to be sent to your dashboard.

---

## Prerequisites

- Get your free API key from https://pumpvial.com

---

## Install Dependencies

`npm i axios bs58 @solana/web3.js`

---

## Request

##### [required] [object]

`feePayer`: Public key object of the fee payer.

##### [required] [string]

`ca`: Contract address of the pump.fun token to sell.

##### [required] [array]

`wallets`: Array of up to 20 wallet address objects.
`string: publicKey`: Wallet address of seller.
`string: tokenAmount`: Token amount to sell.

##### [optional] [string]

`optionalFeeCharge`: Percentage of fees to charge. Min: 0.1% Max: 90%.

##### [optional] [string]

`tip`: Bundle tip. Default is 0.0001 SOL

---

## Response

`array: versionedTxs`: Array of base64 encoded unsigned transactions.

---

Need help? Hop in our Discord: https://discord.gg/WBmZss3jQq  
Official Docs: https://pumpvial.com/https/pump-multi-sell

---

**Tags:** solana, solana-wallet, solana-wallet-funding, solana-tokens, solana-sdk, solana-web3, solana-transactions, solana-api, pumpfun, pumpvial, crypto-wallet, crypto-funding, blockchain, blockchain-wallet, crypto, cryptocurrency, defi, decentralized-finance, solana-developer, solana-devtools, solana-nft, solana-program, solana-sdk-js, solana-dapp, solana-smart-contracts, solana-bots, solana-automation, solana-trading, solana-token-transfer, solana-sol, web3, web3js, crypto-development, crypto-api, solana-tools, solana-sol-transfer, solana-multisig, solana-transaction-builder, solana-wallet-security, solana-payer, solana-base64, bs58, solana-sdk-tools, solana-transaction-signing, solana-pumpfun, solana-funding-tool

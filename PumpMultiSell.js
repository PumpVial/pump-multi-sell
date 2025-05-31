import { VersionedTransaction, Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import axios from "axios";
import { sendBundle } from "./SendBundle.js";

/////////////////////////////// CONFIG //////////////////////////////////////
const API_KEY = process.env.PUMPVIAL_API_KEY;
const TRANSACTION_FEE_PAYER_PRIVATE_KEY =
  "Enter transaction fee payer's private key.";
const feePayer = Keypair.fromSecretKey(
  bs58.decode(TRANSACTION_FEE_PAYER_PRIVATE_KEY)
);

const fullWalletData = [
  {
    publicKey: "HFNjSiNQDJWtWNGyZsguiz5ULP8SFYgTWRSoJ4McnrQr",
    privateKey:
      "5YwarpcUQgDU5XmPVR8RKDXVH9...7Q3WBCjjBuJdohavc6V1sJR3vPDUv3jZYn",
    tokenAmount: "5000",
  },
  {
    publicKey: "C1VvtLa86LTnoqiLsVZ7qE59AD5u2Z1sRbrwZ8ndvJG2",
    privateKey:
      "SKhKbEv9WWd3R33tnsCmGR16v4...aBjizm1NTJHi2qbRFpaYjnLFzEqWpcynS",
    tokenAmount: "7500",
  },
  // ... up to 20
];

// Filter out private keys before sending to our server
const sanitizedWallets = fullWalletData.map(({ privateKey, ...rest }) => rest);

const payload = {
  feePayer: feePayer.publicKey,
  ca: "7jgMahwDFb3joVRfxhmeVXPzCqpFSxYnni3qdsKvpump",
  wallets: sanitizedWallets,
  optionalFeeCharge: "0.5",
};
//////////////////////////////// END ////////////////////////////////////////

const sellPumpMulti = async () => {
  const URL = "https://api.pumpvial.com/pump-multi-sell";

  try {
    const request = await axios.post(URL, payload, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
    });

    const versionedTxs = request.data.map((tx) =>
      VersionedTransaction.deserialize(
        Uint8Array.from(Buffer.from(tx, "base64"))
      )
    );

    const completedTransactions = [];
    for (let i = 0; i < versionedTxs.length; i++) {
      const tx = versionedTxs[i];
      const chunk = fullWalletData.slice(i * 5, (i + 1) * 5);

      chunk.forEach(({ privateKey }) => {
        const keypair = Keypair.fromSecretKey(bs58.decode(privateKey));
        tx.sign([keypair]);
      });
      tx.sign([feePayer]);

      completedTransactions.push(bs58.encode(tx.serialize()));
    }

    const success = await sendBundle(completedTransactions);
    if (!success) return;

    console.log("Bundle success: ", `https://solscan.io/tx/${success}`);
  } catch (error) {
    console.error("Error:", error);
  }
};

sellPumpMulti();

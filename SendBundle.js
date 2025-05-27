export const sendBundle = async (bundleTxs) => {
  try {
    const request = await axios.post(
      "https://mainnet.block-engine.jito.wtf/api/v1/bundles",
      {
        jsonrpc: "2.0",
        id: 1,
        method: "sendBundle",
        params: [bundleTxs],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const JitoResponse = request.data.result;

    // Polling to check bundle status
    const pollBundleStatus = async (bundleId, maxRetries = 10) => {
      let attempts = 0;

      while (attempts < maxRetries) {
        attempts++;

        const request = await axios.post(
          "https://mainnet.block-engine.jito.wtf/api/v1/bundles",
          {
            jsonrpc: "2.0",
            id: 1,
            method: "getBundleStatuses",
            params: [[bundleId]],
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const validBundle = request.data.result.value;

        if (validBundle.length > 0) {
          const status = validBundle[0]?.confirmation_status;

          if (status === "confirmed" || status === "finalized") {
            return validBundle[0].transactions[0];
          } else if (status === "failed") {
            throw new Error("Bundle failed.");
          }
        }

        // Wait before the next status check (e.g., 2 seconds)
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      throw new Error(
        `Max retries reached (${maxRetries}) without confirmation.`
      );
    };

    const bundleStatus = await pollBundleStatus(JitoResponse);
    return bundleStatus;
  } catch (err) {
    console.error(err);
  }
};

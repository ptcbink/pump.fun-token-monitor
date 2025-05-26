import axios from "axios";
import { GEYSER_RPC } from "../config";

export async function getTokenInfo(tokenAddress: string) {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const url = `https://mainnet.helius-rpc.com/?api-key=${GEYSER_RPC}`;
    const params = {
        "jsonrpc": "2.0",
        "id": "test",
        "method": "getAsset",
        "params": {
            "id": tokenAddress
        }
    }

    const response = await axios.post(url, params)

    const data = await response.data;

    return { name: data.result.content.metadata.name, symbol: data.result.content.metadata.symbol }
}
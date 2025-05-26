import { Connection, Keypair, PublicKey } from "@solana/web3.js"
import { config } from 'dotenv';

config()

const GEYSER_RPC = process.env.GEYSER_RPC;
const CHANNEL_ID = process.env.CHANNEL_ID

export {
    GEYSER_RPC,
    CHANNEL_ID
}
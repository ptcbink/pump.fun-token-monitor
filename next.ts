import { GEYSER_RPC } from "./config"
import WebSocket from 'ws';
import { sendRequest } from "./landing-api/geyser";
import { getTokenInfo } from "./landing-api/getTokenData";
import { sendPumpFunTokenMintMessage, sendPumpFunMigrationMessage } from "./landing-api/sendMessage";

const withGaser = () => {

  if (!GEYSER_RPC) return console.log('Geyser RPC is not provided!');

  const ws = new WebSocket(`wss://atlas-mainnet.helius-rpc.com/?api-key=${GEYSER_RPC}`);

  ws.on('open', function open() {
    console.log('WebSocket is open');
    sendRequest(ws);  // Send a request once the WebSocket is open
  });

  ws.on('message', async function incoming(data: any) {
    const messageStr = data.toString('utf8');
    try {
      const messageObj = JSON.parse(messageStr);

      const result = messageObj.params.result;
      const logs = result.transaction.meta.logMessages;
      const signature = result.signature; // Extract the signature
      const accountKeys = result.transaction.transaction.message.accountKeys.map((ak: any) => ak.pubkey);

      if (logs && logs.some((log: Array<string>) => log.includes('Program log: Instruction: InitializeMint2'))) {
        const tokenInfo = await getTokenInfo(accountKeys[1]);

        console.log('New pump.fun token!');
        console.log(`tx: https://solscan.io/tx/${signature}`);
        console.log('Creator: ', accountKeys[0]);
        console.log(`Token: https://pump.fun/coin/${accountKeys[1]}`);
        console.log(`Name: ${tokenInfo.name}`);
        console.log(`Symbol: $${tokenInfo.symbol}`);
        await sendPumpFunTokenMintMessage(signature, accountKeys[0], accountKeys[1], tokenInfo.name, tokenInfo.symbol);
        console.log("");
      }

      if (logs && logs.some((log: Array<string>) => log.includes('Program log: Instruction: Migrate')) && logs.some((log: Array<string>) => log.includes("Program log: Instruction: CreatePool"))) {
        console.log('New pump.fun Migration!');
        console.log('tx: ', `https://solscan.io/tx/${signature}`);
        console.log('Creator: ', accountKeys[0]);
        console.log('Token: ', accountKeys[1]);
        console.log(accountKeys);
        await sendPumpFunMigrationMessage(signature)
        console.log("");
      }
    } catch (e) {

    }
  })
}



(async () => {
  // mySolBalance = Number(await connection.getBalance(payer.publicKey))
  // console.log(mySolBalance);

  withGaser()
})()
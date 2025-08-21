import { createClient } from "redis";
const client = createClient();
async function main() {
    await client.connect();
    while (1) {
        const response = await client.brPop("submission", 0);
        await new Promise((resolve, reject) => setTimeout(resolve, 1000));
        console.log("Processed users submissions!");
    }
}
main();
//# sourceMappingURL=index.js.map 
import { readFileSync } from "fs";
import { ethereum, program } from "../../index";
import { DEFAULT_API_V2 } from "../../../src/global";
import { ItemType } from "../../../src/messages/message";

export function ArraybufferToString(ab: ArrayBuffer): string {
    return new TextDecoder().decode(ab);
}

describe("Store message retrieval", () => {
    it("Retrieve length of a file", async () => {
        const mnemonic = "twenty enough win warrior then fiction smoke tenant juice lift palace inherit";
        const account = ethereum.ImportAccountFromMnemonic(mnemonic);

        const fileContent = readFileSync("./tests/messages/program/main.py.zip", "utf-8");

        await program.publish({
            account: account,
            channel: "TEST",
            APIServer: DEFAULT_API_V2,
            inlineRequested: true,
            storageEngine: ItemType.ipfs,
            file: fileContent,
            entrypoint: "main:app",
        });
    });
});

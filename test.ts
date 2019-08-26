import { test, runIfMain } from "https://deno.land/std/testing/mod.ts";
import { assert, assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { encode } from "https://denopkg.com/chiefbiiko/std-encoding/mod.ts";
import { awsSignatureV4, kdf } from "./client/mod.ts";
import { ClientConfig, SNSClient, createClient } from "./mod.ts";
import { Doc } from "./util.ts";

const ENV: Doc = Deno.env();

const CONF: ClientConfig = {
  accessKeyId: ENV.ACCESS_KEY_ID || "fraud",
  secretAccessKey: ENV.SECRET_ACCESS_KEY || "fraud",
  region: "local",
  port: 4100
};


test({
  name: "listing topics",
  async fn(): Promise<void> {
    const snsc: SNSClient = createClient(CONF);

    let result: Doc = await snsc.listTopics();

    assertEquals(result.Topics.member.N, []);
  }
});

runIfMain(import.meta);

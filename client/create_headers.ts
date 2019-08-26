import { sha256 } from "https://denopkg.com/chiefbiiko/sha256/mod.ts";
import { encode } from "https://denopkg.com/chiefbiiko/std-encoding/mod.ts";
import { awsSignatureV4 } from "./aws_signature_v4.ts";
import { Doc, date } from "./../util.ts";
import { ClientConfig } from "./../mod.ts";

/** Algorithm identifer. */
const ALGORITHM: string = "AWS4-HMAC-SHA256";

/** Content type header value for POST requests. */
const X_WWW_FORM_URLENCODED: string = "application/x-www-form-urlencoded; charset=utf-8";

/** Required configuration for assembling headers. */
export interface HeadersConfig extends ClientConfig {
  host: string; // sns.us-west-2.amazonaws.com
  method: string; // POST
  cache: Doc; // internal cache for expensive-2-make signing key (& credScope)
  date?: Date; // allows reusing a date for 5min (max signature timestamp diff)
}

/** Assembles a header object for a DynamoDB request. */
export function createHeaders(
  op: string,
  payload: Uint8Array,
  conf: HeadersConfig
): Headers {
  // if not SNS maybe [Amazon]SimpleNotificationService?
  // const amzTarget: string = `SNS_20100331.${op}`;

  const amzDate: string = date.format(conf.date || new Date(), "amz");

  const canonicalUri: string = conf.canonicalUri || "/";

  const canonicalHeaders: string = `content-type:${X_WWW_FORM_URLENCODED}\nhost:${
    conf.host
  }\nx-amz-date:${amzDate}\n`; // x-amz-target:${amzTarget}\n`;

  const signedHeaders: string = "content-type;host;x-amz-date"; // ;x-amz-target";

  const payloadHash: string = sha256(payload, null, "hex") as string;

  const canonicalRequest: string = `${
    conf.method
  }\n${canonicalUri}\n\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;

  const canonicalRequestDigest: string = sha256(
    canonicalRequest,
    "utf8",
    "hex"
  ) as string;

  const msg: Uint8Array = encode(
    `${ALGORITHM}\n${amzDate}\n${
      conf.cache.credentialScope
    }\n${canonicalRequestDigest}`,
    "utf8"
  );

  const signature: string = awsSignatureV4(
    conf.cache.key,
    msg,
    "hex"
  ) as string;

  const authorizationHeader: string = `${ALGORITHM} Credential=${
    conf.accessKeyId
  }/${
    conf.cache.credentialScope
  }, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  return new Headers({
    "Content-Type": X_WWW_FORM_URLENCODED,
    "Content-Length": String(payload.byteLength),
    "X-Amz-Date": amzDate,
    // "X-Amz-Target": amzTarget,
    Authorization: authorizationHeader,
    // "User-Agent": `deno ${Deno.version.deno}`
  });
}

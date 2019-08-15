import { encode } from "https://denopkg.com/chiefbiiko/std-encoding/mod.ts";
import { HeadersConfig, createHeaders, kdf } from "./client/mod.ts";
import { Doc, camelCase, date } from "./util.ts";

/** SNS client. */
export interface SNSClient {
  [key: string]: (params: Doc) => Promise<Doc | AsyncIterableIterator<Doc>>;
}

/** Client configuration. */
export interface ClientConfig {
  accessKeyId: string; // AKIAIOSFODNN7EXAMPLE
  secretAccessKey: string; // wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
  region: string; // us-west-2
  canonicalUri?: string; // fx /path/to/somewhere
  port?: number; // 4575
}

/** Op options. */
export interface OpOptions {
  iteratePages?: boolean; // if a result is paged, async-iterate it? [true]
}

/** DynamoDB operations. */
export const OPS: Set<string> = new Set<string>([
  "AddPermission",
  "CheckIfPhoneNumberIsOptedOut",
  "ConfirmSubscription",
  "CreatePlatformApplication",
  "CreatePlatformEndpoint",
  "CreateTopic",
  "DeleteEndpoint",
  "DeletePlatformApplication",
  "DeleteTopic",
  "GetEndpointAttributes",
  "GetPlatformApplicationAttributes",
  "GetSMSAttributes",
  "GetSubscriptionAttributes",
  "GetTopicAttributes",
  "ListEndpointsByPlatformApplication",
  "ListPhoneNumbersOptedOut",
  "ListPlatformApplications",
  "ListSubscriptions",
  "ListSubscriptionsByTopic",
  "ListTagsForResource",
  "ListTopics",
  "OptInPhoneNumber",
  "Publish",
  "RemovePermission",
  "SetEndpointAttributes",
  "SetPlatformApplicationAttributes",
  "SetSMSAttributes",
  "SetSubscriptionAttributes",
  "SetTopicAttributes",
  "Subscribe",
  "TagResource",
  "Unsubscribe",
  "UntagResource"
]);

/** Service name. */
const SERVICE: string = "sns";


/** Cache for credentialScope and expensive signature key. */
function createCache(conf: Doc): Doc {
  return {
    _day: "",
    _credentialScope: "",
    _key: null,
    _maybeRefresh(): void {
      const d: Date = new Date();
      const day: string = d.toISOString().slice(8, 10);

      if (this._day !== day) {
        // the key and credentialScope values are obsolete
        const dateStamp: string = date.format(d, "dateStamp");

        this._key = kdf(
          conf.secretAccessKey,
          dateStamp,
          conf.region,
          SERVICE
        ) as Uint8Array;

        this._credentialScope = `${dateStamp}/${
          conf.region
        }/${SERVICE}/aws4_request`;

        this._day = day;
      }
    },
    get key(): Uint8Array {
      this._maybeRefresh();

      return this._key;
    },
    get credentialScope(): string {
      this._maybeRefresh();

      return this._credentialScope;
    }
  };
}

/** Base fetch. */
function baseFetch(conf: Doc, op: string, params: Doc): Promise<Doc> {
  const payload: Uint8Array = encode(JSON.stringify(params), "utf8");

  const headers: Headers = createHeaders(op, payload, conf as HeadersConfig);

  return fetch(conf.endpoint, {
    method: conf.method,
    headers,
    body: payload
  }).then(
    (response: Response): Doc => {
      if (!response.ok) {
        throw new Error(
          `http query request failed: ${response.status} ${response.statusText}`
        );
      }

      const body: Doc = response.json();
      
      // TODO: if body has NextToken && iteratePages return an async iterator

      return body; 
    }
  );
}

/** Creates a SNS client. */
export function createClient(conf: ClientConfig): SNSClient {
  if (!conf.accessKeyId || !conf.secretAccessKey || !conf.region) {
    throw new TypeError(
      "client config must include accessKeyId, secretAccessKey and region"
    );
  }

  const host: string =
    conf.region === "local"
      ? "localhost"
      : `sns.${conf.region}.amazonaws.com`;

  const endpoint: string = `http${
    conf.region === "local" ? "" : "s"
  }://${host}:${conf.port || 8000}/`;

  const _conf: Doc = {
    ...conf,
    cache: createCache(conf),
    method: "POST",
    host,
    endpoint
  };

  const snsc: SNSClient = {} as SNSClient;

  for (const op of OPS) {
    snsc[camelCase(op)] = baseFetch.bind(null, _conf, op);
  }

  return snsc;
}

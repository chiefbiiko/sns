import { Collection } from "./collection.ts";
import { Operation } from "./operation.ts";
import { Shape } from "./shape.ts";
import {
  Doc,
  memoizedProperty,
  property
} from "./../util.ts";

export function Api(api: Doc = {}, options: Doc = {}) {
  const self: any = this;
  options.api = this;

  api.metadata = api.metadata || {};

  property(this, "isApi", true, false);
  property(this, "apiVersion", api.metadata.apiVersion);
  property(this, "endpointPrefix", api.metadata.endpointPrefix);
  property(this, "signingName", api.metadata.signingName);
  property(this, "globalEndpoint", api.metadata.globalEndpoint);
  property(this, "signatureVersion", api.metadata.signatureVersion);
  property(this, "jsonVersion", api.metadata.jsonVersion);
  property(this, "targetPrefix", api.metadata.targetPrefix);
  property(this, "protocol", api.metadata.protocol);
  property(this, "timestampFormat", api.metadata.timestampFormat);
  property(this, "xmlNamespaceUri", api.metadata.xmlNamespace);
  property(this, "abbreviation", api.metadata.serviceAbbreviation);
  property(this, "fullName", api.metadata.serviceFullName);
  property(this, "serviceId", api.metadata.serviceId);

  memoizedProperty(this, "className", function(): string {
    let name: string =
      api.metadata.serviceAbbreviation || api.metadata.serviceFullName;

    if (!name) {
      return null;
    }

    name = name.replace(/^Amazon|AWS\s*|\(.*|\s+|\W+/g, "");

    if (name === "ElasticLoadBalancing") {
      name = "ELB";
    }

    return name;
  });

  function addEndpointOperation(name: string, operation: Doc): void {
    if (operation.endpointoperation) {
      property(self, "endpointOperation", name);
    }
  }

  property(
    this,
    "operations",
    new Collection(
      api.operations,
      options,
      function(name: string, operation: Doc): any {
        return new Operation(name, operation, options);
      },
      addEndpointOperation
    )
  );

  property(
    this,
    "shapes",
    new Collection(api.shapes, options, function(
      name: string,
      shape: Doc
    ): any {
      return Shape.create(shape, options);
    })
  );

  if (options.documentation) {
    property(this, "documentation", api.documentation);
    property(this, "documentationUrl", api.documentationUrl);
  }
}

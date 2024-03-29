import { Api } from "./api.ts";

export const API: any = new Api(
  JSON.parse(`
  {
    "version": "2.0",
    "metadata": {
      "apiVersion": "2010-03-31",
      "endpointPrefix": "sns",
      "protocol": "query",
      "serviceAbbreviation": "Amazon SNS",
      "serviceFullName": "Amazon Simple Notification Service",
      "serviceId": "SNS",
      "signatureVersion": "v4",
      "uid": "sns-2010-03-31",
      "xmlNamespace": "http://sns.amazonaws.com/doc/2010-03-31/"
    },
    "operations": {
      "AddPermission": {
        "input": {
          "type": "structure",
          "required": [
            "TopicArn",
            "Label",
            "AWSAccountId",
            "ActionName"
          ],
          "members": {
            "TopicArn": {},
            "Label": {},
            "AWSAccountId": {
              "type": "list",
              "member": {}
            },
            "ActionName": {
              "type": "list",
              "member": {}
            }
          }
        }
      },
      "CheckIfPhoneNumberIsOptedOut": {
        "input": {
          "type": "structure",
          "required": [
            "phoneNumber"
          ],
          "members": {
            "phoneNumber": {}
          }
        },
        "output": {
          "resultWrapper": "CheckIfPhoneNumberIsOptedOutResult",
          "type": "structure",
          "members": {
            "isOptedOut": {
              "type": "boolean"
            }
          }
        }
      },
      "ConfirmSubscription": {
        "input": {
          "type": "structure",
          "required": [
            "TopicArn",
            "Token"
          ],
          "members": {
            "TopicArn": {},
            "Token": {},
            "AuthenticateOnUnsubscribe": {}
          }
        },
        "output": {
          "resultWrapper": "ConfirmSubscriptionResult",
          "type": "structure",
          "members": {
            "SubscriptionArn": {}
          }
        }
      },
      "CreatePlatformApplication": {
        "input": {
          "type": "structure",
          "required": [
            "Name",
            "Platform",
            "Attributes"
          ],
          "members": {
            "Name": {},
            "Platform": {},
            "Attributes": {
              "shape": "Sj"
            }
          }
        },
        "output": {
          "resultWrapper": "CreatePlatformApplicationResult",
          "type": "structure",
          "members": {
            "PlatformApplicationArn": {}
          }
        }
      },
      "CreatePlatformEndpoint": {
        "input": {
          "type": "structure",
          "required": [
            "PlatformApplicationArn",
            "Token"
          ],
          "members": {
            "PlatformApplicationArn": {},
            "Token": {},
            "CustomUserData": {},
            "Attributes": {
              "shape": "Sj"
            }
          }
        },
        "output": {
          "resultWrapper": "CreatePlatformEndpointResult",
          "type": "structure",
          "members": {
            "EndpointArn": {}
          }
        }
      },
      "CreateTopic": {
        "input": {
          "type": "structure",
          "required": [
            "Name"
          ],
          "members": {
            "Name": {},
            "Attributes": {
              "shape": "Sp"
            },
            "Tags": {
              "shape": "Ss"
            }
          }
        },
        "output": {
          "resultWrapper": "CreateTopicResult",
          "type": "structure",
          "members": {
            "TopicArn": {}
          }
        }
      },
      "DeleteEndpoint": {
        "input": {
          "type": "structure",
          "required": [
            "EndpointArn"
          ],
          "members": {
            "EndpointArn": {}
          }
        }
      },
      "DeletePlatformApplication": {
        "input": {
          "type": "structure",
          "required": [
            "PlatformApplicationArn"
          ],
          "members": {
            "PlatformApplicationArn": {}
          }
        }
      },
      "DeleteTopic": {
        "input": {
          "type": "structure",
          "required": [
            "TopicArn"
          ],
          "members": {
            "TopicArn": {}
          }
        }
      },
      "GetEndpointAttributes": {
        "input": {
          "type": "structure",
          "required": [
            "EndpointArn"
          ],
          "members": {
            "EndpointArn": {}
          }
        },
        "output": {
          "resultWrapper": "GetEndpointAttributesResult",
          "type": "structure",
          "members": {
            "Attributes": {
              "shape": "Sj"
            }
          }
        }
      },
      "GetPlatformApplicationAttributes": {
        "input": {
          "type": "structure",
          "required": [
            "PlatformApplicationArn"
          ],
          "members": {
            "PlatformApplicationArn": {}
          }
        },
        "output": {
          "resultWrapper": "GetPlatformApplicationAttributesResult",
          "type": "structure",
          "members": {
            "Attributes": {
              "shape": "Sj"
            }
          }
        }
      },
      "GetSMSAttributes": {
        "input": {
          "type": "structure",
          "members": {
            "attributes": {
              "type": "list",
              "member": {}
            }
          }
        },
        "output": {
          "resultWrapper": "GetSMSAttributesResult",
          "type": "structure",
          "members": {
            "attributes": {
              "shape": "Sj"
            }
          }
        }
      },
      "GetSubscriptionAttributes": {
        "input": {
          "type": "structure",
          "required": [
            "SubscriptionArn"
          ],
          "members": {
            "SubscriptionArn": {}
          }
        },
        "output": {
          "resultWrapper": "GetSubscriptionAttributesResult",
          "type": "structure",
          "members": {
            "Attributes": {
              "shape": "S19"
            }
          }
        }
      },
      "GetTopicAttributes": {
        "input": {
          "type": "structure",
          "required": [
            "TopicArn"
          ],
          "members": {
            "TopicArn": {}
          }
        },
        "output": {
          "resultWrapper": "GetTopicAttributesResult",
          "type": "structure",
          "members": {
            "Attributes": {
              "shape": "Sp"
            }
          }
        }
      },
      "ListEndpointsByPlatformApplication": {
        "input": {
          "type": "structure",
          "required": [
            "PlatformApplicationArn"
          ],
          "members": {
            "PlatformApplicationArn": {},
            "NextToken": {}
          }
        },
        "output": {
          "resultWrapper": "ListEndpointsByPlatformApplicationResult",
          "type": "structure",
          "members": {
            "Endpoints": {
              "type": "list",
              "member": {
                "type": "structure",
                "members": {
                  "EndpointArn": {},
                  "Attributes": {
                    "shape": "Sj"
                  }
                }
              }
            },
            "NextToken": {}
          }
        }
      },
      "ListPhoneNumbersOptedOut": {
        "input": {
          "type": "structure",
          "members": {
            "nextToken": {}
          }
        },
        "output": {
          "resultWrapper": "ListPhoneNumbersOptedOutResult",
          "type": "structure",
          "members": {
            "phoneNumbers": {
              "type": "list",
              "member": {}
            },
            "nextToken": {}
          }
        }
      },
      "ListPlatformApplications": {
        "input": {
          "type": "structure",
          "members": {
            "NextToken": {}
          }
        },
        "output": {
          "resultWrapper": "ListPlatformApplicationsResult",
          "type": "structure",
          "members": {
            "PlatformApplications": {
              "type": "list",
              "member": {
                "type": "structure",
                "members": {
                  "PlatformApplicationArn": {},
                  "Attributes": {
                    "shape": "Sj"
                  }
                }
              }
            },
            "NextToken": {}
          }
        }
      },
      "ListSubscriptions": {
        "input": {
          "type": "structure",
          "members": {
            "NextToken": {}
          }
        },
        "output": {
          "resultWrapper": "ListSubscriptionsResult",
          "type": "structure",
          "members": {
            "Subscriptions": {
              "shape": "S1r"
            },
            "NextToken": {}
          }
        }
      },
      "ListSubscriptionsByTopic": {
        "input": {
          "type": "structure",
          "required": [
            "TopicArn"
          ],
          "members": {
            "TopicArn": {},
            "NextToken": {}
          }
        },
        "output": {
          "resultWrapper": "ListSubscriptionsByTopicResult",
          "type": "structure",
          "members": {
            "Subscriptions": {
              "shape": "S1r"
            },
            "NextToken": {}
          }
        }
      },
      "ListTagsForResource": {
        "input": {
          "type": "structure",
          "required": [
            "ResourceArn"
          ],
          "members": {
            "ResourceArn": {}
          }
        },
        "output": {
          "resultWrapper": "ListTagsForResourceResult",
          "type": "structure",
          "members": {
            "Tags": {
              "shape": "Ss"
            }
          }
        }
      },
      "ListTopics": {
        "input": {
          "type": "structure",
          "members": {
            "NextToken": {}
          }
        },
        "output": {
          "resultWrapper": "ListTopicsResult",
          "type": "structure",
          "members": {
            "Topics": {
              "type": "list",
              "member": {
                "type": "structure",
                "members": {
                  "TopicArn": {}
                }
              }
            },
            "NextToken": {}
          }
        }
      },
      "OptInPhoneNumber": {
        "input": {
          "type": "structure",
          "required": [
            "phoneNumber"
          ],
          "members": {
            "phoneNumber": {}
          }
        },
        "output": {
          "resultWrapper": "OptInPhoneNumberResult",
          "type": "structure",
          "members": {}
        }
      },
      "Publish": {
        "input": {
          "type": "structure",
          "required": [
            "Message"
          ],
          "members": {
            "TopicArn": {},
            "TargetArn": {},
            "PhoneNumber": {},
            "Message": {},
            "Subject": {},
            "MessageStructure": {},
            "MessageAttributes": {
              "type": "map",
              "key": {
                "locationName": "Name"
              },
              "value": {
                "locationName": "Value",
                "type": "structure",
                "required": [
                  "DataType"
                ],
                "members": {
                  "DataType": {},
                  "StringValue": {},
                  "BinaryValue": {
                    "type": "blob"
                  }
                }
              }
            }
          }
        },
        "output": {
          "resultWrapper": "PublishResult",
          "type": "structure",
          "members": {
            "MessageId": {}
          }
        }
      },
      "RemovePermission": {
        "input": {
          "type": "structure",
          "required": [
            "TopicArn",
            "Label"
          ],
          "members": {
            "TopicArn": {},
            "Label": {}
          }
        }
      },
      "SetEndpointAttributes": {
        "input": {
          "type": "structure",
          "required": [
            "EndpointArn",
            "Attributes"
          ],
          "members": {
            "EndpointArn": {},
            "Attributes": {
              "shape": "Sj"
            }
          }
        }
      },
      "SetPlatformApplicationAttributes": {
        "input": {
          "type": "structure",
          "required": [
            "PlatformApplicationArn",
            "Attributes"
          ],
          "members": {
            "PlatformApplicationArn": {},
            "Attributes": {
              "shape": "Sj"
            }
          }
        }
      },
      "SetSMSAttributes": {
        "input": {
          "type": "structure",
          "required": [
            "attributes"
          ],
          "members": {
            "attributes": {
              "shape": "Sj"
            }
          }
        },
        "output": {
          "resultWrapper": "SetSMSAttributesResult",
          "type": "structure",
          "members": {}
        }
      },
      "SetSubscriptionAttributes": {
        "input": {
          "type": "structure",
          "required": [
            "SubscriptionArn",
            "AttributeName"
          ],
          "members": {
            "SubscriptionArn": {},
            "AttributeName": {},
            "AttributeValue": {}
          }
        }
      },
      "SetTopicAttributes": {
        "input": {
          "type": "structure",
          "required": [
            "TopicArn",
            "AttributeName"
          ],
          "members": {
            "TopicArn": {},
            "AttributeName": {},
            "AttributeValue": {}
          }
        }
      },
      "Subscribe": {
        "input": {
          "type": "structure",
          "required": [
            "TopicArn",
            "Protocol"
          ],
          "members": {
            "TopicArn": {},
            "Protocol": {},
            "Endpoint": {},
            "Attributes": {
              "shape": "S19"
            },
            "ReturnSubscriptionArn": {
              "type": "boolean"
            }
          }
        },
        "output": {
          "resultWrapper": "SubscribeResult",
          "type": "structure",
          "members": {
            "SubscriptionArn": {}
          }
        }
      },
      "TagResource": {
        "input": {
          "type": "structure",
          "required": [
            "ResourceArn",
            "Tags"
          ],
          "members": {
            "ResourceArn": {},
            "Tags": {
              "shape": "Ss"
            }
          }
        },
        "output": {
          "resultWrapper": "TagResourceResult",
          "type": "structure",
          "members": {}
        }
      },
      "Unsubscribe": {
        "input": {
          "type": "structure",
          "required": [
            "SubscriptionArn"
          ],
          "members": {
            "SubscriptionArn": {}
          }
        }
      },
      "UntagResource": {
        "input": {
          "type": "structure",
          "required": [
            "ResourceArn",
            "TagKeys"
          ],
          "members": {
            "ResourceArn": {},
            "TagKeys": {
              "type": "list",
              "member": {}
            }
          }
        },
        "output": {
          "resultWrapper": "UntagResourceResult",
          "type": "structure",
          "members": {}
        }
      }
    },
    "shapes": {
      "Sj": {
        "type": "map",
        "key": {},
        "value": {}
      },
      "Sp": {
        "type": "map",
        "key": {},
        "value": {}
      },
      "Ss": {
        "type": "list",
        "member": {
          "type": "structure",
          "required": [
            "Key",
            "Value"
          ],
          "members": {
            "Key": {},
            "Value": {}
          }
        }
      },
      "S19": {
        "type": "map",
        "key": {},
        "value": {}
      },
      "S1r": {
        "type": "list",
        "member": {
          "type": "structure",
          "members": {
            "SubscriptionArn": {},
            "Owner": {},
            "Protocol": {},
            "Endpoint": {},
            "TopicArn": {}
          }
        }
      }
    }
  }
`)
);
